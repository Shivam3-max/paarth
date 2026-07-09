import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/Reveal.jsx'
import {
  Container, Button, SectionHead, NumberedCard, CTABand, ListRow,
  Ph, RotatingBadge, Stat, Ticker,
} from '../components/Shared.jsx'
import { Words, ScrubText, Decode } from '../motion/Text.jsx'
import { Parallax } from '../motion/Effects.jsx'
import { Gyro, Cube, Deck } from '../motion/Object3D.jsx'
import Constellation from '../motion/Constellation.jsx'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  { title: 'Think Clearly', copy: 'Understand customers, markets, business models, and strategic positioning.' },
  { title: 'Build Better', copy: 'Create campaigns, websites, content systems, offers, and AI workflows that actually support growth.' },
  { title: 'Lead Execution', copy: 'Improve communication, sales ability, productivity, accountability, and day-to-day decision-making.' },
  { title: 'Scale with Systems', copy: 'Learn SOPs, dashboards, hiring systems, management rhythms, and the operational thinking that businesses need to grow.' },
]

const audiences = [
  { title: 'Students', copy: 'For students who want more than a degree and want to build practical business capability early.' },
  { title: 'Working Professionals', copy: 'For professionals who want to become more valuable, more AI-enabled, and more leadership-ready.' },
  { title: 'Founders & Business Owners', copy: 'For people who want better marketing, sharper systems, stronger sales, and more scalable businesses.' },
  { title: 'Agency Builders & Operators', copy: 'For people who want to grow as marketers, consultants, operators, and modern business builders.' },
]

const pillars = [
  {
    num: '01',
    title: 'Marketing',
    lead: 'Learn how attention is earned, demand is created, and growth is turned into revenue.',
    copy: 'Brand strategy, content systems, funnels, paid media, consumer psychology, SEO, analytics — taught as business capability, not platform activity.',
    to: '/marketing',
    variant: 'rays',
  },
  {
    num: '02',
    title: 'AI',
    lead: 'Use AI to think faster, build faster, create better, and remove repetitive work.',
    copy: 'Research, content creation, website building, automation, and digital execution — AI at Paarth is taught as leverage, not hype.',
    to: '/ai',
    variant: 'grid',
  },
  {
    num: '03',
    title: 'Business Leadership',
    lead: 'Learn how businesses are communicated, sold, managed, systemized, and scaled.',
    copy: 'Sales, communication, hiring, finance, SOPs, performance systems, and scale — taught as practical, learnable capabilities.',
    to: '/business-leadership',
    variant: 'arcs',
  },
]

const differences = [
  { title: 'Founder-led, not template-led', copy: 'Shaped by real entrepreneurial and agency experience — built by someone who had to learn by doing and build in the real world.' },
  { title: 'Marketing beyond surface tactics', copy: 'Not just content calendars and ad dashboards. People, demand, messaging, trust, and the mechanics of growth.' },
  { title: 'AI as leverage, not noise', copy: 'No random tool collections. No shallow prompt tricks. Only where AI actually makes work faster and better.' },
  { title: 'Leadership as a practical skill', copy: 'Communication, persuasion, sales, hiring, systems, and execution — treated as real business capabilities, not vague “soft skills.”' },
  { title: 'Framework-driven learning', copy: 'You leave with frameworks, mental models, and systems you can apply under pressure — not just ideas you remember.' },
  { title: 'Built for the real world', copy: 'Designed to make you more useful in actual work, business, and leadership contexts — not just complete another course.' },
]

const outcomes = [
  'understand markets and customer behavior with more clarity',
  'position products, services, or personal brands more effectively',
  'use AI for research, content, websites, and workflows',
  'communicate ideas with more conviction',
  'sell products, services, and ideas more effectively',
  'think in systems instead of isolated tasks',
  'manage execution and productivity more intentionally',
  'understand how businesses grow, hire, operate, and scale',
]

const hooks = [
  'The market has changed. Most education hasn’t.',
  'Capability matters more than information.',
  'Learn how business actually works.',
  'Use AI with judgment, not just curiosity.',
  'Marketing is more than content. Leadership is more than confidence.',
  'Build attention. Use leverage. Lead execution.',
]

function HorizontalPillars() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const amount = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => '+=' + amount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* desktop: pinned horizontal scroll */}
      <div ref={wrapRef} className="hidden lg:block">
        <div ref={trackRef} className="flex h-screen w-max items-stretch">
          {/* intro panel */}
          <div className="relative flex w-[44vw] shrink-0 flex-col justify-center border-r border-paper/10 px-16">
            <Gyro size={170} light className="absolute right-10 top-14 opacity-70" />
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-brass" aria-hidden="true" />
              <Decode text="The Three Learning Pillars" /> <span className="text-paper/40">[ 04 ]</span>
            </p>
            <h2 className="mt-7 text-5xl leading-[1.08] text-paper">
              <Words>Three disciplines. One operating advantage.</Words>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/60">
              Paarth brings together three areas that increasingly define modern business relevance — taught in a
              connected, practical way.
            </p>
            <p className="mt-12 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-paper/40">
              Keep scrolling
              <svg className="h-3.5 w-3.5 text-brass" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </p>
          </div>
          {pillars.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              data-cursor="Enter"
              className="group relative flex w-[58vw] shrink-0 flex-col justify-between border-r border-paper/10 px-16 py-20 transition-colors duration-500 hover:bg-[#201d15]"
            >
              <span className="absolute left-6 top-6 h-3 w-3 border-l border-t border-paper/30" aria-hidden="true" />
              <span className="absolute right-6 top-6 h-3 w-3 border-r border-t border-paper/30" aria-hidden="true" />
              <span className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-paper/30" aria-hidden="true" />
              <span className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-paper/30" aria-hidden="true" />
              <p className="absolute right-10 top-8 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-paper/40">
                Sector 04.{p.num} / Capability grid
              </p>
              <div className="flex items-start justify-between gap-8">
                <span className="watermark-num text-[9rem] leading-none" style={{ WebkitTextStroke: '1px rgba(251,249,244,0.3)' }}>
                  {p.num}
                </span>
                <div className="relative w-56 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                  <Ph variant={p.variant} label={p.title} ratio="aspect-square" />
                  {p.num === '01' && <Cube size={52} light className="absolute -bottom-7 -left-7" />}
                  {p.num === '02' && <Gyro size={80} light className="absolute -bottom-9 -left-9" />}
                  {p.num === '03' && <Deck size={72} className="absolute -bottom-8 -left-8" />}
                </div>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brass">Pillar {p.num} / 03</p>
                <h3 className="mt-4 text-5xl text-paper transition-transform duration-500 group-hover:translate-x-2">{p.title}</h3>
                <p className="mt-5 max-w-lg font-display text-xl italic leading-snug text-brass">{p.lead}</p>
                <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-paper/60">{p.copy}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-paper/70 transition-colors duration-300 group-hover:text-brass">
                  Explore {p.title}
                  <svg className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* mobile: stacked */}
      <Container className="py-24 lg:hidden">
        <SectionHead num="04" eyebrow="The Three Learning Pillars" title="Three disciplines. One operating advantage." light />
        <div className="mt-12 space-y-10">
          {pillars.map((p) => (
            <Reveal key={p.title}>
              <Link to={p.to} className="block border-t border-paper/15 pt-8">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brass">Pillar {p.num} / 03</p>
                <h3 className="mt-3 text-3xl text-paper">{p.title}</h3>
                <p className="mt-3 font-display italic leading-snug text-brass">{p.lead}</p>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-paper/60">{p.copy}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <header className="relative overflow-hidden border-b hairline">
        <Constellation density={60} className="absolute inset-0 opacity-80 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
        <div className="bg-dots pointer-events-none absolute left-0 top-24 h-96 w-72 opacity-60 [mask-image:linear-gradient(to_right,black,transparent)]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(154,123,45,0.16) 0%, rgba(154,123,45,0) 66%)'
          }}
          aria-hidden="true"
        />
        <Container className="relative pb-12 pt-32 md:pb-16 md:pt-40 lg:pb-6 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.34fr_0.66fr] lg:gap-10">
            <div>
              <Reveal>
                <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-ink-soft/70">
                  <span className="inline-flex items-center gap-2 border hairline bg-paper/70 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass" aria-hidden="true" />
                    Systems online — Marketing / AI / Leadership
                  </span>
                  <span>[ Cohort 01 — Enrolling ]</span>
                  <span className="hidden md:inline">SR. PA-2026-IN-001</span>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <p className="eyebrow flex items-center gap-3">
                  <span className="rule-grow inline-block h-px w-10 bg-brass" aria-hidden="true" />
                  Paarth — The Space for Builders, Marketers &amp; Business Leaders
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-6 max-w-xs sm:max-w-sm lg:hidden">
                <Ph variant="arcs" label="Cohort in session" ratio="aspect-[16/10]" />
              </Reveal>
              <h1 className="mt-5 text-[clamp(1.7rem,9.5vw,2.6rem)] leading-[1.04] md:text-[clamp(2.55rem,4.35vw,3.45rem)] lg:max-w-[760px]">
                <Words>
                  Not everyone needs another course. Some need a place{' '}
                  <em className="serif-i text-brass-deep">that changes how they operate.</em>
                </Words>
              </h1>
              <Reveal delay={420}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                  Paarth is a modern space for ambitious students, professionals, founders, and operators who want
                  more than information — marketing, AI, and business leadership, taught the way the real world works.
                </p>
              </Reveal>
              <Reveal delay={520}>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button to="/program">View the Flagship Program</Button>
                  <Button to="/about" variant="outline">Explore Paarth</Button>
                </div>
              </Reveal>
            </div>

            {/* hero art composition */}
            <Reveal delay={300} className="relative hidden lg:block">
              <Parallax speed={7} className="relative">
                <Ph variant="arcs" label="Cohort in session" ratio="aspect-[4/5]" className="ml-auto w-[78%] max-w-[310px]" />
                <div className="float-y absolute -bottom-4 right-0 w-[44%] max-w-[160px] shadow-[0_40px_80px_-40px_rgba(23,21,15,0.4)]">
                  <Ph variant="grid" label="Founder-led workshop" ratio="aspect-square" />
                </div>
                <RotatingBadge className="absolute left-0 top-0 h-16 w-16" />
                <div className="absolute left-0 bottom-12 border hairline bg-paper/90 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-2xl">
                    50<span className="serif-i text-brass">+</span>
                  </p>
                  <p className="mt-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-ink-soft">
                    Named frameworks
                  </p>
                </div>
              </Parallax>
            </Reveal>
          </div>

          {/* stats bar */}
          <Reveal delay={200}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t hairline pt-7 md:grid-cols-4 lg:mt-8 lg:gap-8 lg:pt-5">
              <Stat value={3} label="Connected disciplines" />
              <Stat value={23} label="Study clusters" />
              <Stat value={50} suffix="+" label="Named frameworks" />
              <Stat value={1} label="Integrated fellowship" />
            </div>
          </Reveal>
          <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex" aria-hidden="true">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft/70">Scroll</span>
            <span className="relative h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollhint_1.6s_ease-in-out_infinite] bg-brass" />
            </span>
          </div>
        </Container>
      </header>

      <Ticker items={hooks} />

      {/* ============ WHY PAARTH EXISTS ============ */}
      <section className="relative py-24 md:py-36">
        <Gyro size={130} className="absolute right-[8%] top-16 hidden opacity-80 lg:block" />
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.15fr]">
            <SectionHead num="01" eyebrow="Why Paarth Exists" title="The market has changed. Most education hasn’t." />
            <div className="space-y-8 md:pt-24">
              <ScrubText
                className="text-lg leading-relaxed text-ink"
                text="Marketing is often taught as platform tactics. AI is often taught as a list of tools. Leadership is often reduced to motivation. Business is often explained in theory, far away from the pressure of execution."
              />
              <ScrubText
                className="font-display text-[1.8rem] italic leading-snug text-ink md:text-[2.1rem]"
                text="But the real world doesn’t work in silos."
              />
              <ScrubText
                className="text-lg leading-relaxed text-ink"
                text="Today, the people who create disproportionate value are the ones who can understand markets, communicate clearly, use AI as leverage, build systems, and lead execution. Paarth was built around that reality."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ WHAT PAARTH REALLY IS ============ */}
      <section className="relative border-t hairline bg-cream py-24 md:py-36">
        <Cube size={56} className="absolute right-[10%] top-20 hidden lg:block" />
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHead
                num="02"
                eyebrow="What Paarth Really Is"
                title="Not a traditional institute. A modern space for business capability."
                copy="We don’t just teach how to run ads, use prompts, or “be confident.” Paarth is designed to build stronger operators."
              />
              <Reveal delay={240}>
                <div className="mt-10">
                  <Ph variant="contour" label="The Paarth space" ratio="aspect-[16/10]" />
                </div>
              </Reveal>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:pt-10">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <NumberedCard index={i + 1} title={c.title} copy={c.copy} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="relative py-24 md:py-36">
        <Deck size={100} className="absolute right-[9%] top-24 hidden lg:block" />
        <Container>
          <SectionHead
            num="03"
            eyebrow="Who Paarth Is For"
            title="Built for ambitious people at different stages of growth"
            copy="Whether you’re just starting out or already building something of your own."
          />
          <div className="mt-16 grid gap-px overflow-hidden border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="h-full">
                <div className="group h-full bg-paper p-8 transition-colors duration-500 hover:bg-cream">
                  <span className="font-display text-3xl italic text-brass/40 transition-colors duration-500 group-hover:text-brass">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-14 text-xl leading-snug">{a.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">{a.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ THREE PILLARS — pinned horizontal ============ */}
      <HorizontalPillars />

      {/* ============ WHY DIFFERENT ============ */}
      <section className="relative py-24 md:py-36">
        <Cube size={48} className="absolute left-[6%] top-24 hidden opacity-70 lg:block" />
        <Container>
          <SectionHead num="05" eyebrow="Why Paarth Is Different" title="Why Paarth is built differently" />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {differences.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 90} className="h-full">
                <NumberedCard index={i + 1} title={d.title} copy={d.copy} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Ticker items={['Not just a course. A more serious way to grow.', 'A place to think better, build better, and lead with more clarity.', 'Frameworks over fluff.', 'Confidence through competence.']} dark />

      {/* ============ OUTCOMES ============ */}
      <section className="border-t hairline bg-cream py-24 md:py-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHead
                num="06"
                eyebrow="What Paarth Should Change for You"
                title="Not just to know more. To operate differently."
                copy="By the end of a serious Paarth learning experience, you should leave with the ability to:"
              />
              <Reveal delay={260}>
                <div className="mt-10">
                  <Ph variant="rays" label="Applied learning" ratio="aspect-[16/10]" />
                </div>
              </Reveal>
            </div>
            <div className="relative lg:pt-24">
              <Gyro size={110} className="absolute -top-2 right-0 hidden opacity-80 lg:block" />
              <ListRow items={outcomes} columns={1} />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ FLAGSHIP ============ */}
      <section className="py-24 md:py-36">
        <Container>
          <Reveal>
            <div className="hover-lift relative overflow-hidden border hairline bg-paper">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                <div className="px-8 py-14 md:px-16 md:py-20">
                  <p className="eyebrow flex items-center gap-3">
                    <span className="inline-block h-px w-10 bg-brass" aria-hidden="true" />
                    The Flagship Experience
                  </p>
                  <h2 className="mt-6 max-w-2xl text-3xl leading-[1.1] md:text-5xl">
                    The Paarth Growth &amp; <em className="serif-i text-brass-deep">Leadership Fellowship</em>
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                    A structured, practical, and serious entry into modern business capability — Marketing, AI, and
                    Business Leadership brought together in one integrated program.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button to="/program">Explore the Program</Button>
                    <Button to="/admissions" variant="outline">View Admissions</Button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <Ph variant="arcs" label="Fellowship cohort" ratio="h-full" className="absolute inset-0" />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ FOUNDER TEASER ============ */}
      <section className="border-t hairline py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <Reveal>
              <div className="relative">
                <Ph variant="contour" label="Founder portrait" ratio="aspect-[4/5]" />
                <RotatingBadge className="absolute -right-8 -top-8 h-20 w-20" />
              </div>
            </Reveal>
            <div>
              <SectionHead num="07" eyebrow="Founder Teaser" title="Built by someone who learned business by building it" />
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  Paarth comes from a simple belief: ambitious people should not have to wait years to learn how
                  business really works. After starting early, learning through execution, and seeing the gap between
                  theory and reality, the vision became clear — create a place where practical business capability is
                  taught with seriousness.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link to="/founder" className="link-rule mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brass-deep">
                  Read the Founder’s Vision
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        title="If you’re serious about becoming more capable, start here."
        copy="Paarth is for people who want more than information. If you want to think better, build better, and lead with more clarity in the modern business world, this is where to begin."
        buttons={[
          { to: '/apply', label: 'Apply to Paarth', variant: 'paper' },
          { to: '/admissions', label: 'View Admissions', variant: 'outline' },
        ]}
      />
    </>
  )
}
