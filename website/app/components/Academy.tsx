"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  GraduationCap,
  Star,
  CheckCircle,
  Award,
} from "lucide-react";
import { getCourses, getTestimonials, imageUrl, type Course, type Testimonial } from "../lib/api";

// Marquee hook for auto carousel with mouse control
function useTicker({
  initialSpeed = 1,
  direction = 1,
  isPaused = false,
}: {
  initialSpeed?: number;
  direction?: number;
  isPaused?: boolean;
}) {
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | undefined>(undefined);

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== undefined) {
        const deltaTime = time - lastTimeRef.current;
        const move = deltaTime * 0.05 * initialSpeed * direction;

        if (!isPaused) {
          setOffset((prev) => prev - move);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [initialSpeed, direction, isPaused],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return offset;
}

export default function Academy() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Marquee state for testimonials
  const [dragX, setDragX] = useState(0);
  const [lastDragX, setLastDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const didMoveRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [coursesData, testimonialsData] = await Promise.all([
        getCourses(),
        getTestimonials(true),
      ]);
      setCourses(coursesData);
      setTestimonials(testimonialsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const defaultCourses = [
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

  // Marquee parameters for testimonials
  const CARD_WIDTH = 320; // Approximate width of testimonial card (w-80 = 320px + gap)
  const autoOffset = useTicker({ 
    initialSpeed: 0.5, 
    direction: 1, 
    isPaused: isDragging 
  });
  const totalOffset = autoOffset + dragX;
  const totalStripWidth = testimonials.length > 0 ? testimonials.length * CARD_WIDTH : CARD_WIDTH;
  const x = testimonials.length > 0 ? totalOffset % totalStripWidth : 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    didMoveRef.current = false;
    setLastDragX(dragX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 5) {
      didMoveRef.current = true;
    }

    setDragX(lastDragX + delta * 1.2);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };


  return (
    <section className="relative min-h-screen bg-zinc-50 text-zinc-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
      {/* HERO */}
      <section className="py-24 text-center relative overflow-hidden">
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
              Academy
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600 leading-relaxed">
            Professional dance and acting training in Kanpur. Transform your passion into profession with industry experts.
          </p>
        </div>
      </section>

      <div className="relative py-20">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* ACADEMY CATEGORIES - Now using Courses from backend */}
          <section className="mb-32">
            <h3 className="text-4xl font-bold text-center mb-16 text-black">
              Our <span className="text-amber-500">Academies</span>
            </h3>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden border border-zinc-200 animate-pulse">
                    <div className="h-64 bg-zinc-200" />
                    <div className="p-6">
                      <div className="h-6 bg-zinc-200 rounded mb-4" />
                      <div className="h-4 bg-zinc-200 rounded mb-2" />
                      <div className="h-4 bg-zinc-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-4">
                  <GraduationCap className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Courses Found</h3>
                <p className="text-zinc-600 max-w-md mx-auto">
                  Courses will appear here once they are added to the system.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-10">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:shadow-2xl transition"
                  >
                    {/* Image */}
                    <div className="relative h-64">
                      <Image
                        src={course.image ? (imageUrl(course.image) || "/projects/feature-film.jpg") : "/projects/feature-film.jpg"}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== "/projects/feature-film.jpg") {
                            target.src = "/projects/feature-film.jpg";
                          }
                        }}
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-2xl font-bold text-white">
                          {course.title}
                        </h4>
                        <p className="text-amber-400 font-medium">
                          {course.academy || course.level}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-zinc-600">
                          <Clock className="w-4 h-4 text-amber-500" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-600">
                          <Users className="w-4 h-4 text-amber-500" />
                          {course.students}
                        </div>
                      </div>

                      {course.description && (
                        <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}

                      {course.modules && course.modules.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {course.modules.slice(0, 4).map((module, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-zinc-600"
                            >
                              <CheckCircle className="w-4 h-4 text-amber-500" />
                              {module}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-semibold text-zinc-900">{course.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-amber-600">{course.price}</span>
                      </div>

                      <Link
                        href="/contact"
                        className="block w-full text-center border border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-black py-3 rounded-xl font-semibold transition"
                      >
                        Join Us
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Testimonials - Auto Carousel with Mouse Control */}
          <div className="mb-16">
            <h3
              className="text-3xl font-bold text-center mb-10 animate-fadeInUp text-black"
              style={{ animationDelay: "1200ms" }}
            >
              Student <span className="text-amber-500">Success Stories</span>
            </h3>
            
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-zinc-200">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-zinc-200 animate-pulse mr-4" />
                      <div className="flex-1">
                        <div className="h-5 bg-zinc-200 rounded animate-pulse mb-2" />
                        <div className="h-4 bg-zinc-200 rounded animate-pulse w-2/3" />
                      </div>
                    </div>
                    <div className="h-4 bg-zinc-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-zinc-200 rounded animate-pulse w-5/6" />
                  </div>
                ))}
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-4">
                  <Star className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Testimonials Found</h3>
                <p className="text-zinc-600 max-w-md mx-auto">
                  Testimonials will appear here once they are added to the system.
                </p>
              </div>
            ) : (
              <div
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing pb-8 select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {/* Duplicate testimonials for seamless loop */}
                <div
                  className="flex gap-6 pl-[50%] will-change-transform"
                  style={{
                    transform: `translate3d(${x}px, 0, 0)`,
                    width: "max-content",
                  }}
                >
                  {testimonials.length > 0 && [...testimonials, ...testimonials, ...testimonials].map(
                    (testimonial, index) => (
                      <div
                        key={`${testimonial._id}-${index}`}
                        className="flex-shrink-0 w-80 bg-white p-6 rounded-xl border border-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400">
                            {testimonial.image ? (
                              <Image
                                src={imageUrl(testimonial.image)}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                                draggable={false}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const userIcon = parent.querySelector(".user-icon-fallback") as HTMLElement;
                                    if (userIcon) {
                                      userIcon.style.display = "block";
                                    }
                                  }
                                }}
                                onLoad={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const userIcon = parent.querySelector(".user-icon-fallback") as HTMLElement;
                                    if (userIcon) {
                                      userIcon.style.display = "none";
                                    }
                                  }
                                }}
                                unoptimized={true}
                              />
                            ) : null}
                            <div className={`user-icon-fallback absolute inset-0 ${testimonial.image ? "hidden" : "block"}`}>
                              <Image
                                src="/images/default-user-icon.png"
                                alt={testimonial.name || "User"}
                                fill
                                className="object-cover"
                                draggable={false}
                                onError={(e) => {
                                  // Fallback to SVG if default image doesn't exist
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div class="absolute inset-0 bg-zinc-100 flex items-center justify-center">
                                        <svg class="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                      </div>
                                    `;
                                  }
                                }}
                                unoptimized={true}
                              />
                            </div>
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
                        <p className="text-zinc-600 text-sm italic line-clamp-4">
                          "{testimonial.text}"
                        </p>
                      </div>
                    ),
                  )}
                </div>

                {/* Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10"></div>
              </div>
            )}
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
            <Link
              href="/contact"
              className="inline-block bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
            >
              Schedule a Free Demo Class
            </Link>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
