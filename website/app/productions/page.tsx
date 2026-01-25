"use client";

import Navbar from "../components/Navbar";
import Productions from "../components/Productions";
import CursorEffect from "../components/CursorEffect";
import { useState } from "react";

export default function ProductionsPage() {
  const [activeSection, setActiveSection] = useState("productions");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CursorEffect />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Productions />
    </div>
  );
}
