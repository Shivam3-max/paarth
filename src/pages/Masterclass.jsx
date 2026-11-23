import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap, Magnetic, SplitText, reduced, scrollToTarget, usePageMotion } from '../motion/core.jsx'
import Countdown from '../components/Countdown.jsx'
import { LogoMark } from '../components/Logo.jsx'
import { glStore } from '../gl/store.js'
import { FORM_API_URL, MASTERCLASS, formatSession, nextSession } from '../config.js'

const STAGES = ['Student', 'Job seeker', 'Working professional', 'Business owner']
const GOALS = ['A great job', 'My own business', 'Both']

const CHAPTERS = [
  ['00:00', 'The 360° operator', 'Why one person who can do it all wins now.'],
  ['12:00', 'Lead & sell', 'Decisions, communication, closing a deal.'],
  ['25:00', 'AI, live', 'Edit a video. Design a post. Build a CRM. On screen.'],
  ['45:00', 'Your business', 'How every student launches one. Then open Q&A.'],
]

const TAKEAWAYS = [
  ['◎', 'Your 360° skill map', 'Exactly what to learn — and what to skip.'],
  ['↗', 'A business you can start', 'Ideas you can launch with AI and zero team.'],
  ['?', 'Your questions, answered', 'Live, by the host. Nothing scripted.'],
]

const FAQ = [
  ['Is it really free?', 'Yes. No card, no catch. Register and join.'],
  ['Where does it happen?', `${MASTERCLASS.platform}. The joining link is sent after you register.`],
  ['Do I need experience?', 'None. Students, job seekers, professionals and founders are all welcome.'],
  ['Do I need any software?', 'Just a laptop or phone. Everything we show runs on AI tools.'],
  ['Will you sell me something?', 'At the end we’ll tell you about the full Paarth program. Zero pressure.'],
]

const Arrow = () => <span className="arrow inline-block">→</span>

/* ───────────── calendar file ───────────── */
function downloadIcs(when) {
  const end = new Date(when.getTime() + MASTERCLASS.durationMin * 60000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Paarth//Masterclass//EN', 'BEGIN:VEVENT',
    `UID:${Date.now()}@paarth`, `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(when)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${MASTERCLASS.title} — Paarth`,
    `DESCRIPTION:Free live masterclass. The joining link is in your email.`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'paarth-masterclass.ics' })
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/* ───────────── ticket (success) ───────────── */
function Ticket({ name, when }) {
  const ref = useRef(null)
  const f = formatSession(when)
  const seat = useMemo(() => 'PRT-' + Math.random().toString(36).slice(2, 6).toUpperCase(), [])
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { rotateX: -70, y: 60, opacity: 0, duration: 1.4, ease: 'expo.out' })
      gsap.from('[data-tk]', { opacity: 0, y: 14, stagger: 0.07, delay: 0.4, duration: 0.8, ease: 'expo.out' })
    }, ref)
    const onMove = (e) => {
      const r = ref.current.getBoundingClientRect()
      gsap.to(ref.current, {
        rotateY: ((e.clientX - r.left) / r.width - 0.5) * 14,
        rotateX: -((e.clientY - r.top) / r.height - 0.5) * 14,
        duration: 0.6,
        ease: 'power3',
      })
    }
    const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3' })
    const el = ref.current
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', leave)
      ctx.revert()
    }
  }, [])
  const share = `https://wa.me/?text=${encodeURIComponent(`I just reserved a seat for Paarth's free ${MASTERCLASS.title}. Join me: ${window.location.origin}/masterclass`)}`

  return (
    <div className="[perspective:1200px]" role="status">
      <div ref={ref} className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-[#1a1508] via-night to-night [transform-style:preserve-3d]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
        <div className="p-7 md:p-9">
          <div data-tk className="flex items-center justify-between">
            <LogoMark className="h-9 w-9 text-ivory" />
            <span className="mono rounded-full bg-gold px-3 py-1.5 font-bold text-void">Seat confirmed</span>
          </div>
          <p data-tk className="mono mt-8 text-mist">Admit one</p>
          <p data-tk className="display mt-2 text-3xl font-semibold uppercase leading-none md:text-4xl">{name || 'Operator'}</p>
          <p data-tk className="serif mt-3 text-xl text-gold">{MASTERCLASS.title}</p>
        </div>
        <div className="relative flex items-center">
          <span className="absolute -left-3 h-6 w-6 rounded-full bg-void" />
          <span className="mx-6 h-px flex-1 border-t border-dashed border-white/20" />
          <span className="absolute -right-3 h-6 w-6 rounded-full bg-void" />
        </div>
        <div data-tk className="grid grid-cols-3 gap-4 p-7 md:p-9">
          {[['Date', f.date], ['Time', f.time], ['Seat', seat]].map(([k, v]) => (
            <div key={k}>
              <p className="mono !text-[0.55rem] text-mist">{k}</p>
              <p className="mt-1 font-mono text-sm text-ivory">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={() => downloadIcs(when)} className="btn btn-gold">Add to calendar <Arrow /></button>
        <a href={share} target="_blank" rel="noreferrer" className="btn btn-ghost">Invite a friend</a>
      </div>
      <p className="mt-5 text-sm text-ivory/55">The joining link is on its way to your inbox.</p>
    </div>
  )
}

/* ───────────── form ───────────── */
function ReserveForm({ when }) {
  const [state, setState] = useState({ status: 'idle', error: '', name: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (!data.stage) return setState((s) => ({ ...s, error: 'Pick what describes you best.' }))
    setState({ status: 'sending', error: '', name: data.name })
    const payload = { ...data, formType: 'masterclass', session: when.toISOString() }
    try {
      const res = await fetch(FORM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.ok === false) throw new Error(json.message || 'Could not reserve your seat right now.')
      done(data.name)
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[dev] form endpoint unavailable, simulating success:', err.message)
        return done(data.name)
      }
      setState({ status: 'idle', error: err.message || 'Something went wrong. Try again.', name: '' })
    }
  }

  function done(name) {
    gsap.fromTo(glStore, { pulse: 1 }, { pulse: 0, duration: 2.2, ease: 'expo.out' })
    setState({ status: 'done', error: '', name })
  }

  if (state.status === 'done') return <Ticket name={state.name} when={when} />

  return (
    <form onSubmit={onSubmit} className="glass hud relative rounded-3xl p-6 md:p-8" noValidate={false}>
      <div className="flex items-center justify-between">
        <p className="display text-xl font-semibold uppercase">Reserve your seat</p>
        <span className="mono flex items-center gap-2 text-gold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Free
        </span>
      </div>
      <div className="mt-6 space-y-3">
        <label className="block">
          <span className="sr-only">Full name</span>
          <input name="name" required autoComplete="name" placeholder="Full name" className="field" />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Email" className="field" />
        </label>
        <label className="block">
          <span className="sr-only">WhatsApp number</span>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="WhatsApp number" pattern="[0-9+\-\s()]{8,}" className="field" />
        </label>
      </div>
      <fieldset className="mt-6">
        <legend className="mono text-mist">I am a</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <label key={s} className="chip-radio">
              <input type="radio" name="stage" value={s} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <legend className="mono text-mist">I want</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOALS.map((s, i) => (
            <label key={s} className="chip-radio">
              <input type="radio" name="goal" value={s} defaultChecked={i === 2} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state.error && <p className="mt-5 text-sm text-ember" role="alert">{state.error}</p>}
      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="btn btn-gold mt-7 w-full justify-center !py-5 disabled:opacity-60"
       
      >
        {state.status === 'sending' ? 'Locking your seat…' : <>Reserve my free seat <Arrow /></>}
      </button>
      <p className="mt-4 text-center text-xs text-ivory/40">No spam. Just the link and a reminder.</p>
    </form>
  )
}

/* ───────────── hero ───────────── */
function Hero({ ready, when }) {
  const ref = useRef(null)
  const ctxRef = useRef(null)
  const splitRef = useRef(null)
  const f = formatSession(when)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText('[data-mc-title]', { type: 'lines,chars', mask: 'lines' })
      split.chars.forEach((c) => c.parentElement.closest('.gold-text') && c.classList.add('gold-text'))
      splitRef.current = split
      gsap.set(split.chars, { yPercent: 120 })
      gsap.set('[data-mc-in]', { opacity: 0, y: 24 })
    }, ref)
    ctxRef.current = ctx
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ready) return
    ctxRef.current.add(() => {
      gsap.timeline({ delay: 0.15 })
        .to(splitRef.current.chars, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.03 })
        .to('[data-mc-in]', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }, '-=1')
    })
  }, [ready])

  return (
    <section ref={ref} data-gl="6,-1.8,0.4,1.05,0.85" className="relative px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div data-mc-in className="flex flex-wrap gap-2">
            {['Free', MASTERCLASS.platform, `${MASTERCLASS.durationMin} min`].map((t) => (
              <span key={t} className="mono rounded-full border border-gold/40 bg-void/40 px-4 py-2 text-gold">{t}</span>
            ))}
          </div>
          <h1 data-mc-title className="display mt-8 text-[3.4rem] font-semibold uppercase leading-[0.88] md:text-[5.6rem] xl:text-[6.4rem]">
            The <span className="gold-text">360°</span><br />Master<br />class
          </h1>
          <p data-mc-in className="serif mt-7 max-w-lg text-2xl leading-snug text-ivory/85 md:text-3xl">
            One hour. Everything we teach — and how you’ll start your own business.
          </p>
          <div data-mc-in className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[['Day', f.day], ['Date', f.date], ['Time', f.time]].map(([k, v]) => (
              <div key={k}>
                <p className="mono !text-[0.58rem] text-mist">{k}</p>
                <p className="mt-1 text-lg font-medium">{v}</p>
              </div>
            ))}
          </div>
          <div data-mc-in className="mt-8"><Countdown target={when} /></div>
          <div data-mc-in className="mt-10 flex items-center gap-4">
            <img src={MASTERCLASS.host.photo} alt="" className="h-12 w-12 rounded-full object-cover object-[50%_35%] ring-1 ring-gold/50" />
            <p className="text-sm text-ivory/70">
              Hosted by <span className="text-ivory">{MASTERCLASS.host.name}</span>
              <br />
              <span className="mono !text-[0.58rem] text-mist">{MASTERCLASS.host.role}</span>
            </p>
          </div>
        </div>
        <div id="reserve" data-mc-in className="lg:pt-6">
          <ReserveForm when={when} />
        </div>
      </div>
    </section>
  )
}

/* ───────────── 60-minute player ───────────── */
function Player() {
  const ref = useRef(null)
  const clock = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-head]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            end: 'bottom 60%',
            scrub: 0.5,
            onUpdate: (s) => {
              const m = Math.floor(s.progress * 60)
              if (clock.current) clock.current.textContent = `${String(m).padStart(2, '0')}:00`
              ref.current.querySelectorAll('[data-ch]').forEach((el, i) => {
                el.style.opacity = s.progress * 60 >= parseInt(CHAPTERS[i][0]) ? 1 : 0.35
              })
            },
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-gl="4,0,0,1.7,0.3" className="relative px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-gold" data-scramble>Inside the hour</p>
        <h2 data-split className="display mt-6 text-5xl font-semibold uppercase md:text-7xl">60 minutes. Four moves.</h2>
        <div className="glass mt-14 rounded-3xl p-5 md:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-void" aria-hidden="true">▶</span>
            <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
              <div data-head className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-gold to-ember" />
              {CHAPTERS.map(([t]) => (
                <span key={t} className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ivory/40" style={{ left: `${(parseInt(t) / 60) * 100}%` }} />
              ))}
            </div>
            <span className="font-mono text-sm tabular-nums text-ivory/80"><span ref={clock}>00:00</span> / 60:00</span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {CHAPTERS.map(([t, h, d]) => (
              <div key={t} data-ch className="rounded-2xl border border-white/10 p-5 transition-opacity duration-500" style={{ opacity: 0.35 }}>
                <p className="font-mono text-sm text-gold">{t}</p>
                <h3 className="display mt-4 text-xl font-semibold uppercase">{h}</h3>
                <p className="mt-2 text-[0.95rem] text-ivory/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── live AI demo tiles ───────────── */
function DemoTiles() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      // video: playhead sweeps, clips snap together
      gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
        .fromTo('[data-vid-head]', { left: '0%' }, { left: '100%', duration: 3, ease: 'none' })
        .fromTo('[data-clip]', { x: (i) => (i % 2 ? 10 : -10), opacity: 0.4 }, { x: 0, opacity: 1, stagger: 0.25, duration: 0.5, ease: 'back.out(2)' }, 0)
      // design: shapes morph
      gsap.timeline({ repeat: -1, yoyo: true })
        .to('[data-blob-a]', { borderRadius: '50%', rotate: 90, scale: 1.2, duration: 2, ease: 'sine.inOut' })
        .to('[data-blob-b]', { x: -30, y: 20, scale: 0.8, duration: 2, ease: 'sine.inOut' }, 0)
        .fromTo('[data-gen]', { scaleX: 0 }, { scaleX: 1, duration: 4, ease: 'none' }, 0)
      // CRM: rows land, statuses flip
      gsap.timeline({ repeat: -1, repeatDelay: 1 })
        .from('[data-row]', { opacity: 0, x: -16, stagger: 0.3, duration: 0.5, ease: 'expo.out' })
        .to('[data-status]', { backgroundColor: '#E9B44C', color: '#050506', stagger: 0.3, duration: 0.3 }, '+=0.3')
        .to('[data-row]', { opacity: 0, duration: 0.4, delay: 1.2 })
        .set('[data-status]', { clearProps: 'all' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-gl="3,0,0,1.5,0.3" className="relative px-5 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-gold" data-scramble>Live on screen</p>
        <h2 data-split className="display mt-6 max-w-4xl text-5xl font-semibold uppercase md:text-7xl">Watch AI do a team’s work.</h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {/* video */}
          <div data-fade className="glass hud rounded-3xl p-6">
            <p className="mono text-mist">01 · Edit a video</p>
            <div className="mt-6 aspect-video rounded-xl bg-gradient-to-br from-[#2a2010] to-[#0f0f14]">
              <div className="flex h-full items-center justify-center"><span className="text-3xl text-gold/80">▶</span></div>
            </div>
            <div className="relative mt-4 flex h-9 gap-1">
              {[22, 14, 30, 18, 16].map((w, i) => (
                <span key={i} data-clip className={`h-full rounded-md ${i % 2 ? 'bg-volt/50' : 'bg-gold/60'}`} style={{ width: `${w}%` }} />
              ))}
              <span data-vid-head className="absolute -top-1 bottom-[-4px] w-0.5 bg-ember" />
            </div>
          </div>
          {/* design */}
          <div data-fade="0.1" className="glass hud rounded-3xl p-6">
            <p className="mono text-mist">02 · Design a post</p>
            <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-[#15121f]">
              <span data-blob-a className="absolute left-[18%] top-[20%] h-20 w-20 rounded-xl bg-gold/80 blur-[2px]" />
              <span data-blob-b className="absolute right-[15%] top-[30%] h-24 w-24 rounded-full bg-volt/60 blur-md" />
              <span className="display absolute bottom-3 left-4 text-lg font-bold uppercase">Launch day</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="mono !text-[0.55rem] text-mist">Generating</span>
              <span className="h-1 flex-1 rounded-full bg-white/10"><span data-gen className="block h-1 origin-left rounded-full bg-gold" /></span>
            </div>
          </div>
          {/* crm */}
          <div data-fade="0.2" className="glass hud rounded-3xl p-6">
            <p className="mono text-mist">03 · Build a CRM</p>
            <div className="mt-6 space-y-2">
              {['Aarav · Lead', 'Meera · Call booked', 'Kabir · Proposal', 'Riya · Won'].map((r) => (
                <div key={r} data-row className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2.5 text-sm">
                  <span>{r.split(' · ')[0]}</span>
                  <span data-status className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase">{r.split(' · ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── takeaways + host ───────────── */
function Takeaways() {
  return (
    <section data-gl="5,2.4,-0.3,0.9,0.5" className="relative px-5 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-gold" data-scramble>You walk away with</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {TAKEAWAYS.map(([i, h, d], k) => (
            <div key={h} data-fade={k * 0.08} className="bg-void/80 p-8 backdrop-blur-md md:p-10">
              <span className="display text-5xl text-gold">{i}</span>
              <h3 className="display mt-10 text-2xl font-semibold uppercase">{h}</h3>
              <p className="mt-3 text-ivory/65">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-28 grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div data-fade className="group relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30" />
            <img
              src={MASTERCLASS.host.photo}
              alt={`${MASTERCLASS.host.name}, ${MASTERCLASS.host.role}`}
              className="aspect-[4/5] w-full rounded-3xl object-cover object-[50%_30%] grayscale transition duration-700 group-hover:grayscale-0"
              data-parallax="-6"
            />
          </div>
          <div>
            <p className="mono text-gold">Your host</p>
            <h2 data-split className="display mt-6 text-5xl font-semibold uppercase md:text-7xl">{MASTERCLASS.host.name}</h2>
            <p data-fade className="serif mt-5 text-3xl text-ivory/80">{MASTERCLASS.host.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section data-gl="6,0,0,1.4,0.4" className="relative px-5 py-28 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <h2 data-split className="display text-5xl font-semibold uppercase md:text-7xl">Quick answers.</h2>
        <ul className="border-t border-white/10">
          {FAQ.map(([q, a], i) => (
            <li key={q} className="border-b border-white/10">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
              >
                {q}
                <span className={`text-2xl text-gold transition-transform duration-500 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden pb-0 text-ivory/65">
                  <span className="block pb-6">{a}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-28 flex max-w-7xl flex-col items-center text-center">
        <p className="serif text-3xl text-ivory/80 md:text-4xl">Your seat is one click away.</p>
        <div className="mt-8">
          <Magnetic>
            <button onClick={() => scrollToTarget('#reserve')} className="btn btn-gold !px-9 !py-5">
              Reserve my free seat <Arrow />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = document.getElementById('reserve')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className={`fixed inset-x-3 bottom-3 z-[70] transition-transform duration-500 lg:hidden ${show ? 'translate-y-0' : 'translate-y-[150%]'}`}>
      <button onClick={() => scrollToTarget('#reserve')} className="btn btn-gold w-full justify-center !py-4 shadow-[0_10px_40px_rgba(233,180,76,0.35)]">
        Reserve my free seat <Arrow />
      </button>
    </div>
  )
}

export default function Masterclass({ ready }) {
  const scope = useRef(null)
  const when = useMemo(() => nextSession(), [])
  usePageMotion(scope)
  useEffect(() => {
    document.title = `${MASTERCLASS.title} — Free & Live | Paarth`
    return () => { document.title = 'Paarth — Become 360°' }
  }, [])
  return (
    <div ref={scope}>
      <Hero ready={ready} when={when} />
      <Player />
      <DemoTiles />
      <Takeaways />
      <Faq />
      <MobileBar />
    </div>
  )
}
