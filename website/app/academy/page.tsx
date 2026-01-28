"use client";

import Navbar from "../components/Navbar";
import Academy from "../components/Academy";
import CursorEffect from "../components/CursorEffect";
import { useState } from "react";

export default function AcademyPage() {
  const [activeSection, setActiveSection] = useState("academy");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CursorEffect />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Academy />
    </div>
  );
}
