"use client";

import Navbar from "../components/Navbar";
import About from "../components/About";
import CursorEffect from "../components/CursorEffect";
import { useState } from "react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CursorEffect />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <About />
    </div>
  );
}
