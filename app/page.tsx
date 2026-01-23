"use client";

import { useState } from "react";
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
      <Stats />
      <CTA />
    </div>
  );
}
