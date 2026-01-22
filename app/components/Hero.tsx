import React from "react";
import Image from "next/image";
import { Play, Sparkles, ArrowRight, ChevronRight } from "lucide-react";

import Marquee3D from "./Marquee3D";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="hidden md:block">
        <Marquee3D />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 inline-block animate-fadeInUp">
          <div className="w-40 h-40 relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6 animate-pulse-slow ring-4 ring-white/50">
            <Image
              src="/logo.jpg"
              alt="PFC Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1
          className="text-6xl md:text-6xl font-black mb-6 tracking-tighter animate-fadeInUp text-black"
          style={{ animationDelay: "200ms" }}
        >
          Best Dance Academy & Acting School{" "}
          <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
            in Kanpur
          </span>
        </h1>
        <p
          className="text-xl md:text-3xl font-light text-zinc-600 mb-8 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          PFC FILMS - Premier Dance Academy & Acting School in Kanpur | Dhamal India Dance | Professional Training by Pramod Kumar Gupta
        </p>

        {/* <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: "600ms" }}>
          <button className="group bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <Play
              size={20}
              className="transition-transform group-hover:scale-110"
            />
            <span>View Our Work</span>
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button className="group border-2 border-amber-400 hover:bg-amber-400 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 relative overflow-hidden">
            <span className="relative z-10 flex items-center space-x-2">
              <span>Join Dance Academy</span>
              <Sparkles
                size={20}
                className="transition-transform group-hover:rotate-12"
              />
            </span>
            <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div> */}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight className="rotate-90 text-amber-500" size={32} />
      </div>
    </section>
  );
}
