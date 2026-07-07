import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Flatten JSX (strings + styled spans) into word tokens that keep their className. */
function flatten(node, cls = '') {
  if (node == null || node === false) return []
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
      .split(/(\s+)/)
      .filter((w) => w.length)
      .map((w) => ({ w, cls }))
  }
  if (Array.isArray(node)) return node.flatMap((n) => flatten(n, cls))
  if (node.props) return flatten(node.props.children, `${cls} ${node.props.className || ''}`.trim())
  return []
}

/** Word-by-word masked rise, triggered on scroll.
 *  CSS-transition driven (no ticker dependency) so it can never stall. */
export function Words({ children, className = '', stagger = 45 }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const tokens = useMemo(() => flatten(children), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    if (REDUCED()) {
      setOn(true)
      return
    }
    const inView = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight - 30 && r.bottom > 0
    }
    if (inView()) {
      setOn(true)
      return
    }
    let timers = []
    const trigger = () => {
      setOn(true)
      cleanup()
    }
    const check = () => {
      if (inView()) trigger()
    }
    const cleanup = () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    timers = [150, 500, 1200].map((ms) => setTimeout(check, ms))
    return cleanup
  }, [on])

  let wi = 0
  return (
    <span ref={ref} className={`${on ? 'words-on' : ''} ${className}`}>
      {tokens.map((t, i) =>
        t.w.trim() ? (
          <span key={i} className="wm">
            <span className={`w-in ${t.cls}`} style={{ transitionDelay: `${Math.min(wi++ * stagger, 1400)}ms` }}>
              {t.w}
            </span>
          </span>
        ) : (
          ' '
        ),
      )}
    </span>
  )
}

/** Paragraph whose words fill from 13% to full ink as the user scrolls.
 *  Driven directly by scroll events (no ticker) so it works everywhere. */
export function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  const words = useMemo(() => String(text).split(/\s+/), [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('.sw')
    if (REDUCED()) {
      spans.forEach((s) => (s.style.opacity = 1))
      return
    }
    const update = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85
      const end = vh * 0.42
      const total = start - end + r.height
      const p = Math.min(1, Math.max(0, (start - r.top) / total))
      const lead = p * (spans.length + 6)
      spans.forEach((s, i) => {
        const w = Math.min(1, Math.max(0, lead - i))
        s.style.opacity = 0.13 + 0.87 * w
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const t = setTimeout(update, 600)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="sw">
          {w}{' '}
        </span>
      ))}
    </p>
  )
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+='

/** Character decode/scramble effect for eyebrow labels. */
export function Decode({ text, className = '' }) {
  const ref = useRef(null)
  const [out, setOut] = useState(text)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (REDUCED()) return

    const run = () => {
      if (played.current) return
      played.current = true
      const chars = text.split('')
      let frame = 0
      const total = Math.max(18, chars.length * 1.6)
      const id = setInterval(() => {
        frame++
        const progress = frame / total
        setOut(
          chars
            .map((c, i) => {
              if (c === ' ') return ' '
              if (i / chars.length < progress) return c
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join(''),
        )
        if (frame >= total) {
          setOut(text)
          clearInterval(id)
        }
      }, 28)
    }

    const st = ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: run })
    // fallback if already in view
    if (el.getBoundingClientRect().top < window.innerHeight) run()
    return () => st.kill()
  }, [text])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}
