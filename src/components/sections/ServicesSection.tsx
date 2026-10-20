import { services, type Service } from '../../data/services'
import { cn } from '../../lib/cn'
import { toneClasses } from '../../lib/tones'
import { ButtonLink } from '../ui/ButtonLink'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { StatusPill } from '../ui/StatusPill'
import { Tag } from '../ui/Tag'
import { stagger } from '../../lib/stagger'

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            label="Services"
            titleId="services-title"
            title="What I Can Build for You"
            description="High-impact web engineering tailored for founders, businesses, and growing teams — from high-converting marketing sites to scalable web platforms."
          />
          <div data-reveal="" style={stagger(3)} className="self-start lg:self-auto">
            <StatusPill>Now Booking Q2/Q3 Projects</StatusPill>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id} data-reveal="" style={stagger(index % 2)}>
              <ServiceCard service={service} number={index + 1} />
            </li>
          ))}
        </ul>

        <ProjectCallToAction />
      </Container>
    </section>
  )
}

function ServiceCard({ service, number }: { service: Service; number: number }) {
  const tone = toneClasses[service.tone]

  return (
    <Card as="article" className="relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
      {/* Decorative tinted quarter-circle in the top-right corner. */}
      <span className={cn('reveal-pop pointer-events-none absolute -top-16 -right-16 size-48 rounded-full', tone.soft)} aria-hidden="true" />

      <div className="relative flex items-start justify-between">
        <span className={cn('grid size-12 place-items-center rounded-xl border', tone.soft, tone.border, tone.text)}>
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="font-mono text-xs tracking-[0.15em] text-fg-subtle uppercase">
          {`${String(number).padStart(2, '0')} // ${service.code}`}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{service.description}</p>

      <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2" aria-label="Includes">
        {service.features.map((feature) => (
          <li key={feature}>
            <Tag>{feature}</Tag>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle pt-5">
        <p className="text-xs text-fg-muted">{service.idealFor}</p>
        <a
          href="#contact"
          className={cn('flex items-center gap-1 font-display text-sm font-medium hover:underline', tone.text)}
        >
          Learn more
          <span className="sr-only"> about {service.title}</span>
          <Icon name="arrow-right" className="size-3.5" />
        </a>
      </footer>
    </Card>
  )
}

function ProjectCallToAction() {
  return (
    <div
      data-reveal="scale"
      className="mt-10 flex flex-col gap-6 rounded-card border border-line bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-blue-600 uppercase dark:text-blue-400">
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          Let's scope your build
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          Have a project in mind? Let's discuss your timeline and technical scope.
        </h3>
        <p className="mt-2 text-sm text-fg-muted">
          Fast response within 24 hours with architectural suggestions and honest project estimations.
        </p>
      </div>
      <ButtonLink href="#contact" className="self-start md:self-auto">
        Start a Project
        <Icon name="arrow-right" />
      </ButtonLink>
    </div>
  )
}
