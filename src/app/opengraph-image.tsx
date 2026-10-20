import { ImageResponse } from 'next/og'
import { site } from '@/data/site'

export const alt = `${site.name} — ${site.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social preview card in the site's dark theme, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'radial-gradient(900px circle at 50% 0%, rgba(59,130,246,0.18), transparent 70%), #07090e',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 16,
              background: 'linear-gradient(45deg, #2563eb, #6366f1)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 30, color: '#94a3b8' }}>{site.brand}</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 96,
            fontWeight: 800,
            backgroundImage: 'linear-gradient(90deg, #60a5fa, #a5b4fc 50%, #c084fc)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {site.name}
        </div>
        <div style={{ marginTop: 8, fontSize: 52, fontWeight: 700 }}>{site.title}</div>
        <div style={{ marginTop: 28, fontSize: 28, color: '#cbd5e1', maxWidth: 900, lineHeight: 1.4 }}>
          {site.description}
        </div>
      </div>
    ),
    size,
  )
}
