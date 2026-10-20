import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navItems, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { buttonStyles } from '../ui/buttonStyles'
import { Icon } from '../ui/Icon'
import { LogoMark } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const activeSectionId = useActiveSection(sectionIds)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-4">
      <div className="mx-auto max-w-header px-3 sm:px-4">
        <div className="relative flex h-15 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-header px-4 shadow-lg shadow-black/10 backdrop-blur-md sm:px-5">
          <span
            className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-blue-500 via-indigo-400 to-purple-400"
            aria-hidden="true"
          />
          <a href="#home" className="flex items-center gap-2.5 rounded-lg" onClick={closeMenu}>
            <LogoMark />
            <span className="font-display text-[0.95rem] font-semibold text-fg">{site.domain}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <NavLinks activeSectionId={activeSectionId} />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className={buttonStyles({ size: 'sm', className: 'rounded-full max-sm:hidden' })}>
              <span className="relative grid size-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-beacon" />
                <span className="relative rounded-full bg-success" />
              </span>
              Hire Me
              <Icon name="arrow-right" />
            </a>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg border border-line text-fg lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <Icon name={isMenuOpen ? 'close' : 'menu'} className="size-5" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile"
            className="mt-2 rounded-2xl border border-line bg-surface-solid p-3 shadow-xl shadow-black/20 lg:hidden"
          >
            <NavLinks activeSectionId={activeSectionId} onNavigate={closeMenu} vertical />
            <a
              href="#contact"
              onClick={closeMenu}
              className={buttonStyles({ size: 'md', className: 'mt-3 w-full sm:hidden' })}
            >
              Hire Me
              <Icon name="arrow-right" />
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

type NavLinksProps = {
  activeSectionId: string
  onNavigate?: () => void
  vertical?: boolean
}

function NavLinks({ activeSectionId, onNavigate, vertical = false }: NavLinksProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  // The horizontal nav shares one highlight that slides to the active link.
  useLayoutEffect(() => {
    if (vertical) return
    const measure = () => {
      const list = listRef.current
      const link = list?.querySelector<HTMLElement>('[aria-current="location"]')
      if (!list || !link) return setIndicator(null)
      const listBox = list.getBoundingClientRect()
      const linkBox = link.getBoundingClientRect()
      setIndicator({ left: linkBox.left - listBox.left, width: linkBox.width })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeSectionId, vertical])

  return (
    <ul ref={listRef} className={cn('relative flex gap-1', vertical && 'flex-col')}>
      {indicator && (
        <li
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-blue-500/10 transition-[translate,width] duration-500 ease-out-expo motion-reduce:transition-none"
          style={{ width: indicator.width, translate: `${indicator.left}px 0` }}
        />
      )}
      {navItems.map((item) => {
        const isActive = item.id === activeSectionId

        return (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'block rounded-lg px-3 py-1.5 font-display text-sm font-medium transition-colors',
                vertical && 'py-3 text-base',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-fg-muted hover:text-fg',
                isActive && vertical && 'bg-blue-500/10',
              )}
            >
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
