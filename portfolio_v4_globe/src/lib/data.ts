import type { WebProject, MobileProject, Paper, CVEntry } from './types'

export const webProjects: WebProject[] = [
  {
    name: 'Hablar',
    description: 'Real speakers. Real conversations. The platform that learns through connection — not coursework.',
    tags: ['Next.js', 'WebSockets', 'PostgreSQL'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    name: 'Middah',
    description: 'Character built in code. Track the traits you want, not just the tasks you complete.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'Apache Tear',
    description: 'Write privately. Think freely. E2E-encrypted journals that exist offline, always.',
    tags: ['SvelteKit', 'IndexedDB'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'Barnshli',
    description: 'Where stories are built by many hands. A living canvas for collaborative fiction.',
    tags: ['Vue.js', 'GraphQL'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'Vinylify',
    description: 'Your collection, digitised. Discover what you own — and what should spin next.',
    tags: ['React', 'Discogs API', 'Supabase'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'PompWeb',
    description: 'Every session tracked. Every milestone earned. Smart analytics for your pumping journey, from any browser.',
    tags: ['Next.js', 'Chart.js', 'Firebase'],
    github: '#',
    live: '#',
    featured: false,
  },
]

export const mobileProjects: MobileProject[] = [
  {
    name: 'Smittestopp',
    description: '1.5M users. Zero servers storing your location. Bluetooth-first privacy, built for a national crisis.',
    platform: 'iOS · Android',
    tags: ['React Native', 'Bluetooth LE', 'Privacy'],
    featured: true,
  },
  {
    name: 'Pomp',
    description: 'Log it, track it, celebrate it. The companion app for every pumping parent — calm, clear, always there.',
    platform: 'iOS · Android',
    tags: ['Flutter', 'BLE', 'Firebase'],
    featured: false,
  },
  {
    name: 'Zleep',
    description: 'Better mornings start with smarter nights. Passive sleep tracking with science, not complexity.',
    platform: 'iOS · Android',
    tags: ['Swift / Kotlin', 'HealthKit', 'ML'],
    featured: false,
  },
]

export const papers: Paper[] = [
  {
    index: '01',
    title: 'Human-Computer Interaction Study — Placeholder Title',
    venue: 'CHI Conference on Human Factors in Computing Systems',
    year: '2024',
    tags: ['HCI', 'User Study', 'Qualitative'],
    link: '#',
    status: 'Published',
    abstract:
      'This study investigates how users form trust relationships with novel interaction paradigms in ambient computing environments. Through a mixed-methods approach combining diary studies (n=24) with lab-based usability sessions, we identify three primary trust-building phases and propose a validated framework for designing trustworthy ambient interfaces. Our findings suggest that transparency of system intent is a stronger predictor of sustained engagement than response latency, with implications for the design of always-on intelligent systems.',
  },
  {
    index: '02',
    title: 'Mobile Health Application Evaluation — Placeholder Title',
    venue: 'Journal of Medical Internet Research',
    year: '2023',
    tags: ['mHealth', 'Evaluation', 'Mixed Methods'],
    link: '#',
    status: 'Published',
    abstract:
      'We present a longitudinal evaluation of a mobile health application designed to support chronic condition self-management over a 16-week period. Sixty-two participants completed the study, with retention rates significantly above the mHealth industry average. Using experience sampling methodology alongside clinical outcome measures, we demonstrate statistically significant improvements in self-efficacy scores (p < .001) and a 23% reduction in unplanned clinical contacts. We discuss design implications for engagement scaffolding and the role of progressive disclosure in reducing cognitive burden.',
  },
  {
    index: '03',
    title: 'Data Privacy in Consumer Applications — Placeholder Title',
    venue: 'ACM Workshop on Privacy in the Electronic Society',
    year: '2023',
    tags: ['Privacy', 'Security', 'Ethics'],
    link: '#',
    status: 'Pre-print',
    abstract:
      'Consumer applications increasingly harvest granular behavioural data under permissive consent frameworks that users neither read nor understand. This position paper examines the gap between stated privacy policies and actual data flows in a corpus of 200 top-grossing mobile applications. We apply a novel automated audit methodology combining static analysis with runtime network inspection to surface discrepancies between claimed and observed data collection. We argue that current consent mechanisms are structurally insufficient and propose a set of design and regulatory interventions grounded in contextual integrity theory.',
  },
]

export const cvEntries: CVEntry[] = [
  {
    title: 'Senior Software Engineer',
    organisation: 'Company Name',
    dateRange: '2023 – Present',
    description:
      'Building high-performance web and mobile applications at scale. Leading frontend architecture decisions and mentoring junior engineers.',
    category: 'Work',
    stack: ['Next.js', 'React Native', 'TypeScript', 'PostgreSQL', 'AWS'],
    impact: 'Reduced time-to-ship by 40% through a standardised component library adopted across 3 product teams.',
  },
  {
    title: 'MSc Human-Computer Interaction',
    organisation: 'University Name',
    dateRange: '2021 – 2023',
    description:
      'Research focus on privacy-preserving mobile health systems. Thesis on user trust in Bluetooth contact tracing applications.',
    category: 'Education',
    stack: ['Python', 'R', 'Figma', 'LaTeX'],
    impact: 'Awarded Distinction. Thesis findings directly informed redesign of data-consent flows in a live health application.',
  },
  {
    title: 'Contact Tracing Mobile App — Smittestopp',
    organisation: 'Public Health Institute',
    dateRange: '2020 – 2021',
    description:
      'Led mobile development for a national-scale contact tracing app used by 1.5M+ users during the pandemic.',
    category: 'Work',
    stack: ['React Native', 'Bluetooth LE', 'iOS', 'Android', 'CI/CD'],
    impact: '1.5M+ downloads in 3 weeks. Internationally cited as a model for privacy-first public health technology.',
  },
  {
    title: 'Research Assistant',
    organisation: 'HCI Lab, University Name',
    dateRange: '2020 – 2021',
    description:
      'Conducted user studies on privacy perceptions in mobile health apps. Co-authored two peer-reviewed papers.',
    category: 'Research',
    stack: ['Python', 'SPSS', 'Figma', 'NVivo'],
    impact: 'Co-authored 2 papers accepted at tier-1 HCI venues (CHI, JMIR). Combined 40+ citations within first year.',
  },
  {
    title: 'BSc Computer Science',
    organisation: 'University Name',
    dateRange: '2018 – 2021',
    description:
      'First class honours. Specialised in distributed systems and human-computer interaction.',
    category: 'Education',
    stack: ['Java', 'Python', 'JavaScript', 'Haskell', 'SQL'],
    impact: "First class honours. Dean's Prize for academic excellence. Final-year project awarded best in cohort.",
  },
  {
    title: 'Open Source Contributor',
    organisation: 'Various Projects',
    dateRange: '2019 – Present',
    description:
      'Contributor to privacy-focused open source tools and developer utilities. Maintainer of Barnshli storytelling library.',
    category: 'Open Source',
    stack: ['SvelteKit', 'Vue.js', 'GraphQL', 'TypeScript'],
    impact: '800+ GitHub stars across maintained projects. Barnshli adopted by 3 indie game studios.',
  },
]
