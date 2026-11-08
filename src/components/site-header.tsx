"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { interfaceText, localeFromPath, localePath, type Locale } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

function LanguageSwitch({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <div className="language-switch" role="group" aria-label="Choose language">
      {(["en", "id"] as const).map((option) => (
        <Link
          aria-label={option === "en" ? "Switch language to English" : "Ganti bahasa ke Bahasa Indonesia"}
          aria-current={locale === option ? "page" : undefined}
          className={locale === option ? "language-option selected" : "language-option"}
          href={localePath(option, pathname)}
          key={option}
        >
          {option.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = localeFromPath(pathname);
  const text = interfaceText[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <header className="site-header">
      <div className="wrap nav-wrap">
        <Link className="wordmark" href={localePath(locale, "/")} aria-label="SORARA home" onClick={() => setMenuOpen(false)}>SORARA<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ href, key }) => {
            const localizedHref = localePath(locale, href);
            return <Link className={pathname === localizedHref || (href !== "/" && pathname.startsWith(`${localizedHref}/`)) ? "nav-link active" : "nav-link"} href={localizedHref} key={href}>{text[key]}</Link>;
          })}
        </nav>
        <div className="nav-actions"><LanguageSwitch locale={locale} pathname={pathname} /><Link className="nav-cta" href={localePath(locale, "/contact")}>{text.startProject} <ArrowUpRight size={15} /></Link></div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {menuOpen ? <nav className="mobile-nav" aria-label={locale === "id" ? "Navigasi utama" : "Mobile navigation"}>{links.map(({ href, key }) => { const localizedHref = localePath(locale, href); return <Link className={pathname === localizedHref ? "mobile-nav-link active" : "mobile-nav-link"} href={localizedHref} key={href} onClick={() => setMenuOpen(false)}>{text[key]}<ArrowUpRight size={17} /></Link>; })}<div className="mobile-language-row"><span>{locale === "id" ? "Bahasa" : "Language"}</span><LanguageSwitch locale={locale} pathname={pathname} /></div><Link className="mobile-start" href={localePath(locale, "/contact")} onClick={() => setMenuOpen(false)}>{text.startProject} <ArrowUpRight size={17} /></Link></nav> : null}
    </header>
  );
}