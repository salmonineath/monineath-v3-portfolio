import type { IconName } from '../components/ui/Icon'
import type { Tone } from '../lib/tones'

export type Service = {
  id: string
  /** Short category code shown as "01 // WEB". */
  code: string
  title: string
  description: string
  features: string[]
  idealFor: string
  icon: IconName
  tone: Tone
}

export const services: Service[] = [
  {
    id: 'business-websites',
    code: 'Web',
    title: 'Business Websites',
    description:
      'Modern, responsive websites that help businesses build a professional online presence, communicate credibility, and convert visitors into paying clients.',
    features: ['High-performance SEO', 'Lightning-fast load times', 'Mobile responsive', 'Interactive animations'],
    idealFor: 'Ideal for founders, consultancies & agencies',
    icon: 'globe',
    tone: 'blue',
  },
  {
    id: 'web-applications',
    code: 'SaaS',
    title: 'Full-Stack Web Applications',
    description:
      'Custom web applications combining intuitive frontend interfaces with reliable backend systems built from the ground up for stability and growth.',
    features: ['End-to-end architecture', 'Secure authentication', 'Resilient REST/GraphQL APIs', 'Clean database schema'],
    idealFor: 'Ideal for MVPs, SaaS products & custom software',
    icon: 'layers',
    tone: 'indigo',
  },
  {
    id: 'dashboards',
    code: 'Ops',
    title: 'Dashboards & Internal Tools',
    description:
      'Custom dashboards, operational management systems, and specialized tools that automate repetitive tasks and simplify everyday business workflows.',
    features: ['Real-time telemetry', 'Interactive charts', 'Role-based access (RBAC)', 'Workflow automation'],
    idealFor: 'Ideal for operations, client portals & data teams',
    icon: 'bar-chart',
    tone: 'emerald',
  },
  {
    id: 'maintenance',
    code: 'Support',
    title: 'Website Maintenance & Improvements',
    description:
      'Bug fixes, speed optimization, technical debt removal, feature enhancements, and continuous health maintenance for mission-critical web applications.',
    features: ['Lighthouse speed optimization', 'Security & dependency patches', 'UI modernization', 'Database query tuning'],
    idealFor: 'Ideal for existing web apps needing speed & polish',
    icon: 'zap',
    tone: 'amber',
  },
]
