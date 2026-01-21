import React from "react";

export default function Stats() {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "500+", label: "Students Trained" },
    { number: "15+", label: "Awards Won" },
    { number: "10+", label: "Years Experience" },
  ];

  return (
    <section className="py-20 px-4 bg-amber-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10 p-6 group"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-5xl font-bold text-amber-500 mb-2 transform transition-all duration-500 group-hover:scale-125">
                {stat.number}
              </div>
              <div className="text-zinc-600 group-hover:text-black transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
