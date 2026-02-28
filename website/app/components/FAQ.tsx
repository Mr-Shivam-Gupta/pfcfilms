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
    <section id={id} className="py-12 sm:py-16 lg:py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqToSchema(faqs)) }}
        />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-black">
          {title === "Frequently Asked Questions"
            ? (
              <>
                Frequently Asked <span className="text-amber-500">Questions</span>
              </>
            )
            : title}
        </h2>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - FAQ Questions */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 rounded-xl border border-zinc-200 overflow-hidden hover:border-amber-500/30 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left font-semibold text-zinc-900 hover:bg-white transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
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
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-zinc-600 border-t border-zinc-200 pt-3 sm:pt-4 bg-white">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

            {/* Main Cinematic Image */}
            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">
              <Image
                src="/images/faq_scene.png"
                alt="PFC Films - Professional Film Production Scene"
                fill
                className="object-cover"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-10 left-10 z-20 max-w-sm">
              <div className="h-1 w-12 bg-amber-500 mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2">Cinematic Excellence</h3>
              <p className="text-zinc-400 text-sm">Empowering the next generation of filmmakers and performers through professional industry-standard training.</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)] opacity-50 z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
