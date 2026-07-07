import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered reveal.
 * mode="fade" (default): fades/blurs the wrapper itself.
 * mode="mask": wrapper stays visible; toggles .is-on so inner .mline spans slide up.
 */
export default function Reveal({ children, delay = 0, className = '', mode = 'fade' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return

    const inView = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight - 40 && r.bottom > 0
    }

    if (inView()) {
      setOn(true)
      return
    }

    let io
    let timers = []
    const trigger = () => {
      setOn(true)
      cleanup()
    }
    const check = () => {
      if (inView()) trigger()
    }
    const cleanup = () => {
      if (io) io.disconnect()
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    // re-check after mount: covers scroll restoration on reload/back-navigation
    timers = [150, 500, 1200].map((ms) => setTimeout(check, ms))

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger()
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return cleanup
  }, [on])

  const base = mode === 'mask' ? 'mask-host' : 'reveal'

  return (
    <div
      ref={ref}
      className={`${base} ${on ? 'is-on' : ''} ${className}`}
      style={mode === 'fade' ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
