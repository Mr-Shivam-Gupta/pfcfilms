"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FAQItem = { q: string; a: string };

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [] as { "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }[],
};

function faqToSchema(faqs: FAQItem[]) {
  return {
    ...FAQ_SCHEMA,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question" as const,
      name: q,
      acceptedAnswer: { "@type": "Answer" as const, text: a },
    })),
  };
}

export default function FAQ({
  faqs,
  title = "Frequently Asked Questions",
  id = "faq",
}: {
  faqs: FAQItem[];
  title?: string;
  id?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section id={id} className="py-20 px-4 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqToSchema(faqs)) }}
        />
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {title === "Frequently Asked Questions"
            ? (
                <>
                  Frequently Asked <span className="text-amber-500">Questions</span>
                </>
              )
            : title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-amber-500 transition-transform ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openIdx === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-zinc-600 border-t border-zinc-100 pt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
