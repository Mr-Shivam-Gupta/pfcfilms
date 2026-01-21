"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";

export default function RecentProjects() {
  const projects = [
    {
      title: "Feature Film 2024",
      category: "Cinema",
      image: "/projects/feature-film.png",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Music Video Series",
      category: "Music",
      image: "/projects/music-video.png",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Documentary Project",
      category: "Documentary",
      image: "/projects/documentary.png",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Commercial Ads",
      category: "Advertisement",
      image: "/projects/commercial.png",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "Short Film Festival",
      category: "Short Film",
      image: "/projects/short-film.png",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Reality Show 2025",
      category: "Reality TV",
      image: "/projects/reality-show.png",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      title: "Web Series Drama",
      category: "Web Series",
      image: "/projects/web-series.png",
      color: "from-teal-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10">
          Recent <span className="text-amber-400">Projects</span>
        </h2>
        <p
          className="text-center text-gray-400 mb-12 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "100ms" }}
        >
          Scroll through our latest work
        </p>

        {/* Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById("projects-scroll");
              if (container)
                container.scrollBy({ left: -400, behavior: "smooth" });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-amber-400/90 hover:bg-amber-500 text-black p-3 rounded-full shadow-2xl transition-all transform hover:scale-110 hidden md:flex items-center justify-center"
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById("projects-scroll");
              if (container)
                container.scrollBy({ left: 400, behavior: "smooth" });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-amber-400/90 hover:bg-amber-500 text-black p-3 rounded-full shadow-2xl transition-all transform hover:scale-110 hidden md:flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Projects */}
          <div
            id="projects-scroll"
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 snap-center animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-amber-400 transition-all cursor-pointer transform hover:scale-105 h-full">
                  <div
                    className={`aspect-square flex items-center justify-center text-6xl bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      <button className="bg-amber-400 text-black px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                        <Play size={16} />
                        <span>View Project</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="text-xs text-amber-400 mb-2 font-semibold uppercase tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold transform transition-all duration-300 group-hover:translate-x-2">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl transform scale-105"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = document.getElementById("projects-scroll");
                  if (container)
                    container.scrollTo({ left: idx * 336, behavior: "smooth" });
                }}
                className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-amber-400 transition-all duration-300"
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
