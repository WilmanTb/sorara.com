# SORARA

SORARA is an independent digital solutions studio. This repository contains the public studio website and six clearly labeled concept projects, including a church, school, and hotel website.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run lint` and `npm run build` for checks.

## Contact configuration

Update `contact` in `src/lib/site-config.ts` when the studio's personal channels are ready. Keep unset values empty: the contact page omits channels that have no configured detail. No inquiry form or lead storage is implemented.

## Public routes

English is available at `/`, `/work`, `/work/[slug]`, `/services`, `/about`, and `/contact`. Indonesian equivalents are available under `/id`: `/id`, `/id/work`, `/id/work/[slug]`, `/id/services`, `/id/about`, and `/id/contact`.

Use the EN/ID links in the navigation to switch languages while staying on the equivalent page. Project slugs remain the same in both languages.

Interactive concept previews are available at `/demo/manageflow`, `/demo/shopora`, `/demo/dinenow`, `/demo/gather-church`, `/demo/brightpath-school`, and `/demo/harborlight-hotel`, with Indonesian versions under `/id/demo/`. All interactions use sample data only. No payment, reservation, visit plan, school information, or hotel booking is submitted.

The portfolio concepts are fictional examples, not client work. Project copy and metadata live in `src/lib/projects.ts`.

## Current delivery scope

The foundation, bilingual public website, language switch, and six interactive concept demos are implemented with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui setup, Lucide icons, Motion, and Next font optimization. The SQL Server/Prisma 7 integration and secured admin dashboard remain later phases; no database credentials or contact details have been added. Verify the installed Prisma 7 SQL Server connector requirements before starting that work.
