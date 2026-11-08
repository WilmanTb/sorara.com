import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/project-gallery";
import { projects } from "@/lib/projects";
import { projectCopy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Karya Pilihan",
  description: "Jelajahi konsep situs web, sistem bisnis, dan produk digital dari SORARA.",
  alternates: { canonical: "/id/work" },
};

export default function IndonesianWorkPage() {
  const featuredProject = projects[1];
  const featuredCopy = projectCopy("id", featuredProject);

  return (
    <>
      <section className="page-hero work-hero"><div className="wrap page-hero-inner"><p className="eyebrow">Lihat kemungkinan yang bisa diwujudkan</p><h1 className="display-title">Ide bagus<br />terlihat <span>nyata.</span></h1><div className="page-hero-bottom"><p>Konsep, eksperimen, dan produk digital yang dirancang untuk membuat keseharian lebih baik.</p><span>PORTOFOLIO / 001—{String(projects.length).padStart(3, "0")}</span></div></div><span className="work-hero-stamp">PIKIR<br />BUAT<br />ULANG</span></section>
      <section className="featured-project section-pad"><div className="wrap featured-layout"><Link className="featured-image" href="/id/work/manageflow" style={{ backgroundColor: featuredProject.color }}><Image src={featuredProject.image} alt={featuredCopy.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 60vw" /><span className="featured-label">KONSEP PILIHAN / 01</span><span className="featured-title">Manage<span>Flow</span></span><span className="featured-open"><ArrowUpRight size={20} /></span></Link><div className="featured-copy"><span className="eyebrow">Konsep pilihan</span><h2 className="display-title">Cara yang lebih tenang<br />mengelola <span>bisnis.</span></h2><p>{featuredCopy.shortDescription} ManageFlow menyatukan aktivitas tim, tugas harian, dan laporan dalam satu ruang kerja yang terarah.</p><div className="project-tags">{featuredProject.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="text-link" href="/id/work/manageflow">Kenali ManageFlow <ArrowUpRight size={17} /></Link><span className="featured-index">01 <i /> {String(projects.length).padStart(2, "0")}</span></div></div></section>
      <section className="gallery-section"><div className="wrap"><div className="gallery-heading"><div><p className="eyebrow">Rak konsep</p><h2 className="display-title">Ide yang <span>berkembang.</span></h2></div><p>Semua proyek di sini adalah konsep fiktif, bukan karya klien. Proyek ini menunjukkan cara kami berpikir dan perhatian pada detail.</p></div><ProjectGallery locale="id" /></div></section>
      <section className="small-cta"><div className="wrap small-cta-inner"><p>Punya ide yang berbeda?</p><Link href="/id/contact">Mari wujudkan ide Anda <ArrowDown size={16} /></Link></div></section>
    </>
  );
}
