"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";
import { getTopProjects, imageUrl, type TopProject } from "../lib/api";

const categoryColors: Record<string, string> = {
  "Music Videos": "from-blue-500/20 to-cyan-500/20",
  "Short Films": "from-indigo-500/20 to-purple-500/20",
  "Commercials": "from-orange-500/20 to-red-500/20",
  "Reality Shows": "from-rose-500/20 to-pink-500/20",
  "Web Series": "from-teal-500/20 to-cyan-500/20",
  "Feature Films": "from-purple-500/20 to-pink-500/20",
};

export default function RecentProjects() {
  const [topProjects, setTopProjects] = useState<TopProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTopProjects();
        setTopProjects(data);
      } catch (error) {
        console.error("Failed to fetch top projects:", error);
        setTopProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const projects = topProjects.map((p, idx) => {
    const imagePath = p.image ? imageUrl(p.image) : "/projects/feature-film.jpg";
    return {
      id: p._id || `project-${idx}`,
      title: p.title,
      category: p.category,
      image: imagePath || "/projects/feature-film.jpg",
      color: categoryColors[p.category] || "from-purple-500/20 to-pink-500/20",
    };
  });

  // Duplicate projects multiple times for smooth infinite scroll
  // If there are few projects, duplicate more times to ensure seamless scrolling
  const duplicateCount = projects.length <= 2 ? 4 : 3;
  const duplicatedProjects = Array(duplicateCount).fill(projects).flat();

  return (
    <section className="py-20 px-4 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 text-black" suppressHydrationWarning>
          Top <span className="text-amber-500">Projects</span>
        </h2>
        <p
          className="text-center text-zinc-600 mb-12 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "100ms" }}
          suppressHydrationWarning
        >
          Explore our most acclaimed work
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-zinc-600">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 mb-4">
              <Play className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Projects Found</h3>
            <p className="text-zinc-600 max-w-md mx-auto">
              Top projects will appear here once they are added to the system.
            </p>
          </div>
        ) : (
          /* Infinite Scroll Container */
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused] py-4">
              {duplicatedProjects.map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
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
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== "/projects/feature-film.jpg") {
                            target.src = "/projects/feature-film.jpg";
                          }
                        }}
                        unoptimized={project.image.startsWith("http://") || project.image.startsWith("https://")}
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
        )}
      </div>
    </section>
  );
}
