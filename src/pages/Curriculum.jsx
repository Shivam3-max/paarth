import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, CTABand } from '../components/Shared.jsx'

const loop = [
  { title: 'Framework', copy: 'The model, named and diagrammed.' },
  { title: 'Logic', copy: 'Why it works: the economics and psychology underneath.' },
  { title: 'Case', copy: 'A real business that lived it.' },
  { title: 'Application', copy: 'You run it on your own business or work the same week.' },
]

const map = [
  {
    pillar: 'Marketing',
    to: '/marketing',
    count: '7 clusters',
    items: ['Consumer Psychology & Positioning', 'Brand Building', 'Content & Social Media', 'Performance Marketing & Paid Media', 'Funnels & Conversion', 'SEO & Organic Growth', 'Personal Branding & Marketing Analytics'],
  },
  {
    pillar: 'AI',
    to: '/ai',
    count: '6 clusters',
    items: ['AI Foundations & Prompting', 'AI for Research & Thinking', 'AI for Content & Creative', 'AI for Websites & Digital Assets', 'AI Automation & Agents', 'AI for Business Operations'],
  },
  {
    pillar: 'Business Leadership',
    to: '/business-leadership',
    count: '10 capability areas',
    items: ['Entrepreneurial Foundations', 'Market Research & Product Thinking', 'Strategy & Competitive Advantage', 'Communication & Influence', 'Sales & Negotiation', 'Customer Experience & Retention', 'Hiring & People Systems', 'Productivity & Execution', 'Operations, Systems & Scale', 'Business Finance'],
  },
]

const samples = [
  { title: 'The Validation Litmus Test', copy: 'Will the customer prepay, deposit, sign a letter of intent, or pilot? Demand proof before you build.' },
  { title: 'The Five Buying Roles', copy: 'Initiator, influencer, decider, buyer, consumer — sell to the right person in the room.' },
  { title: 'The Durable Advantage Test', copy: 'Is your advantage valuable, rare, hard to imitate, and organized? If not, it’s temporary.' },
  { title: 'Question-Led Selling', copy: 'Situation, problem, implication, need — questions that sell without pushing.' },
  { title: 'The Meeting ROI Rule', copy: 'Every meeting has a payroll cost. Make it return more than it burns.' },
  { title: 'The Six-Step SOP Method', copy: 'Turn frequent crises into documented, delegated process.' },
  { title: 'The Delegation Ladder', copy: 'I do, you see → you do, I see → you do, report → you scale it to your team.' },
  { title: 'The Cash Conversion Lens', copy: 'Profit is opinion, cash is fact. Manage the working-capital cycle first.' },
  { title: 'The Content System Checklist', copy: 'A repeatable checklist that turns content from luck into system.' },
  { title: 'The Acquisition-Cost Reducer', copy: 'Systematic levers to cut customer acquisition cost without cutting growth.' },
]

export default function Curriculum() {
  return (
    <>
      <PageHero
        eyebrow="The Paarth Curriculum"
        title={<>50+ frameworks. 23 study clusters. <em className="serif-i text-brass-deep">One connected capability system.</em></>}
        copy="The Paarth curriculum is not a playlist of videos. It is a structured framework library — built from real business execution — spanning marketing, AI, and business leadership. Every framework is named, teachable, and designed to be applied under pressure."
        three="dodeca"
        artVariant="grid"
        artLabel="The framework library"
      />

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            num="01"
            eyebrow="How the Curriculum Is Built"
            title="Frameworks, not folklore"
            copy="Every topic at Paarth is taught the same way: a named framework, the business logic behind it, a real case, and an application exercise. You don’t leave with notes. You leave with a system you can run — in your job, your practice, or your company."
          />
          <div className="mt-16 grid gap-px overflow-hidden border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {loop.map((l, i) => (
              <Reveal key={l.title} delay={i * 90} className="h-full">
                <div className="h-full bg-paper p-8">
                  <span className="font-display text-4xl italic text-brass/50">{i + 1}</span>
                  <h3 className="mt-4 text-xl">{l.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{l.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <SectionHead num="02" eyebrow="The Curriculum Map" title="The full map" />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {map.map((m, i) => (
              <Reveal key={m.pillar} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col border hairline bg-paper p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl">{m.pillar}</h3>
                    <span className="eyebrow whitespace-nowrap">{m.count}</span>
                  </div>
                  <ol className="mt-6 flex-1 space-y-2.5">
                    {m.items.map((item, j) => (
                      <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-snug text-ink-soft">
                        <span className="font-display text-xs italic text-brass">{String(j + 1).padStart(2, '0')}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                  <Link to={m.to} className="link-rule mt-7 inline-block text-sm font-semibold tracking-wide text-brass-deep">
                    Explore {m.pillar} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="03" eyebrow="Proof of Depth" title="A few of the frameworks you will learn to run" />
          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {samples.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80}>
                <div className="border-t hairline pt-5">
                  <h3 className="text-lg font-medium">
                    <span className="font-display italic text-brass">{String(i + 1).padStart(2, '0')} </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-12 font-display text-lg italic text-ink-soft">
              The full framework library is shared with admitted fellows.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Who This Depth Is For</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-3xl leading-[1.15] md:text-4xl">Built for people who want the full picture</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">
                Most programs teach one lane — ads, or prompts, or “mindset.” Paarth teaches the connected system,
                because in the real world marketing decisions are finance decisions, sales conversations are
                communication problems, and AI touches all of it.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="See how the curriculum comes together in the flagship fellowship."
        buttons={[
          { to: '/program', label: 'Explore the Flagship Program', variant: 'paper' },
          { to: '/apply', label: 'Apply to Paarth', variant: 'outline' },
        ]}
      />
    </>
  )
}
