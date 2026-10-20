import { AppWindow, ChartColumn, Globe, Wrench, type LucideIcon } from 'lucide-react'
import type { Tone } from '@/lib/tones'

export type Service = {
  id: string
  /** Short category code shown as "01 // WEB". */
  code: string
  title: string
  description: string
  /** Plain-language outcomes a non-technical client cares about. */
  features: string[]
  idealFor: string
  icon: LucideIcon
  tone: Tone
}

export const services: Service[] = [
  {
    id: 'business-websites',
    code: 'Web',
    title: 'Business Websites',
    description: 'Responsive websites that help businesses establish a professional online presence.',
    features: ['Looks great on phones', 'Fast-loading pages', 'Easy to find on Google', 'Clear contact options'],
    idealFor: 'Good fit for small businesses & freelancers',
    icon: Globe,
    tone: 'blue',
  },
  {
    id: 'web-applications',
    code: 'Apps',
    title: 'Full-Stack Web Applications',
    description: 'Custom applications built with modern frontend and backend technologies.',
    features: ['User accounts & logins', 'Your own database', 'Admin features', 'Built to grow with you'],
    idealFor: 'Good fit for new product ideas & custom tools',
    icon: AppWindow,
    tone: 'indigo',
  },
  {
    id: 'dashboards',
    code: 'Ops',
    title: 'Dashboards & Internal Tools',
    description: 'Management dashboards and applications that help teams organize their work.',
    features: ['Track records in one place', 'Charts & reports', 'Team roles & permissions', 'Less manual paperwork'],
    idealFor: 'Good fit for teams outgrowing spreadsheets',
    icon: ChartColumn,
    tone: 'emerald',
  },
  {
    id: 'maintenance',
    code: 'Support',
    title: 'Website Maintenance & Improvements',
    description: 'Bug fixes, feature improvements, performance optimization, and ongoing maintenance.',
    features: ['Fix broken features', 'Speed up slow pages', 'Add new features', 'Keep things up to date'],
    idealFor: 'Good fit for existing websites & web apps',
    icon: Wrench,
    tone: 'amber',
  },
]
