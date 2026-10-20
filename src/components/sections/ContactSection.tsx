import { Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { site } from '@/data/site'
import { stagger } from '@/lib/stagger'
import { BrandIcon } from '../ui/BrandIcon'
import { Container } from '../ui/Container'
import { SectionEyebrow } from '../ui/SectionHeading'
import { ContactForm } from './ContactForm'

type ContactChannel = {
  label: string
  value: string
  href: string
  icon: ReactNode
  external: boolean
}

function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <Mail className="size-4" aria-hidden="true" />,
      external: false,
    },
    {
      label: 'GitHub',
      value: site.github.label,
      href: site.github.href,
      icon: <BrandIcon name="github" />,
      external: true,
    },
  ]
  if (site.linkedin) {
    channels.push({
      label: 'LinkedIn',
      value: site.linkedin.label,
      href: site.linkedin.href,
      icon: <BrandIcon name="linkedin" />,
      external: true,
    })
  }
  return channels
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-20">
      <Container>
        <SectionEyebrow index="05" label="Contact" />

        <div
          data-reveal="scale"
          className="relative mt-10 grid gap-10 overflow-hidden rounded-panel border border-line bg-linear-to-r from-blue-50 via-indigo-50 to-slate-50 dark:from-blue-950/40 dark:via-indigo-950/25 dark:to-slate-950/40 p-5 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-10 lg:p-12">
          {/* Soft blue glow in the lower-right corner. */}
          <span
            className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-blue-600/15 blur-3xl motion-safe:animate-drift"
            aria-hidden="true"
          />

          <div className="relative">
            <p data-reveal="" style={stagger(2)} className="inline-block rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-600 dark:text-blue-300">
              Open to Freelance & Collaborations
            </p>
            <h2 id="contact-title" data-reveal="" style={stagger(3)} className="mt-4 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-[2.6rem]">
              Have an idea? Let&apos;s build something together.
            </h2>
            <p data-reveal="" style={stagger(4)} className="mt-4 text-[0.95rem] leading-relaxed text-fg-secondary">
              Whether it&apos;s a new website, a custom web app, or improvements to something you already have, send me
              a message and let&apos;s talk about it.
            </p>

            <ul className="mt-8 space-y-3">
              {getContactChannels().map((channel, index) => (
                <li key={channel.label} data-reveal="left" style={stagger(index + 5)}>
                  <a
                    href={channel.href}
                    {...(channel.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={`${channel.label}: ${channel.value}${channel.external ? ' (opens in a new tab)' : ''}`}
                    className="group flex items-center gap-3 rounded-xl border border-line-subtle bg-surface-raised p-3.5 transition-colors hover:border-line"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {channel.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.65rem] tracking-[0.1em] text-fg-muted uppercase">
                        {channel.label}
                      </span>
                      <span className="block truncate font-display text-[0.95rem] font-semibold text-fg group-hover:underline">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="right" style={stagger(4)} className="relative">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
