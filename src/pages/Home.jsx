import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, Magnetic, SplitText, reduced, scrollToTarget, usePageMotion } from '../motion/core.jsx'
import Countdown from '../components/Countdown.jsx'
import { MASTERCLASS, formatSession, nextSession } from '../config.js'

const SKILLS = [
  'Video editing', 'Design', 'Sales closing', 'CRM building', 'Decision making', 'Ads & funnels',
  'Automation', 'Public speaking', 'Websites', 'Negotiation', 'Copywriting', 'Team leading',
]

const PILLARS = [
  {
    n: '01', word: 'LEAD', title: 'Leadership',
    line: 'Decide fast. Speak clearly. Own the room.',
    chips: ['Decision making', 'Communication', 'Team handling', 'Negotiation'],
    gl: '1,2.7,0,0.95,1', side: 'left',
  },
  {
    n: '02', word: 'MARKET', title: 'Marketing & sales',
    line: 'Make people want it. Then close the deal.',
    chips: ['Branding', 'Content', 'Ads & funnels', 'Sales closing'],
    gl: '2,-2.7,0,0.95,1', side: 'right',
  },
  {
    n: '03', word: 'BUILD', title: 'AI for execution',
    line: 'Do the work of a whole team. Alone.',
    chips: ['Video editing', 'Design', 'CRMs & automation', 'Websites'],
    gl: '3,2.7,0,0.9,1', side: 'left',
  },
]

const SWAPS = [
  ['Video editing', '6 months of Premiere Pro', 'Minutes, with AI'],
  ['Graphic design', 'A Photoshop course', 'One prompt'],
  ['A CRM', 'Hiring a developer', 'Built by you, in a day'],
  ['A website', 'Paying an agency', 'Live by evening'],
  ['Sales copy', 'Hiring a copywriter', 'Drafted in seconds'],
]

const STAGES = [
  ['Learn', 'Lead, sell and create with AI.'],
  ['Pick', 'Choose a business you’ll actually run.'],
  ['Build', 'Brand, offer, website, CRM — made by you.'],
  ['Launch', 'Go live. Land your first customer.'],
  ['Scale', 'Systems, ads, a team. Grow it.'],
]

const Arrow = () => <span className="arrow inline-block">→</span>

/* ───────────────────────── HERO ───────────────────────── */
function Hero({ ready }) {
  const ref = useRef(null)
  const ctxRef = useRef(null)
  const splitRef = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText('[data-hero-title]', { type: 'lines,chars', mask: 'lines' })
      split.chars.forEach((c) => c.parentElement.closest('.gold-text') && c.classList.add('gold-text'))
      splitRef.current = split
      gsap.set(split.chars, { yPercent: 120 })
      gsap.set('[data-hero-in]', { opacity: 0, y: 24 })
    }, ref)
    ctxRef.current = ctx
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ready) return
    ctxRef.current.add(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.to(splitRef.current.chars, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.045 })
        .to('[data-hero-in]', { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }, '-=1.0')
      if (!reduced()) {
        gsap.to('[data-hero-title]', {
          yPercent: -18,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    })
  }, [ready])

  return (
    <section ref={ref} data-gl="0,1.9,0.2,1,1" className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14">
      <div className="mx-auto w-full max-w-7xl">
        <p data-hero-in className="mono flex flex-wrap items-center gap-x-3 gap-y-2 text-mist">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          <span>Leadership</span> <span className="text-gold">/</span> <span>Marketing</span> <span className="text-gold">/</span> <span className="whitespace-nowrap">AI for execution</span>
        </p>
        <h1 data-hero-title className="display mt-6 text-[15.5vw] font-semibold uppercase md:text-[12.5vw] lg:text-[11.5rem]">
          Become <br />
          <span className="gold-text">360°</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hero-in className="max-w-md text-lg leading-snug text-ivory/75 md:text-xl">
            The all-in-one operator. <span className="serif text-2xl text-ivory">Leads, sells, creates and builds</span> — with AI doing the heavy lifting.
          </p>
          <div data-hero-in className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link to="/masterclass" className="btn btn-gold">
                Free 1-hr masterclass <Arrow />
              </Link>
            </Magnetic>
            <button onClick={() => scrollToTarget('#pillars')} className="btn btn-ghost">
              What you learn <span className="arrow inline-block rotate-90">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillMarquee() {
  const row = [...SKILLS, ...SKILLS]
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-void/40 py-5 backdrop-blur-sm">
      <div className="marquee">
        {row.map((s, i) => (
          <span key={i} className="display flex items-center whitespace-nowrap px-6 text-2xl font-light uppercase text-ivory/80 md:text-4xl">
            {s}
            <span className="ml-12 text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── MANIFESTO ───────────────────────── */
function Manifesto() {
  return (
    <section data-gl="0,0,0,1.55,0.35" className="relative px-5 py-40 md:px-10 md:py-56">
      <div className="mx-auto max-w-6xl">
        <p className="mono mb-10 text-gold" data-scramble>The shift</p>
        <p data-scrub className="display text-[2.1rem] font-normal leading-[1.08] tracking-[-0.03em] md:text-[4.6rem]">
          Companies don’t want specialists anymore. They want the one person who can think, create, sell — and ship it with AI.
        </p>
        <p data-fade className="serif mt-12 text-3xl text-gold md:text-4xl">That person is built here.</p>
      </div>
    </section>
  )
}

/* ───────────────────────── PILLARS ───────────────────────── */
function Pillar({ p }) {
  const right = p.side === 'right'
  return (
    <section data-gl={p.gl} className="relative flex min-h-[115vh] items-center overflow-hidden px-5 py-28 md:px-10">
      <p
        data-word
        className="display stroke-text pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[34vw] font-bold leading-none opacity-60"
        aria-hidden="true"
      >
        {p.word} {p.word}
      </p>
      <div className={`relative mx-auto flex w-full max-w-7xl ${right ? 'lg:justify-end' : ''}`}>
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="display text-6xl font-bold text-gold md:text-8xl" data-fade>{p.n}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
            <span className="mono text-mist" data-scramble>{p.title}</span>
          </div>
          <h3 data-split className="display mt-8 text-6xl font-semibold uppercase md:text-[5.6rem]">
            {p.word}
          </h3>
          <p data-fade className="serif mt-6 text-3xl leading-tight text-ivory/90 md:text-[2.6rem]">{p.line}</p>
          <ul className="mt-10 grid grid-cols-2 gap-3">
            {p.chips.map((c, i) => (
              <li key={c} data-fade={i * 0.08} className="glass hud flex items-center gap-3 rounded-xl px-4 py-4 text-[0.95rem]">
                <span className="font-mono text-[0.62rem] text-gold">{p.n}.{i + 1}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-word]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { xPercent: i % 2 ? -35 : 0 },
          {
            xPercent: i % 2 ? 0 : -35,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} id="pillars">
      <div className="px-5 pt-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mono text-mist" data-scramble>Three skills. One person.</p>
        </div>
      </div>
      {PILLARS.map((p) => (
        <Pillar key={p.n} p={p} />
      ))}
    </div>
  )
}

/* ───────────────────────── 360 OPERATOR DIAL ───────────────────────── */
function Operator() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('[data-node]')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const n = Math.min(SKILLS.length, Math.floor(self.progress * (SKILLS.length + 1)))
            ref.current?.querySelectorAll('[data-count]').forEach((c) => { c.textContent = String(n).padStart(2, '0') })
          },
        },
      })
      tl.to('[data-dial]', { rotate: -120, ease: 'none', duration: 1 }, 0)
      tl.to('[data-node-inner]', { rotate: 120, ease: 'none', duration: 1 }, 0)
      tl.fromTo('[data-arc]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      nodes.forEach((n, i) => {
        tl.to(n, { '--on': 1, duration: 0.05 }, ((i % SKILLS.length) + 1) / (SKILLS.length + 1))
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="operator" className="relative h-[320vh]">
      <div
        data-gl="4,0,0,1,0.85"
        className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-5 overflow-hidden px-5 pt-16 md:block md:px-0 md:pt-0"
      >
        <div className="w-full md:absolute md:left-10 md:top-28 md:w-auto md:max-w-xs">
          <p className="mono text-gold">The 360° operator</p>
          <h2 className="display mt-3 text-[2rem] font-semibold uppercase leading-[0.95] md:mt-4 md:text-5xl">
            One person.<br />Every skill.
          </h2>
        </div>
        <div className="absolute bottom-12 right-10 hidden text-right md:block">
          <p className="display text-7xl font-semibold tabular-nums">
            <span data-count>00</span>
            <span className="text-dim">/{SKILLS.length}</span>
          </p>
          <p className="mono mt-2 text-mist">Skills unlocked</p>
        </div>

        <div className="relative aspect-square w-[min(70vw,36svh)] shrink-0 [--r:min(70vw,36svh)] md:absolute md:left-1/2 md:top-1/2 md:w-[min(84vw,68vh)] md:-translate-x-1/2 md:-translate-y-1/2 md:[--r:min(84vw,68vh)]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(241,238,230,0.12)" strokeWidth="0.25" strokeDasharray="0.6 1.2" />
            <circle data-arc cx="50" cy="50" r="40" fill="none" stroke="#E9B44C" strokeWidth="0.5" pathLength="1" strokeDasharray="1" />
          </svg>
          <div data-dial className="absolute inset-0">
            {SKILLS.map((s, i) => {
              const a = (i / SKILLS.length) * 360
              return (
                <div
                  key={s}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${a}deg) translateY(calc(var(--r) * -0.4)) rotate(${-a}deg)` }}
                >
                  <div data-node-inner>
                    <div
                      data-node
                      style={{ '--on': 0 }}
                      className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full p-1 md:border md:px-3 md:py-1.5 md:text-sm md:backdrop-blur-md"
                    >
                      <span
                        className="h-2 w-2 rounded-full md:h-1.5 md:w-1.5"
                        style={{ background: 'color-mix(in srgb, #E9B44C calc(var(--on) * 100%), #5D5C66)' }}
                      />
                      <span className="hidden md:inline" style={{ opacity: 'calc(0.4 + var(--on) * 0.6)' }}>{s}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="mono text-mist">You</p>
            <p className="display gold-text text-5xl font-bold md:text-8xl">360°</p>
          </div>
        </div>

        {/* mobile: skills as chips that light up */}
        <ul className="flex max-w-sm flex-wrap justify-center gap-1.5 md:hidden">
          {SKILLS.map((s) => (
            <li
              key={s}
              data-node
              style={{
                '--on': 0,
                borderColor: 'color-mix(in srgb, #E9B44C calc(var(--on) * 70%), rgba(255,255,255,0.12))',
                opacity: 'calc(0.45 + var(--on) * 0.55)',
              }}
              className="rounded-full border px-3 py-1.5 text-[0.78rem]"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mono text-mist md:hidden">
          <span data-count className="text-ivory">00</span>/{SKILLS.length} skills unlocked
        </p>
      </div>
    </section>
  )
}

/* ───────────────────────── NO SOFTWARE ───────────────────────── */
function NoSoftware() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-swap]').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 78%' } })
        tl.fromTo(row.querySelector('[data-strike]'), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' })
          .to(row.querySelector('[data-old]'), { opacity: 0.45, duration: 0.4 }, '<0.3')
          .fromTo(row.querySelector('[data-new]'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' }, '-=0.1')
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} data-gl="4,0,0,1.7,0.3" className="relative px-5 py-36 md:px-10 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="mono text-gold" data-scramble>No software. Just AI.</p>
            <h2 data-split className="display mt-6 text-5xl font-semibold uppercase md:text-7xl">Zero tools to master.</h2>
            <p data-fade className="mt-8 max-w-sm text-lg text-ivory/65">
              Skip years of software courses. AI does the heavy lifting — you make the calls.
            </p>
          </div>
          <ul className="border-t border-white/10">
            {SWAPS.map(([what, old, now]) => (
              <li key={what} data-swap className="grid grid-cols-1 gap-1 border-b border-white/10 py-6 sm:grid-cols-[9rem_1fr_1fr] sm:items-center sm:gap-6">
                <span className="mono text-mist">{what}</span>
                <span className="relative w-fit text-lg text-ivory/80">
                  <span data-old>{old}</span>
                  <span data-strike className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-ember" />
                </span>
                <span data-new className="flex items-center gap-2 text-lg font-medium text-gold">
                  <span aria-hidden="true">↳</span> {now}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── BUSINESS (horizontal) ───────────────────────── */
function Business() {
  const ref = useRef(null)
  const track = useRef(null)
  const stageNo = useRef(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(track.current, {
        x: () => -(track.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set('[data-progress]', { scaleX: self.progress })
            if (stageNo.current) stageNo.current.textContent = '0' + Math.min(5, Math.max(1, Math.ceil(self.progress * 5.6)))
          },
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} id="business" className="relative lg:h-[420vh]">
      <div data-gl="5,2.6,-0.2,0.95,0.9" className="lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden">
        <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row lg:items-center">
          <div className="flex shrink-0 flex-col justify-center px-5 py-28 md:px-10 lg:w-[62vw] lg:py-0 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            <p className="mono text-gold">The big one</p>
            <h2 className="display mt-6 text-5xl font-semibold uppercase leading-[0.92] md:text-[6.2rem]">
              Every student <span className="gold-text">starts a business.</span>
            </h2>
            <p className="serif mt-8 max-w-md text-3xl text-ivory/80">Not a project. A real one — that you run and scale.</p>
          </div>
          {STAGES.map(([t, d], i) => (
            <div key={t} className="flex shrink-0 items-center px-5 pb-6 md:px-10 lg:h-full lg:w-[34vw] lg:px-6 lg:pb-0">
              <div className="hud relative flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.025] p-8 lg:h-[56vh]">
                <span className="display text-8xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(233,180,76,0.6)] lg:text-[9rem]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="display text-4xl font-semibold uppercase">{t}</h3>
                  <p className="mt-3 text-lg text-ivory/65">{d}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="hidden shrink-0 lg:block lg:w-[18vw]" />
        </div>
        <div className="absolute inset-x-10 bottom-10 hidden items-center gap-6 lg:flex">
          <span className="mono text-mist">Stage <span ref={stageNo} className="text-ivory">01</span>/05</span>
          <span className="h-px flex-1 bg-white/10">
            <span data-progress className="block h-px origin-left scale-x-0 bg-gold" />
          </span>
          <span className="mono text-mist">Run it. Scale it.</span>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── TWO PATHS ───────────────────────── */
function Paths() {
  const doors = [
    { k: 'The job', h: 'Become the hire every company fights over.', i: '↗' },
    { k: 'The business', h: 'Walk out with a business that’s already running.', i: '◎' },
  ]
  return (
    <section id="paths" data-gl="5,0,-0.6,1.2,0.3" className="relative px-5 py-36 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-gold" data-scramble>Built for anyone ambitious</p>
        <h2 data-split className="display mt-6 text-5xl font-semibold uppercase md:text-7xl">Two doors. One outcome.</h2>
        <div className="mt-14 flex flex-col gap-4 md:flex-row">
          {doors.map((d, i) => (
            <Link
              key={d.k}
              to="/masterclass"
              data-fade={i * 0.1}
             
              className="group glass hud relative flex min-h-[19rem] flex-1 flex-col md:min-h-[26rem] justify-between overflow-hidden rounded-3xl p-8 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:flex-[1.5] md:p-12"
            >
              <span className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/25" />
              <div className="flex items-start justify-between">
                <span className="mono text-mist">Door 0{i + 1}</span>
                <span className="display text-5xl text-gold transition-transform duration-700 group-hover:rotate-45">{d.i}</span>
              </div>
              <div>
                <h3 className="display text-4xl font-semibold uppercase md:text-6xl">{d.k}</h3>
                <p className="serif mt-4 max-w-md text-2xl text-ivory/80 md:text-3xl">{d.h}</p>
                <p className="mono mt-8 flex items-center gap-3 text-gold">
                  <span className="h-px w-8 bg-gold transition-all duration-700 group-hover:w-20" /> 360° operator
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── CTA ───────────────────────── */
function MasterclassCTA() {
  const when = useMemo(() => nextSession(), [])
  const f = formatSession(when)
  return (
    <section data-gl="6,0,0,1,1" className="relative flex min-h-[100svh] items-center px-5 py-32 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div data-fade className="flex flex-wrap justify-center gap-2">
          {['Free', 'Live', `${MASTERCLASS.durationMin} min`].map((t) => (
            <span key={t} className="mono rounded-full border border-gold/40 px-4 py-2 text-gold">{t}</span>
          ))}
        </div>
        <h2 data-split className="display mt-10 text-5xl font-semibold uppercase md:text-[7rem]">
          One hour. The whole map.
        </h2>
        <p data-fade className="serif mt-8 max-w-xl text-2xl text-ivory/80 md:text-3xl">
          Leadership, marketing, AI — and how you’ll launch your own business. Live.
        </p>
        <p data-fade className="mono mt-10 text-mist">{f.day} · {f.date} · {f.time}</p>
        <div data-fade className="mt-6"><Countdown target={when} /></div>
        <div data-fade className="mt-12">
          <Magnetic>
            <Link to="/masterclass" className="btn btn-gold !px-9 !py-5 !text-sm">
              Reserve my free seat <Arrow />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

export default function Home({ ready }) {
  const scope = useRef(null)
  usePageMotion(scope)
  return (
    <div ref={scope}>
      <Hero ready={ready} />
      <SkillMarquee />
      <Manifesto />
      <Pillars />
      <Operator />
      <NoSoftware />
      <Business />
      <Paths />
      <MasterclassCTA />
    </div>
  )
}
