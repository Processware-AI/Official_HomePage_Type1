"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Pillar = "Product" | "Process" | "People";

const questions = [
  {
    id: "need",
    labelKey: "q1" as const,
    options: [
      { value: "solution", labelKey: "q1_solution" as const },
      { value: "process", labelKey: "q1_process" as const },
      { value: "training", labelKey: "q1_training" as const },
    ],
  },
  {
    id: "challenge",
    labelKey: "q2" as const,
    options: [
      { value: "automation", labelKey: "q2_automation" as const },
      { value: "compliance", labelKey: "q2_compliance" as const },
      { value: "capability", labelKey: "q2_capability" as const },
    ],
  },
  {
    id: "org",
    labelKey: "q3" as const,
    options: [
      { value: "startup", labelKey: "q3_startup" as const },
      { value: "enterprise", labelKey: "q3_enterprise" as const },
      { value: "regulated", labelKey: "q3_regulated" as const },
      { value: "team-upskill", labelKey: "q3_teamUpskill" as const },
    ],
  },
];

interface PillarInfo {
  pillar: Pillar;
  taglineKey: string;
  resultKey: string;
}

const pillarInfo: Record<Pillar, PillarInfo> = {
  Product: { pillar: "Product", taglineKey: "productTagline", resultKey: "resultProduct" },
  Process: { pillar: "Process", taglineKey: "processTagline", resultKey: "resultProcess" },
  People: { pillar: "People", taglineKey: "peopleTagline", resultKey: "resultPeople" },
};

function getRecommendation(answers: Record<string, string>): Pillar {
  const scores: Record<Pillar, number> = { Product: 0, Process: 0, People: 0 };

  if (answers.need === "solution") scores.Product += 2;
  if (answers.need === "process") scores.Process += 2;
  if (answers.need === "training") scores.People += 2;

  if (answers.challenge === "automation") scores.Product += 2;
  if (answers.challenge === "compliance") scores.Process += 2;
  if (answers.challenge === "capability") scores.People += 2;

  if (answers.org === "startup") scores.Product += 1;
  if (answers.org === "enterprise") scores.Process += 1;
  if (answers.org === "regulated") scores.Process += 1;
  if (answers.org === "team-upskill") scores.People += 1;

  let best: Pillar = "Product";
  if (scores.Process > scores[best]) best = "Process";
  if (scores.People > scores[best]) best = "People";
  return best;
}

export default function AIAdvisor() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PillarInfo | null>(null);
  const t = useTranslations("AIAdvisor");
  const tPillars = useTranslations("ThreePillars");

  const allAnswered = questions.every((q) => answers[q.id]);

  function handleSelect(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setResult(null);
  }

  function handleSubmit() {
    if (!allAnswered) return;
    const pillar = getRecommendation(answers);
    setResult(pillarInfo[pillar]);
  }

  function handleReset() {
    setAnswers({});
    setResult(null);
  }

  return (
    <section id="ai-advisor" className="py-20 md:py-28 px-4 sm:px-6 bg-accent">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          {t("title")}
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        {!result ? (
          <>
            <div className="space-y-8">
              {questions.map((q, qi) => (
                <div key={q.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-border">
                  <p className="font-semibold mb-4">
                    <span className="text-primary mr-2">{qi + 1}.</span>
                    {t(q.labelKey)}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(q.id, opt.value)}
                        className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          answers[q.id] === opt.value
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {t(opt.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="bg-primary text-white font-semibold px-10 py-3.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("getRecommendation")}
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-primary/20 shadow-lg text-center">
            <p className="text-sm font-medium text-muted mb-2 uppercase tracking-wide">
              {t("recommendedForYou")}
            </p>
            <h3 className="text-3xl font-bold mb-1">{tPillars(result.taglineKey.replace("Tagline", ""))}</h3>
            <p className="text-primary font-semibold mb-4">{tPillars(result.taglineKey)}</p>
            <p className="text-muted max-w-lg mx-auto mb-8 leading-relaxed">
              {t(result.resultKey)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {t("contactUs")}
              </a>
              <button
                onClick={handleReset}
                className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-accent transition-colors"
              >
                {t("tryAgain")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
