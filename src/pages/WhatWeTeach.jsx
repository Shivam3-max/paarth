import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, CTABand } from '../components/Shared.jsx'

const pillars = [
  {
    num: 'I',
    title: 'Marketing',
    copy: 'Learn how attention is earned, trust is built, and growth is created through strategy, positioning, communication, and digital execution.',
    to: '/marketing',
    count: '7 study clusters',
    areas: ['Consumer psychology & positioning', 'Brand building', 'Content & social media', 'Performance marketing & paid media', 'Funnels & conversion', 'SEO & organic growth', 'Personal branding & analytics'],
  },
  {
    num: 'II',
    title: 'AI',
    copy: 'Learn how to use AI for research, content, websites, automation, productivity, and digital leverage — with context and judgment.',
    to: '/ai',
    count: '6 study clusters',
    areas: ['AI foundations & prompting', 'AI for research & thinking', 'AI for content & creative', 'AI for websites & digital assets', 'AI automation & agents', 'AI for business operations'],
  },
  {
    num: 'III',
    title: 'Business Leadership',
    copy: 'Learn how businesses are sold, managed, systemized, communicated, and scaled through better leadership, execution, finance, and operational thinking.',
    to: '/business-leadership',
    count: '10 capability areas',
    areas: ['Entrepreneurial foundations', 'Market research & product thinking', 'Strategy & competitive advantage', 'Communication & influence', 'Sales & negotiation', 'Customer experience & retention', 'Hiring & people systems', 'Productivity & execution', 'Operations, systems & scale', 'Business finance'],
  },
]

export default function WhatWeTeach() {
  return (
    <>
      <PageHero
        eyebrow="What We Teach"
        title={<>Three business-critical disciplines. Taught as <em className="serif-i text-brass-deep">one connected capability system.</em></>}
        copy="Paarth brings together Marketing, AI, and Business Leadership because the modern business world increasingly demands people who can understand attention, use AI intelligently, and lead execution with clarity."
        three="dodeca"
        artVariant="arcs"
        artLabel="The three pillars"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.15fr]">
            <SectionHead num="01" eyebrow="Why Together" title="Why these three disciplines belong together" />
            <Reveal delay={140}>
              <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:pt-20">
                <p>In the real world, growth does not happen in silos.</p>
                <p className="font-display text-2xl italic leading-snug text-ink">
                  Marketing affects sales. Sales affects leadership. Leadership affects execution. Execution affects
                  scale. AI now affects all of it.
                </p>
                <p>
                  Treating these areas as separate creates shallow understanding. Paarth brings them together because
                  that is how modern business actually works.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <SectionHead num="02" eyebrow="The Three Pillars" title="What sits inside each pillar" />
          <div className="mt-16 space-y-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link
                  to={p.to}
                  className="group grid gap-8 border hairline bg-paper p-8 transition-colors duration-300 hover:border-brass/50 md:grid-cols-[1.1fr_1.6fr] md:p-12"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-xl italic text-brass">{p.num}</span>
                      <span className="eyebrow">{p.count}</span>
                    </div>
                    <h3 className="mt-4 text-3xl md:text-4xl">{p.title}</h3>
                    <p className="mt-4 leading-relaxed text-ink-soft">{p.copy}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brass-deep">
                      {p.title} at Paarth
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </div>
                  <ul className="grid content-start gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {p.areas.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-ink-soft">
                        <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">The Kind of Person This Is Meant to Build</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-3xl leading-[1.15] md:text-4xl">What all of this is meant to build</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-7 font-display text-xl italic leading-relaxed text-ink-soft md:text-2xl">
                Not just someone who knows marketing. Not just someone who knows AI tools. Not just someone who can
                talk about leadership.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Paarth is designed to build people who can understand markets, communicate value, use AI intelligently,
                sell ideas, manage execution, and contribute meaningfully to growth.
              </p>
            </Reveal>
            <Reveal delay={330}>
              <Link to="/curriculum" className="link-rule mt-9 inline-block text-sm font-semibold tracking-wide text-brass-deep">
                See the full curriculum map →
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="Explore each pillar in more depth."
        buttons={[
          { to: '/marketing', label: 'Marketing at Paarth', variant: 'paper' },
          { to: '/ai', label: 'AI at Paarth', variant: 'outline' },
          { to: '/business-leadership', label: 'Business Leadership', variant: 'outline' },
        ]}
      />
    </>
  )
}
