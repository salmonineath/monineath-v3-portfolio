type ExternalProfile = {
  /** Short, human-readable form of the URL shown in the UI. */
  label: string
  href: string
}

type SiteConfig = {
  name: string
  title: string
  /** Brand text beside the monogram in the header. */
  brand: string
  initials: string
  description: string
  /**
   * Public URL of the deployed site, used for canonical and Open Graph URLs.
   * Set `NEXT_PUBLIC_SITE_URL` in the hosting environment.
   */
  url: string
  email: string
  github: ExternalProfile & { repositoriesHref: string }
  /** Links to this profile are hidden while it is `null`. */
  linkedin: ExternalProfile | null
  /**
   * Hero portrait, served from `public/`. A labeled placeholder is shown
   * until the file exists.
   */
  profilePhoto: { src: string; alt: string }
}

/**
 * Personal details and links used across the site. Update values here
 * rather than in components.
 */
export const site: SiteConfig = {
  name: 'Monineath',
  title: 'Full-Stack Developer',
  brand: 'monineath.dev',
  initials: 'MN',
  description:
    'I build modern, reliable, and user-friendly web applications, from frontend interfaces to backend systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'salmonineath31@gmail.com',
  github: {
    label: 'github.com/salmonineath',
    href: 'https://github.com/salmonineath',
    repositoriesHref: 'https://github.com/salmonineath?tab=repositories',
  },
  // TODO: add your LinkedIn profile, e.g.
  // { label: 'linkedin.com/in/your-handle', href: 'https://www.linkedin.com/in/your-handle' }
  linkedin: null,
  profilePhoto: {
    src: '/images/profile.jpg',
    alt: 'Portrait of Monineath',
  },
}

export type SectionId = 'home' | 'about' | 'stack' | 'services' | 'projects' | 'contact'

export type NavItem = {
  id: SectionId
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
