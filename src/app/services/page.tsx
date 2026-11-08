import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Blocks, Braces, Code2, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web and mobile applications, and business systems built around real needs.",
};

const services = [
  { id: "websites", number: "01", title: "Website development", icon: Code2, intro: "A first impression that feels like you, and a clear next step for the people who find you.", solves: "For businesses that have outgrown a DIY site, need to launch something new, or want a digital presence that finally reflects the quality of their work.", features: ["Custom design and responsive layouts", "Landing, corporate, and portfolio websites", "SEO fundamentals and accessible structure", "CMS integration and contact options"], audience: "Startups, independent businesses, growing teams, and people with something worth sharing.", tint: "#b7ff6b" },
  { id: "web-apps", number: "02", title: "Web applications", icon: Braces, intro: "Purpose-built software that turns a tangle of tasks into one useful, connected tool.", solves: "For teams relying on spreadsheets, disconnected services, or manual work that slows people down and makes information hard to trust.", features: ["Custom dashboards and admin tools", "Authentication and role-based access", "Data management, reporting, and analytics", "API and database integrations"], audience: "Organizations that need software shaped around the way their work actually happens.", tint: "#a78bfa" },
  { id: "mobile-apps", number: "03", title: "Mobile applications", icon: Smartphone, intro: "A useful service, ready when and where people need it.", solves: "For ideas that belong in someone’s pocket: a closer connection to a service, a team in the field, or a more natural everyday experience.", features: ["Android and iOS application development", "Mobile-first interaction design", "API integration and authentication", "Push notification integration"], audience: "Businesses and founders bringing a service closer to their customers or teams.", tint: "#75cfff" },
  { id: "business-systems", number: "04", title: "Business systems & automation", icon: Blocks, intro: "The behind-the-scenes tools that help good teams do their best work.", solves: "For businesses navigating repeated admin, scattered operational data, or processes that should be simpler than they are.", features: ["Inventory, purchasing, and billing systems", "Workflow automation and internal tools", "Reporting and operational dashboards", "Systems built to fit your existing process"], audience: "Operations teams and growing businesses ready to replace workarounds with a better way.", tint: "#ff8b75" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero services-hero"><div className="wrap page-hero-inner"><p className="eyebrow">A good tool changes the work</p><h1 className="display-title">Digital that<br /><span>does something.</span></h1><div className="page-hero-bottom"><p>We bring design, technology, and practical thinking together to solve the right problem.</p><span>FOUR WAYS TO MAKE IT REAL</span></div></div><div className="services-hero-shape" aria-hidden="true"><span>MAKE</span><span>IT</span><span>USEFUL</span></div></section>
  <section className="services-index"><div className="wrap services-index-inner"><span className="eyebrow">Choose your starting point</span><div>{services.map((service) => <a href={`#${service.id}`} key={service.id}>{service.number} / {service.title}<ArrowDownRight size={17} /></a>)}</div></div></section>
  {services.map(({ id, number, title, icon: Icon, intro, solves, features, audience, tint }, index) => (
  <section className={`service-detail-section ${index % 2 ? "service-detail-alt" : ""}`} id={id} key={id}>
          <div className="wrap service-detail-grid"><div className="service-detail-title"><span className="service-large-number">{number}</span><span className="service-icon large" style={{ backgroundColor: tint }}><Icon size={25} strokeWidth={1.6} /></span><h2 className="display-title">{title}</h2><p>{intro}</p></div><div className="service-detail-copy"><div><span className="story-index">THE OPPORTUNITY</span><p>{solves}</p></div><div><span className="story-index">WHAT WE CAN BUILD</span><ul>{features.map((feature) => <li key={feature}><span>+</span>{feature}</li>)}</ul></div><div><span className="story-index">A GOOD FIT FOR</span><p>{audience}</p></div><Link className="text-link" href={`/contact?service=${id}`}>Talk about this service <ArrowUpRight size={17} /></Link></div></div>
        </section>
  ))}
  <section className="service-end-cta"><div className="wrap"><p className="eyebrow">No idea is too early</p><h2 className="display-title">Start with a<br /><span>conversation.</span></h2><Link className="button-primary" href="/contact">Tell us what you need <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
