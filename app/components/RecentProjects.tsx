"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";
import { getProductions, type Production } from "../lib/api";

const categoryColors: Record<string, string> = {
  "Music Videos": "from-blue-500/20 to-cyan-500/20",
  "Short Films": "from-indigo-500/20 to-purple-500/20",
  "Commercials": "from-orange-500/20 to-red-500/20",
  "Reality Shows": "from-rose-500/20 to-pink-500/20",
  "Web Series": "from-teal-500/20 to-cyan-500/20",
  "Feature Films": "from-purple-500/20 to-pink-500/20",
};

const categoryImages: Record<string, string> = {
  "Music Videos": "/projects/music-video.png",
  "Short Films": "/projects/short-film.png",
  "Commercials": "/projects/commercial.png",
  "Reality Shows": "/projects/reality-show.png",
  "Web Series": "/projects/web-series.png",
  "Feature Films": "/projects/feature-film.png",
};

export default function RecentProjects() {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProductions();
      setProductions(data.slice(0, 6)); // Get first 6 productions
      setLoading(false);
    };
    fetchData();
  }, []);

  const defaultProjects = [
    {
      title: "Music Albums",
      category: "Music Videos",
      image: "/projects/music-video.png",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Short Film",
      category: "Short Films",
      image: "/projects/short-film.png",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Commercial Ad",
      category: "Commercials",
      image: "/projects/commercial.png",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "Reality Show",
      category: "Reality Shows",
      image: "/projects/reality-show.png",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      title: "Web Series",
      category: "Web Series",
      image: "/projects/web-series.png",
      color: "from-teal-500/20 to-cyan-500/20",
    },
    {
      title: "Feature Film",
      category: "Feature Films",
      image: "/projects/feature-film.png",
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  const projects = productions.length > 0
    ? productions.map((p) => ({
        title: p.title,
        category: p.category,
        image: p.image || categoryImages[p.category] || "/projects/feature-film.png",
        color: categoryColors[p.category] || "from-purple-500/20 to-pink-500/20",
      }))
    : defaultProjects;

  return (
    <section className="py-20 px-4 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 text-black">
          Recent <span className="text-amber-500">Projects</span>
        </h2>
        <p
          className="text-center text-zinc-600 mb-12 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "100ms" }}
        >
          Scroll through our latest work
        </p>

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused] py-4">
            {[...projects, ...projects].map((project, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 group/card"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 transition-all cursor-pointer transform hover:scale-105 h-full shadow-lg">
                  <div
                    className={`aspect-square flex items-center justify-center text-6xl bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

                   
                  </div>
                  <div className="p-6 relative">
                    <div className="text-xs text-amber-600 mb-2 font-semibold uppercase tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold transform transition-all duration-300 group-hover:translate-x-2 text-black">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl transform scale-105"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
