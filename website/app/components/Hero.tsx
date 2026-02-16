"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroScene from "./3d/HeroScene";

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typingPhase, setTypingPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const [isAnimating, setIsAnimating] = useState(false);

  const rotatingTexts = [
    "Production House  & Institute",
    "Dance Academy in Kanpur",
    "Acting School in Kanpur"
  ];

  const rotatingDescriptions = [
    "Professional film production services and comprehensive training institute. Led by Director/Producer Pramod Kumar Gupta, bringing cinematic excellence to life.",
    "Premier dance academy with locations in Kanpur and Mumbai. Home of Dhamal India Dance, offering world-class choreography and training programs.",
    "Professional acting school in Kanpur and Mumbai. Nurturing talent with industry-standard training and performance opportunities."
  ];

  // Typewriter effect with backspace
  useEffect(() => {
    const currentText = rotatingTexts[currentTextIndex];
    const typingSpeed = 80; // ms per character when typing
    const deletingSpeed = 50; // ms per character when deleting (faster)
    const pauseDuration = 2000; // pause before deleting
    const waitDuration = 500; // wait before typing next text

    let timeout: NodeJS.Timeout;

    if (typingPhase === "typing") {
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        timeout = setTimeout(() => {
          setTypingPhase("pausing");
        }, pauseDuration);
      }
    } else if (typingPhase === "pausing") {
      // Start deleting after pause
      setTypingPhase("deleting");
      setIsAnimating(true); // Start fading description
    } else if (typingPhase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, wait then move to next text
        timeout = setTimeout(() => {
          setTypingPhase("waiting");
        }, waitDuration);
      }
    } else if (typingPhase === "waiting") {
      // Move to next text and start typing
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      setTypingPhase("typing");
      setIsAnimating(false); // Stop fading description
    }

    return () => clearTimeout(timeout);
  }, [displayedText, typingPhase, currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-white z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)] z-0" />

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 text-sm font-medium">
              Premium Film Production & Training Institute
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-amber-600 to-amber-500">
              PFC FILMS
            </span>
            <br />
            <span className="inline-block text-black">
              {/* {displayedText} */}
              Production House  & Institute
              {/* <span className="inline-block w-1 h-[1em] bg-amber-500 ml-1 animate-pulse" /> */}
            </span>
          </h1>

          {/* Animated rotating text */}
          <p className="text-xl text-zinc-600 max-w-lg leading-relaxed min-h-[4rem]">
            <span
              className={`inline-block transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
            >
              {rotatingDescriptions[currentTextIndex]}
            </span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/academy">
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                Explore Academy
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-100 font-semibold rounded-lg transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right side - 3D Scene */}
        <div className="h-[500px] w-full flex items-center justify-center">
          <HeroScene />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronRight className="rotate-90 text-amber-500" size={32} />
      </div>
    </section>
  );
}
