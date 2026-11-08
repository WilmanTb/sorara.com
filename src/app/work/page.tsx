import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/project-gallery";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore SORARA's concept websites, business systems, and digital product ideas.",
};

export default function WorkPage() {
  const featuredProject = projects[1];

  return (
    <>
      <section className="page-hero work-hero">
        <div className="wrap page-hero-inner">
          <p className="eyebrow">A peek at what could be</p>
          <h1 className="display-title">Good ideas<br />look good <span>in action.</span></h1>
          <div className="page-hero-bottom"><p>Concepts, experiments, and digital products designed to make everyday things work a little better.</p><span>PORTFOLIO / 001—006</span></div>
        </div>
        <span className="work-hero-stamp">THINK<br />MAKE<br />AGAIN</span>
      </section>
      <section className="featured-project section-pad">
        <div className="wrap featured-layout">
          <Link className="featured-image" href={`/work/${featuredProject.slug}`} style={{ backgroundColor: featuredProject.color }}>
            <Image src={featuredProject.image} alt={featuredProject.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 60vw" />
            <span className="featured-label">FEATURED CONCEPT / 01</span><span className="featured-title">Manage<span>Flow</span></span>
            <span className="featured-open"><ArrowUpRight size={20} /></span>
          </Link>
          <div className="featured-copy"><span className="eyebrow">Featured concept</span><h2 className="display-title">A calmer way<br />to run <span>business.</span></h2><p>{featuredProject.shortDescription} ManageFlow brings team activity, everyday tasks, and useful reporting into one focused workspace.</p><div className="project-tags">{featuredProject.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="text-link" href={`/work/${featuredProject.slug}`}>Meet ManageFlow <ArrowUpRight size={17} /></Link><span className="featured-index">01 <i /> 06</span></div>
        </div>
      </section>
      <section className="gallery-section">
        <div className="wrap"><div className="gallery-heading"><div><p className="eyebrow">The concept shelf</p><h2 className="display-title">Ideas in <span>progress.</span></h2></div><p>These are fictional concept projects, not client work. They show how we think, what we value, and the details we bring to a build.</p></div><ProjectGallery /></div>
      </section>
      <section className="small-cta"><div className="wrap small-cta-inner"><p>Have a different idea in mind?</p><Link href="/contact">Let&apos;s make yours <ArrowDown size={16} /></Link></div></section>
    </>
  );
}
