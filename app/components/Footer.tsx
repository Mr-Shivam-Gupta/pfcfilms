import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10">
            <div className="flex items-center space-x-3 mb-4 group cursor-pointer">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src="/logo.jpg"
                  alt="PFC Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-bold">PFC FILMS</div>
            </div>
            <p className="text-gray-400 text-sm">
              Creating cinematic excellence and nurturing dance talent
            </p>
          </div>
          {[
            {
              title: "Quick Links",
              items: ["About Us", "Services", "Portfolio", "Contact"],
            },
            {
              title: "Services",
              items: [
                "Film Production",
                "Dance Academy",
                "Cinematography",
                "Acting School",
              ],
            },
            {
              title: "Contact",
              items: [
                "info@pfcfilms.com",
                "81760 00084",
                "Kanpur Cantonment, Uttar Pradesh, India",
              ],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
              style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
            >
              <h4 className="font-bold mb-4">{section.title}</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="hover:text-amber-400 transition-colors cursor-pointer hover:translate-x-1 transform duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 PFC Films. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
