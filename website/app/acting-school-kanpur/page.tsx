import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import CursorEffect from "../components/CursorEffect";

export const metadata: Metadata = {
  title: "Best Acting School in Kanpur | Film Acting Course | PFC FILMS",
  description: "Join the best Acting School in Kanpur! PFC FILMS offers professional acting training for film, TV & theatre. Learn from Pramod Kumar Gupta. Enroll in acting classes in Kanpur today!",
  keywords: "Acting School in Kanpur, Best Acting School Kanpur, Acting Classes Kanpur, Film Acting Course Kanpur, Acting Training Kanpur, Theatre Acting Classes Kanpur, Camera Acting Course Kanpur, Method Acting Kanpur, Acting Institute Kanpur, Acting Academy near me Kanpur",
  openGraph: {
    title: "Best Acting School in Kanpur | PFC FILMS",
    description: "Premier Acting School in Kanpur offering professional training for film, television, and theatre. Learn from industry experts.",
    type: "website",
  },
  alternates: {
    canonical: "https://pfcfilms.com/acting-school-kanpur",
  },
};

export default function ActingSchoolPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <CursorEffect />
      <Navbar activeSection="acting-school" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-zinc-900 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Best <span className="text-amber-500">Acting School in Kanpur</span>
            </h1>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
              PFC FILMS Acting School in Kanpur - Professional acting training for film, television, and theatre. Learn from industry veteran Pramod Kumar Gupta and launch your acting career!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Book Free Demo Class
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="border-2 border-amber-500 hover:bg-amber-500 hover:text-black text-amber-500 px-8 py-4 rounded-full font-semibold transition-all"
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
            Why Choose <span className="text-amber-500">PFC FILMS Acting School</span> in Kanpur?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Industry Expert Faculty</h3>
              <p className="text-zinc-600">
                Learn from Pramod Kumar Gupta and experienced actors who have worked in Bollywood, regional cinema, and OTT platforms.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Comprehensive Training</h3>
              <p className="text-zinc-600">
                Master method acting, voice modulation, camera techniques, audition skills, and character development.
              </p>
            </div>
            <div className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Industry Exposure</h3>
              <p className="text-zinc-600">
                Get opportunities to audition for films, web series, and TV shows. 100% placement assistance for deserving students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Acting Courses */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Our <span className="text-amber-500">Acting Programs</span> in Kanpur
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Film Acting Course",
                description: "Complete training for camera acting, screen presence, and film industry techniques. Perfect for Bollywood and regional cinema.",
                duration: "6 Months",
                features: ["Camera Acting", "Screen Presence", "Dialogue Delivery", "Audition Techniques"],
              },
              {
                name: "Theatre Acting",
                description: "Master stage acting, voice projection, body language, and live performance skills for theatre productions.",
                duration: "4 Months",
                features: ["Stage Presence", "Voice Modulation", "Character Development", "Live Performance"],
              },
              {
                name: "Method Acting Workshop",
                description: "Advanced acting techniques including Stanislavski method, emotional memory, and immersive character building.",
                duration: "3 Months",
                features: ["Emotional Memory", "Character Immersion", "Scene Study", "Improvisation"],
              },
              {
                name: "OTT & Web Series Acting",
                description: "Specialized training for digital platforms, OTT content, and web series with modern acting approaches.",
                duration: "4 Months",
                features: ["Digital Acting", "Natural Performance", "OTT Industry", "Web Series Techniques"],
              },
              {
                name: "Voice & Diction Training",
                description: "Improve voice quality, diction, accent neutralization, and speech clarity for professional acting.",
                duration: "2 Months",
                features: ["Voice Training", "Accent Neutralization", "Diction", "Speech Clarity"],
              },
              {
                name: "Audition Preparation",
                description: "Master audition techniques, monologue preparation, and casting call strategies to land roles.",
                duration: "1 Month",
                features: ["Audition Skills", "Monologue Prep", "Casting Calls", "Portfolio Building"],
              },
            ].map((course, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-amber-400 transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3 text-black">{course.name}</h3>
                <p className="text-zinc-600 mb-4 text-sm">{course.description}</p>
                <div className="text-sm text-amber-600 font-semibold mb-4">Duration: {course.duration}</div>
                <ul className="space-y-2">
                  {course.features.map((feature, i) => (
                    <li key={i} className="text-sm text-zinc-600 flex items-center">
                      <span className="text-amber-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Message from Director</h2>
            <p className="text-xl mb-4 italic">
              "Acting is not about pretending; it's about becoming. At PFC FILMS Acting School in Kanpur, we don't just teach acting - we transform passion into profession."
            </p>
            <p className="text-lg text-amber-400 font-semibold">- Pramod Kumar Gupta, Founder & Director</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Start Your Acting Career in Kanpur Today!</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of successful actors who started their journey at PFC FILMS Acting School, Kanpur's premier acting institute.
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What makes PFC FILMS the best acting school in Kanpur?",
                a: "PFC FILMS is Kanpur's premier acting school with industry veteran Pramod Kumar Gupta as director, comprehensive training programs, industry connections, and proven track record of student placements in films, TV, and OTT platforms.",
              },
              {
                q: "What acting courses are available at your Kanpur acting school?",
                a: "We offer Film Acting Course, Theatre Acting, Method Acting Workshop, OTT & Web Series Acting, Voice & Diction Training, and Audition Preparation programs at our Kanpur location.",
              },
              {
                q: "Do you provide placement assistance after acting training in Kanpur?",
                a: "Yes! We offer 100% placement assistance to deserving students. Our industry connections help students get auditions for films, web series, TV shows, and theatre productions.",
              },
              {
                q: "Can beginners join acting classes in Kanpur?",
                a: "Absolutely! Our acting school in Kanpur welcomes beginners. We start from basics and gradually build your acting skills through structured training programs suitable for all levels.",
              },
              {
                q: "What is the duration and fee for acting courses in Kanpur?",
                a: "Acting course duration ranges from 1-6 months depending on the program. Contact us for detailed fee structure and flexible payment options. We also offer demo classes.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
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
