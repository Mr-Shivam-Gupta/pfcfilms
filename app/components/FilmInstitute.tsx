"use client";

import React from "react";
import {
  BookOpen,
  Video,
  Camera,
  Scissors,
  Award,
  Star,
  Palette,
} from "lucide-react";

export default function FilmInstitute() {
  const courses = [
    {
      name: "Acting Course",
      duration: "6 Months",
      features: ["Method Acting", "Voice Modulation", "Camera Facing"],
      icon: <Star size={32} />,
    },
    {
      name: "Modelling Course",
      duration: "3 Months",
      features: ["Ramp Walk", "Posing", "Portfolio Building"],
      icon: <Award size={32} />,
    },
    {
      name: "Writers Course",
      duration: "4 Months",
      features: ["Screenplay", "Dialogue Writing", "Story Structure"],
      icon: <BookOpen size={32} />,
    },
    {
      name: "Film Editing Course",
      duration: "6 Months",
      features: ["Adobe Premiere", "DaVinci Resolve", "Color Grading"],
      icon: <Scissors size={32} />,
    },
    {
      name: "Cinematography",
      duration: "1 Year",
      features: ["Lighting", "Camera Angles", "Composition"],
      icon: <Camera size={32} />,
    },
    {
      name: "Filmy Fighter Course",
      duration: "6 Months",
      features: ["Stunt Choreography", "Safety", "Martial Arts"],
      icon: <Video size={32} />,
    },
    {
      name: "Wedding Makeup",
      duration: "3 Months",
      features: ["Bridal Makeup", "Hair Styling", "Saree Draping"],
      icon: <Palette size={32} />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-zinc-900/30 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10">
          Film & Media <span className="text-amber-400">Institute</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 h-full flex flex-col">
                <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                  {course.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                  {course.name}
                </h3>

                <div className="text-sm text-gray-400 mb-4 font-mono bg-black/30 inline-block px-3 py-1 rounded-full w-fit">
                  Duration: {course.duration}
                </div>

                <ul className="space-y-2 mt-auto">
                  {course.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
