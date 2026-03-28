export interface WebProject {
  name: string
  description: string
  tags: string[]
  github: string
  live: string
  featured: boolean
}

export interface MobileProject {
  name: string
  description: string
  platform: string
  tags: string[]
  featured: boolean
}

export interface Paper {
  index: string
  title: string
  venue: string
  year: string
  tags: string[]
  link: string
  /** One-paragraph abstract shown in the drawer */
  abstract: string
  /** Publication status shown as a pill badge */
  status: 'Published' | 'Pre-print' | 'Under Review'
}

export interface CVEntry {
  title: string
  organisation: string
  dateRange: string
  description: string
  category: 'Education' | 'Work' | 'Research' | 'Open Source'
  /** Technologies used — shown as stack pills */
  stack?: string[]
  /** Specific measurable outcome */
  impact?: string
}
