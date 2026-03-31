"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left — Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {t.rich("headline", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted max-w-xl mx-auto md:mx-0">
            {t("subheadline")}
          </p>
          <p className="mt-3 text-base text-muted max-w-lg mx-auto md:mx-0">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#ai-advisor"
              className="bg-primary text-white font-semibold px-7 py-3 rounded-lg hover:bg-primary-dark transition-colors text-center"
            >
              {t("ctaAdvisor")}
            </a>
            <a
              href="#services"
              className="border-2 border-primary text-primary font-semibold px-7 py-3 rounded-lg hover:bg-accent transition-colors text-center"
            >
              {t("ctaSolutions")}
            </a>
          </div>
        </div>

        {/* Right — Visual */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-32 h-32 rounded-full bg-primary/15 -top-4 -right-4" />
            <div className="absolute w-24 h-24 rounded-full bg-primary/10 bottom-8 -left-6" />
            <div className="absolute w-16 h-16 rounded-full bg-primary/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-3 opacity-80">
                <svg className="w-20 h-20 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-primary/70">{t("visualLabel")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
