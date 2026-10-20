import type { IconName } from '../components/ui/Icon'
import type { Tone } from '../lib/tones'

export type StackCategoryId = 'frontend' | 'backend' | 'languages' | 'databases' | 'tools'

export type StackFilterId = StackCategoryId | 'all'

export type StackItem = {
  name: string
  details: string
  /** Short code shown in the item's tile, e.g. "TS". */
  abbreviation: string
  tone: Tone
  /** Brand logo shown instead of the abbreviation, when available. */
  logo?: IconName
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
  { id: 'databases', label: 'Databases & Cloud' },
  { id: 'tools', label: 'Design & Tools' },
]

export const stackCategories: StackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    badge: 'UI & State',
    tone: 'blue',
    items: [
      { name: 'Vue.js', details: 'Composition API, Pinia, Router', abbreviation: 'VUE', tone: 'emerald' },
      { name: 'React', details: 'Hooks, Context, Modern Patterns', abbreviation: 'REA', tone: 'cyan' },
      { name: 'Next.js', details: 'App Router, SSR, Server Actions', abbreviation: 'NXT', tone: 'slate' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    badge: 'Server & API',
    tone: 'indigo',
    items: [
      { name: 'NestJS', details: 'Modular Architecture, DI, Guards', abbreviation: 'NST', tone: 'rose' },
      { name: 'Express.js', details: 'RESTful APIs, Middlewares, Auth', abbreviation: 'EXP', tone: 'emerald' },
      { name: 'Java', details: 'Spring Boot Foundations, OOP', abbreviation: 'JAV', tone: 'amber' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    badge: 'Syntax & Logic',
    tone: 'amber',
    items: [
      { name: 'TypeScript', details: 'Generics, Enums, Strict Typing', abbreviation: 'TS', tone: 'blue' },
      { name: 'JavaScript', details: 'ES6+, Asynchronous (Async/Await)', abbreviation: 'JS', tone: 'yellow' },
      { name: 'SQL / DDL', details: 'Queries, Joins, Indexing Basics', abbreviation: 'SQL', tone: 'purple' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Services',
    badge: 'Persistence',
    tone: 'emerald',
    items: [
      { name: 'PostgreSQL', details: 'Relational Modeling, Prisma/TypeORM', abbreviation: 'PG', tone: 'sky' },
      { name: 'Supabase', details: 'Auth, Row-Level Security, Storage', abbreviation: 'SUP', tone: 'emerald' },
      { name: 'MySQL & MariaDB', details: 'Relational storage & migrations', abbreviation: 'SQL', tone: 'orange' },
    ],
  },
  {
    id: 'tools',
    title: 'Design & Tools',
    badge: 'UI & Prototyping',
    tone: 'purple',
    items: [
      { name: 'Figma', details: 'UI/UX, Prototypes, Design Systems', abbreviation: 'FIG', tone: 'slate', logo: 'figma' },
      { name: 'Git & GitHub Actions', details: 'CI/CD, Version Control, Code Reviews', abbreviation: 'GIT', tone: 'indigo' },
      { name: 'Tailwind CSS', details: 'Responsive Grids, Dark Modes, Tokens', abbreviation: 'TW', tone: 'teal' },
    ],
  },
]
