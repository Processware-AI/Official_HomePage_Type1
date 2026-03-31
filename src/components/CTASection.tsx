"use client";

import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t.rich("title", {
            accent: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t("contact")}
          </a>
          <a
            href="#contact"
            className="border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-accent transition-colors"
          >
            {t("demo")}
          </a>
        </div>
      </div>
    </section>
  );
}
