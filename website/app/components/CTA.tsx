"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-amber-200/40 to-transparent animate-shimmer-slow"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 text-black" suppressHydrationWarning>
          Ready to Create Something{" "}
          <span className="text-amber-500">Amazing</span>?
        </h2>
        <p
          className="text-xl text-zinc-600 mb-8 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
          style={{ transitionDelay: "200ms" }}
          suppressHydrationWarning
        >
          Let&apos;s bring your vision to life or start your dance journey with
          us
        </p>
        <Link
          href="/contact"
          className="group inline-block animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 bg-amber-400 hover:bg-amber-500 text-black px-10 py-4 rounded-full font-semibold text-lg transform hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden"
          style={{ transitionDelay: "400ms" }}
          suppressHydrationWarning
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>Get in Touch</span>
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-2"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
