import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from './Shared.jsx'
import { Gyro } from '../motion/Object3D.jsx'

const cols = [
  {
    head: 'Paarth',
    links: [
      { to: '/about', label: 'About Paarth' },
      { to: '/experience', label: 'The Paarth Experience' },
      { to: '/founder', label: "Founder's Vision" },
    ],
  },
  {
    head: 'Learn',
    links: [
      { to: '/what-we-teach', label: 'What We Teach' },
      { to: '/marketing', label: 'Marketing at Paarth' },
      { to: '/ai', label: 'AI at Paarth' },
      { to: '/business-leadership', label: 'Business Leadership' },
      { to: '/curriculum', label: 'The Curriculum' },
    ],
  },
  {
    head: 'Join',
    links: [
      { to: '/program', label: 'Flagship Program' },
      { to: '/admissions', label: 'Admissions' },
      { to: '/apply', label: 'Apply Now' },
    ],
  },
]

export default function Footer() {
  const ref = useRef(null)
  const [h, setH] = useState(0)
  const [curtain, setCurtain] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const height = el.offsetHeight
      setH(height)
      setCurtain(window.matchMedia('(min-width: 1024px)').matches && height < window.innerHeight - 60)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <>
      {curtain && <div style={{ height: h }} aria-hidden="true" />}
      <footer
        ref={ref}
        className={`bg-ink text-paper ${curtain ? 'fixed inset-x-0 bottom-0 z-0' : ''}`}
      >
      <Container className="relative py-16 md:py-20">
        <Gyro size={150} light className="absolute right-6 top-14 hidden opacity-60 lg:block" />
        <div className="grid gap-14 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="font-display text-3xl">
              Paarth<span className="text-brass">.</span>
            </p>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-paper/60">
              Paarth is a modern space for builders, marketers, and business leaders who want to master marketing,
              use AI intelligently, and build real business capability.
            </p>
            <div className="mt-8">
              <p className="text-sm text-paper/70">Interested in Paarth?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button to="/program" variant="paper">View Program</Button>
                <Button to="/apply" variant="outline" className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((col) => (
              <div key={col.head}>
                <p className="eyebrow">{col.head}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.to + l.label}>
                      <Link to={l.to} className="link-rule text-[0.9rem] text-paper/70 transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="overflow-hidden border-t border-paper/10" aria-hidden="true">
        <p className="select-none whitespace-nowrap text-center font-display text-[18vw] leading-[0.82] text-paper/[0.05]">
          PAARTH
        </p>
      </div>
      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-4 py-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Paarth — All rights reserved</p>
          <div className="flex items-center gap-4">
            <svg className="h-5 w-20 text-paper/50" viewBox="0 0 80 20" aria-hidden="true">
              {[1, 3, 4, 7, 9, 12, 13, 16, 19, 22, 24, 27, 30, 31, 34, 37, 39, 42, 44, 47, 50, 51, 54, 57, 59, 62, 64, 67, 70, 71, 74, 77].map((x, i) => (
                <rect key={i} x={x} y="2" width={i % 3 === 0 ? 2 : 1} height="16" fill="currentColor" />
              ))}
            </svg>
            <p>SR. PA-2026-IN-001</p>
          </div>
          <p>Founder-led / Framework-driven</p>
        </Container>
      </div>
      </footer>
    </>
  )
}
