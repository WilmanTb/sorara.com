import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/lib/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Concept Project`,
    description: project.shortDescription,
    openGraph: { title: `${project.title} — SORARA`, description: project.shortDescription, images: [project.image] },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<div className="project-loading" role="status">Loading concept project...</div>}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 2);
  const hasInteractiveDemo = ["manageflow", "shopora", "dinenow", "gather-church", "brightpath-school", "harborlight-hotel", "admin-dashboard", "cashier-app"].includes(project.slug);

  return (
    <>
      <section className="detail-hero">
        <div className="wrap detail-hero-copy"><Link className="back-link" href="/work"><ArrowLeft size={16} /> All work</Link><span className="concept-pill">CONCEPT PROJECT</span><h1 className="display-title">{project.title}<span>.</span></h1><p>{project.shortDescription}</p><div className="detail-meta"><span>{project.category}</span><span>DESIGN + DEVELOPMENT</span><span>2026 / CONCEPT</span></div>{hasInteractiveDemo ? <Link className="button-primary detail-demo-cta" href={`/demo/${project.slug}`}>Open interactive demo <ArrowUpRight size={16} /></Link> : null}</div>
        <div className="wrap detail-image-wrap"><div className="detail-image" style={{ backgroundColor: project.color }}><Image src={project.image} alt={project.imageAlt} fill priority sizes="100vw" /><span className="detail-image-note">A SORARA CONCEPT / {project.title.toUpperCase()}</span></div></div>
      </section>
      <section className="detail-overview section-pad"><div className="wrap detail-overview-grid"><div><p className="eyebrow">The idea</p><h2 className="display-title">A digital experience<br />for <span>what&apos;s next.</span></h2></div><div><p className="detail-lead">{project.overview}</p><p className="concept-disclaimer">This is a fictional concept project created to demonstrate SORARA&apos;s approach. It is not commissioned client work.</p></div></div></section>
      <section className="detail-story"><div className="wrap detail-story-grid"><article><span className="story-index">01 / THE CHALLENGE</span><h2 className="display-title">The problem</h2><p>{project.problem}</p></article><article><span className="story-index">02 / OUR THINKING</span><h2 className="display-title">The approach</h2><p>{project.solution}</p></article></div></section>
      <section className="detail-features section-pad"><div className="wrap"><div className="detail-feature-heading"><div><p className="eyebrow">Made to matter</p><h2 className="display-title">Thoughtful by<br /><span>design.</span></h2></div><p>Every part of the concept earns its place, balancing a distinctive point of view with clear, useful interactions.</p></div><div className="feature-list">{project.features.map((feature, index) => <div className="feature-row" key={feature}><span>0{index + 1}</span><h3>{feature}</h3><Check size={18} /></div>)}</div><div className="detail-tech"><span className="story-index">THE TOOLKIT</span><div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div></section>
      <section className="related-section"><div className="wrap"><div className="related-heading"><div><p className="eyebrow">Keep exploring</p><h2 className="display-title">More ideas <span>to see.</span></h2></div><Link className="text-link" href="/work">All projects <ArrowRight size={16} /></Link></div><div className="related-grid">{relatedProjects.map((related) => <Link className="related-card" href={`/work/${related.slug}`} key={related.slug}><div className="related-image" style={{ backgroundColor: related.color }}><Image src={related.image} alt={related.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /><span className="concept-mark">CONCEPT PROJECT</span></div><span className="project-category">{related.category}</span><h3>{related.title}<ArrowUpRight size={19} /></h3><p>{related.shortDescription}</p></Link>)}</div></div></section>
      <section className="detail-cta"><div className="wrap detail-cta-inner"><p className="eyebrow">Your turn</p><h2 className="display-title">Have a similar<br />idea brewing?</h2><Link className="button-primary" href="/contact">Let&apos;s talk about it <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
