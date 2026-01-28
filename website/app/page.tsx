"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import RecentActivity from "./components/RecentActivity";
import Stats from "./components/Stats";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import CursorEffect from "./components/CursorEffect";
import type { FAQItem } from "./components/FAQ";

const HOME_FAQS: FAQItem[] = [
  {
    q: "What is PFC FILMS and Dhamal India Dance?",
    a: "PFC FILMS is Kanpur's premier film production company, dance academy (Dhamal India Dance), and acting school. We offer professional dance classes, acting training, and film production services in Kanpur and Mumbai.",
  },
  {
    q: "Where are the dance academy and acting school located?",
    a: "Our dance academy and acting school are located in Kanpur, Uttar Pradesh. We also operate in Mumbai. Contact us for exact addresses and to book a free trial or demo class.",
  },
  {
    q: "What dance styles do you teach at the Kanpur dance academy?",
    a: "We teach Bollywood, Hip Hop, Classical (Kathak, Bharatanatyam), Contemporary, Folk, and wedding choreography. Both kids and adults can enroll in dance classes in Kanpur.",
  },
  {
    q: "What acting courses does PFC FILMS offer in Kanpur?",
    a: "We offer film acting, theatre acting, method acting, OTT & web series acting, voice & diction, and audition preparation. Courses range from 1–6 months. Demo classes are available.",
  },
  {
    q: "How do I enroll or book a free trial?",
    a: "Visit our Contact page, call us, or book a free trial (dance) or demo class (acting) through the website. We'll get back to you with batch timings and fee details.",
  },
];

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
      <FAQ faqs={HOME_FAQS} id="faq" />
      <CTA />
    </div>
  );
}
