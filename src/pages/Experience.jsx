import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, NumberedCard, CTABand, ListRow } from '../components/Shared.jsx'

const blocks = [
  { title: 'Framework-led learning', copy: 'Concepts are taught as systems, decision-making tools, and practical frameworks that can be applied in work, business, and leadership situations.' },
  { title: 'Business-context learning', copy: 'Ideas are tied back to actual business realities — customers, markets, offers, growth, communication, systems, and scale.' },
  { title: 'Cross-disciplinary thinking', copy: 'Marketing, AI, sales, communication, productivity, and leadership are taught in a connected way because that is how the real world works.' },
  { title: 'Founder-led perspective', copy: 'The learning experience is shaped by entrepreneurial and agency-backed execution, not only classroom theory.' },
  { title: 'Application over passive consumption', copy: 'The emphasis is on understanding, reflection, discussion, and practical implementation — not just watching videos or collecting notes.' },
]

const includes = [
  'Live learning sessions and workshops',
  'Frameworks, playbooks, and business breakdowns',
  'Practical exercises and implementation thinking',
  'Marketing, AI, and leadership assignments',
  'Group discussion and perspective-building',
  'Office hours, review sessions, and mentorship touchpoints',
  'Peer learning and community-based accountability',
]

const optimize = [
  'clearer strategic thinking',
  'stronger communication and persuasion',
  'better marketing judgment',
  'more useful AI application',
  'more structured execution',
  'greater confidence in business situations',
  'deeper understanding of how businesses actually operate and scale',
]

export default function Experience() {
  return (
    <>
      <PageHero
        eyebrow="The Paarth Experience"
        title={<>A learning experience built around <em className="serif-i text-brass-deep">real-world capability</em></>}
        copy="Paarth is designed to move beyond passive learning. The experience combines frameworks, practical business thinking, implementation exercises, discussion, reflection, and applied learning across Marketing, AI, and Business Leadership."
        three="torus"
        artVariant="grid"
        artLabel="Live session"
      />

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            num="01"
            eyebrow="How Learning Works"
            title="How learning works at Paarth"
            copy="The goal is not simply to complete content. The goal is to help people think better, execute better, and build confidence through competence."
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 90}>
                <NumberedCard index={i + 1} title={b.title} copy={b.copy} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <SectionHead
              num="02"
              eyebrow="What the Experience Can Include"
              title="What the Paarth experience is built from"
            />
            <div className="lg:pt-20">
              <ListRow items={includes} columns={1} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-paper md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <SectionHead
              num="03"
              eyebrow="What We Optimize For"
              title={<>Not just completion. <em className="serif-i text-brass">Capability.</em></>}
              copy="Paarth is designed for people who want their learning to translate into stronger thinking, clearer communication, sharper execution, and more useful business judgment."
              light
            />
            <Reveal delay={160}>
              <ul className="space-y-4 lg:pt-20">
                {optimize.map((o) => (
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
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Who Thrives Here</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-3xl leading-[1.15] md:text-4xl">Who tends to thrive inside Paarth</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">
                People who do well at Paarth are usually curious, ambitious, willing to think deeply, and serious about
                becoming more capable. They are not looking for shortcuts. They are looking for a better way to learn
                how business, growth, AI, and leadership really work.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="If that sounds like the kind of space you’ve been looking for, start here."
        buttons={[
          { to: '/program', label: 'Explore the Flagship Program', variant: 'paper' },
          { to: '/apply', label: 'Apply to Paarth', variant: 'outline' },
        ]}
      />
    </>
  )
}
