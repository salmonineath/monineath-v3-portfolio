import { navItems, site } from '../../data/site'
import { Icon } from '../ui/Icon'
import { LogoMark } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line-subtle">
      <div data-reveal="" className="mx-auto flex max-w-header flex-col items-center gap-6 px-5 py-10 text-center lg:flex-row lg:justify-between lg:py-8 lg:text-left">
        <p className="flex items-center gap-3 font-display text-sm text-fg-muted">
          <LogoMark className="size-7 rounded-md text-xs" />
          © {year} {site.name}. Built with TypeScript & Tailwind CSS.
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-fg-muted">
            {navItems.map((item, index) => (
              <li key={item.id} className="flex items-center gap-5">
                {index > 0 && (
                  <span className="text-fg-subtle" aria-hidden="true">
                    •
                  </span>
                )}
                <a href={`#${item.id}`} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#home" className="flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg">
          Back to Top
          <Icon name="arrow-up" className="size-3.5" />
        </a>
      </div>
    </footer>
  )
}
