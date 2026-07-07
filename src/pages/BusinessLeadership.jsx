import PillarPage from '../components/PillarPage.jsx'

const clusters = [
  {
    title: 'Entrepreneurial Foundations',
    copy: 'Move from freelancer to solopreneur to entrepreneur — and convert busyness into business.',
    topics: ['The freelancer → entrepreneur transition', 'Goal architecture & the aspiration–action audit', 'Personal leadership & self-management', 'Vision-casting for teams', 'Execution discipline from day one'],
  },
  {
    title: 'Market Research & Product Thinking',
    copy: 'Understand buying behaviour, validate demand before you build, and think in portfolios instead of single products.',
    topics: ['The five buying roles', 'Market validation interviews', 'The demand litmus test — prepay, deposit, pilot', 'Pilot markets before full launch', 'Product portfolio design', 'Finding non-consumers as expansion'],
  },
  {
    title: 'Strategy & Competitive Advantage',
    copy: 'Learn how strategy is actually formed, executed, and defended — and why speed of implementation beats perfection.',
    topics: ['Critical success factors', 'Testing advantage for durability', 'Strategy reformation & execution excellence', 'Speed of implementation', 'Entry barriers & switching barriers', 'Change management'],
  },
  {
    title: 'Communication & Influence',
    copy: 'Public speaking is a skill, not a talent. Learn to open strong, structure with story, and close so people remember.',
    topics: ['One-to-many communication', 'Storytelling structures', 'The eight hook types', 'Openings & closings for retention', 'Golden statements', 'Interpersonal effectiveness'],
  },
  {
    title: 'Sales & Negotiation',
    copy: 'Selling is need identification plus trust — learn the question frameworks professionals actually use.',
    topics: ['Need-based selling', 'Question-led selling frameworks', 'Discovery & insight questions', 'Objection handling & the soft close', 'Negotiation fundamentals', 'Lead scoring & pipeline discipline'],
  },
  {
    title: 'Customer Experience & Retention',
    copy: 'Growth leaks without retention. Design touchpoints, service standards, and success systems that make customers stay.',
    topics: ['Touchpoint mapping', 'Customer service vs customer success', 'Net Promoter Score', 'Retention through switching-barrier design', 'Experience consistency as brand equity'],
  },
  {
    title: 'Hiring & People Systems',
    copy: 'Wrong hiring is expensive. Learn to evaluate before you hire, engage before people leave, and build a core team you can trust.',
    topics: ['Evaluate-then-hire systems', 'Relevant over merely talented', 'Onboarding & training loops', 'Stay interviews & engagement', 'Incentive & recognition design', 'Ownership plans & high-performance culture'],
  },
  {
    title: 'Productivity & Execution',
    copy: 'People do what you inspect, not what you expect. Run your calendar, meetings, and priorities like an operator.',
    topics: ['Time analysis & prioritization methods', 'Meetings as investment — cost & ROI', 'Leading vs lagging indicators', 'The replace-yourself delegation ladder', 'Focus & decision flow'],
  },
  {
    title: 'Operations, Systems & Scale',
    copy: 'Businesses scale on process, not heroics. Document, delegate, and review so quality survives growth.',
    topics: ['The six-step SOP method', 'Turnaround-time standards', 'Job shadowing for repeatability', 'Dashboards & review rhythms', 'Building the CEO’s office', 'Professionalizing family-run business'],
  },
  {
    title: 'Business Finance',
    copy: 'Most businesses die of cash flow, not competition. Learn the numbers every operator must own.',
    topics: ['Cash flow management', 'Working capital cycles', 'Inventory turnover & unit economics', 'ROI, ROE & profitability analysis', 'Pricing strategy', 'Credit, borrowing & risk', 'The periodic business health checkup'],
  },
]

export default function BusinessLeadership() {
  return (
    <PillarPage
      eyebrow="Business Leadership at Paarth"
      heroTitle={<>Learn how businesses are communicated, sold, managed, <em className="serif-i text-brass-deep">systemized, and scaled.</em></>}
      heroCopy="Leadership in business is not only about confidence or titles. It is the ability to understand people, communicate clearly, sell with conviction, manage money and priorities, build systems, and make better decisions as complexity increases."
      artVariant="arcs"
      three="knot"
      artLabel="Leadership workshop"
      tickerItems={['Sold. Managed. Systemized. Scaled.', 'Cash flow before competition.', 'People do what you inspect.', 'Frameworks you can run under pressure.']}
      outcomesArtLabel="Business breakdowns"
      meaningTitle="Leadership, taught as practical business capability"
      meaningCopy="At Paarth, business leadership is not treated as vague inspiration. It is taught as a set of learnable capabilities — through a library of more than fifty practical frameworks drawn from real business execution — that shape how people sell, communicate, manage execution, read their numbers, build teams, create systems, and grow businesses more intelligently."
      clustersEyebrow="What You Study"
      clustersTitle="The ten capability areas inside Business Leadership at Paarth"
      clusters={clusters}
      differentTitle="Because businesses do not break only at the marketing level."
      differentCopy="They also break at the leadership, systems, and cash-flow level. A business can struggle because of weak communication, poor sales conversations, hiring mistakes, lack of process, unclear ownership, bad meetings, or expansion without working capital. Paarth treats these not as personality problems, but as learnable business capabilities."
      differentPoints={[
        'every capability area is built from named, teachable frameworks',
        'finance and strategy taught alongside people skills — the full operator picture',
        'real Indian and global business cases behind every model',
        'systems thinking: SOPs, dashboards, and review rhythms, not motivation',
        'designed for application the same week you learn it',
      ]}
      outcomes={[
        'communicating with more clarity and persuasion',
        'selling products, services, or ideas with structured technique',
        'reading a business through its numbers — cash, margin, turnover, ROI',
        'hiring, engaging, and retaining the right people',
        'building SOPs, dashboards, and review systems that scale',
        'making stronger decisions as complexity increases',
      ]}
      ctaTitle="If you want to become more useful in the real work of building businesses, start here."
    />
  )
}
