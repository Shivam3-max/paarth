import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Parallax drift on scroll. speed in yPercent (negative = moves up slower). */
export function Parallax({ children, speed = 10, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED()) return
    const tween = gsap.fromTo(
      el,
      { yPercent: -speed },
      { yPercent: speed, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** 3D tilt-toward-cursor for cards. */
export function Tilt({ children, max = 5, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED() || !window.matchMedia('(pointer: fine)').matches) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' })
    gsap.set(el, { transformPerspective: 900 })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * max * 2)
      rx(-py * max * 2)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [max])
  return (
    <div ref={ref} className={`group relative ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
      <span className="glare" aria-hidden="true" />
    </div>
  )
}

/** Magnetic pull toward cursor (for buttons). */
export function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED() || !window.matchMedia('(pointer: fine)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * strength)
      y((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])
  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}

/** Clip-path curtain reveal + inner scale for images. Wrap around a Ph. */
export function ClipReveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (REDUCED()) {
      el.style.clipPath = 'none'
      return
    }
    const inner = el.firstElementChild
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' })
    if (inner) tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0)
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])
  return (
    <div ref={ref} className={className} style={{ clipPath: 'inset(100% 0% 0% 0%)', willChange: 'clip-path' }}>
      <div>{children}</div>
    </div>
  )
}

/** Brass progress line that scales across as its section scrolls through. */
export function ScrubLine({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED()) return
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top 75%', end: 'bottom 45%', scrub: 0.5 } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])
  return <div ref={ref} className={`h-px origin-left bg-brass ${className}`} aria-hidden="true" />
}
