"use client";

import React, { useEffect, useState } from "react";
import {
  Film,
  Award,
  Star,
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  Heart,
  Rocket,
  Camera,
  Music,
  Video,
} from "lucide-react";
import { getStats, type Stat } from "../lib/api";

// Icon mapping for stats
const iconMap: Record<string, React.ReactNode> = {
  Film: <Film className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Trophy: <Trophy className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Target: <Target className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Rocket: <Rocket className="w-8 h-8" />,
  Camera: <Camera className="w-8 h-8" />,
  Music: <Music className="w-8 h-8" />,
  Video: <Video className="w-8 h-8" />,
};

// Default icon if not found
const DefaultIcon = <Star className="w-8 h-8" />;

// Helper function to extract numeric value from stat number string
function extractNumber(value: string): number {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

// Helper function to format number back to original format
function formatNumber(value: number, original: string): string {
  // Check if original had +, %, or other suffix
  if (original.includes('+')) {
    return `${Math.floor(value)}+`;
  }
  if (original.includes('%')) {
    return `${value.toFixed(1)}%`;
  }
  if (original.includes('.')) {
    return value.toFixed(1);
  }
  return Math.floor(value).toString();
}

// Animated Counter Component
function AnimatedCounter({ 
  targetValue, 
  duration = 2000,
  suffix = ''
}: { 
  targetValue: string; 
  duration?: number;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const numericValue = extractNumber(targetValue);
    if (numericValue === 0) {
      setDisplayValue(0);
      return;
    }

    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (numericValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setDisplayValue(numericValue);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100); // Small delay to ensure component is mounted

    return () => {
      clearTimeout(timeoutId);
    };
  }, [targetValue, duration]);

  return (
    <span className={isAnimating ? 'tabular-nums' : ''}>
      {formatNumber(displayValue, targetValue)}{suffix}
    </span>
  );
}

export default function Stats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats([]);
      } finally {
        setLoading(false);
        // Trigger animation after a short delay
        setTimeout(() => {
          setHasAnimated(true);
        }, 300);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-zinc-600">Loading stats...</p>
          </div>
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return null; // Don't show section if no stats
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon
              ? iconMap[stat.icon] || DefaultIcon
              : DefaultIcon;

            return (
              <div
                key={stat._id || idx}
                className="group relative animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
                style={{ transitionDelay: `${idx * 100}ms` }}
                suppressHydrationWarning
              >
                <div className="relative bg-white rounded-2xl p-8 border border-amber-100 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50 group-hover:to-amber-100/50 transition-all duration-500"></div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {IconComponent}
                    </div>

                    {/* Number */}
                    <div className="text-4xl md:text-5xl font-black text-amber-600 mb-2 transform transition-all duration-500 group-hover:scale-110">
                      {hasAnimated ? (
                        <AnimatedCounter targetValue={stat.number} duration={2000} />
                      ) : (
                        <span className="tabular-nums">0</span>
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-sm md:text-base font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                      {stat.label}
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}