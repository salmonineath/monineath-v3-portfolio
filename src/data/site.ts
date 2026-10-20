type ExternalProfile = {
  /** Short, human-readable form of the URL shown in the UI. */
  label: string
  href: string
}

type SiteConfig = {
  name: string
  domain: string
  initials: string
  email: string
  github: ExternalProfile & { repositoriesHref: string }
  /** Links to this profile are hidden while it is `null`. */
  linkedin: ExternalProfile | null
}

/**
 * Personal details and links used across the site. Update values here
 * rather than in components.
 */
export const site: SiteConfig = {
  name: 'Monineath',
  domain: 'monineath.dev',
  initials: 'MN',
  email: 'salmonineath31@gmail.com',
  github: {
    label: 'github.com/salmonineath',
    href: 'https://github.com/salmonineath',
    repositoriesHref: 'https://github.com/salmonineath?tab=repositories',
  },
  // TODO: add your LinkedIn profile, e.g.
  // { label: 'linkedin.com/in/your-handle', href: 'https://www.linkedin.com/in/your-handle' }
  linkedin: null,
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
