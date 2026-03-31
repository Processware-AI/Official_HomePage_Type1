"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { label: t("services"), href: "#services" },
    { label: t("aiAdvisor"), href: "#ai-advisor" },
    { label: t("contact"), href: "#contact" },
  ];

  function switchLocale(newLocale: string) {
    const pathWithoutLocale = pathname.replace(/^\/(en|ko)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#">
          <Image
            src="/logo.png"
            alt="Processware AI"
            width={250}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => switchLocale("en")}
              className={`px-2 py-1 rounded transition-colors ${locale === "en" ? "text-primary font-bold" : "text-muted hover:text-foreground"}`}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => switchLocale("ko")}
              className={`px-2 py-1 rounded transition-colors ${locale === "ko" ? "text-primary font-bold" : "text-muted hover:text-foreground"}`}
            >
              KO
            </button>
          </div>

          <a
            href="#contact"
            className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t("getStarted")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 pb-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile language switcher */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <button
              onClick={() => { switchLocale("en"); setMenuOpen(false); }}
              className={locale === "en" ? "text-primary font-bold" : "text-muted"}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => { switchLocale("ko"); setMenuOpen(false); }}
              className={locale === "ko" ? "text-primary font-bold" : "text-muted"}
            >
              KO
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block bg-primary text-white text-sm font-medium px-5 py-2 rounded-lg text-center hover:bg-primary-dark transition-colors"
          >
            {t("getStarted")}
          </a>
        </div>
      )}
    </nav>
  );
}
