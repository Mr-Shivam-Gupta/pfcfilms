"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, Clock, Users, GraduationCap, Star, CheckCircle, Award } from "lucide-react";

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
      description: "Master the art of directing feature films with hands-on experience",
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
      description: "Complete training in editing software and post-production workflow",
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
      description: "Develop your acting skills specifically for film and television",
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
      description: "Craft compelling stories and develop your unique writing voice",
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
      description: "Learn to manage film productions from pre to post-production",
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
      description: "Learn from industry professionals with 15+ years experience",
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
            Film{" "}
            <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              Academy
            </span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Learn from industry experts and kickstart your career in filmmaking
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
              <h3 className="text-lg font-bold mb-2 text-black">{feature.title}</h3>
              <p className="text-sm text-zinc-600 font-medium">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="mb-16">
          <h3
            className="text-3xl font-bold text-center mb-10 animate-fadeInUp text-black"
            style={{ animationDelay: "400ms" }}
          >
            Our <span className="text-amber-500">Courses</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-xl shadow-md animate-fadeInUp"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {/* Level Badge */}
                  <div className="absolute top-4 right-4 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-black group-hover:text-amber-500 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-zinc-600 text-sm mb-4">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-zinc-500">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-amber-600 mb-2">Key Modules:</h4>
                    <ul className="space-y-1">
                      {course.modules.slice(0, 3).map((module, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs text-zinc-500">
                          <CheckCircle className="w-3 h-3 text-amber-500" />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div>
                      <div className="text-2xl font-bold text-amber-500">{course.price}</div>
                      <div className="text-xs text-zinc-400">One-time fee</div>
                    </div>
                    <button className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                    <p className="text-sm text-amber-600 font-medium">{testimonial.course}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-600 text-sm italic">"{testimonial.text}"</p>
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
            <h3 className="text-2xl font-bold mb-4 text-black">Ready to Start Your Journey?</h3>
            <p className="text-zinc-600 mb-6">
              Join over 1000+ students who have transformed their passion into profession
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
