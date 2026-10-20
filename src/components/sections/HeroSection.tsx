import type { PointerEvent } from 'react'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { StatusPill } from '../ui/StatusPill'
import { HeroCodeCard } from './HeroCodeCard'

/** Staggered entrance for the hero copy; `step` is its place in the sequence. */
const rise = (step: number) => ({ style: { animationDelay: `${step * 90}ms` } })

/** Moves the grid spotlight to the pointer. Writes CSS vars directly to skip re-renders. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={trackPointer}
      className="group/hero bg-hero relative overflow-hidden [--spot-x:50%] [--spot-y:-300px]"
    >
      <div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100 motion-reduce:hidden"
      />
      <Container className="grid items-center gap-14 pt-32 pb-20 sm:pt-40 lg:min-h-[50rem] lg:grid-cols-[1fr_27.5rem] lg:gap-12 lg:pt-28 lg:pb-24">
        <div className="relative">
          <div {...rise(0)} className="motion-safe:animate-rise">
            <StatusPill>Available for freelance projects & client contracts</StatusPill>
          </div>

          <h1 id="hero-title" className="mt-7">
            <span
              {...rise(1)}
              className="block font-mono text-sm font-normal tracking-[0.2em] text-fg-muted uppercase motion-safe:animate-rise"
            >
              Hi, I'm
            </span>
            <span
              {...rise(2)}
              className="text-gradient-brand mt-2 block pb-1 text-6xl font-bold tracking-tight motion-safe:animate-rise sm:text-7xl"
            >
              {site.name}
            </span>
            <span
              {...rise(3)}
              className="mt-2 block text-3xl leading-tight font-bold tracking-tight motion-safe:animate-rise sm:text-4xl"
            >
              Full-Stack Developer & Freelance Engineer.
            </span>
          </h1>

          <p
            {...rise(4)}
            className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted motion-safe:animate-rise sm:text-lg"
          >
            Transforming Ideas Into High-Converting, Production-Ready Web Apps
          </p>

          <p
            {...rise(5)}
            className="mt-6 max-w-[38rem] text-[0.95rem] leading-relaxed text-fg-secondary motion-safe:animate-rise sm:text-base"
          >
            I help businesses, startup founders, and growing teams engineer modern, high-performance web applications —
            from intuitive frontend interfaces to robust, scalable backend systems.
          </p>

          <div
            {...rise(6)}
            className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-rise"
          >
            <ButtonLink href="#projects">
              View My Projects
              <Icon name="arrow-right" />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              Explore Services
            </ButtonLink>

            <span className="hidden h-10 w-px bg-line sm:block" aria-hidden="true" />

            <ul className="flex items-center gap-2">
              <li>
                <SocialIconLink href={site.github.href} label="GitHub profile" icon="github" />
              </li>
              {site.linkedin && (
                <li>
                  <SocialIconLink href={site.linkedin.href} label="LinkedIn profile" icon="linkedin" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <HeroCodeCard />
      </Container>
    </section>
  )
}

type SocialIconLinkProps = {
  href: string
  label: string
  icon: 'github' | 'linkedin'
}

function SocialIconLink({ href, label, icon }: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
    >
      <Icon name={icon} className="size-5" />
    </a>
  )
}
