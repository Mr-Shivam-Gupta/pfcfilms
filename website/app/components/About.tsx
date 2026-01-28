"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import {
  Award,
  Film,
  Users,
  Star,
  Trophy,
  Target,
  X,
} from "lucide-react";
import { imageUrl } from "../lib/api";
import FAQ, { type FAQItem } from "./FAQ";

// Component for Director Image with reliable animation
function DirectorImageSection({ aboutData }: { aboutData: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if element is already visible on mount
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          setIsVisible(true);
          return;
        }
      }
    };

    // Initial check
    checkInitialVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 delay-200 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-5"
      }`}
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl">
        <Image
          src={imageUrl(aboutData.directorImage) || "/images/Director_producer_Pramod_Gupta.jpeg"}
          alt={aboutData.directorName}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-50 rounded-full -z-10 blur-3xl"></div>
    </div>
  );
}

// Component for Director Content with reliable animation
function DirectorContentSection({ aboutData }: { aboutData: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if element is already visible on mount
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          setIsVisible(true);
          return;
        }
      }
    };

    // Initial check
    checkInitialVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`space-y-6 transition-all duration-700 delay-400 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-5"
      }`}
    >
      <div>
        <h3 className="text-3xl font-bold text-black mb-2">
          {aboutData.directorName}
        </h3>
        <p className="text-xl text-amber-600 font-medium">
          {aboutData.directorTitle}
        </p>
      </div>

      <div className="space-y-4 text-zinc-600 leading-relaxed">
        <p>
          With over 15 years of experience in the film industry, Mr.
          Pramod Kumar Gupta has established himself as a visionary
          director and mentor in Kanpur, Uttar Pradesh. His journey began as an assistant
          director in Mumbai's bustling film industry, and through
          dedication and passion, he rose to become one of the most
          respected names in regional cinema.
        </p>
        <p>
          Under his leadership, PFC Films in Kanpur has produced numerous
          critically acclaimed films and has become Kanpur's premier
          destination for aspiring filmmakers, dancers, and actors. His unique approach
          combines traditional storytelling with modern cinematic
          techniques.
        </p>
        <p>
          Beyond filmmaking, he is passionate about education and has
          trained over 1000 students in Kanpur, helping them pursue their dreams
          in the entertainment industry. PFC FILMS and Dhamal India Dance Academy in Kanpur continue to be the top choice for dance and acting training in Uttar Pradesh.
        </p>
      </div>

      <div className="flex items-center space-x-3 text-amber-600 bg-amber-50 w-fit px-4 py-2 rounded-full border border-amber-100">
        <Trophy className="w-5 h-5" />
        <span className="font-semibold">
          National Film Award Winner 2023
        </span>
      </div>
    </div>
  );
}

// --- Utility: useTicker Hook (Copied/Adapted for reuse) ---
function useTicker({
  initialSpeed = 1,
  direction = 1, // 1 or -1
  isPaused = false,
  dragOffset = 0,
}) {
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | undefined>(undefined);

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== undefined) {
        const deltaTime = time - lastTimeRef.current;
        // Adjust speed for different context if needed
        const move = deltaTime * 0.05 * initialSpeed * direction;

        if (!isPaused) {
          setOffset((prev) => prev - move);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [initialSpeed, direction, isPaused],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return offset;
}

const ABOUT_FAQS: FAQItem[] = [
  {
    q: "Who is Pramod Kumar Gupta?",
    a: "Pramod Kumar Gupta is the Founder, Creative Director, and a celebrated Director and Producer at PFC FILMS. Based in Kanpur, he has over 15 years of experience in the film industry. He is also the force behind Dhamal India Dance and the PFC FILMS Acting School, training thousands of students in dance and acting.",
  },
  {
    q: "Is Pramod Kumar Gupta a director and producer?",
    a: "Yes. Pramod Kumar Gupta is an acclaimed Director and Producer. He began as an assistant director in Mumbai and has since directed and produced numerous films. He leads PFC FILMS as both Director and Producer, creating regional and commercial cinema while running the group's dance academy and acting school in Kanpur.",
  },
  {
    q: "What is PFC FILMS?",
    a: "PFC FILMS is a Kanpur-based film production company, dance academy (Dhamal India Dance), and acting school. Founded by Director and Producer Pramod Kumar Gupta, it produces films, offers professional dance and acting training, and has trained over 1000 students. PFC FILMS is known for cinematic excellence and talent development in Uttar Pradesh.",
  },
  {
    q: "Who founded PFC FILMS?",
    a: "PFC FILMS was founded by Pramod Kumar Gupta, an award-winning Director and Producer. Under his leadership, PFC FILMS has become Kanpur's premier destination for film production, dance classes (Dhamal India Dance), and acting training.",
  },
  {
    q: "Where is PFC FILMS located?",
    a: "PFC FILMS is headquartered in Kanpur, Uttar Pradesh. The company runs its film production, dance academy (Dhamal India Dance), and acting school from Kanpur, with a strong presence in the regional film and entertainment education space.",
  },
  {
    q: "What are PFC FILMS' main services?",
    a: "PFC FILMS offers film production (feature films, shorts, commercials), professional dance training through Dhamal India Dance Academy, and acting courses at the PFC FILMS Acting School. Director and Producer Pramod Kumar Gupta leads the creative vision across all divisions.",
  },
];

export default function About() {
  // Static about data
  const aboutData = {
    directorName: "Mr. Pramod Kumar Gupta",
    directorTitle: "Founder, Director & Producer",
    directorImage: "",
    directorBio: "",
    quote: "Cinema is not just about telling stories; it's about creating experiences that touch hearts and transform lives. Every frame is an opportunity to inspire.",
    vision: "To be the global benchmark in film production and cinematic education, creating a legacy of storytelling that transcends borders and cultures, inspiring generations to dream beyond the ordinary.",
    mission: "To nurture raw talent into world-class cinematic artists through immersive training, while simultaneously producing high-caliber content that entertains, educates, and elevates the standards of regional and national cinema.",
    achievements: []
  };

  return (
    <div className="flex flex-col w-full bg-zinc-50 text-zinc-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
      {/* HERO */}
      <section className="py-24 text-center relative overflow-hidden">
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
          About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
            Us
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600 leading-relaxed">
            Discover our story, vision, and the passionate team behind PFC Films
          </p>
        </div>
      </section>
      
      {/* Director Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <DirectorImageSection aboutData={aboutData} />
            <DirectorContentSection aboutData={aboutData} />
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative p-10">
              <div className="absolute top-0 left-0 text-white/20 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path d="M30 50h-10c-5.5 0-10-4.5-10-10v-10c0-5.5 4.5-10 10-10h10v30zm40 0h-10c-5.5 0-10-4.5-10-10v-10c0-5.5 4.5-10 10-10h10v30z" />
                </svg>
              </div>

              <p className="text-2xl md:text-3xl text-zinc-300 font-serif italic mb-8 relative z-10 leading-relaxed">
                "{aboutData.quote}"
              </p>

              <div className="inline-flex items-center space-x-3 relative z-10">
                <div className="h-px w-12 bg-amber-500"></div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">
                  {aboutData.directorName}
                </p>
                <div className="h-px w-12 bg-amber-500"></div>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 bg-zinc-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="group relative bg-white p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2 border border-zinc-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-50 via-transparent to-transparent opacity-50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-zinc-900 mb-6 group-hover:text-amber-600 transition-colors">
                  Our Vision
                </h3>
                <p className="text-zinc-600 leading-relaxed text-lg font-medium">
                  {aboutData.vision}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-white p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border border-zinc-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-white mb-8 shadow-lg shadow-zinc-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-zinc-900 mb-6 group-hover:text-black transition-colors">
                  Our Mission
                </h3>
                <p className="text-zinc-600 leading-relaxed text-lg font-medium">
                  {aboutData.mission}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Pramod Kumar Gupta (Director, Producer) & PFC FILMS */}
      <FAQ
        faqs={ABOUT_FAQS}
        id="faq"
        title="Frequently Asked Questions"
      />
    </div>
  );
}
