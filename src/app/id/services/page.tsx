import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Blocks, Braces, Code2, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan",
  description: "Pengembangan situs web, aplikasi web dan seluler, serta sistem bisnis yang sesuai kebutuhan.",
  alternates: { canonical: "/id/services" },
};

const services = [
  { id: "websites", title: "Pengembangan situs web", icon: Code2, tint: "#b7ff6b", intro: "Kesan pertama yang mencerminkan bisnis Anda, dengan langkah berikutnya yang jelas.", solves: "Untuk bisnis yang sudah berkembang melampaui situs sederhana, ingin meluncurkan sesuatu yang baru, atau membutuhkan kehadiran digital yang lebih mewakili kualitas usahanya.", features: ["Desain khusus dan tata letak responsif", "Situs landing, perusahaan, dan portofolio", "Dasar SEO dan struktur aksesibel", "Integrasi CMS dan opsi kontak"], audience: "Startup, bisnis independen, tim yang berkembang, dan siapa pun dengan ide yang layak dibagikan." },
  { id: "web-apps", title: "Pengembangan aplikasi web", icon: Braces, tint: "#a78bfa", intro: "Perangkat lunak khusus yang mengubah pekerjaan rumit menjadi alat yang saling terhubung.", solves: "Untuk tim yang bergantung pada spreadsheet, layanan terpisah, atau pekerjaan manual yang memperlambat kerja dan menyulitkan kepercayaan pada data.", features: ["Dasbor khusus dan alat admin", "Autentikasi dan akses berbasis peran", "Pengelolaan data dan pelaporan", "Integrasi API dan basis data"], audience: "Organisasi yang membutuhkan perangkat lunak sesuai cara kerja timnya." },
  { id: "mobile-apps", title: "Pengembangan aplikasi seluler", icon: Smartphone, tint: "#75cfff", intro: "Layanan yang berguna, tersedia saat dan di mana orang membutuhkannya.", solves: "Untuk ide yang perlu hadir di ponsel: layanan yang lebih dekat dengan pengguna, tim lapangan, atau pengalaman harian yang lebih praktis.", features: ["Pengembangan aplikasi Android dan iOS", "Desain interaksi mobile-first", "Integrasi API dan autentikasi", "Integrasi notifikasi push"], audience: "Bisnis dan pendiri yang ingin mendekatkan layanan kepada pelanggan atau tim." },
  { id: "business-systems", title: "Sistem bisnis & otomatisasi", icon: Blocks, tint: "#ff8b75", intro: "Sistem di balik layar yang membantu tim bekerja dengan lebih baik.", solves: "Untuk bisnis yang menghadapi tugas administrasi berulang, data operasional yang tersebar, atau proses yang seharusnya lebih sederhana.", features: ["Sistem inventaris, pembelian, dan penagihan", "Otomatisasi alur kerja dan alat internal", "Pelaporan dan dasbor operasional", "Sistem sesuai proses kerja yang ada"], audience: "Tim operasional dan bisnis berkembang yang ingin mengganti solusi sementara dengan cara kerja lebih baik." },
];

export default function IndonesianServicesPage() {
  return (
    <>
      <section className="page-hero services-hero"><div className="wrap page-hero-inner"><p className="eyebrow">Alat yang tepat mengubah cara kerja</p><h1 className="display-title">Digital yang<br /><span>bermanfaat.</span></h1><div className="page-hero-bottom"><p>Kami memadukan desain, teknologi, dan pemikiran praktis untuk menyelesaikan masalah yang tepat.</p><span>EMPAT CARA MEWUJUDKAN IDE</span></div></div><div className="services-hero-shape" aria-hidden="true"><span>BUAT</span><span>JADI</span><span>BERGUNA</span></div></section>
      <section className="services-index"><div className="wrap services-index-inner"><span className="eyebrow">Pilih titik awal</span><div>{services.map((service, index) => <a href={`#${service.id}`} key={service.id}>0{index + 1} / {service.title}<ArrowDownRight size={17} /></a>)}</div></div></section>
      {services.map(({ id, title, icon: Icon, intro, solves, features, audience, tint }, index) => <section className={`service-detail-section ${index % 2 ? "service-detail-alt" : ""}`} id={id} key={id}><div className="wrap service-detail-grid"><div className="service-detail-title"><span className="service-large-number">0{index + 1}</span><span className="service-icon large" style={{ backgroundColor: tint }}><Icon size={25} strokeWidth={1.6} /></span><h2 className="display-title">{title}</h2><p>{intro}</p></div><div className="service-detail-copy"><div><span className="story-index">KESEMPATAN</span><p>{solves}</p></div><div><span className="story-index">YANG DAPAT KAMI BANGUN</span><ul>{features.map((feature) => <li key={feature}><span>+</span>{feature}</li>)}</ul></div><div><span className="story-index">COCOK UNTUK</span><p>{audience}</p></div><Link className="text-link" href={`/id/contact?service=${id}`}>Diskusikan layanan ini <ArrowUpRight size={17} /></Link></div></div></section>)}
      <section className="service-end-cta"><div className="wrap"><p className="eyebrow">Ide Anda boleh dimulai dari mana saja</p><h2 className="display-title">Mulai dengan<br /><span>percakapan.</span></h2><Link className="button-primary" href="/id/contact">Ceritakan kebutuhan Anda <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
