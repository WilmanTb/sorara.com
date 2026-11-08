# SORARA Website Development Brief

## Project

Build a polished, responsive website for **SORARA**, an independent digital solutions studio.

- Tagline: **Make your next idea real.**
- Main message: **We turn ideas into digital experiences.**
- Services: Website Development, Web Application Development, Mobile Application Development, Business Systems & Automation.
- The site is both a portfolio and a direct-contact marketing platform.
- Do not invent clients, team members, awards, history, testimonials, or contact details.

## Technology

- Next.js App Router, TypeScript (strict), Tailwind CSS, shadcn/ui, Lucide React, and Motion.
- Use Server Components by default; add client-side code only for needed interactions.
- Backend/database phase: Microsoft SQL Server with Prisma ORM, following the installed Prisma 7 configuration conventions. Verify the installed connector requirements before integrating it. No Supabase or PostgreSQL.
- Keep secrets and database access on the server. Validate server mutations and enforce server-side authorization.
- Use a storage abstraction that can support local development and a future production object store.

## Brand and Visual Direction

Creative, confident, professional, and approachable; avoid generic agency templates and repetitive card grids. Use editorial layouts, whitespace, strong typography, varied compositions, high-quality visual project concepts, responsive behavior, restrained motion, and accessible interactions.

Brand colors:

| Name | Hex |
| --- | --- |
| Midnight | `#17151F` |
| Electric Lime | `#B7FF6B` |
| Lavender | `#A78BFA` |
| Coral | `#FF8B75` |
| Sky Blue | `#75CFFF` |
| Soft Yellow | `#FFD66E` |
| Warm White | `#F7F6F2` |

Use Space Grotesk for headings, Inter for body text, and IBM Plex Mono for technical labels where practical. Create a text-based SORARA wordmark and simple S monogram/favicon treatment.

## Public Routes

- `/` — homepage
- `/work` — filterable portfolio
- `/work/[slug]` — project details
- `/services` — service descriptions
- `/about` — studio, values, and approach
- `/contact` — direct communication

The navigation includes Home, Work, Services, About, Contact, and a Start a Project CTA. Provide responsive navigation, clear active states, and a footer with useful links and configured contact channels.

### Languages

Support English and Bahasa Indonesia across all public pages. Keep the existing English URLs and provide Indonesian equivalents under `/id` (for example, `/work` and `/id/work`). Include an accessible EN/ID language switch that preserves the current page and project slug. Translate navigation, page content, project details, category filters, contact copy, and metadata. Set the document language appropriately and include both locales in the sitemap. Keep project names, technology names, and configured contact details consistent between languages.

### Homepage

Include a strong dark hero with expressive typography, lime/lavender accents, the headline “Your ideas deserve a digital world. Let's build it.”, supporting copy, and Work/Contact CTAs. Follow with selected work, the four services, the four-step process (Discover, Design, Develop, Launch), a distinctive contact CTA, and footer.

### Work and Concept Projects

Create a responsive, visually varied gallery with category filters (All, Website, Web Application, Mobile Application, Business System), featured work, technology tags, descriptions, project links, and a meaningful empty state.

Include eight realistic fictional concepts, clearly labeled **Concept Project** or **Demo Project**:

1. **Shopora** — e-commerce catalog, product detail, cart, checkout, and order-management concept.
2. **ManageFlow** — business dashboard, statistics, data management, reporting, and workflows.
3. **DineNow** — restaurant site, menu, reservation concept, location/contact, responsive presentation.
4. **Gather Church** — welcoming church website concept with service information, community events, sermon resources, and ministry groups.
5. **Brightpath School** — school website concept with admissions, school calendar, learning information, and family resources.
6. **Harborlight Hotel** — boutique hotel website concept with room discovery, amenity information, date-based availability preview, and a demo-only booking flow.
7. **Admin Dashboard** — seven-menu sample operational workspace with users, products, orders, reports, activity, and settings. Not the real SORARA admin panel; no authentication or actual access control.
8. **Cashier App** — minimarket, coffee-shop, and store point-of-sale concept with product/code search, stock-aware baskets, IDR discounts, simulated checkout, cash/change calculation, and receipt history. No real payments.

Each project detail page includes overview, problem, proposed solution, features, visual gallery/previews, technology, optional demo link, related projects, contact CTA, and SEO metadata. Never imply concept projects are client work.

### Services

Explain the four services in terms of user needs, problems solved, capabilities, typical features, and getting started. Website capabilities include custom responsive sites, landing/corporate/portfolio sites, SEO fundamentals, CMS, and contact options. Web app capabilities include authentication, dashboards, CRUD, reporting, APIs, and databases. Mobile capabilities include Android/iOS, APIs, authentication, push notifications, and mobile UX. Business systems include inventory, billing, purchasing, workflows, reporting, and internal applications. Do not display fixed prices or budget ranges.

### About

Introduce SORARA as an independent digital solutions studio combining thoughtful design, modern technology, and practical problem-solving. Describe mission, values, approach, and capabilities without fabricating a team, history, clients, awards, or achievements.

### Contact

Contact is direct and personal. **Do not create a project inquiry form, budget question, lead workflow, inquiry API, or inquiry database table.** Configure WhatsApp, email, optional phone, Instagram, and other channels centrally. Hide any unconfigured channel; never show placeholder contact details publicly. Configured WhatsApp opens a direct chat, email uses `mailto:`, and social profiles open their configured URLs. Do not invent contact information.

## Admin Routes and Content Management

- `/admin/dashboard`
- `/admin/projects`, `/admin/projects/new`, `/admin/projects/[id]/edit`
- `/admin/categories`
- `/admin/services`
- `/admin/testimonials`
- `/admin/settings`

Keep admin UX visually distinct and optimized for content management. Dashboard metrics include total/published/featured projects, services, and recent content updates. Project management covers title, slug, descriptions, category, images/gallery, technology tags, features, demo URL, featured/publication status, display order, and timestamps. Support CRUD for categories, services, testimonials, and settings. Testimonials must be genuine. Secure authentication, server-side authorization, and validation are required before exposing admin mutations.

## Data Model (Backend Phase)

Use SQL Server and Prisma. Suggested relational entities: Admin, Project, ProjectImage, Category, Service, Testimonial, SiteSetting. Include suitable IDs, relations, unique constraints, indexes, timestamps, SQL Server-compatible types, and deliberate cascade behavior. Do not store relational values as comma-separated strings. Do not add Inquiry entities. Keep contact details configurable and secrets server-only.

## Quality Requirements

- Responsive desktop/mobile layout; accessible semantics, keyboard navigation, visible focus, contrast, and reduced-motion support.
- Optimized images, minimal client JavaScript, stable layouts, and performant animation.
- Page-specific metadata, Open Graph, sitemap, robots, canonical URLs where suitable, and SEO-friendly project paths.
- Every visible control must work; avoid fake interactions. Include meaningful loading, empty, success, and error states where applicable.
- No public pricing, budget questions, inquiry forms, invented contact information, or fake testimonials.

## Incremental Delivery

1. Foundation: Next.js, TypeScript, Tailwind, shadcn/ui, icons/motion, design tokens, layout, navigation, footer.
2. Public pages and responsive visual polish.
3. Eight interactive concept project experiences: Shopora, ManageFlow, DineNow, Gather Church, Brightpath School, Harborlight Hotel, Admin Dashboard, and Cashier App. Keep demo actions local and clearly distinguish simulated transactions from real payments, bookings, school inquiries, or church visit submissions. The dashboard concept must remain distinct from SORARA's future protected admin CMS.
4. Prisma 7 + SQL Server, schema/migrations, server-side data access, settings, and image storage abstraction.
5. Admin authentication and management routes.
6. SEO, performance, accessibility, security, responsive checks, and deployment preparation.

Build incrementally, inspect existing files before modifying them, keep changes focused, and verify installed Prisma/SQL Server compatibility before database work. Do not overengineer or replace working code unnecessarily.
