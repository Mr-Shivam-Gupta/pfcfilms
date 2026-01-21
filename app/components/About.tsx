"use client";

import React from "react";
import Image from "next/image";
import { Award, Film, Users, Star, Camera, Trophy } from "lucide-react";

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
    <section className="relative min-h-screen py-20 bg-black">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About the{" "}
            <span className="text-amber-400 inline-block animate-shimmer bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent bg-[length:200%_100%]">
              Director
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Visionary filmmaker, mentor, and the driving force behind PFC Films
          </p>
        </div>

        {/* Director Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Director Image */}
          <div
            className="relative animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-amber-500/20 shadow-2xl shadow-amber-500/20 transform transition-all duration-500 hover:scale-105 hover:border-amber-500/40">
              <Image
                src="https://placehold.co/600x600/1a1a1a/fbbf24?text=Director"
                alt="Director"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"></div>
          </div>

          {/* Director Info */}
          <div
            className="space-y-6 animate-fadeInUp"
            style={{ animationDelay: "400ms" }}
          >
            <div>
              <h3 className="text-3xl font-bold text-amber-400 mb-2">
                Mr. Ramesh Patel
              </h3>
              <p className="text-xl text-gray-400">
                Founder & Creative Director
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed">
              With over 15 years of experience in the film industry, Mr. Ramesh
              Patel has established himself as a visionary director and mentor.
              His journey began as an assistant director in Mumbai's bustling
              film industry, and through dedication and passion, he rose to
              become one of the most respected names in regional cinema.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Under his leadership, PFC Films has produced numerous critically
              acclaimed films and has become a premier destination for aspiring
              filmmakers. His unique approach combines traditional storytelling
              with modern cinematic techniques, creating films that resonate
              with audiences across generations.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Beyond filmmaking, he is passionate about education and has
              trained over 1000 students in various aspects of filmmaking,
              helping them pursue their dreams in the entertainment industry.
            </p>

            <div className="flex items-center space-x-2 text-amber-400">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">
                National Film Award Winner 2023
              </span>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-amber-500/10 text-center transform transition-all duration-300 hover:scale-105 hover:border-amber-500/30 hover:bg-zinc-900/70"
            >
              <div className="flex justify-center mb-3 text-amber-400">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {item.number}
              </div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Expertise Section */}
        <div className="mb-20">
          <h3
            className="text-3xl font-bold text-center mb-10 animate-fadeInUp"
            style={{ animationDelay: "800ms" }}
          >
            Areas of <span className="text-amber-400">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-amber-500/10 transform transition-all duration-300 hover:scale-105 hover:border-amber-500/30 animate-fadeInUp"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <Camera className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-amber-400 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Celebrity Collaborations Section */}
        <div>
          <div className="text-center mb-12 animate-fadeInUp">
            <h3 className="text-3xl font-bold mb-4">
              Celebrity <span className="text-amber-400">Collaborations</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Proud to have worked with some of the finest talents in the
              industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {celebrities.map((celebrity, index) => (
              <div
                key={index}
                className="group animate-fadeInUp"
                style={{ animationDelay: `${1400 + index * 100}ms` }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-amber-500/20 transform transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500/60 group-hover:shadow-2xl group-hover:shadow-amber-500/30">
                  <Image
                    src={celebrity.image}
                    alt={celebrity.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-center w-full">
                      <div className="text-xs text-amber-400 mb-1">
                        {celebrity.role}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {celebrity.name}
                  </h4>
                  <p className="text-xs text-gray-400">{celebrity.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div
          className="mt-20 text-center max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "2000ms" }}
        >
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 p-8 rounded-2xl border border-amber-500/20">
            <svg
              className="w-12 h-12 text-amber-400 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v8h8v-8H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
            </svg>
            <p className="text-xl md:text-2xl text-gray-300 italic mb-4">
              "Cinema is not just about telling stories; it's about creating
              experiences that touch hearts and transform lives. Every frame is
              an opportunity to inspire."
            </p>
            <p className="text-amber-400 font-semibold">- Mr. Ramesh Patel</p>
          </div>
        </div>
      </div>
    </section>
  );
}
