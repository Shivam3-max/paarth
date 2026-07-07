import Reveal from './Reveal.jsx'
import { Container, PageHero, SectionHead, CTABand, ListRow, Ph, Ticker } from './Shared.jsx'
import { Tilt } from '../motion/Effects.jsx'
import { Gyro, Cube, Deck } from '../motion/Object3D.jsx'

export default function PillarPage({
  eyebrow,
  heroTitle,
  heroCopy,
  artVariant = 'arcs',
  artLabel,
  three = 'octa',
  tickerItems,
  meaningTitle,
  meaningCopy,
  clustersEyebrow,
  clustersTitle,
  clusters,
  differentTitle,
  differentCopy,
  differentPoints,
  outcomes,
  outcomesArtLabel = 'In the classroom',
  ctaTitle,
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={heroTitle} copy={heroCopy} artVariant={artVariant} artLabel={artLabel} three={three} />

      {tickerItems && <Ticker items={tickerItems} />}

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.15fr]">
            <SectionHead num="01" eyebrow="The Paarth Approach" title={meaningTitle} />
            <Reveal delay={160}>
              <p className="text-lg leading-relaxed text-ink-soft md:pt-24">{meaningCopy}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative border-t hairline bg-cream py-24 md:py-36">
        <Cube size={54} className="absolute right-[8%] top-20 hidden lg:block" />
        <Container>
          <SectionHead num="02" eyebrow={clustersEyebrow} title={clustersTitle} />
          <div className="mt-16 space-y-6">
            {clusters.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 60, 240)}>
                <Tilt max={2.5}>
                <div className="group relative grid gap-6 overflow-hidden border hairline bg-paper p-8 transition-colors duration-400 hover:border-brass/60 md:grid-cols-[4rem_1.05fr_1.4fr] md:gap-10 md:p-10">
                  <span className="watermark-num text-5xl md:text-6xl">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{c.copy}</p>
                  </div>
                  <div className="md:border-l md:hairline md:pl-10">
                    <p className="eyebrow">Topics include</p>
                    <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {c.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-ink-soft">
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="absolute right-0 top-0 h-0 w-[2px] bg-brass transition-all duration-700 group-hover:h-full" aria-hidden="true" />
                </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-36">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            {[...Array(9)].map((_, i) => (
              <circle key={i} cx="1200" cy="0" r={120 + i * 100} fill="none" stroke="#9A7B2D" strokeOpacity={0.5 - i * 0.05} />
            ))}
          </svg>
        </div>
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <SectionHead num="03" eyebrow="What Makes It Different" title={differentTitle} copy={differentCopy} light />
            <Reveal delay={180}>
              <ul className="space-y-4 lg:pt-24">
                {differentPoints.map((p) => (
                  <li key={p} className="group flex items-start gap-4 border-b border-paper/15 pb-4 leading-relaxed text-paper/70 transition-colors duration-300 hover:border-brass">
                    <svg className="mt-1.5 h-3 w-3 shrink-0 text-brass transition-transform duration-500 group-hover:rotate-90" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative py-24 md:py-36">
        <Deck size={96} className="absolute right-[7%] top-20 hidden lg:block" />
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHead num="04" eyebrow="Outcomes" title="What this should help you become better at" />
              <Reveal delay={240}>
                <div className="mt-10">
                  <Ph variant={artVariant} label={outcomesArtLabel} ratio="aspect-[16/10]" />
                </div>
              </Reveal>
            </div>
            <div className="lg:pt-24">
              <ListRow items={outcomes} columns={1} />
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        title={ctaTitle}
        buttons={[
          { to: '/program', label: 'Explore the Flagship Program', variant: 'paper' },
          { to: '/admissions', label: 'View Admissions', variant: 'outline' },
        ]}
      />
    </>
  )
}
