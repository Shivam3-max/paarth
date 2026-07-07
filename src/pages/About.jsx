import Reveal from '../components/Reveal.jsx'
import { Container, PageHero, SectionHead, NumberedCard, CTABand } from '../components/Shared.jsx'

const beliefs = [
  { title: 'Capability matters more than information.', copy: 'Knowing more does not automatically make someone more useful. Real growth comes from the ability to apply judgment, communicate clearly, and execute consistently.' },
  { title: 'AI is only valuable when applied with business understanding.', copy: 'Tools can accelerate work. They cannot replace strategic thinking, taste, or decision-making.' },
  { title: 'Marketing without understanding people is noise.', copy: 'Real marketing is not just content output. It is the discipline of understanding behavior, shaping perception, and building demand.' },
  { title: 'Leadership is not a title.', copy: 'In business, leadership is the ability to communicate, decide, persuade, prioritize, and move execution forward under pressure.' },
  { title: 'Businesses scale through systems, not effort alone.', copy: 'Growth eventually breaks without process, clarity, ownership, and operational discipline.' },
  { title: 'Education should build confidence through competence.', copy: 'People do not need more empty motivation. They need the kind of learning that makes them more capable in real situations.' },
]

const philosophy = [
  { title: 'Think', copy: 'Understand people, markets, positioning, and business models with more depth.' },
  { title: 'Build', copy: 'Create campaigns, content, offers, websites, systems, and digital assets that support real growth.' },
  { title: 'Lead', copy: 'Communicate clearly, sell convincingly, manage execution, and become someone others can rely on under pressure.' },
  { title: 'Scale', copy: 'Systemize what works, measure what matters, hire better, and build businesses that can grow beyond individual effort.' },
]

const differences = [
  { title: 'Founder-led perspective', copy: 'Built from real entrepreneurial experience, not only curriculum theory.' },
  { title: 'Agency-backed marketing understanding', copy: 'Marketing at Paarth is shaped by execution, strategy, and real business context.' },
  { title: 'AI with practical application', copy: 'AI is taught through real use cases across business, content, research, websites, and workflows.' },
  { title: 'Business leadership beyond soft skills', copy: 'Sales, communication, productivity, systems, hiring, and execution are treated as serious business capabilities.' },
  { title: 'Frameworks over fluff', copy: 'Paarth teaches through repeatable systems, mental models, and applied thinking — not just content consumption.' },
]

const audiences = [
  { title: 'For students', copy: 'Who want real-world business capability, not just academic completion.' },
  { title: 'For professionals', copy: 'Who want to become more valuable, more strategic, and more AI-enabled.' },
  { title: 'For founders and business owners', copy: 'Who want stronger marketing, better sales thinking, clearer systems, and more scalable execution.' },
  { title: 'For marketers, freelancers, and operators', copy: 'Who want to sharpen their craft and grow into larger business roles.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Paarth"
        title={<>Paarth was built for people who want <em className="serif-i text-brass-deep">more than information.</em></>}
        copy="For people who want to think more clearly, communicate more strongly, build more intelligently, and lead with more confidence in the modern business world."
        three="ico"
        artVariant="contour"
        artLabel="Inside Paarth"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.15fr]">
            <SectionHead
              num="01"
              eyebrow="Why Paarth Exists"
              title="Because too many ambitious people are learning the right things in the wrong way."
            />
            <Reveal delay={140}>
              <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:pt-20">
                <p>
                  Marketing is often taught as platform tactics without deeper business thinking. AI is often taught as
                  a list of tools without context or judgment. Leadership is often reduced to inspiration without
                  systems. Business is often explained in theory, far away from the pressure of execution.
                </p>
                <p className="font-display text-2xl italic text-ink">
                  The result is a lot of information, but not enough real capability.
                </p>
                <p>
                  Paarth exists to close that gap — by creating a modern space where marketing, AI, and business
                  leadership are taught in a connected, practical, and serious way.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t hairline bg-cream py-24 md:py-32">
        <Container>
          <SectionHead num="02" eyebrow="What Paarth Believes" title="What we believe" />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 90}>
                <NumberedCard index={i + 1} title={b.title} copy={b.copy} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            num="03"
            eyebrow="The Paarth Philosophy"
            title={<>Think. Build. Lead. <em className="serif-i text-brass-deep">Scale.</em></>}
            copy="Paarth is built around four ideas that sit at the center of modern business capability."
          />
          <div className="mt-16 grid gap-px overflow-hidden border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} className="h-full">
                <div className="h-full bg-paper p-8">
                  <span className="font-display text-4xl italic text-brass/50">{i + 1}</span>
                  <h3 className="mt-4 text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-paper md:py-32">
        <Container>
          <SectionHead
            num="04"
            eyebrow="What Makes Paarth Different"
            title="A different kind of learning environment"
            copy="Paarth is not built around the traditional “institute” model. It is designed as a modern learning space for people who want to build business capability in a way that feels practical, strategic, and relevant to the world they actually work in."
            light
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {differences.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 90}>
                <NumberedCard index={i + 1} title={d.title} copy={d.copy} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            num="05"
            eyebrow="Who Paarth Is Built For"
            title="Who Paarth is built for"
            copy="Paarth is designed for people who are serious about becoming more capable — regardless of whether they are still in college, already working, or building something of their own."
          />
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
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">The Future of Paarth</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-3xl leading-[1.15] md:text-4xl">What Paarth is trying to become</h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">
                Paarth is being built with a long-term ambition: to become one of the most trusted spaces in India for
                modern business capability — a place that helps ambitious people become sharper marketers, more
                thoughtful operators, more AI-enabled professionals, and stronger business leaders.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-10 font-display text-2xl italic md:text-3xl">
                Not just a place to learn.
                <br />
                <span className="text-brass-deep">A place to become more capable.</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="If this sounds like your kind of place, start here."
        buttons={[
          { to: '/program', label: 'Explore the Flagship Program', variant: 'paper' },
          { to: '/apply', label: 'Apply to Paarth', variant: 'outline' },
        ]}
      />
    </>
  )
}
