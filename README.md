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
| `gold-dark` | `#B8940F` | Small text / links on white |
| `charcoal` | `#202728` | Dark backgrounds, header / footer |
| `white` | `#FFFFFF` | Body backgrounds, text on dark |

Tailwind utilities: `bg-gold`, `text-gold-dark`, `bg-charcoal`, `bg-white`, etc. Defined in `src/app/globals.css`.

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
