"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowRight, Calendar, MapPin } from "lucide-react";

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
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Cinematography+Award",
      },
      {
        title: "Best Director - Short Film",
        event: "National Film Awards",
        date: "Jan 10, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Best+Director",
      },
      {
        title: "Audience Choice Award",
        event: "Mumbai Film Festival",
        date: "Dec 28, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Audience+Choice",
      },
      {
        title: "Best Editing Award",
        event: "South Indian Cinema Awards",
        date: "Dec 20, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Best+Editing",
      },
      {
        title: "Excellence in Production",
        event: "Tamil Film Producers Council",
        date: "Dec 15, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Production+Excellence",
      },
      {
        title: "Best Music Video",
        event: "MTV Music Awards",
        date: "Dec 5, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Best+Music+Video",
      },
      {
        title: "Outstanding Dance Performance",
        event: "National Dance Championship",
        date: "Nov 28, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Performance",
      },
      {
        title: "Best Documentary",
        event: "Documentary Film Festival",
        date: "Nov 20, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Best+Documentary",
      },
      {
        title: "Rising Star Production House",
        event: "Film Industry Excellence Awards",
        date: "Nov 10, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Rising+Star",
      },
      {
        title: "Best Commercial Ad Campaign",
        event: "Advertising Excellence Awards",
        date: "Nov 5, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Ad+Campaign",
      },
    ],
    shows: [
      {
        title: "Dance Reality Show - Season 2",
        event: "Star Network",
        date: "Jan 20, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Reality+Show",
      },
      {
        title: "Behind The Scenes Documentary",
        event: "Netflix Original",
        date: "Jan 18, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=BTS+Documentary",
      },
      {
        title: "Talent Hunt Show Finale",
        event: "Zee Tamil",
        date: "Jan 12, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Talent+Hunt",
      },
      {
        title: "Celebrity Dance Battle",
        event: "Vijay TV",
        date: "Jan 8, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Battle",
      },
      {
        title: "Film Making Workshop Series",
        event: "PFC Studios Live",
        date: "Jan 5, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Film+Workshop",
      },
      {
        title: "Music Video Countdown Show",
        event: "MTV India",
        date: "Dec 30, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Music+Countdown",
      },
      {
        title: "Dance Academy Showcase",
        event: "Sun TV",
        date: "Dec 25, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Showcase",
      },
      {
        title: "Production House Special",
        event: "Colors Tamil",
        date: "Dec 20, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=TV+Special",
      },
      {
        title: "Award Ceremony Live",
        event: "Hotstar Premium",
        date: "Dec 15, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Award+Ceremony",
      },
      {
        title: "Making of Reality Show",
        event: "Amazon Prime",
        date: "Dec 10, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Making+Of",
      },
    ],
    shooting: [
      {
        title: 'Feature Film - "Vaanam"',
        event: "Outdoor Location - Ooty",
        date: "Jan 22, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Vaanam+Shoot",
      },
      {
        title: "Web Series Episode 5-8",
        event: "Studio Shoot - Chennai",
        date: "Jan 19, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Web+Series+Shoot",
      },
      {
        title: "Commercial Ad - Tech Brand",
        event: "Green Screen Studio",
        date: "Jan 17, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Ad+Shoot",
      },
      {
        title: "Music Video - Classical Fusion",
        event: "Heritage Temple Location",
        date: "Jan 14, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Music+Video+Shoot",
      },
      {
        title: "Documentary - Traditional Arts",
        event: "Village Location - Thanjavur",
        date: "Jan 11, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Docu+Shoot",
      },
      {
        title: 'Short Film - "Nizhal"',
        event: "Night Shoot - Chennai Beach",
        date: "Jan 7, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Short+Film+Shoot",
      },
      {
        title: "Reality Show - Final Episode",
        event: "Studio Set - Hyderabad",
        date: "Jan 3, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Reality+Show+Set",
      },
      {
        title: "Behind The Scenes Content",
        event: "Multiple Locations",
        date: "Dec 29, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=BTS+Content",
      },
      {
        title: "Dance Performance Video",
        event: "PFC Dance Academy",
        date: "Dec 24, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Video+Shoot",
      },
      {
        title: "Corporate Film Shoot",
        event: "Office Location - Bangalore",
        date: "Dec 18, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Corporate+Shoot",
      },
    ],
    releases: [
      {
        title: 'Feature Film - "Kadhal Kavithai"',
        event: "Theatrical Release - Nationwide",
        date: "Jan 26, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Kadhal+Kavithai",
      },
      {
        title: 'Web Series - "City Lights"',
        event: "Amazon Prime Video",
        date: "Jan 21, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=City+Lights",
      },
      {
        title: 'Short Film - "Kanneer"',
        event: "YouTube Premiere",
        date: "Jan 16, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Kanneer",
      },
      {
        title: 'Documentary - "Art of Dance"',
        event: "Netflix Documentary",
        date: "Jan 13, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Art+of+Dance",
      },
      {
        title: 'Music Video - "Mazhai"',
        event: "All Music Platforms",
        date: "Jan 9, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Mazhai",
      },
      {
        title: "Commercial Ad Campaign",
        event: "National Television",
        date: "Jan 6, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Ad+Release",
      },
      {
        title: "Web Series - Season 2",
        event: "Hotstar Premium",
        date: "Jan 1, 2026",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Web+Series+S2",
      },
      {
        title: 'Short Film - "Veyil"',
        event: "Film Festival Circuit",
        date: "Dec 27, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Veyil",
      },
      {
        title: "Dance Performance Film",
        event: "YouTube & Social Media",
        date: "Dec 22, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Dance+Film",
      },
      {
        title: 'Feature Film - "Uyir"',
        event: "International Release",
        date: "Dec 16, 2025",
        image: "https://placehold.co/600x400/1a1a1a/fbbf24?text=Uyir",
      },
    ],
  };

  const tabs = [
    {
      key: "awards" as ActivityTab,
      label: "Awards",
      shortLabel: "Awards",
      icon: "🏆",
      color: "from-yellow-400 to-amber-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      key: "shows" as ActivityTab,
      label: "TV Shows",
      shortLabel: "Shows",
      icon: "📺",
      color: "from-blue-400 to-purple-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      key: "shooting" as ActivityTab,
      label: "Production",
      shortLabel: "Shooting",
      icon: "🎬",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      key: "releases" as ActivityTab,
      label: "Releases",
      shortLabel: "Releases",
      icon: "🎞️",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  // Helper to determine if image is a URL
  const isUrl = (str: string) => str.startsWith("http") || str.startsWith("/");





  return (
    <section className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden" id="recent-activity">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-bold text-amber-400 uppercase tracking-wider px-4 py-2 bg-amber-400/10 rounded-full border border-amber-400/20">
              Recent Activity
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Journey</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From award-winning films to viral marketing campaigns, explore our creative journey through the industry.
          </p>
        </div>

        {/* Tab Navigation - Horizontal Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveActivityTab(tab.key)}
              className={`group relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeActivityTab === tab.key
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.color.split('-')[1]}-500/50 scale-105`
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
              {activeActivityTab === tab.key && (
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color} opacity-20 blur-xl`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="relative">
          <div className="space-y-24">
            {tabs
              .filter(tab => tab.key === activeActivityTab)
              .map((tab) => (
              <div 
                key={tab.key} 
                id={`section-${tab.key}`} 
                className="relative"
              >

                {/* Modern Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentActivities[tab.key].slice(0, 6).map((activity, idx) => (
                    <ModernActivityCard 
                      key={`${tab.key}-${idx}`} 
                      activity={activity} 
                      isUrl={isUrl}
                      tab={tab}
                      index={idx}
                    />
                  ))}
                </div>

                {/* View More Button */}
                <div className="mt-12 text-center">
                  <button className={`group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${tab.color} hover:shadow-lg hover:shadow-${tab.color.split('-')[1]}-500/50 transition-all duration-300 hover:scale-105`}>
                    View All {tab.label}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Modern Card Component
function ModernActivityCard({ 
  activity, 
  isUrl, 
  tab,
  index 
}: { 
  activity: Activity; 
  isUrl: (s: string) => boolean; 
  tab: { key: ActivityTab; color: string; bgColor: string };
  index: number;
}) {
  const hasImage = isUrl(activity.image);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <img 
            src={activity.image} 
            alt={activity.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br ${tab.color} opacity-20`}>
            {activity.image}
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tab.color} shadow-lg`}>
            {tab.key.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
          {activity.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="line-clamp-1">{activity.event}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{activity.date}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
          View Details
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Shine Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
    </div>
  );
}