import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, CTABand } from '../components/Shared.jsx'
import { ScrubLine } from '../motion/Effects.jsx'

const who = [
  { title: 'Students', copy: 'Who want to build real business capability early.' },
  { title: 'Professionals', copy: 'Who want to become more strategic, more AI-enabled, and more valuable.' },
  { title: 'Founders & Business Owners', copy: 'Who want to improve growth, systems, communication, and execution.' },
  { title: 'Marketers, Freelancers & Operators', copy: 'Who want to become sharper, more capable business contributors.' },
]

const steps = [
  { title: 'Submit your application', copy: 'Share a little about who you are, what you’re building toward, and why you want to join Paarth.' },
  { title: 'Review and fit assessment', copy: 'Our team reviews applications to understand intent, fit, and seriousness.' },
  { title: 'Conversation call', copy: 'Selected applicants may be invited for a conversation to discuss goals, expectations, and whether Paarth is the right fit.' },
  { title: 'Offer and onboarding', copy: 'Selected applicants receive next steps for enrollment, onboarding, and cohort access.' },
]

const faqs = [
  { q: 'Is this beginner-friendly?', a: 'Yes. The fellowship starts from fundamentals and builds toward operator-level thinking. What matters is seriousness, not where you start.' },
  { q: 'Is it only for founders?', a: 'No. Students, professionals, marketers, and operators benefit just as much — the capabilities taught apply to careers as well as companies.' },
  { q: 'Will this help working professionals?', a: 'Directly. The marketing, AI, and leadership capabilities are designed to make you more strategic, more AI-enabled, and more valuable in any role.' },
  { q: 'How much time should I expect to commit?', a: 'Enough to apply what you learn each week — live sessions plus implementation exercises. Exact schedules are shared during the admissions conversation.' },
  { q: 'Is it live or self-paced?', a: 'The fellowship is cohort-based and live, supported by frameworks, assignments, and review touchpoints — not a passive content library.' },
  { q: 'Do I need a business idea to join?', a: 'No. You need ambition and willingness to apply the work. The frameworks work on a business, a role, or a personal brand.' },
]

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b hairline">
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brass-deep"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex items-start gap-4 text-lg">
          <span className="font-display text-sm italic leading-7 text-brass">{String(index + 1).padStart(2, '0')}</span>
          {q}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-brass transition-transform duration-500 ${open ? 'rotate-45' : ''}`}
          viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      <div className={`acc-body ${open ? 'open' : ''}`}>
        <div>
          <p className="pb-6 pl-9 pr-10 leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Admissions() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={<>Paarth is built for people who are <em className="serif-i text-brass-deep">serious about growth.</em></>}
        copy="We care less about where someone is starting from and more about whether they are genuinely committed to becoming more capable. Paarth is designed for people who want to think better, execute better, and take their growth seriously."
        three="octa"
        artVariant="contour"
        artLabel="Admissions conversation"
      />

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="01" eyebrow="Who Should Apply" title="Who should apply" />
          <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {who.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="border-l-2 border-brass/40 pl-6">
                  <h3 className="text-xl">{w.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{w.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-20 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
            <SectionHead num="02" eyebrow="A Note on Fit" title="Who Paarth may not be for" />
            <Reveal delay={140}>
              <p className="text-lg leading-relaxed text-ink-soft md:pt-16">
                Paarth may not be the right fit for people who are only looking for passive content, instant
                shortcuts, or a low-engagement learning experience. The people who benefit most are usually the ones
                who are willing to think deeply, reflect honestly, and apply what they learn.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="03" eyebrow="The Admissions Process" title="How admissions work" />
          <div className="mt-14">
            <ScrubLine />
          </div>
          <div className="mt-2 grid gap-px overflow-hidden border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <div className="h-full bg-paper p-8">
                  <span className="eyebrow">Step {i + 1}</span>
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
            <SectionHead num="04" eyebrow="Fees & Support" title="Fees and support" light />
            <Reveal delay={140}>
              <div className="md:pt-16">
                <p className="text-lg leading-relaxed text-paper/70">
                  We want Paarth to be serious, but we also want it to remain accessible to people with strong intent.
                  Where possible, structured payment options and selective merit-based support may be offered.
                </p>
                <p className="mt-6 text-sm text-paper/50">
                  Program fees and payment plans are shared with shortlisted applicants during the admissions
                  conversation.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <SectionHead num="05" eyebrow="FAQ" title="Questions before you apply?" />
            <div className="lg:pt-20">
              <div>
                {faqs.map((f, i) => (
                  <Reveal key={f.q} delay={i * 55}>
                    <FaqItem q={f.q} a={f.a} index={i} />
                  </Reveal>
                ))}
              </div>
              <Reveal delay={200}>
                <p className="mt-8 text-ink-soft">
                  Have a different question? Write to us through the application form — we answer everything during
                  the admissions conversation.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        title="If you’re ready to build real capability, we’d love to hear from you."
        buttons={[
          { to: '/apply', label: 'Apply to Paarth', variant: 'paper' },
          { to: '/program', label: 'View the Flagship Program', variant: 'outline' },
        ]}
      />
    </>
  )
}
