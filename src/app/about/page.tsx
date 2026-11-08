import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Heart, Lightbulb, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Meet SORARA, an independent digital solutions studio combining thoughtful design and practical technology.",
};

const values = [
  { icon: Lightbulb, title: "Curiosity first", description: "The best solution starts with better questions. We take time to understand the people, the context, and the opportunity." },
  { icon: Heart, title: "Useful is beautiful", description: "Good design earns its place. It makes a product clearer, more welcoming, and more enjoyable to use." },
  { icon: Compass, title: "Make it make sense", description: "Technology should solve a real problem, fit the way people work, and be ready for what comes next." },
  { icon: Sparkles, title: "Care in the details", description: "From the first sketch to the last interaction, the little decisions add up to something people trust." },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero"><div className="wrap about-hero-inner"><p className="eyebrow">A little about us</p><h1 className="display-title">Good things happen<br />when ideas meet <span>intention.</span></h1><div className="about-hero-note"><span>INDEPENDENT DIGITAL STUDIO</span><i /> <span>DESIGN / BUILD / LAUNCH</span></div><div className="about-mark" aria-hidden="true">S<span>O</span></div></div></section>
  <section className="about-intro section-pad"><div className="wrap about-intro-grid"><p className="eyebrow">Who we are</p><div><p className="about-lead">SORARA is an independent digital solutions studio focused on turning ideas into meaningful digital experiences.</p><p>We combine thoughtful design, modern technology, and practical problem-solving to build products that make a difference. We work closely with the people behind an idea, giving the big picture the same care as the small details.</p></div></div></section>
  <section className="about-values"><div className="wrap"><div className="about-values-heading"><div><p className="eyebrow">What guides us</p><h2 className="display-title">A few things<br />we <span>believe.</span></h2></div><p>Not a checklist. A way of making decisions, working together, and knowing when a solution feels right.</p></div><div className="values-grid">{values.map(({ icon: Icon, title, description }, index) => <article className="value-item" key={title}><span className="value-number">0{index + 1}</span><span className="value-icon"><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
  <section className="about-approach section-pad"><div className="wrap approach-grid"><div><p className="eyebrow">Our approach</p><h2 className="display-title">Thoughtful<br />from the <span>start.</span></h2></div><div><p className="approach-lead">We don&apos;t begin with a technology stack. We begin with people, their needs, and what would make a meaningful difference.</p><p>Then we shape a direction together, build with care, and stay close through launch. The result is a digital product designed around your goals, not a template looking for a use.</p><div className="approach-tags"><span>Strategy</span><span>Experience design</span><span>Engineering</span><span>Ongoing care</span></div></div></div></section>
  <section className="about-capabilities"><div className="wrap capability-inner"><span className="eyebrow">What we bring together</span><div className="capability-line"><span>Digital strategy</span><i>+</i><span>Product design</span><i>+</i><span>Modern technology</span><i>+</i><span>Human thinking</span></div></div></section>
  <section className="about-cta"><div className="wrap"><p className="eyebrow">Have something in mind?</p><h2 className="display-title">Let&apos;s make<br /><span>it matter.</span></h2><Link className="button-primary" href="/contact">Talk with SORARA <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
