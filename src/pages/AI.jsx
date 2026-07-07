import PillarPage from '../components/PillarPage.jsx'

const clusters = [
  {
    title: 'AI Foundations & Prompting',
    copy: 'Understand what models can and cannot do, and how to direct them with precision.',
    topics: ['How AI models work — practically', 'Prompt structure & iteration', 'Context & instruction design', 'Verification habits', 'Knowing when not to trust the output', 'Choosing a small, deep tool stack'],
  },
  {
    title: 'AI for Research & Thinking',
    copy: 'Compress days of research into hours without losing depth.',
    topics: ['Market & competitor research', 'Synthesis & summarization', 'Customer-interview analysis', 'Decision support', 'Structured exploration of new domains', 'Idea generation & refinement'],
  },
  {
    title: 'AI for Content & Creative',
    copy: 'Build content engines, not one-off posts.',
    topics: ['Writing systems for social, email & long-form', 'Visual ideation & image generation', 'Campaign asset production', 'One idea → ten formats repurposing', 'Brand-voice control', 'Editing & quality control'],
  },
  {
    title: 'AI for Websites & Digital Assets',
    copy: 'Ship landing pages, sites, and digital assets without waiting on a big team.',
    topics: ['AI-assisted website building', 'Landing page copy & structure', 'Design iteration with AI', 'Lead-capture assets', 'Launch checklists', 'Portfolio & offer pages'],
  },
  {
    title: 'AI Automation & Agents',
    copy: 'Connect AI to your workflows so repetitive work runs without you.',
    topics: ['Workflow automation tools', 'AI agents for routine tasks', 'Connecting AI to sheets, CRMs & messaging', 'Data extraction & processing', 'When to automate — and when not to', 'Cost & reliability thinking'],
  },
  {
    title: 'AI for Business Operations',
    copy: 'Use AI to build the systems layer of a business.',
    topics: ['SOP drafting & maintenance', 'Documentation & knowledge bases', 'Dashboards & reporting workflows', 'Meeting notes → action systems', 'AI in hiring & training processes', 'Internal knowledge assistance'],
  },
]

export default function AI() {
  return (
    <PillarPage
      eyebrow="AI at Paarth"
      heroTitle={<>Use AI to think faster, build faster, and <em className="serif-i text-brass-deep">operate with leverage.</em></>}
      heroCopy="AI is most useful when it helps people work with more speed, clarity, and range — not when it becomes a shortcut for shallow thinking. Paarth focuses on practical AI for business, marketing, content, websites, workflows, research, and digital execution."
      artVariant="grid"
      three="ico"
      artLabel="AI build session"
      tickerItems={['A small stack, used deeply.', 'Leverage, not noise.', 'Judgment stays human.', 'Build assets, not notes.']}
      outcomesArtLabel="Live AI workflows"
      meaningTitle="AI, taught as leverage"
      meaningCopy="At Paarth, AI is not taught as hype, fear, or a collection of disconnected tools. It is taught as a practical capability that can help people research faster, create better, systemize work, reduce repetitive effort, and extend what one person can build. Every module in the Paarth curriculum has an AI layer — you study AI inside marketing, inside sales, inside operations — because that is how it is actually used by the people getting disproportionate output from it."
      clustersEyebrow="What You Study"
      clustersTitle="The six study clusters inside AI at Paarth"
      clusters={clusters}
      differentTitle="AI as leverage, not noise"
      differentCopy="There is no shortage of AI content online. But much of it is shallow, tool-heavy, and disconnected from actual business use. Paarth takes a different approach: AI is taught in context — inside marketing, execution, systems, and business thinking."
      differentPoints={[
        'not “50 AI tools you should know” — a small stack, used deeply',
        'not prompts without purpose — every technique tied to a business use case',
        'not novelty use cases — a focus on where AI actually helps work move faster and better',
        'using AI without outsourcing judgment or taste',
        'everything is hands-on: you build assets, not notes',
      ]}
      outcomes={[
        'faster research and idea generation',
        'content and website production workflows that actually ship',
        'automations that remove repetitive work from your week',
        'stronger productivity and digital execution',
        'more confidence using AI in real work or business contexts',
        'a practical map of where AI creates leverage — and where it doesn’t',
      ]}
      ctaTitle="If you want to use AI with more clarity and less noise, start here."
    />
  )
}
