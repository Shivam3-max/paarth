import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { LogoMark } from '../components/Logo.jsx'

/** 000 → 360° counter, then the curtain splits open. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone })
      tl.to(counter, {
        v: 360,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
        .to(bar.current, { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
        .to('[data-pre-fade]', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .to('[data-pre-top]', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
        .to('[data-pre-bot]', { yPercent: 100, duration: 0.9, ease: 'expo.inOut' }, '<')
    }, root)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={root} className="fixed inset-0 z-[95]" aria-hidden="true">
      <div data-pre-top className="absolute inset-x-0 top-0 h-1/2 bg-void" />
      <div data-pre-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-void" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div data-pre-fade className="flex flex-col items-center">
          <LogoMark className="h-12 w-12 text-ivory" />
          <p className="display mt-8 text-7xl font-semibold tabular-nums md:text-9xl">
            <span ref={num}>000</span>
            <span className="text-gold">°</span>
          </p>
          <div className="mt-8 h-px w-56 overflow-hidden bg-ivory/10">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-gold" />
          </div>
          <p className="mono mt-5 text-mist">Calibrating the all-in-one operator</p>
        </div>
      </div>
    </div>
  )
}
