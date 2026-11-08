import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Heart, Lightbulb, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang SORARA",
  description: "Kenali SORARA, studio solusi digital independen yang memadukan desain matang dan teknologi praktis.",
  alternates: { canonical: "/id/about" },
};

const values = [
  { icon: Lightbulb, title: "Mulai dari rasa ingin tahu", description: "Solusi terbaik dimulai dari pertanyaan yang tepat. Kami memahami kebutuhan, konteks, dan peluang yang ada." },
  { icon: Heart, title: "Manfaat yang terasa", description: "Desain yang baik membuat produk lebih jelas, ramah, dan menyenangkan untuk digunakan." },
  { icon: Compass, title: "Teknologi yang masuk akal", description: "Teknologi seharusnya menyelesaikan masalah nyata, sesuai cara kerja, dan siap berkembang." },
  { icon: Sparkles, title: "Cermat pada detail", description: "Dari sketsa pertama hingga interaksi terakhir, detail kecil membangun kepercayaan." },
];

export default function IndonesianAboutPage() {
  return (
    <>
      <section className="about-hero"><div className="wrap about-hero-inner"><p className="eyebrow">Tentang kami</p><h1 className="display-title">Ide bertemu tujuan,<br />hal baik pun <span>terwujud.</span></h1><div className="about-hero-note"><span>STUDIO DIGITAL INDEPENDEN</span><i /><span>DESAIN / KEMBANGKAN / LUNCURKAN</span></div><div className="about-mark" aria-hidden="true">S<span>O</span></div></div></section>
      <section className="about-intro section-pad"><div className="wrap about-intro-grid"><p className="eyebrow">Siapa kami</p><div><p className="about-lead">SORARA adalah studio solusi digital independen yang berfokus mengubah ide menjadi pengalaman digital yang bermakna.</p><p>Kami memadukan desain yang matang, teknologi modern, dan pemecahan masalah praktis untuk membangun produk yang membawa manfaat. Kami bekerja dekat dengan orang-orang di balik ide tersebut, memperhatikan gambaran besar sekaligus detail kecil.</p></div></div></section>
      <section className="about-values"><div className="wrap"><div className="about-values-heading"><div><p className="eyebrow">Yang kami yakini</p><h2 className="display-title">Prinsip yang<br /><span>memandu kami.</span></h2></div><p>Bukan sekadar daftar. Ini cara kami mengambil keputusan, bekerja bersama, dan mengenali solusi yang tepat.</p></div><div className="values-grid">{values.map(({ icon: Icon, title, description }, index) => <article className="value-item" key={title}><span className="value-number">0{index + 1}</span><span className="value-icon"><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
      <section className="about-approach section-pad"><div className="wrap approach-grid"><div><p className="eyebrow">Pendekatan kami</p><h2 className="display-title">Dimulai dengan<br /><span>pemahaman.</span></h2></div><div><p className="approach-lead">Kami tidak memulai dari teknologi. Kami mulai dari kebutuhan manusia dan perubahan yang benar-benar berarti.</p><p>Kemudian kami menyusun arah bersama, membangun dengan cermat, dan mendampingi hingga peluncuran. Hasilnya adalah produk digital yang dirancang untuk tujuan Anda, bukan templat yang mencari kegunaan.</p><div className="approach-tags"><span>Strategi</span><span>Desain pengalaman</span><span>Rekayasa</span><span>Dukungan berkelanjutan</span></div></div></div></section>
      <section className="about-capabilities"><div className="wrap capability-inner"><span className="eyebrow">Keahlian yang kami satukan</span><div className="capability-line"><span>Strategi digital</span><i>+</i><span>Desain produk</span><i>+</i><span>Teknologi modern</span><i>+</i><span>Pemikiran manusiawi</span></div></div></section>
      <section className="about-cta"><div className="wrap"><p className="eyebrow">Ada sesuatu yang sedang Anda pikirkan?</p><h2 className="display-title">Mari buat<br /><span>lebih berarti.</span></h2><Link className="button-primary" href="/id/contact">Hubungi SORARA <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
