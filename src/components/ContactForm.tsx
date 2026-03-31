"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const initialForm: FormData = { name: "", email: "", company: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = useTranslations("Contact");

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = t("nameRequired");
    if (!form.email.trim()) {
      errs.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t("emailInvalid");
    }
    if (!form.message.trim()) errs.message = t("messageRequired");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // To integrate a real webhook, replace the above with:
      // await fetch("YOUR_WEBHOOK_URL", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 bg-accent">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t("successTitle")}</h2>
          <p className="text-muted mb-6">{t("successMessage")}</p>
          <button
            onClick={() => setStatus("idle")}
            className="text-primary font-semibold hover:underline"
          >
            {t("sendAnother")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 bg-accent">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          {t("title")}
        </h2>
        <p className="text-muted text-center mb-10">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              {t("name")} <span className="text-primary">{t("required")}</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm outline-none transition-colors focus:border-primary ${
                errors.name ? "border-red-400" : "border-border"
              }`}
              placeholder={t("namePlaceholder")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              {t("email")} <span className="text-primary">{t("required")}</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm outline-none transition-colors focus:border-primary ${
                errors.email ? "border-red-400" : "border-border"
              }`}
              placeholder={t("emailPlaceholder")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1.5">
              {t("company")}
            </label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground text-sm outline-none transition-colors focus:border-primary"
              placeholder={t("companyPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              {t("message")} <span className="text-primary">{t("required")}</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm outline-none transition-colors resize-none focus:border-primary ${
                errors.message ? "border-red-400" : "border-border"
              }`}
              placeholder={t("messagePlaceholder")}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 text-center">{t("errorMessage")}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("send")}
          </button>
        </form>
      </div>
    </section>
  );
}
