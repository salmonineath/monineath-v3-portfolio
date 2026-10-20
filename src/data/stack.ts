import type { BrandIconName } from '@/components/ui/BrandIcon'
import type { Tone } from '@/lib/tones'

export type StackCategoryId = 'frontend' | 'backend' | 'languages' | 'databases' | 'tools'

export type StackFilterId = StackCategoryId | 'all'

export type StackItem = {
  name: string
  /** What the technology is, in a few plain words. Not a skill rating. */
  details: string
  icon: BrandIconName
}

export type StackCategory = {
  id: StackCategoryId
  title: string
  badge: string
  tone: Tone
  items: StackItem[]
}

export const stackFilters: { id: StackFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'languages', label: 'Languages' },
  { id: 'databases', label: 'Databases & Services' },
  { id: 'tools', label: 'Design & Tools' },
]

export const stackCategories: StackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    badge: 'User Interfaces',
    tone: 'blue',
    items: [
      { name: 'Vue.js', details: 'Component-based interfaces', icon: 'vue' },
      { name: 'React', details: 'Interactive UI library', icon: 'react' },
      { name: 'Next.js', details: 'React framework for the web', icon: 'nextjs' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    badge: 'Server & API',
    tone: 'indigo',
    items: [
      { name: 'NestJS', details: 'Structured Node.js servers', icon: 'nestjs' },
      { name: 'Express.js', details: 'Minimal Node.js APIs', icon: 'express' },
      { name: 'Java', details: 'Object-oriented backend language', icon: 'java' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    badge: 'Syntax & Logic',
    tone: 'amber',
    items: [
      { name: 'JavaScript', details: 'The language of the web', icon: 'javascript' },
      { name: 'TypeScript', details: 'JavaScript with types', icon: 'typescript' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Services',
    badge: 'Persistence',
    tone: 'emerald',
    items: [
      { name: 'MariaDB', details: 'Relational database', icon: 'mariadb' },
      { name: 'MySQL', details: 'Relational database', icon: 'mysql' },
      { name: 'PostgreSQL', details: 'Relational database', icon: 'postgresql' },
      { name: 'Supabase', details: 'Postgres backend platform', icon: 'supabase' },
    ],
  },
  {
    id: 'tools',
    title: 'Design & Tools',
    badge: 'Design & Workflow',
    tone: 'purple',
    items: [
      { name: 'Figma', details: 'UI/UX design & prototyping', icon: 'figma' },
      { name: 'Git', details: 'Version control', icon: 'git' },
      { name: 'GitHub', details: 'Code hosting & collaboration', icon: 'github' },
    ],
  },
]
