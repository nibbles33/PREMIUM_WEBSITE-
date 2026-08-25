# premiumib-website

Next.js website for PremiumIB, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint

## Brand colors

Primary palette only — do not introduce other primary colors without asking.

| Token | Hex | Use |
| --- | --- | --- |
| `gold` | `#D0AD26` | Headlines, accents, buttons |
| `gold-dark` | `#B8940F` | Small text / links on light backgrounds |
| `charcoal` | `#202728` | Dark surfaces, primary text |
| `offwhite` | `#FAFAF8` | Primary page background |
| `secondary` | `#726F66` | Supporting body text |
| `border` | `#E5E3DC` | Hairlines and card borders |
| `white` | `#FFFFFF` | Card surfaces, text on dark |

Tokens live in `src/app/globals.css` (`@theme` — Tailwind v4; no `tailwind.config`). Font: Inter 400/500.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` to change the home page.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
