import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/lib/projects";
import { categoryLabel, projectCopy } from "@/lib/i18n";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Proyek tidak ditemukan" };
  const copy = projectCopy("id", project);
  return {
    title: `${project.title} — Proyek Konsep`,
    description: copy.shortDescription,
    alternates: { canonical: `/id/work/${project.slug}` },
    openGraph: { title: `${project.title} — SORARA`, description: copy.shortDescription, images: [project.image] },
  };
}

export default function IndonesianProjectPage({ params }: ProjectPageProps) {
  return <Suspense fallback={<div className="project-loading" role="status">Memuat proyek konsep...</div>}><ProjectContent params={params} /></Suspense>;
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const copy = projectCopy("id", project);
  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 2);
  const hasInteractiveDemo = ["manageflow", "shopora", "dinenow", "gather-church", "brightpath-school", "harborlight-hotel", "admin-dashboard", "cashier-app"].includes(project.slug);

  return (
    <>
      <section className="detail-hero"><div className="wrap detail-hero-copy"><Link className="back-link" href="/id/work"><ArrowLeft size={16} /> Semua karya</Link><span className="concept-pill">PROYEK KONSEP</span><h1 className="display-title">{project.title}<span>.</span></h1><p>{copy.shortDescription}</p><div className="detail-meta"><span>{categoryLabel("id", project.category)}</span><span>DESAIN + PENGEMBANGAN</span><span>2026 / KONSEP</span></div>{hasInteractiveDemo ? <Link className="button-primary detail-demo-cta" href={`/id/demo/${project.slug}`}>Jelajahi demo interaktif <ArrowUpRight size={16} /></Link> : null}</div><div className="wrap detail-image-wrap"><div className="detail-image" style={{ backgroundColor: project.color }}><Image src={project.image} alt={copy.imageAlt} fill priority sizes="100vw" /><span className="detail-image-note">KONSEP SORARA / {project.title.toUpperCase()}</span></div></div></section>
      <section className="detail-overview section-pad"><div className="wrap detail-overview-grid"><div><p className="eyebrow">Gagasan</p><h2 className="display-title">Pengalaman digital<br />untuk <span>masa depan.</span></h2></div><div><p className="detail-lead">{copy.overview}</p><p className="concept-disclaimer">Ini adalah proyek konsep fiktif untuk menunjukkan pendekatan SORARA, bukan proyek dari klien.</p></div></div></section>
      <section className="detail-story"><div className="wrap detail-story-grid"><article><span className="story-index">01 / TANTANGAN</span><h2 className="display-title">Permasalahan</h2><p>{copy.problem}</p></article><article><span className="story-index">02 / PEMIKIRAN KAMI</span><h2 className="display-title">Pendekatan</h2><p>{copy.solution}</p></article></div></section>
      <section className="detail-features section-pad"><div className="wrap"><div className="detail-feature-heading"><div><p className="eyebrow">Dibuat dengan tujuan</p><h2 className="display-title">Dirancang dengan<br /><span>cermat.</span></h2></div><p>Setiap bagian konsep memiliki tujuan, menyeimbangkan karakter visual dengan interaksi yang jelas dan bermanfaat.</p></div><div className="feature-list">{copy.features.map((feature, index) => <div className="feature-row" key={feature}><span>0{index + 1}</span><h3>{feature}</h3><Check size={18} /></div>)}</div><div className="detail-tech"><span className="story-index">TEKNOLOGI</span><div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div></section>
      <section className="related-section"><div className="wrap"><div className="related-heading"><div><p className="eyebrow">Lihat juga</p><h2 className="display-title">Ide lainnya <span>untuk Anda.</span></h2></div><Link className="text-link" href="/id/work">Semua karya <ArrowRight size={16} /></Link></div><div className="related-grid">{relatedProjects.map((related) => { const relatedCopy = projectCopy("id", related); return <Link className="related-card" href={`/id/work/${related.slug}`} key={related.slug}><div className="related-image" style={{ backgroundColor: related.color }}><Image src={related.image} alt={relatedCopy.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /><span className="concept-mark">PROYEK KONSEP</span></div><span className="project-category">{categoryLabel("id", related.category)}</span><h3>{related.title}<ArrowUpRight size={19} /></h3><p>{relatedCopy.shortDescription}</p></Link>; })}</div></div></section>
      <section className="detail-cta"><div className="wrap detail-cta-inner"><p className="eyebrow">Giliran Anda</p><h2 className="display-title">Punya ide<br />serupa?</h2><Link className="button-primary" href="/id/contact">Mari bicarakan <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
