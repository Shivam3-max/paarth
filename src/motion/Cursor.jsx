import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/** Brass dot + lagging ring cursor. Grows on links; shows a label over [data-cursor] elements. */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2' })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2' })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      setActive(true)
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
    }
    const over = (e) => {
      const labelled = e.target.closest('[data-cursor]')
      const interactive = e.target.closest('a, button, [role="button"], input, select, textarea, summary')
      if (labelled) {
        setLabel(labelled.getAttribute('data-cursor'))
        gsap.to(ring, { scale: 3.1, backgroundColor: 'rgba(23,21,15,0.92)', borderColor: 'transparent', duration: 0.35 })
        gsap.to(dot, { scale: 0, duration: 0.25 })
      } else if (interactive) {
        setLabel('')
        gsap.to(ring, { scale: 1.9, backgroundColor: 'rgba(154,123,45,0.12)', borderColor: 'rgba(154,123,45,0.9)', duration: 0.35 })
        gsap.to(dot, { scale: 0.55, duration: 0.25 })
      } else {
        setLabel('')
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(154,123,45,0)', borderColor: 'rgba(154,123,45,0.75)', duration: 0.35 })
        gsap.to(dot, { scale: 1, duration: 0.25 })
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[95] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderColor: 'rgba(154,123,45,0.75)' }}
        aria-hidden="true"
      >
        {label && (
          <span className="font-mono text-[0.42rem] font-bold uppercase tracking-[0.14em] text-paper">{label}</span>
        )}
      </div>
    </>
  )
}
