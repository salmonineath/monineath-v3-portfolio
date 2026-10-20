import type { Tone } from '@/lib/tones'

export type Project = {
  id: string
  /** Shown above the title, e.g. "Web Application". */
  category: string
  title: string
  description: string
  /** Key features, phrased as what the project does. */
  features: string[]
  technologies: string[]
  tone: Tone
  /**
   * Screenshot served from `public/`, e.g. `/images/projects/my-app.png`.
   * Use a 16:10 image (1600×1000 works well). Omit to show a placeholder.
   */
  screenshot?: { src: string; alt: string }
  /** Address shown in the browser bar above the screenshot. */
  address?: string
  /** Omit when the repository is private or not published. */
  repositoryUrl?: string
  /** Omit when there is no live version. */
  demoUrl?: string
  /** Marks example content that must be replaced before launch. */
  placeholder?: boolean
}

/*
 * Add, edit, or reorder projects here; components need no changes.
 *
 * TODO: replace these placeholder entries with your real projects.
 * Placeholder entries are labeled "Placeholder" on the page.
 */
export const projects: Project[] = [
  {
    id: 'placeholder-business-website',
    category: 'Business Website',
    title: 'Project Name (Placeholder)',
    description:
      'Placeholder entry. Describe the project in one or two sentences: who it is for and what problem it solves.',
    features: ['Key feature one', 'Key feature two', 'Key feature three'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    tone: 'blue',
    placeholder: true,
  },
  {
    id: 'placeholder-web-application',
    category: 'Full-Stack Web Application',
    title: 'Project Name (Placeholder)',
    description:
      'Placeholder entry. Summarize what the application does and the part of the stack you built.',
    features: ['Key feature one', 'Key feature two', 'Key feature three'],
    technologies: ['Vue.js', 'NestJS', 'PostgreSQL'],
    tone: 'indigo',
    placeholder: true,
  },
  {
    id: 'placeholder-dashboard',
    category: 'Dashboard',
    title: 'Project Name (Placeholder)',
    description:
      'Placeholder entry. Explain what the dashboard helps people track or manage.',
    features: ['Key feature one', 'Key feature two', 'Key feature three'],
    technologies: ['React', 'Express.js', 'MySQL'],
    tone: 'emerald',
    placeholder: true,
  },
]
