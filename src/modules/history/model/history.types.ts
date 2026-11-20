export interface Milestone {
  year: string
  title: string
  description: string
}

export interface HistoryContent {
  eyebrow: string
  title: string
  titleAccent: string
  paragraphs: string[]
  quote: string
  timeline: Milestone[]
}
