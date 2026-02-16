"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <section id={id} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqToSchema(faqs)) }}
        />
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-black">
          {title === "Frequently Asked Questions"
            ? (
              <>
                Frequently Asked <span className="text-amber-500">Questions</span>
              </>
            )
            : title}
        </h2>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - FAQ Questions */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 rounded-xl border border-zinc-200 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left font-semibold text-zinc-900 hover:bg-white transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-amber-500 transition-transform ${openIdx === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${openIdx === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-zinc-600 border-t border-zinc-200 pt-4 bg-white">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100 shadow-2xl border border-amber-200/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)]" />
            <div className="relative w-full h-full flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                <Image
                  src="/footer_logo.png"
                  alt="PFC Films - Professional Film Production and Training"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
