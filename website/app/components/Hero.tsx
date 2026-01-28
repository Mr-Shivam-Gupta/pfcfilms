import React from "react";
import Image from "next/image";
import { Play, Sparkles, ArrowRight, ChevronRight } from "lucide-react";


export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">


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
              alt="PFC FILMS - Best Dance Academy & Acting School in Kanpur"
              fill
              className="object-cover"
              priority
              sizes="160px"
            />
          </div>
        </div>

        <h1
          className="text-6xl md:text-6xl font-black mb-6 tracking-tighter animate-fadeInUp text-black"
          style={{ animationDelay: "200ms" }}
        >
          Best Films Acting Academy & Dance Academy{" "}
          <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
            in Kanpur | Mumbai  
          </span>
        </h1>
        <p
          className="text-xl md:text-3xl font-light text-zinc-600 mb-8 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          PFC FILMS - Premier Dance Academy & Acting School in Kanpur | Mumbai | Dhamal India Dance | Professional Training by Pramod Kumar Gupta
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight className="rotate-90 text-amber-500" size={32} />
      </div>
    </section>
  );
}
