"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import RecentActivity from "./components/RecentActivity";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import CursorEffect from "./components/CursorEffect";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: unobserve if you only want it to animate once
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -10% 0px", // Trigger a bit before the bottom
      },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <CursorEffect />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero />
      <Services />
      <RecentProjects />
      <RecentActivity />
      {/* <Stats /> */}
      <CTA />
    </div>
  );
}
