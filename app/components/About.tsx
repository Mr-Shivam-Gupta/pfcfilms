"use client";

import React from "react";
import Image from "next/image";
import { Award, Film, Users, Star, Camera, Trophy, Target } from "lucide-react";

export default function About() {
  const achievements = [
    {
      icon: <Film className="w-6 h-6" />,
      number: "50+",
      label: "Films Produced",
    },
    {
      icon: <Award className="w-6 h-6" />,
      number: "25+",
      label: "Awards Won",
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: "1000+",
      label: "Students Trained",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: "15+",
      label: "Years Experience",
    },
  ];

  const celebrities = [
    {
      name: "Rajesh Kumar",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+1",
      role: "Bollywood Actor",
    },
    {
      name: "Priya Sharma",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+2",
      role: "Film Producer",
    },
    {
      name: "Amit Verma",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+3",
      role: "Director",
    },
    {
      name: "Neha Kapoor",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+4",
      role: "Actress",
    },
    {
      name: "Vikram Singh",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+5",
      role: "Music Director",
    },
    {
      name: "Ananya Reddy",
      image: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+6",
      role: "Choreographer",
    },
  ];

  const expertise = [
    {
      title: "Film Direction",
      description: "Expertise in directing commercial and artistic cinema",
    },
    {
      title: "Cinematography",
      description: "Mastery in visual storytelling and camera techniques",
    },
    {
      title: "Film Education",
      description:
        "Passionate about nurturing the next generation of filmmakers",
    },
    {
      title: "Production Management",
      description: "Complete end-to-end production experience",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Director Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 forwards">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              About the <span className="text-amber-500">Director</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              Visionary filmmaker, mentor, and the driving force behind PFC Films
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-on-scroll opacity-0 translate-x-[-20px] transition-all duration-700 delay-200 forwards">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl">
                <Image
                  src="https://placehold.co/600x600/1a1a1a/fbbf24?text=Director"
                  alt="Director"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-50 rounded-full -z-10 blur-3xl"></div>
            </div>

            <div className="space-y-6 animate-on-scroll opacity-0 translate-x-[20px] transition-all duration-700 delay-400 forwards">
              <div>
                <h3 className="text-3xl font-bold text-black mb-2">
                  Mr. Pramod Kumar Gupta
                </h3>
                <p className="text-xl text-amber-600 font-medium">
                  Founder & Creative Director
                </p>
              </div>

              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  With over 15 years of experience in the film industry, Mr. Pramod Kumar Gupta
                  has established himself as a visionary director and mentor.
                  His journey began as an assistant director in Mumbai's bustling
                  film industry, and through dedication and passion, he rose to
                  become one of the most respected names in regional cinema.
                </p>
                <p>
                  Under his leadership, PFC Films has produced numerous critically
                  acclaimed films and has become a premier destination for aspiring
                  filmmakers. His unique approach combines traditional storytelling
                  with modern cinematic techniques.
                </p>
                <p>
                  Beyond filmmaking, he is passionate about education and has
                  trained over 1000 students, helping them pursue their dreams
                  in the entertainment industry.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-amber-600 bg-amber-50 w-fit px-4 py-2 rounded-full border border-amber-100">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">
                  National Film Award Winner 2023
                </span>
              </div>
            </div>
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
                <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M30 50h-10c-5.5 0-10-4.5-10-10v-10c0-5.5 4.5-10 10-10h10v30zm40 0h-10c-5.5 0-10-4.5-10-10v-10c0-5.5 4.5-10 10-10h10v30z" />
                </svg>
              </div>

              <p className="text-2xl md:text-3xl text-zinc-300 font-serif italic mb-8 relative z-10 leading-relaxed">
                "Cinema is not just about telling stories; it's about creating
                experiences that touch hearts and transform lives. Every frame is
                an opportunity to inspire."
              </p>

              <div className="inline-flex items-center space-x-3 relative z-10">
                <div className="h-px w-12 bg-amber-500"></div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">
                  Mr. Pramod Kumar Gupta
                </p>
                <div className="h-px w-12 bg-amber-500"></div>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </section>

      {/* Celebrities Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Celebrity <span className="text-amber-500">Collaborations</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              Working with the industry's finest talents
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {celebrities.map((celebrity, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-3"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-100">
                  <Image
                    src={celebrity.image}
                    alt={celebrity.name}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-black text-sm mb-1 group-hover:text-amber-600 transition-colors">
                    {celebrity.name}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium">{celebrity.role}</p>
                </div>
              </div>
            ))}
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

                <h3 className="text-3xl font-bold text-zinc-900 mb-6 group-hover:text-amber-600 transition-colors">Our Vision</h3>
                <p className="text-zinc-600 leading-relaxed text-lg font-medium">
                  To be the global benchmark in film production and cinematic education,
                  creating a legacy of storytelling that transcends borders and cultures,
                  inspiring generations to dream beyond the ordinary.
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

                <h3 className="text-3xl font-bold text-zinc-900 mb-6 group-hover:text-black transition-colors">Our Mission</h3>
                <p className="text-zinc-600 leading-relaxed text-lg font-medium">
                  To nurture raw talent into world-class cinematic artists through
                  immersive training, while simultaneously producing high-caliber
                  content that entertains, educates, and elevates the standards of regional and national cinema.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
