import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, CTABand, Ph, RotatingBadge } from '../components/Shared.jsx'
import { ScrubText } from '../motion/Text.jsx'

const beliefs = [
  'People grow faster when they are taught how business actually works.',
  'Confidence should come from competence, not only inspiration.',
  'AI should be used to extend human capability, not replace thinking.',
  'Leadership is practical, not abstract.',
  'The earlier people learn to think in systems, the more powerful their growth becomes.',
]

export default function Founder() {
  return (
    <>
      <PageHero
        eyebrow="Founder’s Vision"
        title={<>Why Paarth <em className="serif-i text-brass-deep">was built</em></>}
        copy="Paarth was built from a simple belief: ambitious people should not have to wait years to learn how business, growth, communication, and execution really work."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.15fr]">
            <div>
              <SectionHead num="01" eyebrow="The Story" title="The gap that led to Paarth" />
              <Reveal delay={220}>
                <div className="relative mt-10 max-w-sm">
                  <Ph variant="contour" label="Founder portrait" ratio="aspect-[4/5]" />
                  <RotatingBadge className="absolute -right-8 -top-8 h-20 w-20" />
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:pt-20">
                <p>
                  The journey behind Paarth began early — with a curiosity for business, a willingness to build, and
                  the experience of learning through action rather than waiting for perfect conditions.
                </p>
                <p>
                  Over time, one thing became increasingly clear: many ambitious people were learning fragments of what
                  they needed, but not the full picture. Marketing was separated from business thinking. AI was treated
                  as novelty. Leadership was taught too vaguely. And practical capability was often left to chance.
                </p>
                <p className="font-display text-2xl italic text-ink">Paarth was built as a response to that gap.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
            <SectionHead num="02" eyebrow="The Ambition" title="What Paarth is really trying to do" />
            <Reveal delay={140}>
              <p className="text-lg leading-relaxed text-ink-soft md:pt-16">
                The ambition is not simply to run programs. It is to build a serious space where ambitious people can
                develop the kind of capability that compounds — the ability to understand markets, communicate value,
                use AI intelligently, build systems, and lead execution with clarity.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead num="03" eyebrow="What the Founder Believes" title="A few beliefs that shaped Paarth" />
          <div className="mt-14 max-w-4xl">
            {beliefs.map((b, i) => (
              <div key={b} className="flex items-start gap-6 border-b hairline py-8">
                <span className="pt-2 font-mono text-[0.65rem] font-bold text-brass">{String(i + 1).padStart(2, '0')}</span>
                <ScrubText className="font-display text-2xl leading-snug md:text-[2rem]" text={b} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-paper md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">The Long-Term Vision</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-3xl leading-[1.15] md:text-4xl">What we hope Paarth becomes</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-7 text-lg leading-relaxed text-paper/70">
                A trusted space for builders, marketers, founders, and business leaders who want to become sharper,
                more capable, and more useful in the modern business world.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-10 font-display text-2xl italic md:text-3xl">
                Not a place built around hype.
                <br />
                <span className="text-brass">A place built around depth, capability, and long-term growth.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="If this vision resonates, Paarth may be the right place to begin."
        buttons={[
          { to: '/about', label: 'Explore Paarth', variant: 'paper' },
          { to: '/apply', label: 'Apply Now', variant: 'outline' },
        ]}
      />
    </>
  )
}
