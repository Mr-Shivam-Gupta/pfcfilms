"use client";

import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import CursorEffect from "../components/CursorEffect";
import { useState } from "react";

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState("contact");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CursorEffect />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Contact />
    </div>
  );
}
