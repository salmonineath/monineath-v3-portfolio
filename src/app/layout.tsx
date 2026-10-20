import type { Metadata, Viewport } from 'next'
import { Fira_Code, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { Providers } from '@/components/providers/Providers'
import { site } from '@/data/site'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import '@/styles/globals.css'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fira-code',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const pageTitle = `${site.name} — ${site.title}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: pageTitle,
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: pageTitle,
    description: site.description,
    siteName: site.brand,
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: site.description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07090e' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
}

/** Applies the saved theme before first paint to avoid a flash. */
const themeScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script may change `data-theme` before React hydrates.
    <html lang="en" data-theme="dark" className={`${firaCode.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* Scroll reveals need JavaScript; show everything without it. */}
          <style>{'[data-reveal]{opacity:1!important;translate:none!important;scale:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
