"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-foreground text-white/70 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Image
          src="/logo-white.png"
          alt="Processware AI"
          width={250}
          height={60}
          className="h-14 w-auto"
        />
        <p>{t("rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
