# PremiumIB Website

Marketing site for [Premium Insurance Brokers](https://premiumib.com/) (Windsor-Essex) — a division of Oracle RMS.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Archivo (400 / 500 / 600)
- lucide-react

## Getting started

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Brand colors

| Token | Hex | Use |
| --- | --- | --- |
| `gold` | `#D0AD26` | Accents, CTAs |
| `gold-dark` | `#B8940F` | Links / small text on light |
| `charcoal` | `#202728` | Dark surfaces, primary text |
| `offwhite` | `#FAFAF8` | Page background |
| `secondary` | `#726F66` | Supporting body text |
| `border` | `#E5E3DC` | Hairlines |

Tokens live in `src/app/globals.css` (`@theme`).

## Award assets

Community and industry badges live in `public/images/awards/`.
