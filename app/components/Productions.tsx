"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Calendar,
  Award,
  Star,
  Film,
  Trophy,
  Tv,
  Rocket,
  ChevronRight,
} from "lucide-react";

export default function Productions() {
  const [activeCategory, setActiveCategory] = useState("all");

  /* ===================== DATA ===================== */

  const categories = [
    "All",
    "Feature Films",
    "Documentaries",
    "Music Videos",
    "Commercials",
  ];

  const productions = [
    {
      id: 1,
      title: "Echoes of Silence",
      category: "Feature Films",
      year: "2024",
      image: "https://placehold.co/600x400/111827/fbbf24?text=Echoes",
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
      image: "https://placehold.co/600x400/111827/fbbf24?text=Horizons",
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
      image: "https://placehold.co/600x400/111827/fbbf24?text=Urban",
      awards: "Documentary Excellence",
      description: "Lives of street artists in Mumbai",
      duration: "68 min",
      genre: "Documentary",
    },
  ];

  const awards = [
    {
      id: 1,
      title: "National Film Award",
      year: "2024",
      category: "Best Feature Film",
      project: "Echoes of Silence",
      image: "https://placehold.co/400x300/111827/fbbf24?text=Award",
    },
    {
      id: 2,
      title: "National Film Award",
      year: "2024",
      category: "Best Feature Film",
      project: "Echoes of Silence",
      image: "https://placehold.co/400x300/111827/fbbf24?text=Award",
    },
    {
      id: 1,
      title: "National Film Award",
      year: "2024",
      category: "Best Feature Film",
      project: "Echoes of Silence",
      image: "https://placehold.co/400x300/111827/fbbf24?text=Award",
    },
  ];

  const releases = [
    {
      id: 1,
      title: "Midnight Chronicles",
      releaseDate: "March 15, 2026",
      type: "Feature Film",
      image: "https://placehold.co/600x400/111827/fbbf24?text=Midnight",
      description: "A supernatural thriller",
      status: "Upcoming",
    },
  ];

  const filteredProductions =
    activeCategory === "all"
      ? productions
      : productions.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );

  /* ===================== UI ===================== */

  return (
    <div className="bg-zinc-50 text-zinc-900">
      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Our <span className="text-amber-500">Productions</span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-600">
          Cinema, documentaries & visual stories crafted with passion
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {[
          { icon: Film, label: "Productions", value: "50+" },
          { icon: Award, label: "Awards", value: "25+" },
          { icon: Star, label: "Rating", value: "4.8" },
          { icon: Calendar, label: "Years", value: "15+" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 text-center border shadow-sm"
          >
            <item.icon className="w-8 h-8 mx-auto text-amber-500 mb-2" />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-zinc-500">{item.label}</div>
          </div>
        ))}
      </section>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat.toLowerCase())}
            className={`px-5 py-2 rounded-full border transition ${activeCategory === cat.toLowerCase()
                ? "bg-amber-500 text-black"
                : "bg-white hover:border-amber-400"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTIONS GRID */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {filteredProductions.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition"
          >
            <div className="relative h-56">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <Play className="w-10 h-10 text-amber-400" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">{p.title}</h3>
              <p className="text-sm text-zinc-500 mb-3">
                {p.genre} • {p.duration}
              </p>
              <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                {p.description}
              </p>
              <div className="flex items-center text-amber-600 text-sm">
                <Award className="w-4 h-4 mr-1" /> {p.awards}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* AWARDS */}
      <section className="py-24 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-amber-500">Awards</span>
        </h2>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {awards.map((a) => (
            <div key={a.id} className="bg-zinc-50 rounded-xl border p-4">
              <Image src={a.image} alt={a.title} width={400} height={300} />
              <div className="mt-4">
                <h3 className="font-bold">{a.title}</h3>
                <p className="text-sm text-zinc-600">
                  {a.category} – {a.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING RELEASES */}
      <section className="py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Upcoming <span className="text-amber-500">Releases</span>
        </h2>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {releases.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl border overflow-hidden"
            >
              <Image src={r.image} alt={r.title} width={600} height={400} />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{r.title}</h3>
                <p className="text-zinc-600 mb-4">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
