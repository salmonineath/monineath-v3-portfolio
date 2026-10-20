import type { Tone } from '../lib/tones'

type ProjectLink = {
  label: string
  /** Leave undefined until the URL exists; the button renders as unavailable. */
  href?: string
}

type PreviewBase = {
  /** Address shown in the mock browser bar. */
  address: string
  statusLabel: string
  /** Two short facts shown under the preview. */
  footer: [left: string, right: string]
}

export type AnalyticsPreview = PreviewBase & {
  kind: 'analytics'
  stats: { label: string; value: string; tone?: Tone }[]
  /** Relative bar heights, 0–100. */
  bars: number[]
}

export type BoardPreview = PreviewBase & {
  kind: 'board'
  columns: { title: string; tone: Tone; task: { title: string; meta: string } }[]
}

export type CodePreview = PreviewBase & {
  kind: 'code'
  code: string
}

export type ProjectPreview = AnalyticsPreview | BoardPreview | CodePreview

export type Project = {
  id: string
  category: string
  status: string
  title: string
  description: string
  highlights: string[]
  technologies: string[]
  tone: Tone
  demo: ProjectLink
  repository: ProjectLink
  preview: ProjectPreview
}

// TODO: add live demo and repository URLs for each project once published.
export const projects: Project[] = [
  {
    id: 'trackpulse',
    category: 'Web Application',
    status: 'Production Ready',
    title: 'TrackPulse — Audio Metrics Platform',
    description:
      'A high-performance web dashboard that connects with Spotify and external streaming APIs to visualize top artists, track tempo distributions, and generate personalized playlist insights with sub-100ms latency.',
    highlights: [
      'Designed normalized PostgreSQL database schemas with Prisma ORM',
      'Built asynchronous token refresh pipelines using Express.js middleware',
      'Engineered responsive interactive charts using Next.js and Tailwind CSS',
    ],
    technologies: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL'],
    tone: 'blue',
    demo: { label: 'Live Demo' },
    repository: { label: 'Source Code' },
    preview: {
      kind: 'analytics',
      address: 'trackpulse.app/analytics',
      statusLabel: 'Live Sync Active',
      footer: ['OAuth 2.0 PKCE Flow', 'Response Time: < 90ms'],
      stats: [
        { label: 'Top Monthly Genre', value: 'Synthwave / Lo-Fi' },
        { label: 'Acoustic Score', value: '87.4% High', tone: 'blue' },
        { label: 'Cache Layer', value: 'Redis Invalidation', tone: 'emerald' },
      ],
      bars: [32, 62, 46, 74, 54, 66, 38, 58, 84],
    },
  },
  {
    id: 'sprintdock',
    category: 'Realtime Collaboration',
    status: 'Multi-Tenant',
    title: 'SprintDock — Developer Task Engine',
    description:
      'A lightweight agile workspace built with NestJS and Vue.js 3. Enables sprint backlog organization, markdown documentation syncing, and instant status updates via WebSockets and Supabase real-time change channels.',
    highlights: [
      'Engineered NestJS dependency-injected micro-controllers with DTO validation',
      'Configured Supabase Row-Level Security (RLS) for multi-tenant privacy',
      'Developed drag-and-drop kanban boards using Vue.js Composition API',
    ],
    technologies: ['Vue.js 3', 'NestJS', 'Supabase', 'Tailwind'],
    tone: 'indigo',
    demo: { label: 'Live Preview' },
    repository: { label: 'Repository' },
    preview: {
      kind: 'board',
      address: 'sprintdock.dev/board',
      statusLabel: 'WebSocket: Connected',
      footer: ['Row-Level Security: Active', 'Payload: 4.2kb'],
      columns: [
        { title: 'In Review', tone: 'amber', task: { title: '#104 Optimize query latency', meta: 'Backend • NestJS' } },
        { title: 'Done', tone: 'emerald', task: { title: '#102 Auth guard refactor', meta: 'Security • JWT' } },
      ],
    },
  },
  {
    id: 'nexuscommerce',
    category: 'Backend Architecture',
    status: 'High Concurrency',
    title: 'NexusCommerce — Inventory API',
    description:
      'An e-commerce backend and administrative portal handling real-time stock deductions, order transactional locks, and webhook dispatching. Built to demonstrate resilient database design without race conditions.',
    highlights: [
      'Constructed ACID-compliant transaction blocks with pessimistic locking',
      'Configured REST endpoints with OpenAPI / Swagger documentation',
      'Built an administrative catalog dashboard using React & Tailwind',
    ],
    technologies: ['PostgreSQL', 'Express.js', 'React', 'TypeScript'],
    tone: 'emerald',
    demo: { label: 'API Docs & Preview' },
    repository: { label: 'Repository' },
    preview: {
      kind: 'code',
      address: 'schema-studio.internal',
      statusLabel: 'ACID Compliant',
      footer: ['PostgreSQL 16 + MariaDB Replica', 'Connection Pool: 25 Max'],
      code: `-- Transactional order processing schema
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total_cents INT NOT NULL,
  status VARCHAR(32) DEFAULT 'processing'
);`,
    },
  },
]
