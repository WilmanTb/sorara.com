"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { interfaceText, localeFromPath, localePath } from "@/lib/i18n";

const footerLinks = [
  { href: "/work", key: "selectedWork" },
  { href: "/services", key: "services" },
  { href: "/about", key: "aboutSorara" },
  { href: "/contact", key: "getInTouch" },
] as const;

export default function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const text = interfaceText[locale];

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand"><Link className="footer-wordmark" href={localePath(locale, "/")}>SORARA<span>.</span></Link><p>{locale === "id" ? <>Studio independen.<br />Solusi digital dengan tujuan.</> : <>Independent by nature.<br />Digital by design.</>}</p></div>
        <div className="footer-column"><span className="footer-label">{text.explore.toUpperCase()}</span>{footerLinks.map(({ href, key }) => <Link href={localePath(locale, href)} key={href}>{text[key]}<ArrowUpRight size={13} /></Link>)}</div>
        <div className="footer-column"><span className="footer-label">{locale === "id" ? "SAPA KAMI" : "SAY HELLO"}</span><Link href={localePath(locale, "/contact")}>{text.sayHello}<ArrowUpRight size={13} /></Link><span className="footer-small">{text.contactPending}</span></div>
        <div className="footer-statement">{locale === "id" ? <>Wujudkan<br />ide <span>berikutnya.</span></> : <>Make your<br />next idea <span>real.</span></>}<small>— {siteConfig.name.toLowerCase()}, {locale === "id" ? "studio untuk ide hebat" : "studio for good ideas"}</small></div>
      </div>
      <div className="wrap footer-bottom"><span>© 2026 SORARA STUDIO</span><span>{locale === "id" ? "Wujudkan ide berikutnya." : siteConfig.tagline}</span><Link href={localePath(locale, "/contact")}>{text.contact.toUpperCase()} <ArrowUpRight size={12} /></Link></div>
    </footer>
  );
}