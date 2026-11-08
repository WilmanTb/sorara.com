# SORARA

SORARA is an independent digital solutions studio. This repository contains the public studio website and eight clearly labeled concept projects, including church, school, and hotel websites, an admin dashboard, and a cashier application.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/). Development runs without the production base path. Use `npm run lint` and `npm run build` for checks.

## GitHub Pages URL

The public URL is configured in `src/lib/site-config.ts`: `https://wilman.github.io/sorara.com`. Production builds derive `/sorara.com` from this URL, while metadata, sitemap, and robots use the same configured address. Rebuild after changing the URL.

`npm run build` exports the site to `out/`. Publish the contents of that folder to the `wilman/sorara.com` repository's GitHub Pages site using a Pages deployment. Enable Pages in the repository settings; changing the URL in code alone does not deploy the website. Do not upload only the source files or use `next start` to serve a static export.

## Contact configuration

Update `contact` in `src/lib/site-config.ts` when the studio's personal channels are ready. Keep unset values empty: the contact page omits channels that have no configured detail. No inquiry form or lead storage is implemented.

## Public routes

English is available at `/`, `/work`, `/work/[slug]`, `/services`, `/about`, and `/contact`. Indonesian equivalents are available under `/id`: `/id`, `/id/work`, `/id/work/[slug]`, `/id/services`, `/id/about`, and `/id/contact`.

Use the EN/ID links in the navigation to switch languages while staying on the equivalent page. Project slugs remain the same in both languages.

Interactive concept previews are available at `/demo/manageflow`, `/demo/shopora`, `/demo/dinenow`, `/demo/gather-church`, `/demo/brightpath-school`, `/demo/harborlight-hotel`, `/demo/admin-dashboard`, and `/demo/cashier-app`, with Indonesian versions under `/id/demo/`. All interactions use sample data only. No payment, reservation, visit plan, school information, or hotel booking is submitted.

The portfolio concepts are fictional examples, not client work. Project copy and metadata live in `src/lib/projects.ts`.

The church demo includes original daily devotionals (Santapan rohani) and expandable sample announcements. The school demo includes a profile, sample student/teacher/staff counts, facilities, programs, and family-support information. All school counts are explicitly marked as demo data. The hotel demo includes room-detail dialogs from its gallery and availability results, room amenities, guest services, and sample stay policies. These bilingual additions live in `src/components/demos/community-details.tsx`.

## Current delivery scope

The Admin Dashboard concept includes Overview, Users, Products, Orders, Reports, Activity, and Settings, with sample record changes and CSV reporting. It is not SORARA's protected admin panel and provides no real authentication or access control. The Cashier App concept includes minimarket, coffee-shop, and store catalogs, stock-aware quantities, IDR discounts, cash/change calculation, simulated digital checkout, and receipt history. Both use session-only state, reset on reload, and never process real payments. Their bilingual implementation lives in `src/components/demos/operations-demos.tsx`.

The foundation, bilingual public website, language switch, and eight interactive concept demos are implemented with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui setup, Lucide icons, Motion, and Next font optimization. The SQL Server/Prisma 7 integration and secured admin dashboard remain later phases; no database credentials or contact details have been added. Verify the installed Prisma 7 SQL Server connector requirements before starting that work.
