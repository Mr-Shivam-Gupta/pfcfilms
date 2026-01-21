"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Calendar, Award, Star, Film } from "lucide-react";

export default function Productions() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["All", "Feature Films", "Documentaries", "Music Videos", "Commercials"];

  const productions = [
    {
      id: 1,
      title: "Echoes of Silence",
      category: "Feature Films",
      year: "2024",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Echoes+of+Silence",
      awards: "Best Regional Film 2024",
      description: "A gripping tale of love and loss set in rural India",
      duration: "142 min",
      genre: "Drama",
    },
    {
      id: 2,
      title: "Beyond Horizons",
      category: "Feature Films",
      year: "2023",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Beyond+Horizons",
      awards: "National Film Award",
      description: "An inspiring story of determination and hope",
      duration: "135 min",
      genre: "Biography",
    },
    {
      id: 3,
      title: "Urban Stories",
      category: "Documentaries",
      year: "2024",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Urban+Stories",
      awards: "Documentary Excellence Award",
      description: "Exploring the lives of street artists in Mumbai",
      duration: "68 min",
      genre: "Documentary",
    },
    {
      id: 4,
      title: "Rhythm of Life",
      category: "Music Videos",
      year: "2024",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Rhythm+of+Life",
      awards: "Best Cinematography",
      description: "A visual masterpiece celebrating Indian classical music",
      duration: "5 min",
      genre: "Music",
    },
    {
      id: 5,
      title: "Heritage India",
      category: "Commercials",
      year: "2023",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Heritage+India",
      awards: "Advertising Excellence",
      description: "Tourism campaign showcasing India's rich culture",
      duration: "2 min",
      genre: "Commercial",
    },
    {
      id: 6,
      title: "The Last Train",
      category: "Feature Films",
      year: "2023",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=The+Last+Train",
      awards: "Audience Choice Award",
      description: "A suspenseful thriller set on a midnight train journey",
      duration: "128 min",
      genre: "Thriller",
    },
    {
      id: 7,
      title: "Colors of Tradition",
      category: "Documentaries",
      year: "2023",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Colors+of+Tradition",
      awards: "Cultural Heritage Award",
      description: "Documenting traditional art forms across India",
      duration: "72 min",
      genre: "Documentary",
    },
    {
      id: 8,
      title: "Midnight Dreams",
      category: "Music Videos",
      year: "2024",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Midnight+Dreams",
      awards: "Best Music Video",
      description: "A dreamy visual narrative of urban loneliness",
      duration: "4 min",
      genre: "Music",
    },
  ];

  const filteredProductions = activeCategory === "all"
    ? productions
    : productions.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="relative min-h-screen py-20 bg-zinc-50">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Our{" "}
            <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              Productions
            </span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Showcasing our finest work in cinema, documentaries, and visual storytelling
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fadeInUp"
          style={{ animationDelay: "200ms" }}
        >
          <div className="bg-white p-6 rounded-xl border border-zinc-200 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Film className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-500">50+</div>
            <div className="text-sm text-zinc-500 font-medium">Productions</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-200 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-500">25+</div>
            <div className="text-sm text-zinc-500 font-medium">Awards</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-200 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-500">4.8</div>
            <div className="text-sm text-zinc-500 font-medium">Avg Rating</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-200 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-500">15+</div>
            <div className="text-sm text-zinc-500 font-medium">Years Active</div>
          </div>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category.toLowerCase())}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category.toLowerCase()
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/50"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400 hover:bg-zinc-50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Productions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProductions.map((production, index) => (
            <div
              key={production.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-xl shadow-md animate-fadeInUp"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={production.image}
                  alt={production.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-amber-400 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-black fill-black" />
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-amber-400 text-sm font-semibold">
                  {production.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-black group-hover:text-amber-500 transition-colors">
                    {production.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-sm text-zinc-500 mb-3">
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                    {production.genre}
                  </span>
                  <span>•</span>
                  <span>{production.duration}</span>
                </div>

                <p className="text-zinc-600 text-sm mb-4 line-clamp-2">
                  {production.description}
                </p>

                {/* Awards */}
                <div className="flex items-center space-x-2 text-amber-600 font-medium">
                  <Award className="w-4 h-4" />
                  <span className="text-xs">{production.awards}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="mt-16 text-center animate-fadeInUp"
          style={{ animationDelay: "1400ms" }}
        >
          <div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 text-black">Have a Project in Mind?</h3>
            <p className="text-zinc-600 mb-6">
              Let's collaborate and create something extraordinary together
            </p>
            <button className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
