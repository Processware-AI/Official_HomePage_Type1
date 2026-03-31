"use client";

import { useTranslations } from "next-intl";

export default function CoreMessage() {
  const t = useTranslations("CoreMessage");

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {t.rich("text", {
            accent: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </h2>
      </div>
    </section>
  );
}
