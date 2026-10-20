# monineath.dev — Personal Portfolio

Single-page portfolio built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, and Lucide icons.

## Repository

The code lives on GitLab: https://gitlab.com/personal-project4924743/monineath-v3-portfolio

```bash
git clone git@gitlab.com:personal-project4924743/monineath-v3-portfolio.git
cd monineath-v3-portfolio
npm install
```

- `main` is the default branch; day-to-day work happens on `develop`.
- The previous GitHub repository (`github.com/salmonineath/monineath-v3-portfolio`) is kept as a backup under the `github` remote. Push to it with `git push github <branch>` only if you want to keep it in sync.

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Production build | `npm run build` then `npm start` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Unit tests | `npm test` |

## Before launch: content to supply

| What | Where |
|---|---|
| Real projects + screenshots (16:10, e.g. 1600×1000) | `src/data/projects.ts`, images in `public/images/projects/` |
| Site URL | `NEXT_PUBLIC_SITE_URL` env var (see `.env.example`) |

## Where things live

- `src/app/` — layout (fonts, metadata, theme script), the page, Open Graph image, robots, sitemap, and the contact server action.
- `src/styles/globals.css` — the design system: theme colors (dark + light), fonts, layout tokens, animations. Components use semantic tokens (`bg-page`, `text-fg-muted`, `border-line`, …), never raw hex values.
- `src/data/` — all editable content: `site.ts` (name, email, GitHub/GitLab/LinkedIn links, photo path), `stack.ts`, `services.ts`, `projects.ts`.
- `src/components/ui/` — shared primitives (buttons, cards, tags, headings, brand icons).
- `src/components/layout/` — header, footer, theme toggle.
- `src/components/sections/` — one file per page section, in page order in `src/app/page.tsx`.
- `src/components/projects/` — project card and screenshot frame.
- `src/lib/` — helpers (class names, tones, contact form validation).

## Notes

- **Contact form:** validated in the browser and again in the server action `src/app/actions/sendInquiry.ts`. Set `CONTACT_WEBHOOK_URL` (server-only) to an endpoint that accepts JSON `{ name, email, message }` (e.g. a Formspree form endpoint) to deliver messages. Without it, the form opens the visitor's email app with the message drafted. The form only says "sent" when the endpoint confirms delivery.
- **Theme:** dark by default; the toggle stores the choice in `localStorage` and an inline script applies it before first paint.
- **Motion:** hero entrance and scroll reveals are CSS (they run before hydration); Motion handles the nav highlight, mobile menu, stack filter, and portrait drift. All motion respects `prefers-reduced-motion`.
- **Brand icons:** paths from [Simple Icons](https://simpleicons.org) (CC0), inlined in `src/components/ui/BrandIcon.tsx`.
