"use client";

import React from "react";
import { Calendar, Users } from "lucide-react";

export default function DancePrograms() {
  const dancePrograms = [
    {
      name: "Classical Dance",
      duration: "6 Months",
      level: "Beginner to Advanced",
      icon: "💃",
    },
    {
      name: "Contemporary",
      duration: "4 Months",
      level: "Intermediate",
      icon: "🎭",
    },
    { name: "Hip Hop", duration: "3 Months", level: "All Levels", icon: "🕺" },
    {
      name: "Bollywood",
      duration: "3 Months",
      level: "All Levels",
      icon: "✨",
    },
  ];

  return (
    <section className="py-10 px-4 bg-zinc-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10" suppressHydrationWarning>
          Performing Arts <span className="text-amber-400">Academy</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Dance Classes",
              duration: "6 Months",
              level: "All Levels",
              icon: "💃",
            },
            {
              name: "Singing Classes",
              duration: "6 Months",
              level: "All Levels",
              icon: "🎤",
            },
            {
              name: "Guitar Classes",
              duration: "3 Months",
              level: "Beginner",
              icon: "🎸",
            },
            {
              name: "Tabla Classes",
              duration: "4 Months",
              level: "All Levels",
              icon: "🥁",
            },
            {
              name: "Dholak Classes",
              duration: "3 Months",
              level: "All Levels",
              icon: "🥢",
            },
            {
              name: "Harmonium Classes",
              duration: "4 Months",
              level: "All Levels",
              icon: "🎹",
            },
            {
              name: "Wedding Dance",
              duration: "Custom",
              level: "Choreography",
              icon: "💒",
            },
            {
              name: "Zumba & Fitness",
              duration: "Monthly",
              level: "All Levels",
              icon: "🧘",
            },
          ].map((program, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 transition-all duration-1000 translate-x-10"
              style={{ transitionDelay: `${idx * 100}ms` }}
              suppressHydrationWarning
            >
              <div className="group bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-amber-400 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 text-6xl opacity-10 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {program.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                    <span className="text-3xl">{program.icon}</span>
                    <span>{program.name}</span>
                  </h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2 group-hover:text-amber-400 transition-colors">
                      <Calendar size={16} className="text-amber-400" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 group-hover:text-amber-400 transition-colors">
                      <Users size={16} className="text-amber-400" />
                      <span>{program.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
