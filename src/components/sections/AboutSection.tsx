import { cn } from '../../lib/cn'
import { toneClasses, type Tone } from '../../lib/tones'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { SectionEyebrow } from '../ui/SectionHeading'
import { stagger } from '../../lib/stagger'

const engineeringValues: { title: string; description: string; tone: Tone }[] = [
  {
    title: 'Full-Spectrum Ownership',
    description: 'Comfortable traversing the stack: database schema design, server controllers, and pixel-precise UI.',
    tone: 'blue',
  },
  {
    title: 'Pragmatic Problem Solving',
    description: 'Selecting the right tool for the job without over-engineering simple solutions.',
    tone: 'indigo',
  },
  {
    title: 'Milestone Reliability',
    description: 'Transparent timeline estimations, clear weekly demos, and zero surprises on launch day.',
    tone: 'emerald',
  },
]

const highlights: { value: string; label: string; valueClassName: string }[] = [
  { value: '100%', label: 'Dedication to Craft', valueClassName: 'text-fg' },
  { value: 'Type-Safe', label: 'TypeScript First', valueClassName: 'text-blue-600 dark:text-blue-400' },
  { value: 'Direct', label: 'Clear Client Comm', valueClassName: 'text-indigo-600 dark:text-indigo-400' },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_27.5rem] lg:gap-8">
        <div>
          <SectionEyebrow index="01" label="Discovery" />
          <h2 id="about-title" data-reveal="" style={stagger(1)} className="mt-10 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Driven by curiosity, grounded in clean code.
          </h2>

          <div data-reveal="" style={stagger(2)} className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-fg-secondary">
            <p>
              I build web solutions designed to solve real business challenges. Rather than limiting myself to just
              visuals or isolated backend services, I genuinely enjoy understanding the full picture: how data models
              flow through APIs and render smoothly on your customers' screens.
            </p>
            <p>
              Whether you need a high-converting business presence, a full-featured customer dashboard, or API
              optimization, I bring disciplined habits, prompt communication, and a rapid turnaround. I focus heavily on
              writeable, self-documenting code, type safety, and responsive design systems that solve actual business
              challenges without unnecessary bloat.
            </p>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
            {highlights.map((highlight, index) => (
              <Card
                key={highlight.label}
                data-reveal="scale"
                style={stagger(index)}
                className="flex flex-col-reverse px-4 py-4"
              >
                <dt className="mt-1 text-xs text-fg-muted">{highlight.label}</dt>
                <dd className={cn('font-display text-2xl font-bold', highlight.valueClassName)}>{highlight.value}</dd>
              </Card>
            ))}
          </dl>
        </div>

        <Card data-reveal="right" className="self-start p-6 lg:mt-14">
          <h3 className="flex items-center gap-2 font-mono text-sm font-medium tracking-[0.1em] text-fg-secondary uppercase">
            <Icon name="zap" className="size-4 text-blue-600 dark:text-blue-400" />
            Core Engineering Values
          </h3>
          <ul className="mt-6 space-y-3">
            {engineeringValues.map((value, index) => (
              <li key={value.title} data-reveal="right" style={stagger(index + 2)} className="flex gap-3 rounded-xl border border-line-subtle bg-surface-raised p-4">
                <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', toneClasses[value.tone].dot)} aria-hidden="true" />
                <div>
                  <p className="font-display text-[0.95rem] font-semibold text-fg">{value.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-fg-muted">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  )
}
