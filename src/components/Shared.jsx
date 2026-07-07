import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { Words, Decode } from '../motion/Text.jsx'
import { Magnetic, ClipReveal } from '../motion/Effects.jsx'
import { Gyro, Cube } from '../motion/Object3D.jsx'
import Lazy3D from '../motion/Lazy3D.jsx'
import Constellation from '../motion/Constellation.jsx'

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>
}

/* ---------------- buttons ---------------- */

export function Button({ to, children, variant = 'ink', className = '' }) {
  const base =
    'btn-sweep group/btn inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.82rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer'
  const styles = {
    ink: 'bg-ink text-paper',
    outline: 'border border-ink/25 text-ink hover:border-transparent hover:text-paper',
    paper: 'bg-paper text-ink hover:text-paper',
  }
  return (
    <Magnetic>
      <Link to={to} className={`${base} ${styles[variant]} ${className}`}>
        <span>{children}</span>
        <svg
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Link>
    </Magnetic>
  )
}

/* ---------------- art-directed image placeholders ---------------- */

function ArtArcs() {
  return (
    <svg className="ph-art h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="400" fill="url(#phg1)" />
      <defs>
        <linearGradient id="phg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2EDE2" />
          <stop offset="1" stopColor="#E4DBC4" />
        </linearGradient>
      </defs>
      {[...Array(11)].map((_, i) => (
        <circle key={i} cx="400" cy="400" r={60 + i * 38} fill="none" stroke="#9A7B2D" strokeOpacity={0.5 - i * 0.036} strokeWidth="1" />
      ))}
      <circle cx="86" cy="92" r="30" fill="#9A7B2D" fillOpacity="0.16" />
      <circle cx="86" cy="92" r="14" fill="#9A7B2D" fillOpacity="0.35" />
    </svg>
  )
}

function ArtContour() {
  return (
    <svg className="ph-art h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="400" fill="url(#phg2)" />
      <defs>
        <linearGradient id="phg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EFE4" />
          <stop offset="1" stopColor="#E7DFCB" />
        </linearGradient>
      </defs>
      {[...Array(9)].map((_, i) => (
        <path
          key={i}
          d={`M -20 ${70 + i * 40} C 100 ${30 + i * 40}, 180 ${110 + i * 40}, 300 ${60 + i * 40} S 420 ${100 + i * 40}, 460 ${70 + i * 40}`}
          fill="none"
          stroke="#9A7B2D"
          strokeOpacity={0.42 - i * 0.035}
          strokeWidth="1"
        />
      ))}
      <circle cx="318" cy="96" r="26" fill="#17150F" fillOpacity="0.1" />
    </svg>
  )
}

function ArtGrid() {
  return (
    <svg className="ph-art h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="400" fill="url(#phg3)" />
      <defs>
        <linearGradient id="phg3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F2EDE2" />
          <stop offset="1" stopColor="#E9E0CB" />
        </linearGradient>
      </defs>
      {[...Array(10)].map((_, i) => (
        <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44 + 60} y2="400" stroke="#9A7B2D" strokeOpacity="0.2" strokeWidth="1" />
      ))}
      {[...Array(10)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 44} x2="400" y2={i * 44} stroke="#17150F" strokeOpacity="0.07" strokeWidth="1" />
      ))}
      <rect x="230" y="70" width="110" height="110" fill="#9A7B2D" fillOpacity="0.14" />
      <rect x="260" y="100" width="110" height="110" fill="none" stroke="#9A7B2D" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  )
}

function ArtRays() {
  return (
    <svg className="ph-art h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="400" fill="url(#phg4)" />
      <defs>
        <linearGradient id="phg4" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F4EFE4" />
          <stop offset="1" stopColor="#E5DCC6" />
        </linearGradient>
      </defs>
      {[...Array(16)].map((_, i) => (
        <line
          key={i}
          x1="200" y1="430"
          x2={200 + 340 * Math.cos((Math.PI * (180 + i * 11.25)) / 180)}
          y2={430 + 340 * Math.sin((Math.PI * (180 + i * 11.25)) / 180)}
          stroke="#9A7B2D"
          strokeOpacity={0.38 - Math.abs(i - 8) * 0.028}
          strokeWidth="1"
        />
      ))}
      <circle cx="200" cy="430" r="150" fill="none" stroke="#17150F" strokeOpacity="0.12" />
      <circle cx="200" cy="430" r="220" fill="none" stroke="#17150F" strokeOpacity="0.08" />
    </svg>
  )
}

const ARTS = { arcs: ArtArcs, contour: ArtContour, grid: ArtGrid, rays: ArtRays }

/** Elegant image placeholder — swap for real photography later. */
export function Ph({ label = 'Image placeholder', variant = 'arcs', ratio = 'aspect-[4/3]', className = '' }) {
  const Art = ARTS[variant] || ArtArcs
  return (
    <ClipReveal className={className}>
      <figure data-skew data-cursor="View" className={`group relative overflow-hidden border hairline bg-cream ${ratio}`}>
        <div className="absolute inset-0">
          <Art />
        </div>
      {/* corner ticks */}
      <span className="absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-ink/30" aria-hidden="true" />
      <span className="absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-ink/30" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-ink/30" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-ink/30" aria-hidden="true" />
        <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 border hairline bg-paper/85 px-3 py-1.5 backdrop-blur-sm">
          <svg className="h-3 w-3 text-brass" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" />
            <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
            <path d="m3 11 3.2-3 2.6 2.4L11 8l2.5 3" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-ink-soft">{label}</span>
        </figcaption>
      </figure>
    </ClipReveal>
  )
}

/* ---------------- rotating badge ---------------- */

export function RotatingBadge({ className = '' }) {
  return (
    <div className={`spin-slow ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id="circ" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="var(--color-ink)" />
        <text fill="var(--color-paper)" fontSize="10.5" letterSpacing="2.6" fontWeight="600">
          <textPath href="#circ">THINK · BUILD · LEAD · SCALE · PAARTH ·</textPath>
        </text>
        <path d="M52 60h16M62 54l6 6-6 6" stroke="var(--color-brass)" strokeWidth="1.6" fill="none" />
      </svg>
    </div>
  )
}

/* ---------------- animated counter ---------------- */

export function Stat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const [go, setGo] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = () => {
      if (started.current) return
      started.current = true
      setGo(true)
      const t0 = performance.now()
      const dur = 1600
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        start()
        window.removeEventListener('scroll', check)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [value])

  return (
    <div ref={ref}>
      <p className="font-display text-4xl md:text-5xl">
        {n}
        <span className="serif-i text-brass">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-soft">{label}</p>
      <span className="mt-3 block h-px w-full bg-line" aria-hidden="true">
        <span
          className="block h-px origin-left bg-brass transition-transform duration-[1600ms] ease-out"
          style={{ transform: go ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </span>
    </div>
  )
}

/* ---------------- ticker ---------------- */

export function Ticker({ items, dark = false }) {
  const doubled = [...items, ...items]
  return (
    <div className={`overflow-hidden border-y py-5 ${dark ? 'border-paper/15 bg-ink' : 'hairline bg-cream'}`} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((h, i) => (
          <span
            key={i}
            className={`mx-8 flex items-center gap-8 whitespace-nowrap font-display text-lg italic ${dark ? 'text-paper/70' : 'text-ink-soft'}`}
          >
            <span className="font-mono text-[0.6rem] font-bold not-italic tracking-[0.2em] text-brass">
              [{String((i % items.length) + 1).padStart(2, '0')}]
            </span>
            {h}
            <svg className="h-3.5 w-3.5 text-brass" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- section furniture ---------------- */

export function PageHero({ eyebrow, title, copy, art, artVariant = 'arcs', artLabel, three = 'octa', children }) {
  return (
    <header className="relative overflow-hidden border-b hairline">
      <div className="bg-dots pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-50 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" aria-hidden="true" />
      {!(art || artLabel) && (
        <Lazy3D kind={three} className="absolute right-[6%] top-24 hidden h-72 w-72 opacity-90 lg:block" />
      )}
      <Container className="pt-36 pb-16 md:pt-48 md:pb-24">
        <div className={art || artLabel ? 'grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]' : ''}>
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-10 bg-brass" aria-hidden="true" />
                <Decode text={typeof eyebrow === 'string' ? eyebrow : ''} />
              </p>
            </Reveal>
            <h1 className="mt-7 max-w-4xl text-[clamp(1.6rem,9vw,2.4rem)] leading-[1.06] md:text-[clamp(2.6rem,5vw,4rem)]">
              <Words>{title}</Words>
            </h1>
            {copy && (
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{copy}</p>
              </Reveal>
            )}
            {children && <Reveal delay={300}>{children}</Reveal>}
          </div>
          {(art || artLabel) && (
            <Reveal delay={250} className="relative hidden lg:block">
              <Lazy3D kind={three} className="absolute -top-32 left-1/2 h-56 w-56 -translate-x-1/2" />
              {art || <Ph variant={artVariant} label={artLabel} ratio="aspect-[4/5]" />}
              <RotatingBadge className="absolute -left-10 -top-10 h-24 w-24" />
              <Gyro size={92} className="absolute -bottom-8 -right-8" />
            </Reveal>
          )}
        </div>
      </Container>
    </header>
  )
}

export function SectionHead({ num, eyebrow, title, copy, light = false }) {
  return (
    <div className="relative max-w-3xl">
      {num && (
        <span className="watermark-num pointer-events-none absolute -left-3 -top-12 text-[7rem] md:-left-10 md:text-[10rem]" aria-hidden="true">
          {num}
        </span>
      )}
      <Reveal>
        <p className="eyebrow relative flex items-center gap-3">
          <span className="rule-grow inline-block h-px w-10 bg-brass" aria-hidden="true" />
          <Decode text={typeof eyebrow === 'string' ? eyebrow : ''} />
          {num && <span className="ml-2 text-ink-soft/60">[ {num} ]</span>}
        </p>
      </Reveal>
      <h2 className={`relative mt-6 text-3xl leading-[1.1] md:text-[2.9rem] ${light ? 'text-paper' : ''}`}>
        <Words>{title}</Words>
      </h2>
      {copy && (
        <Reveal delay={180}>
          <p className={`relative mt-6 text-lg leading-relaxed ${light ? 'text-paper/70' : 'text-ink-soft'}`}>{copy}</p>
        </Reveal>
      )}
    </div>
  )
}

export function NumberedCard({ index, title, copy, light = false }) {
  return (
    <div className={`hover-lift group relative h-full border-t pt-6 ${light ? 'border-paper/25 hover:border-brass' : 'border-ink/20 hover:border-brass'}`}>
      <span className="font-display text-sm italic text-brass transition-transform duration-500 group-hover:-translate-y-1 inline-block">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className={`mt-3 text-xl md:text-[1.35rem] ${light ? 'text-paper' : ''}`}>{title}</h3>
      <p className={`mt-3 text-[0.95rem] leading-relaxed ${light ? 'text-paper/65' : 'text-ink-soft'}`}>{copy}</p>
    </div>
  )
}

export function CTABand({ title, copy, buttons }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          {[...Array(9)].map((_, i) => (
            <circle key={i} cx="1200" cy="500" r={120 + i * 90} fill="none" stroke="#9A7B2D" strokeOpacity={0.5 - i * 0.05} />
          ))}
        </svg>
      </div>
      <Constellation dark density={38} className="absolute inset-0 opacity-70" />
      <Gyro size={230} light className="absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-70 lg:block" />
      <Cube size={44} light className="absolute left-[12%] top-12 hidden opacity-60 lg:block" />
      <Container className="relative py-24 md:py-32">
        <h2 className="max-w-3xl text-3xl leading-[1.1] md:text-5xl">
          <Words>{title}</Words>
        </h2>
        {copy && (
          <Reveal delay={120}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70">{copy}</p>
          </Reveal>
        )}
        <Reveal delay={220}>
          <div className="mt-11 flex flex-wrap gap-4">
            {buttons.map((b) => (
              <Button
                key={b.to + b.label}
                to={b.to}
                variant={b.variant || 'paper'}
                className={b.variant === 'outline' ? 'border-paper/30 text-paper' : ''}
              >
                {b.label}
              </Button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function ListRow({ items, columns = 2, light = false }) {
  return (
    <ul className={`grid gap-x-12 gap-y-4 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 45}>
          <li
            className={`group flex items-start gap-4 border-b pb-4 text-[0.98rem] leading-relaxed transition-colors duration-300 ${
              light ? 'border-paper/15 text-paper/70 hover:border-brass' : 'hairline text-ink-soft hover:border-brass'
            }`}
          >
            <svg className="mt-1.5 h-3 w-3 shrink-0 text-brass transition-transform duration-500 group-hover:rotate-90" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8z" />
            </svg>
            {item}
          </li>
        </Reveal>
      ))}
    </ul>
  )
}
