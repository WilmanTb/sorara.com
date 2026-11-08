import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, Braces, Code2, Smartphone } from "lucide-react";
import { projects } from "@/lib/projects";
import { categoryLabel, interfaceText, projectCopy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Wujudkan Ide Berikutnya",
  description: "SORARA adalah studio solusi digital independen yang mengubah ide menjadi situs web, aplikasi, dan sistem bisnis.",
  alternates: { canonical: "/id" },
};

const services = [
  { title: "Pengembangan situs web", icon: Code2, tint: "#b7ff6b" },
  { title: "Pengembangan aplikasi web", icon: Braces, tint: "#a78bfa" },
  { title: "Pengembangan aplikasi seluler", icon: Smartphone, tint: "#75cfff" },
  { title: "Sistem bisnis & otomatisasi", icon: Blocks, tint: "#ff8b75" },
];

const process = [
  ["01", "Temukan", "Memahami tujuan, kebutuhan, dan tantangan Anda."],
  ["02", "Rancang", "Menyusun pengalaman yang mudah digunakan dan konsep visual yang tepat."],
  ["03", "Kembangkan", "Membangun produk digital yang andal, responsif, dan siap berkembang."],
  ["04", "Luncurkan", "Menyiapkan solusi agar siap digunakan di dunia nyata."],
];

export default function IndonesianHomePage() {
  const text = interfaceText.id;

  return (
    <>
      <section className="hero-shell">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="wrap hero-content">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Studio digital independen</p>
            <h1 className="display-title">Ide Anda layak punya <span>dunia digital.</span> Mari wujudkan.</h1>
            <p className="hero-description">Kami merancang dan mengembangkan situs web, aplikasi, serta sistem digital untuk mengubah ide besar menjadi nyata.</p>
            <div className="hero-actions"><Link className="button-primary" href="/id/work">{text.explore} karya kami <ArrowUpRight size={17} /></Link><Link className="button-light" href="/id/contact">Mulai proyek <ArrowRight size={16} /></Link></div>
            <div className="hero-note"><span className="note-dot" /> Strategi, desain &amp; pengembangan <span className="note-separator">/</span> Siap untuk masa depan</div>
          </div>
          <div className="hero-art" aria-label="Pratinjau berlapis dari antarmuka produk digital">
            <div className="art-spark art-spark-a">✳</div><div className="art-spark art-spark-b">✳</div>
            <div className="hero-window window-back"><div className="window-top"><i /><i /><i /><span>shopora.store</span></div><div className="window-back-body"><div className="back-chip" /><div className="back-line long" /><div className="back-line" /><div className="back-shape" /></div></div>
            <div className="hero-window window-front"><div className="mock-nav"><b>goodform<span>.</span></b><span>KOLEKSI BARU　 OBJEK　 JURNAL</span><div className="mock-bag">TAS <small>02</small></div></div><div className="mock-hero"><div className="mock-copy"><small>KOLEKSI SEHARI-HARI</small><strong>Temukan<br />ruang untuk<br />hidup.</strong><span>Jelajahi koleksi ↗</span></div><div className="mock-photo"><div className="photo-orb" /><div className="photo-vase" /></div></div><div className="mock-foot"><span>01 — OBJEK DENGAN TUJUAN</span><span>GULIR UNTUK MENJELAJAHI ↓</span></div></div>
            <div className="floating-sticker"><span>✦</span><small>IDE<br />BERGERAK</small></div><div className="art-caption">Ide yang baik<br />layak diwujudkan.</div>
          </div>
          <a className="hero-scroll" href="#selected-work"><ArrowDown size={16} /> Gulir untuk menjelajah</a>
        </div>
      </section>
      <section className="intro-strip"><div className="wrap intro-inner"><span className="eyebrow">Studio kecil. Pemikiran besar.</span><p>Kami mengubah <em>“bagaimana jika?”</em> menjadi sesuatu yang bisa digunakan, disukai, dan dikembangkan.</p><span className="intro-mark">S<span>O</span>RARA</span></div></section>
      <section className="section-pad work-section" id="selected-work"><div className="wrap"><div className="section-heading-row"><div><p className="eyebrow">Konsep pilihan / 2025—26</p><h2 className="display-title">Ide bagus,<br /><span>jadi nyata.</span></h2></div><p className="section-intro">Sekilas tentang kemungkinan yang lahir dari desain digital yang dipikirkan dengan matang. Semua proyek ini adalah konsep, bukan karya klien. Buka halaman pratinjau langsung tiap konsep untuk melihat arah desain, fitur utama, dan ide di baliknya.</p></div><div className="home-project-grid">{projects.map((project, index) => <Link className={`home-project home-project-${index + 1}`} href={`/id/work/${project.slug}`} key={project.slug}><div className={`project-visual visual-${project.slug}`}><Image src={project.image} alt={projectCopy("id", project).imageAlt} fill sizes="(max-width: 700px) 100vw, 40vw" /><span className="concept-mark">{text.conceptProject}</span></div><div className="project-meta"><div><span className="project-category">{categoryLabel("id", project.category)}</span><h3>{project.title}</h3></div><span className="project-arrow"><ArrowUpRight size={19} /></span></div><p className="project-description">{projectCopy("id", project).shortDescription}</p><div className="project-tags">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div></Link>)}</div><div className="work-cta"><Link href="/id/work" className="text-link">{text.selectedWork} <ArrowRight size={17} /></Link><span>06 / 06 {text.concepts.toUpperCase()}</span></div></div></section>
      <section className="services-section section-pad"><div className="wrap"><div className="services-top"><div><p className="eyebrow">Yang kami buat</p><h2 className="display-title">Digital yang<br /><span>bertujuan.</span></h2></div><p>Teknologi yang baik bukan sekadar berfungsi. Teknologi seharusnya membuat sesuatu lebih mudah, jelas, dan mungkin dilakukan.</p></div><div className="service-list">{services.map(({ title, icon: Icon, tint }, index) => <article className="service-row" key={title}><span className="service-number">0{index + 1}</span><span className="service-icon" style={{ backgroundColor: tint }}><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3><p>Solusi digital yang dirancang sesuai kebutuhan dan membantu pekerjaan sehari-hari.</p><Link href="/id/services" aria-label={`Pelajari tentang ${title}`}><ArrowUpRight size={19} /></Link></article>)}</div><div className="services-bottom"><span className="eyebrow">Dari sketsa pertama hingga siap digunakan</span><Link className="text-link" href="/id/services">Lihat layanan kami <ArrowRight size={17} /></Link></div></div></section>
      <section className="process-section section-pad"><div className="wrap"><div className="process-heading"><p className="eyebrow">Langkah yang jelas, bersama</p><h2 className="display-title">Dari ide<br />menjadi <span>nyata.</span></h2><p>Proses yang transparan: pertanyaan yang tepat, keputusan bersama, dan langkah terukur dari ide hingga peluncuran.</p></div><div className="process-steps">{process.map(([number, title, description]) => <article className="process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>
      <section className="home-cta"><div className="wrap cta-inner"><div><p className="eyebrow">Langkah berikutnya ada di tangan Anda</p><h2 className="display-title">Punya ide?<br />Mari buat <span>sesuatu yang hebat.</span></h2></div><div className="cta-side"><p>Ceritakan apa yang sedang Anda pikirkan. Kami bantu menentukan langkah selanjutnya.</p><Link className="button-dark" href="/id/contact">Ayo bicara <ArrowUpRight size={18} /></Link><span className="cta-scribble">↗</span></div></div><div className="cta-bottom-mark">SORARA — WUJUDKAN IDE BERIKUTNYA</div></section>
    </>
  );
}
