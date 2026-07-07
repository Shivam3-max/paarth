import Reveal from '../components/Reveal.jsx'
import { Container, Button, PageHero, SectionHead, CTABand, Ph, Ticker } from '../components/Shared.jsx'

const audiences = [
  { title: 'Students', copy: 'Who want practical business capability early, not just academic completion.' },
  { title: 'Professionals', copy: 'Who want to become more strategic, more AI-enabled, and more leadership-ready.' },
  { title: 'Founders & Business Owners', copy: 'Who want better marketing, stronger systems, sharper execution, and more scalable growth.' },
  { title: 'Marketers, Freelancers & Operators', copy: 'Who want to grow beyond isolated execution and become stronger business contributors.' },
]

const modules = [
  { title: 'Module I — Marketing', copy: 'Positioning, messaging, demand generation, content systems, funnels, paid media, SEO, digital marketing, growth thinking, and campaign understanding.' },
  { title: 'Module II — AI', copy: 'AI for research, content, websites, automation, workflow support, digital leverage, productivity, and execution.' },
  { title: 'Module III — Business Leadership', copy: 'Communication, sales, productivity, systems, hiring, performance thinking, business finance, operational clarity, and scale fundamentals.' },
]

const different = [
  'It is built across three connected business disciplines, not one narrow skill.',
  'It is designed around capability, not passive information.',
  'It is shaped by founder-led and execution-backed thinking.',
  'It treats marketing, AI, communication, sales, systems, and leadership as connected business tools.',
  'It is meant to help people become stronger operators, not just certificate holders.',
]

const delivery = [
  'Live sessions and structured workshops',
  'Frameworks and playbooks',
  'Practical exercises and assignments',
  'Discussions and business breakdowns',
  'Implementation-focused learning',
  'Feedback, review, and mentorship touchpoints',
  'Peer learning and accountability',
]

const outcomes = [
  'understand markets and customer behavior',
  'position value more clearly',
  'use AI across research, creation, and workflows',
  'communicate and sell more effectively',
  'think more structurally about execution and systems',
  'understand how businesses grow, operate, and scale',
  'become more capable as a marketer, professional, founder, or operator',
]

const format = [
  { label: 'Duration', value: '12 Weeks' },
  { label: 'Format', value: 'Cohort-based · Live' },
  { label: 'Level', value: 'Foundational to operator level' },
  { label: 'Includes', value: 'Sessions, frameworks, assignments, community, reviews, certificate' },
]

export default function Program() {
  return (
    <>
      <PageHero
        eyebrow="Flagship Program"
        title={<>The Paarth Growth &amp; <em className="serif-i text-brass-deep">Leadership Fellowship</em></>}
        copy="A structured learning experience for people who want to build real capability across Marketing, AI, and Business Leadership. Designed for ambitious students, professionals, founders, and operators, the Paarth Fellowship brings together growth thinking, digital leverage, communication, systems, and leadership into one integrated learning journey."
        three="knot"
        artVariant="arcs"
        artLabel="Fellowship cohort"
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/apply">Apply Now</Button>
          <Button to="/admissions" variant="outline">View Admissions</Button>
        </div>
      </PageHero>

      <Ticker items={['One integrated learning journey.', 'Marketing · AI · Business Leadership.', 'Capability, not passive information.', 'Stronger operators, not certificate holders.']} />

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="01" eyebrow="Who This Is For" title="Who this fellowship is built for" />
          <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="border-l-2 border-brass/40 pl-6">
                  <h3 className="text-xl">{a.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{a.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <SectionHead
            num="02"
            eyebrow="What the Fellowship Covers"
            title="What you will learn"
            copy="The fellowship is designed to build connected capability across three major pillars."
          />
          <div className="mt-16 grid gap-px overflow-hidden border hairline bg-line lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.title} delay={i * 100} className="h-full">
                <div className="h-full bg-paper p-9">
                  <span className="font-display text-4xl italic text-brass/50">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-2xl">{m.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{m.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHead num="03" eyebrow="Why It's Different" title="Why this is not a typical course experience" />
              <ul className="mt-12 space-y-4">
                {different.map((d, i) => (
                  <Reveal key={d} delay={i * 60}>
                    <li className="flex items-start gap-3 border-b hairline pb-4 leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                      {d}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead
                num="04"
                eyebrow="How It Is Taught"
                title="How the fellowship works"
                copy="The Paarth Fellowship is designed as a practical learning journey, not just a content library."
              />
              <ul className="mt-12 space-y-4">
                {delivery.map((d, i) => (
                  <Reveal key={d} delay={i * 60}>
                    <li className="flex items-start gap-3 border-b hairline pb-4 leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                      {d}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* gallery strip */}
      <section className="border-t hairline bg-cream py-16 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal><Ph variant="rays" label="Workshop day" ratio="aspect-[4/3]" /></Reveal>
            <Reveal delay={110}><Ph variant="grid" label="Build sprint" ratio="aspect-[4/3]" className="md:translate-y-6" /></Reveal>
            <Reveal delay={220}><Ph variant="contour" label="Review session" ratio="aspect-[4/3]" /></Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-paper md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <SectionHead
              num="05"
              eyebrow="What You Should Leave With"
              title="What this fellowship is designed to help you build"
              copy="By the end of the fellowship, the goal is that you should be better able to:"
              light
            />
            <Reveal delay={160}>
              <ul className="space-y-4 lg:pt-20">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 border-b border-paper/15 pb-4 leading-relaxed text-paper/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="06" eyebrow="Program Format" title="Program format" />
          <div className="mt-14 grid gap-px overflow-hidden border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {format.map((f, i) => (
              <Reveal key={f.label} delay={i * 80} className="h-full">
                <div className="h-full bg-paper p-8">
                  <p className="eyebrow">{f.label}</p>
                  <p className="mt-4 font-display text-xl leading-snug">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="If you’re serious about building modern business capability, this is where to begin."
        buttons={[
          { to: '/apply', label: 'Apply to the Fellowship', variant: 'paper' },
          { to: '/admissions', label: 'Speak to the Paarth Team', variant: 'outline' },
        ]}
      />
    </>
  )
}
