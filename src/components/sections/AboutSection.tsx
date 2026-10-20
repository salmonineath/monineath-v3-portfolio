import { Zap } from 'lucide-react'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/stagger'
import { toneClasses, type Tone } from '@/lib/tones'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { SectionEyebrow } from '../ui/SectionHeading'

const workingPrinciples: { title: string; description: string; tone: Tone }[] = [
  {
    title: 'Whole-Picture Thinking',
    description: 'I care about how the database, server, and interface fit together, not just one layer.',
    tone: 'blue',
  },
  {
    title: 'Practical Solutions',
    description: 'Choosing simple, maintainable tools that fit the problem instead of over-engineering it.',
    tone: 'indigo',
  },
  {
    title: 'Clear Communication',
    description: 'Asking questions early and keeping you informed as the work moves forward.',
    tone: 'emerald',
  },
]

const background: { value: string; label: string; valueClassName: string }[] = [
  { value: 'PSE', label: 'Full-Stack Training', valueClassName: 'text-fg' },
  { value: 'SKAI', label: 'Junior Full-Stack Developer', valueClassName: 'text-blue-600 dark:text-blue-400' },
  { value: 'Figma', label: 'UI/UX Design', valueClassName: 'text-indigo-600 dark:text-indigo-400' },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_27.5rem] lg:gap-8">
        <div>
          <SectionEyebrow index="01" label="About" />
          <h2
            id="about-title"
            data-reveal=""
            style={stagger(1)}
            className="mt-10 text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          >
            Driven by curiosity, grounded in clean code.
          </h2>

          <div data-reveal="" style={stagger(2)} className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-fg-secondary">
            <p>
              I&apos;m a full-stack developer who enjoys building practical software: tools and websites that make
              someone&apos;s work a little easier. I like understanding the whole picture, from how data is stored to
              how it shows up on the screen.
            </p>
            <p>
              I studied full-stack development at Pour un Sourire d&apos;Enfant (PSE), covering frontend and backend
              development, mobile application development, and UI/UX design with Figma. After a three-month full-stack
              internship at SKAI Technology, I joined the company as a Junior Full-Stack Developer.
            </p>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
            {background.map((item, index) => (
              <Card key={item.label} data-reveal="scale" style={stagger(index)} className="flex flex-col-reverse px-4 py-4">
                <dt className="mt-1 text-xs text-fg-muted">{item.label}</dt>
                <dd className={cn('font-display text-2xl font-bold', item.valueClassName)}>{item.value}</dd>
              </Card>
            ))}
          </dl>
        </div>

        <Card data-reveal="right" className="self-start p-6 lg:mt-14">
          <h3 className="flex items-center gap-2 font-mono text-sm font-medium tracking-[0.1em] text-fg-secondary uppercase">
            <Zap className="size-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            How I Work
          </h3>
          <ul className="mt-6 space-y-3">
            {workingPrinciples.map((principle, index) => (
              <li
                key={principle.title}
                data-reveal="right"
                style={stagger(index + 2)}
                className="flex gap-3 rounded-xl border border-line-subtle bg-surface-raised p-4"
              >
                <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', toneClasses[principle.tone].dot)} aria-hidden="true" />
                <div>
                  <p className="font-display text-[0.95rem] font-semibold text-fg">{principle.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-fg-muted">{principle.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  )
}
