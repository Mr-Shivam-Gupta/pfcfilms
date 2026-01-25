"use client";

import React from "react";
import { Film, Camera, Music, Drama } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Film: <Film size={40} />,
  Camera: <Camera size={40} />,
  Music: <Music size={40} />,
  Drama: <Drama size={40} />,
};

export default function Services() {
  // Static services data
  const services = [
    {
      _id: "1",
      title: "Film Production",
      description: "Feature films, short films, and commercial projects with cutting-edge technology",
      icon: "Film",
      order: 0,
    },
    {
      _id: "2",
      title: "Cinematography",
      description: "Professional cinematography services for all your visual storytelling needs",
      icon: "Camera",
      order: 1,
    },
    {
      _id: "3",
      title: "Dance Academy",
      description: "Professional training in classical, contemporary, and modern dance forms",
      icon: "Music",
      order: 2,
    },
    {
      _id: "4",
      title: "Acting School",
      description: "Comprehensive acting courses covering method acting, voice modulation, and camera techniques",
      icon: "Drama",
      order: 3,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 text-black"
          suppressHydrationWarning
        >
          What our <span className="text-amber-500">expertise</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || <Film size={40} />;
            return (
              <div
                key={service._id || idx}
                className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
                style={{ transitionDelay: `${(service.order || idx) * 100}ms` }}
                suppressHydrationWarning
              >
                <div className="group bg-white border border-zinc-100 rounded-2xl p-8 hover:border-amber-400 transition-all transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-amber-500/10 relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-amber-500 mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block">
                      {IconComponent}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-black">{service.title}</h3>
                    <p className="text-zinc-600">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
