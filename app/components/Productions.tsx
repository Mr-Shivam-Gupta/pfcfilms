"use client";

import React, { useState, useEffect } from "react";
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
import { getProductions, getAwards, imageUrl, type Production, type Award as AwardType } from "../lib/api";

export default function Productions() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [productions, setProductions] = useState<Production[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Feature Films",
    "Documentaries",
    "Music Videos",
    "Commercials",
    "Short Films",
    "Web Series",
    "Reality Shows",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodsData, awardsData] = await Promise.all([
        getProductions(),
        getAwards(),
      ]);
      setProductions(prodsData);
      setAwards(awardsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProductions =
    activeCategory === "all"
      ? productions
      : productions.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );

  const releases = productions.filter((p) => p.status === "Upcoming");

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
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border">
              <div className="h-56 bg-zinc-200 animate-pulse" />
              <div className="p-6">
                <div className="h-6 bg-zinc-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse mb-3 w-2/3" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse mb-4" />
              </div>
            </div>
          ))
        ) : filteredProductions.length === 0 ? (
          <div className="col-span-full text-center py-12 text-zinc-500">No productions found</div>
        ) : (
          filteredProductions.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition"
            >
              <div className="relative h-56">
                <Image
                  src={imageUrl(p.image)}
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
                  {p.genre || ""} {p.genre && p.duration ? "•" : ""} {p.duration || ""}
                </p>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                  {p.description}
                </p>
                {p.awards && (
                  <div className="flex items-center text-amber-600 text-sm">
                    <Award className="w-4 h-4 mr-1" /> {p.awards}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* AWARDS */}
      <section className="py-24 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-amber-500">Awards</span>
        </h2>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-zinc-50 rounded-xl border p-4">
                <div className="w-full h-48 bg-zinc-200 rounded-lg animate-pulse mb-4" />
                <div className="h-5 bg-zinc-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-2/3" />
              </div>
            ))
          ) : awards.length === 0 ? (
            <div className="col-span-full text-center py-12 text-zinc-500">No awards found</div>
          ) : (
            awards.map((a) => (
              <div key={a._id} className="bg-zinc-50 rounded-xl border p-4">
                <Image src={imageUrl(a.image)} alt={a.title} width={400} height={300} className="w-full h-auto rounded-lg" />
                <div className="mt-4">
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-zinc-600">
                    {a.category} – {a.project}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* UPCOMING RELEASES */}
      {releases.length > 0 && (
        <section className="py-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Upcoming <span className="text-amber-500">Releases</span>
          </h2>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {releases.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-xl border overflow-hidden"
              >
                <Image src={imageUrl(r.image)} alt={r.title} width={600} height={400} className="w-full h-auto" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{r.title}</h3>
                  <p className="text-zinc-600 mb-4">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
