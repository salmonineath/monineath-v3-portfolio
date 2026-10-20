'use client'

import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navItems, site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'
import { buttonStyles } from '../ui/buttonStyles'
import { LogoMark } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

const easeOutExpo = [0.16, 1, 0.3, 1] as const

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
            <span className="font-display text-[0.95rem] font-semibold text-fg">{site.brand}</span>
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
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg border border-line text-fg lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="mt-2 origin-top rounded-2xl border border-line bg-surface-solid p-3 shadow-xl shadow-black/20 lg:hidden"
            >
              <NavLinks activeSectionId={activeSectionId} onNavigate={closeMenu} vertical />
              <a
                href="#contact"
                onClick={closeMenu}
                className={buttonStyles({ size: 'md', className: 'mt-3 w-full sm:hidden' })}
              >
                Hire Me
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
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
  return (
    <ul className={cn('flex gap-1', vertical && 'flex-col')}>
      {navItems.map((item) => {
        const isActive = item.id === activeSectionId

        return (
          <li key={item.id} className="relative">
            {/* One highlight that slides between links as the active section changes. */}
            {isActive && (
              <motion.span
                layoutId={vertical ? 'nav-highlight-mobile' : 'nav-highlight'}
                className="absolute inset-0 rounded-lg bg-blue-500/10"
                transition={{ duration: 0.5, ease: easeOutExpo }}
                aria-hidden="true"
              />
            )}
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative block rounded-lg px-3 py-1.5 font-display text-sm font-medium transition-colors',
                vertical && 'py-3 text-base',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-fg-muted hover:text-fg',
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
