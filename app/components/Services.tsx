import React from "react";
import { Film, Camera, Music, Drama } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Film size={40} />,
      title: "Film Production",
      desc: "Feature films, short films, and commercial projects with cutting-edge technology",
      delay: 0,
    },
    {
      icon: <Camera size={40} />,
      title: "Cinematography",
      desc: "Professional cinematography services for all your visual storytelling needs",
      delay: 100,
    },
    {
      icon: <Music size={40} />,
      title: "Dance Academy",
      desc: "Professional training in classical, contemporary, and modern dance forms",
      delay: 200,
    },
    {
      icon: <Drama size={40} />,
      title: "Acting School",
      desc: "Comprehensive acting courses covering method acting, voice modulation, and camera techniques",
      delay: 300,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 text-black">
          What our <span className="text-amber-500">expertise</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
              style={{ transitionDelay: `${service.delay}ms` }}
            >
              <div className="group bg-white border border-zinc-100 rounded-2xl p-8 hover:border-amber-400 transition-all transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-amber-500/10 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="text-amber-500 mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-black">{service.title}</h3>
                  <p className="text-zinc-600">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
