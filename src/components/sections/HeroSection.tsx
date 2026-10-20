import { ArrowRight } from 'lucide-react'
import { site } from '@/data/site'
import { BrandIcon } from '../ui/BrandIcon'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { StatusPill } from '../ui/StatusPill'
import { HeroPortrait } from './HeroPortrait'
import { HeroSpotlight } from './HeroSpotlight'

/**
 * Staggered entrance for the hero copy; `step` is its place in the sequence.
 * Plain CSS so the copy animates before hydration and never blocks LCP.
 */
const rise = (step: number) => ({ style: { animationDelay: `${step * 90}ms` } })

export function HeroSection() {
  return (
    <HeroSpotlight>
      <Container className="grid items-center gap-14 pt-32 pb-20 sm:pt-40 lg:min-h-[50rem] lg:grid-cols-[1fr_27.5rem] lg:gap-12 lg:pt-28 lg:pb-24">
        <div className="relative">
          <div {...rise(0)} className="motion-safe:animate-rise">
            <StatusPill>Available for freelance projects & collaborations</StatusPill>
          </div>

          <h1 id="hero-title" className="mt-7">
            <span
              {...rise(1)}
              className="block font-mono text-sm font-normal tracking-[0.2em] text-fg-muted uppercase motion-safe:animate-rise"
            >
              Hi, I&apos;m
            </span>
            <span
              {...rise(2)}
              className="text-gradient-brand mt-2 block pb-1 text-[3.25rem] leading-none font-bold tracking-tight motion-safe:animate-rise min-[380px]:text-6xl sm:text-7xl"
            >
              {site.name}
            </span>
            <span
              {...rise(3)}
              className="mt-3 block text-3xl leading-tight font-bold tracking-tight motion-safe:animate-rise sm:text-4xl"
            >
              {site.title}
            </span>
          </h1>

          <p
            {...rise(4)}
            className="mt-6 max-w-[38rem] text-base leading-relaxed text-fg-secondary motion-safe:animate-rise sm:text-lg"
          >
            {site.description}
          </p>

          <div {...rise(5)} className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-rise">
            <ButtonLink href="#projects" className="max-[379px]:w-full">
              View My Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary" className="max-[379px]:w-full">
              Explore Services
            </ButtonLink>

            <span className="hidden h-10 w-px bg-line sm:block" aria-hidden="true" />

            <ul className="flex items-center gap-2">
              <li>
                <SocialIconLink href={site.github.href} label="GitHub profile" icon="github" />
              </li>
              {site.gitlab && (
                <li>
                  <SocialIconLink href={site.gitlab.href} label="GitLab profile" icon="gitlab" />
                </li>
              )}
              {site.linkedin && (
                <li>
                  <SocialIconLink href={site.linkedin.href} label="LinkedIn profile" icon="linkedin" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[19rem] min-[400px]:max-w-[21rem] sm:max-w-[23rem] lg:mr-0 motion-safe:animate-rise motion-safe:[animation-delay:250ms]">
          <HeroPortrait />
        </div>
      </Container>
    </HeroSpotlight>
  )
}

type SocialIconLinkProps = {
  href: string
  label: string
  icon: 'github' | 'gitlab' | 'linkedin'
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
      <BrandIcon name={icon} className="size-5" />
    </a>
  )
}
