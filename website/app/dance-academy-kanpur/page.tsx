import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import CursorEffect from "../components/CursorEffect";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Best Dance Academy in Kanpur | Dhamal India Dance | PFC FILMS",
  description: "Join the best Dance Academy in Kanpur! Dhamal India Dance offers Bollywood, Hip Hop, Classical & Contemporary dance classes. Professional training by Pramod Kumar Gupta. Enroll now for dance classes in Kanpur!",
  keywords: "Dance Academy in Kanpur, Best Dance Academy Kanpur, Dance Classes Kanpur, Bollywood Dance Classes Kanpur, Hip Hop Dance Classes Kanpur, Classical Dance Classes Kanpur, Contemporary Dance Kanpur, Dhamal India Dance Kanpur, Dance Academy near me Kanpur, Kids Dance Classes Kanpur, Adult Dance Classes Kanpur",
  openGraph: {
    title: "Best Dance Academy in Kanpur | Dhamal India Dance",
    description: "Premier Dance Academy in Kanpur offering Bollywood, Hip Hop, Classical & Contemporary dance classes. Professional training by industry experts.",
    type: "website",
  },
  alternates: {
    canonical: "https://pfcfilms.com/dance-academy-kanpur",
  },
};

export default function DanceAcademyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <CursorEffect />
      <Navbar activeSection="dance-academy" setActiveSection={() => {}} />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Best <span className="text-amber-500">Dance Academy in Kanpur</span>
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-8">
              Join Dhamal India Dance - Kanpur's premier dance academy offering professional training in Bollywood, Hip Hop, Classical, and Contemporary dance forms. Transform your passion into performance!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Book Free Trial Class
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="border-2 border-amber-500 hover:bg-amber-500 hover:text-black text-amber-600 px-8 py-4 rounded-full font-semibold transition-all"
              >
                Call Now: +91 XXXXXXXXXX
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Why Choose <span className="text-amber-500">Dhamal India Dance</span> in Kanpur?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Expert Instructors</h3>
              <p className="text-zinc-600">
                Learn from industry professionals with years of experience in Bollywood and international dance forms.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Multiple Dance Styles</h3>
              <p className="text-zinc-600">
                Master Bollywood, Hip Hop, Classical, Contemporary, and Folk dance forms all under one roof in Kanpur.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Performance Opportunities</h3>
              <p className="text-zinc-600">
                Regular stage performances, competitions, and industry exposure to showcase your talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dance Programs */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Our <span className="text-amber-500">Dance Programs</span> in Kanpur
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Bollywood Dance Classes",
                description: "Learn iconic Bollywood moves, expressions, and choreography. Perfect for all age groups.",
                duration: "3-6 Months",
                icon: "🎬",
              },
              {
                name: "Hip Hop Dance Classes",
                description: "Master street dance, freestyle, and urban dance styles. High-energy training sessions.",
                duration: "3-6 Months",
                icon: "🕺",
              },
              {
                name: "Classical Dance",
                description: "Traditional Indian classical forms including Kathak, Bharatanatyam, and Odissi.",
                duration: "6-12 Months",
                icon: "💃",
              },
              {
                name: "Contemporary Dance",
                description: "Modern dance techniques combining fluidity, expression, and creative movement.",
                duration: "4-6 Months",
                icon: "🎭",
              },
            ].map((program, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-amber-400 transition-all hover:shadow-xl">
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{program.name}</h3>
                <p className="text-zinc-600 mb-4 text-sm">{program.description}</p>
                <div className="text-sm text-amber-600 font-semibold">Duration: {program.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Dance Journey in Kanpur?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of students who have transformed their passion into performance at Dhamal India Dance, Kanpur's best dance academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-amber-600 hover:bg-zinc-100 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Enroll Now
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Call: +91 XXXXXXXXXX
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What makes Dhamal India Dance the best dance academy in Kanpur?",
                a: "Dhamal India Dance is Kanpur's premier dance academy with expert instructors, multiple dance styles, state-of-the-art facilities, and proven track record of student success in competitions and performances.",
              },
              {
                q: "What dance styles are taught at your Kanpur dance academy?",
                a: "We offer comprehensive training in Bollywood, Hip Hop, Classical (Kathak, Bharatanatyam), Contemporary, Folk, and Wedding dance choreography at our Kanpur location.",
              },
              {
                q: "Are there dance classes for kids in Kanpur?",
                a: "Yes! We offer specialized dance classes for kids starting from age 5, with age-appropriate choreography and fun learning methods at our Kanpur dance academy.",
              },
              {
                q: "How do I enroll in dance classes at Dhamal India Dance Kanpur?",
                a: "You can enroll by calling us at +91 XXXXXXXXXX, visiting our Kanpur location, or booking a free trial class through our website. We offer flexible batch timings.",
              },
              {
                q: "What is the fee structure for dance classes in Kanpur?",
                a: "Our dance class fees vary based on the program and duration. Contact us for detailed pricing and special offers. We also offer monthly and quarterly payment options.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-zinc-200">
                <h3 className="text-xl font-bold mb-3 text-black">{faq.q}</h3>
                <p className="text-zinc-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
