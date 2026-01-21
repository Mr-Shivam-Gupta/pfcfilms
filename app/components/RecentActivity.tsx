"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";

interface Activity {
  title: string;
  event: string;
  date: string;
  image: string;
}

type ActivityTab = "awards" | "shows" | "shooting" | "releases";

export default function RecentActivity() {
  const [activeActivityTab, setActiveActivityTab] =
    useState<ActivityTab>("awards");

  const recentActivities: Record<ActivityTab, Activity[]> = {
    awards: [
      {
        title: "Best Cinematography Award",
        event: "Chennai International Film Festival",
        date: "Jan 15, 2026",
        image: "🏆",
      },
      {
        title: "Best Director - Short Film",
        event: "National Film Awards",
        date: "Jan 10, 2026",
        image: "🎬",
      },
      {
        title: "Audience Choice Award",
        event: "Mumbai Film Festival",
        date: "Dec 28, 2025",
        image: "⭐",
      },
      {
        title: "Best Editing Award",
        event: "South Indian Cinema Awards",
        date: "Dec 20, 2025",
        image: "✂️",
      },
      {
        title: "Excellence in Production",
        event: "Tamil Film Producers Council",
        date: "Dec 15, 2025",
        image: "🎭",
      },
      {
        title: "Best Music Video",
        event: "MTV Music Awards",
        date: "Dec 5, 2025",
        image: "🎵",
      },
      {
        title: "Outstanding Dance Performance",
        event: "National Dance Championship",
        date: "Nov 28, 2025",
        image: "💃",
      },
      {
        title: "Best Documentary",
        event: "Documentary Film Festival",
        date: "Nov 20, 2025",
        image: "📹",
      },
      {
        title: "Rising Star Production House",
        event: "Film Industry Excellence Awards",
        date: "Nov 10, 2025",
        image: "🌟",
      },
      {
        title: "Best Commercial Ad Campaign",
        event: "Advertising Excellence Awards",
        date: "Nov 5, 2025",
        image: "📺",
      },
    ],
    shows: [
      {
        title: "Dance Reality Show - Season 2",
        event: "Star Network",
        date: "Jan 20, 2026",
        image: "🎪",
      },
      {
        title: "Behind The Scenes Documentary",
        event: "Netflix Original",
        date: "Jan 18, 2026",
        image: "🎥",
      },
      {
        title: "Talent Hunt Show Finale",
        event: "Zee Tamil",
        date: "Jan 12, 2026",
        image: "🎤",
      },
      {
        title: "Celebrity Dance Battle",
        event: "Vijay TV",
        date: "Jan 8, 2026",
        image: "💫",
      },
      {
        title: "Film Making Workshop Series",
        event: "PFC Studios Live",
        date: "Jan 5, 2026",
        image: "📽️",
      },
      {
        title: "Music Video Countdown Show",
        event: "MTV India",
        date: "Dec 30, 2025",
        image: "🎵",
      },
      {
        title: "Dance Academy Showcase",
        event: "Sun TV",
        date: "Dec 25, 2025",
        image: "🎭",
      },
      {
        title: "Production House Special",
        event: "Colors Tamil",
        date: "Dec 20, 2025",
        image: "🌈",
      },
      {
        title: "Award Ceremony Live",
        event: "Hotstar Premium",
        date: "Dec 15, 2025",
        image: "🏆",
      },
      {
        title: "Making of Reality Show",
        event: "Amazon Prime",
        date: "Dec 10, 2025",
        image: "📺",
      },
    ],
    shooting: [
      {
        title: 'Feature Film - "Vaanam"',
        event: "Outdoor Location - Ooty",
        date: "Jan 22, 2026",
        image: "🎬",
      },
      {
        title: "Web Series Episode 5-8",
        event: "Studio Shoot - Chennai",
        date: "Jan 19, 2026",
        image: "📹",
      },
      {
        title: "Commercial Ad - Tech Brand",
        event: "Green Screen Studio",
        date: "Jan 17, 2026",
        image: "📸",
      },
      {
        title: "Music Video - Classical Fusion",
        event: "Heritage Temple Location",
        date: "Jan 14, 2026",
        image: "🎵",
      },
      {
        title: "Documentary - Traditional Arts",
        event: "Village Location - Thanjavur",
        date: "Jan 11, 2026",
        image: "🎥",
      },
      {
        title: 'Short Film - "Nizhal"',
        event: "Night Shoot - Chennai Beach",
        date: "Jan 7, 2026",
        image: "🌙",
      },
      {
        title: "Reality Show - Final Episode",
        event: "Studio Set - Hyderabad",
        date: "Jan 3, 2026",
        image: "🎪",
      },
      {
        title: "Behind The Scenes Content",
        event: "Multiple Locations",
        date: "Dec 29, 2025",
        image: "📽️",
      },
      {
        title: "Dance Performance Video",
        event: "PFC Dance Academy",
        date: "Dec 24, 2025",
        image: "💃",
      },
      {
        title: "Corporate Film Shoot",
        event: "Office Location - Bangalore",
        date: "Dec 18, 2025",
        image: "🏢",
      },
    ],
    releases: [
      {
        title: 'Feature Film - "Kadhal Kavithai"',
        event: "Theatrical Release - Nationwide",
        date: "Jan 26, 2026",
        image: "🎬",
      },
      {
        title: 'Web Series - "City Lights"',
        event: "Amazon Prime Video",
        date: "Jan 21, 2026",
        image: "💻",
      },
      {
        title: 'Short Film - "Kanneer"',
        event: "YouTube Premiere",
        date: "Jan 16, 2026",
        image: "🎞️",
      },
      {
        title: 'Documentary - "Art of Dance"',
        event: "Netflix Documentary",
        date: "Jan 13, 2026",
        image: "📺",
      },
      {
        title: 'Music Video - "Mazhai"',
        event: "All Music Platforms",
        date: "Jan 9, 2026",
        image: "🎵",
      },
      {
        title: "Commercial Ad Campaign",
        event: "National Television",
        date: "Jan 6, 2026",
        image: "📹",
      },
      {
        title: "Web Series - Season 2",
        event: "Hotstar Premium",
        date: "Jan 1, 2026",
        image: "🌟",
      },
      {
        title: 'Short Film - "Veyil"',
        event: "Film Festival Circuit",
        date: "Dec 27, 2025",
        image: "☀️",
      },
      {
        title: "Dance Performance Film",
        event: "YouTube & Social Media",
        date: "Dec 22, 2025",
        image: "💫",
      },
      {
        title: 'Feature Film - "Uyir"',
        event: "International Release",
        date: "Dec 16, 2025",
        image: "🌍",
      },
    ],
  };

  return (
    <section className="py-20 px-4 bg-zinc-900/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10">
          Recent <span className="text-amber-400">Activity</span>
        </h2>
        <p
          className="text-center text-gray-400 mb-12 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "100ms" }}
        >
          Stay updated with our latest achievements and projects
        </p>

        {/* Activity Tabs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "200ms" }}
        >
          {[
            { key: "awards", label: "Recent Awards", icon: "🏆" },
            { key: "shows", label: "Recent Shows", icon: "📺" },
            { key: "shooting", label: "Recent Shooting", icon: "🎬" },
            { key: "releases", label: "Film Releases", icon: "🎞️" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveActivityTab(tab.key as ActivityTab)}
              className={`group px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${
                activeActivityTab === tab.key
                  ? "bg-amber-400 text-black shadow-xl shadow-amber-500/50"
                  : "bg-black/50 border border-zinc-800 hover:border-amber-400 text-white"
              }`}
            >
              <span className="text-xl transform transition-transform group-hover:scale-110">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Activity Content with Vertical Scroll */}
        <div className="relative">
          <div className="max-h-[600px] overflow-y-auto scroll-smooth scrollbar-custom">
            <div className="grid md:grid-cols-2 gap-6 pr-4">
              {recentActivities[activeActivityTab].map((activity, idx) => (
                <div
                  key={idx}
                  className="group bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10"
                  style={{
                    animation: "fadeInUp 0.6s ease-out forwards",
                    animationDelay: `${idx * 50}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-start space-x-4 p-6">
                    {/* Image/Icon */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center text-4xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {activity.image}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 flex items-center space-x-2">
                        <span className="inline-block w-2 h-2 bg-amber-400 rounded-full"></span>
                        <span>{activity.event}</span>
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-amber-400/80">
                        <Calendar size={14} />
                        <span>{activity.date}</span>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <ChevronRight size={20} className="text-amber-400" />
                    </div>
                  </div>

                  {/* Hover Effect Bar */}
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Fade Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
