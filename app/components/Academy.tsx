"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Users,
  GraduationCap,
  Star,
  CheckCircle,
  Award,
} from "lucide-react";

export default function Academy() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "Film Direction Masterclass",
      level: "Advanced",
      duration: "6 Months",
      students: "150+",
      rating: "4.9",
      price: "₹75,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Film+Direction",
      description:
        "Master the art of directing feature films with hands-on experience",
      modules: [
        "Screenplay Analysis",
        "Shot Composition",
        "Actor Direction",
        "Post-Production Workflow",
      ],
    },
    {
      id: 2,
      title: "Cinematography Professional Course",
      level: "Intermediate",
      duration: "4 Months",
      students: "200+",
      rating: "4.8",
      price: "₹60,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Cinematography",
      description: "Learn advanced camera techniques and visual storytelling",
      modules: [
        "Camera Operations",
        "Lighting Techniques",
        "Color Grading",
        "Visual Effects Basics",
      ],
    },
    {
      id: 3,
      title: "Video Editing & Post-Production",
      level: "Beginner to Advanced",
      duration: "3 Months",
      students: "300+",
      rating: "4.9",
      price: "₹45,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Video+Editing",
      description:
        "Complete training in editing software and post-production workflow",
      modules: [
        "Adobe Premiere Pro",
        "DaVinci Resolve",
        "Sound Design",
        "Color Correction",
      ],
    },
    {
      id: 4,
      title: "Acting for Camera",
      level: "Beginner",
      duration: "2 Months",
      students: "250+",
      rating: "4.7",
      price: "₹35,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Acting",
      description:
        "Develop your acting skills specifically for film and television",
      modules: [
        "Method Acting",
        "Emotional Range",
        "Audition Techniques",
        "Character Development",
      ],
    },
    {
      id: 5,
      title: "Screenwriting Workshop",
      level: "Intermediate",
      duration: "3 Months",
      students: "180+",
      rating: "4.8",
      price: "₹40,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Screenwriting",
      description:
        "Craft compelling stories and develop your unique writing voice",
      modules: [
        "Story Structure",
        "Character Arc",
        "Dialogue Writing",
        "Script Formatting",
      ],
    },
    {
      id: 6,
      title: "Film Production Management",
      level: "Advanced",
      duration: "4 Months",
      students: "120+",
      rating: "4.9",
      price: "₹55,000",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Production",
      description:
        "Learn to manage film productions from pre to post-production",
      modules: [
        "Budget Planning",
        "Schedule Management",
        "Team Coordination",
        "Distribution Strategy",
      ],
    },
  ];

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Expert Faculty",
      description:
        "Learn from industry professionals with 15+ years experience",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Small Batch Size",
      description: "Maximum 20 students per batch for personalized attention",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Industry Certificate",
      description: "Recognized certification upon successful completion",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Placement Support",
      description: "100% placement assistance with leading production houses",
    },
  ];

  const academies = [
    {
      id: 1,
      title: "Acting School in Kanpur",
      tagline: "Best Acting School Kanpur | Film & Theatre Training",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Acting+School",
      highlights: [
        "Acting for Camera",
        "Audition Techniques",
        "Character Development",
        "Industry Exposure",
      ],
      duration: "2–6 Months",
      students: "500+",
    },
    {
      id: 2,
      title: "Dance Academy in Kanpur",
      tagline: "Dhamal India Dance | Bollywood • Hip Hop • Classical",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Academy",
      highlights: [
        "Bollywood & Hip Hop",
        "Classical Dance Forms",
        "Stage Performance",
        "Choreography Training",
      ],
      duration: "3–12 Months",
      students: "400+",
    },
    {
      id: 3,
      title: "Film Academy",
      tagline: "Direction • Cinematography • Editing",
      image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Film+Academy",
      highlights: [
        "Film Direction",
        "Cinematography",
        "Editing & Post",
        "Production Management",
      ],
      duration: "3–9 Months",
      students: "600+",
    },
  ];

  const testimonials = [
    {
      name: "Arjun Mehta",
      course: "Film Direction",
      image: "https://placehold.co/100x100/1a1a1a/fbbf24?text=AM",
      text: "The course transformed my understanding of filmmaking. Now working as an assistant director in Bollywood!",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      course: "Cinematography",
      image: "https://placehold.co/100x100/1a1a1a/fbbf24?text=SP",
      text: "Hands-on training with professional equipment made all the difference. Highly recommended!",
      rating: 5,
    },
    {
      name: "Rahul Sharma",
      course: "Video Editing",
      image: "https://placehold.co/100x100/1a1a1a/fbbf24?text=RS",
      text: "Got placed in a top production house within 2 months of completing the course. Best investment!",
      rating: 5,
    },
  ];

  return (
    <section className="relative min-h-screen py-20 bg-zinc-50">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Dance Academy & Acting School{" "}
            <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              in Kanpur
            </span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            PFC FILMS - Best Dance Academy & Acting School in Kanpur. Join Dhamal India Dance for professional dance and acting training. Learn from industry experts in Kanpur, Uttar Pradesh.
          </p>
        </div>

        {/* Features */}
        <div
          className="grid md:grid-cols-4 gap-6 mb-16 animate-fadeInUp"
          style={{ animationDelay: "200ms" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-zinc-200 text-center transform transition-all duration-300 hover:scale-105 hover:border-amber-400 shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-center mb-4 text-amber-500">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-600 font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* ACADEMY CATEGORIES */}
        <section className="mb-32">
          <h3 className="text-4xl font-bold text-center mb-16 text-black">
            Our <span className="text-amber-500">Academies</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {academies.map((academy) => (
              <div
                key={academy.id}
                className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="relative h-64">
                  <Image
                    src={academy.image}
                    alt={academy.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-2xl font-bold text-white">
                      {academy.title}
                    </h4>
                    <p className="text-amber-400 font-medium">
                      {academy.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Clock className="w-4 h-4 text-amber-500" />
                      {academy.duration}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Users className="w-4 h-4 text-amber-500" />
                      {academy.students}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {academy.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-zinc-600"
                      >
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full border border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-black py-3 rounded-xl font-semibold transition">
                    Join Us
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <div className="mb-16">
          <h3
            className="text-3xl font-bold text-center mb-10 animate-fadeInUp text-black"
            style={{ animationDelay: "1200ms" }}
          >
            Student <span className="text-amber-500">Success Stories</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-zinc-200 shadow-lg animate-fadeInUp"
                style={{ animationDelay: `${1400 + index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600 font-medium">
                      {testimonial.course}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
                <p className="text-zinc-600 text-sm italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center animate-fadeInUp"
          style={{ animationDelay: "1700ms" }}
        >
          <div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-xl relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Ready to Start Your Journey?
            </h3>
            <p className="text-zinc-600 mb-6">
              Join over 1000+ students who have transformed their passion into
              profession
            </p>
            <button className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
              Schedule a Free Demo Class
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
