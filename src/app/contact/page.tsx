import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, AtSign, Globe, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SORARA to talk about a digital idea or project.",
};

function getContactOptions() {
  const { whatsapp, email, phone, instagram, linkedin } = siteConfig.contact;
  const options = [
    whatsapp ? { label: "WhatsApp", detail: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, "").replace(/^0/, "62")}`, icon: MessageCircle, primary: true, external: true } : null,
    email ? { label: "Email", detail: email, href: `mailto:${email}`, icon: Mail, primary: false, external: false } : null,
    phone ? { label: "Phone", detail: phone, href: `tel:${phone.replace(/\s/g, "")}`, icon: Phone, primary: false, external: false } : null,
    instagram ? { label: "Instagram", detail: "@sorara_com", href: instagram, icon: AtSign, primary: false, external: true } : null,
    linkedin ? { label: "LinkedIn", detail: "Connect on LinkedIn", href: linkedin, icon: Globe, primary: false, external: true } : null,
  ];
  return options.filter((option): option is NonNullable<typeof option> => option !== null);
}

export default function ContactPage() {
  const options = getContactOptions();

  return (
    <>
  <section className="contact-hero"><div className="wrap contact-hero-grid"><div><p className="eyebrow">Good ideas start somewhere</p><h1 className="display-title">Have an idea?<br />Let&apos;s make it <span>happen.</span></h1><p className="contact-intro">Whether you have a project in mind, need a website, or want to explore a digital solution for your business, let&apos;s talk.</p><a className="contact-scroll" href="#contact-options">Find a way to say hello <ArrowDown size={16} /></a></div><div className="contact-art" aria-hidden="true"><div className="contact-circle"><span>LET&apos;S<br />MAKE<br /><b>IT REAL</b></span></div><div className="contact-spark contact-spark-one">✳</div><div className="contact-spark contact-spark-two">✳</div><span className="contact-art-label">AN OPEN<br />INVITATION</span></div></div></section>
  <section className="contact-options section-pad" id="contact-options"><div className="wrap contact-options-grid"><div><p className="eyebrow">Direct, personal, simple</p><h2 className="display-title">Let&apos;s start<br />with <span>hello.</span></h2><p>Tell us what you&apos;re thinking. We&apos;ll listen, ask a few good questions, and figure out a useful next step together.</p><div className="contact-note"><span>01</span><p>No forms. No budget questions. Just a direct conversation when you&apos;re ready.</p></div></div><div className="contact-list">{options.length ? options.map(({ label, detail, href, icon: Icon, primary, external }) => <a className={primary ? "contact-option primary" : "contact-option"} href={href} key={label} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}><span className="contact-option-icon"><Icon size={20} /></span><span className="contact-option-text"><b>{label}</b><small>{detail}</small></span><ArrowUpRight size={18} /></a>) : <div className="contact-unconfigured"><span className="contact-option-icon"><MessageCircle size={20} /></span><div><b>Personal contact details are on the way.</b><p>SORARA is getting its direct contact channels ready. Please check back soon.</p></div></div>}<span className="contact-list-foot">WE&apos;LL MEET YOU WHERE YOU ARE.</span></div></div></section>
  <section className="contact-bottom"><div className="wrap contact-bottom-inner"><span className="eyebrow">A small first step</span><p>Bring the rough idea, the half-formed question, or just a sense that something could work better.</p><Link href="/work">Need a little inspiration first? <ArrowUpRight size={16} /></Link></div></section>
  </>
  );
}
