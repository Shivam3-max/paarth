import { useEffect, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { glStore } from '../gl/store.js'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenisRef = { current: null }

export function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
  return null
}

export function scrollToTarget(target) {
  if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: 0, duration: 1.6 })
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView({ behavior: 'smooth' })
}

/** Feeds pointer / touch position to the WebGL field (no custom cursor). */
export function PointerTracker() {
  useEffect(() => {
    const onMove = (e) => {
      glStore.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      glStore.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    // on touch, release the repel field when the finger lifts
    const onUp = (e) => {
      if (e.pointerType !== 'mouse') glStore.mouse.x = glStore.mouse.y = 99
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])
  return null
}

/** Magnetic hover for buttons. */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * strength)
      yTo((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return <span ref={ref} className={`inline-block ${className}`}>{children}</span>
}

/**
 * Scoped GSAP effect for a page. Elements opt into shared animations with attributes:
 *  [data-split]      – headline chars rise from a mask when scrolled in
 *  [data-fade]       – fade + rise
 *  [data-scramble]   – text decodes from random glyphs
 *  [data-scrub]      – words light up while scrolling through
 *  [data-parallax=n] – y-parallax by n%
 */
export function usePageMotion(scope, deps = []) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context(() => {
      const r = reduced()

      gsap.utils.toArray('[data-split]').forEach((el) => {
        const split = new SplitText(el, { type: 'lines,chars', linesClass: 'line-mask', mask: 'lines' })
        if (r) return
        gsap.from(split.chars, {
          yPercent: 115,
          rotate: 6,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.018,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      gsap.utils.toArray('[data-fade]').forEach((el) => {
        if (r) return
        gsap.from(el, {
          y: 40,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 1.2,
          ease: 'expo.out',
          delay: Number(el.dataset.fade) || 0,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      gsap.utils.toArray('[data-scramble]').forEach((el) => {
        const text = el.textContent
        if (r) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(el, { duration: 1.2, scrambleText: { text, chars: '01<>/#_*', speed: 0.6 }, ease: 'none' }),
        })
      })

      gsap.utils.toArray('[data-scrub]').forEach((el) => {
        const split = new SplitText(el, { type: 'words' })
        gsap.set(split.words, { opacity: 0.12 })
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
        })
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        if (r) return
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -20,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, scope)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      ctx.revert()
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export { gsap, ScrollTrigger, SplitText }
