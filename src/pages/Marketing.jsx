import PillarPage from '../components/PillarPage.jsx'

const clusters = [
  {
    title: 'Consumer Psychology & Positioning',
    copy: 'Why people buy, how buying decisions are actually made, and how to occupy a clear position in the customer’s mind.',
    topics: ['Buying behaviour & the five buying roles', 'Changing consumer behaviour', 'Positioning & differentiation', 'Value proposition design', 'Messaging clarity', 'Trust & perception building'],
  },
  {
    title: 'Brand Building',
    copy: 'How brands accumulate equity — and how consistency at every touchpoint becomes a moat.',
    topics: ['Brand equity', 'Touchpoint consistency', 'Visual presentation of services', 'How brands become viral', 'Brand vs performance thinking', 'Brand clarity'],
  },
  {
    title: 'Content & Social Media',
    copy: 'Build content systems that produce attention on schedule, not by accident.',
    topics: ['Content creation systems', 'Platform strategy — Instagram, YouTube, LinkedIn', 'Hooks & retention', 'Short-form vs long-form', 'Content calendars', 'Repurposing pipelines'],
  },
  {
    title: 'Performance Marketing & Paid Media',
    copy: 'Run campaigns that are measured in customer acquisition cost, not likes.',
    topics: ['Ad campaign design', 'The must-haves of an ad', 'Meta & Google ads', 'Guerrilla & moment marketing', 'Reducing customer acquisition cost', 'Budget & bid logic'],
  },
  {
    title: 'Funnels & Conversion',
    copy: 'Turn attention into pipeline, and pipeline into revenue.',
    topics: ['The marketing funnel', 'Landing pages', 'Lead generation & lead magnets', 'Lead scoring', 'WhatsApp & email nurture', 'Conversion rate thinking'],
  },
  {
    title: 'SEO & Organic Growth',
    copy: 'Be found when demand already exists, and build owned audiences that no algorithm can take away.',
    topics: ['Search fundamentals', 'Keyword & intent research', 'On-page & content SEO', 'Local search & business profiles', 'Newsletters & owned distribution', 'Analytics & optimization'],
  },
  {
    title: 'Personal Branding & Marketing Analytics',
    copy: 'The founder is the first distribution channel. Learn to build visibility — and to read the numbers behind every campaign.',
    topics: ['Personal brand architecture', 'Authority content', 'Case-study storytelling', 'Marketing metrics & dashboards', 'ROI of marketing spend', 'Pricing as a marketing decision'],
  },
]

export default function Marketing() {
  return (
    <PillarPage
      eyebrow="Marketing at Paarth"
      heroTitle={<>Learn how attention is earned, trust is built, and <em className="serif-i text-brass-deep">growth is created.</em></>}
      heroCopy="Marketing is not just content, ads, or social media activity. At its best, it is the discipline of understanding people, positioning value, shaping perception, and building demand systems that compound over time."
      artVariant="rays"
      three="torus"
      artLabel="Campaign war-room"
      tickerItems={['Attention → Trust → Demand → Growth.', 'Brand and performance, one system.', 'Every channel taught with its economics.', 'Why it works, not just what to post.']}
      outcomesArtLabel="Campaign breakdowns"
      meaningTitle="Marketing, taught as business capability"
      meaningCopy="Most digital marketing education starts with platforms. We start with people — why they buy, what they trust, and how perception is formed — and then move outward to channels, campaigns, and conversion systems. At Paarth, marketing is taught as a connected discipline that sits at the intersection of customer understanding, messaging, brand building, digital execution, and business growth. You leave knowing not just what to post, but why it works and what it does to revenue."
      clustersEyebrow="What You Study"
      clustersTitle="The seven study clusters inside Marketing at Paarth"
      clusters={clusters}
      differentTitle="Beyond platform tactics"
      differentCopy="The goal is not just to teach people how to “do digital marketing.” The goal is to help them understand how attention turns into trust, how trust turns into demand, and how demand turns into growth."
      differentPoints={[
        'learn why marketing works, not just what to post',
        'every channel is taught with its economics — acquisition cost, lifetime value, ROI — attached',
        'brand and performance taught as one system, not rival camps',
        'move from fragmented activity to coherent growth systems',
        'frameworks over hacks: repeatable models you can run every quarter',
        'Indian market context: real campaigns, real constraints, real budgets',
      ]}
      outcomes={[
        'building clearer messaging and positioning',
        'running content systems that compound',
        'designing and reading paid campaigns without wasting budget',
        'building funnels that convert attention into revenue',
        'ranking and being discovered organically',
        'connecting every marketing decision to a real business outcome',
      ]}
      ctaTitle="If you want to understand marketing beyond the surface, start here."
    />
  )
}
