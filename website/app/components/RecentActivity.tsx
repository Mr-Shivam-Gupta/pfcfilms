"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ArrowRight, Calendar, MapPin, X, Award, Film, Clock, Tag } from "lucide-react";
import { getProductions, getAwards, imageUrl, type Production, type Award as AwardType } from "../lib/api";

const DEFAULT_IMAGE = "/projects/feature-film.jpg";

interface Activity {
  title: string;
  event: string;
  date: string;
  image: string;
  originalData?: Production | AwardType;
  type: "production" | "award";
}

type ActivityTab = "awards" | "productions";

// Activity Details Modal Component
function ActivityDetailsModal({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  const isProduction = activity.type === "production";
  const production = isProduction ? (activity.originalData as Production) : null;
  const award = !isProduction ? (activity.originalData as AwardType) : null;
  const hasImage = activity.image && activity.image.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-zinc-900">
          {hasImage ? (
            <Image
              src={imageUrl(activity.image) || DEFAULT_IMAGE}
              alt={activity.title}
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith("feature-film.jpg")) {
                  target.src = DEFAULT_IMAGE;
                }
              }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-600/20">
              <span className="text-6xl">{isProduction ? "🎬" : "🏆"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              {isProduction ? (
                <Film className="w-5 h-5 text-amber-400" />
              ) : (
                <Award className="w-5 h-5 text-amber-400" />
              )}
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                {activity.event}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {activity.title}
            </h2>
            <div className="flex items-center gap-4 text-zinc-400 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{activity.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          {(production?.description || award?.description) && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                Description
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {production?.description || award?.description}
              </p>
            </div>
          )}

          {/* Production Specific Details */}
          {isProduction && production && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {production.genre && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                    Genre
                  </h4>
                  <p className="text-zinc-300">{production.genre}</p>
                </div>
              )}
              {production.duration && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </h4>
                  <p className="text-zinc-300">{production.duration}</p>
                </div>
              )}
              {production.status && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                    Status
                  </h4>
                  <p className="text-zinc-300">{production.status}</p>
                </div>
              )}
              {production.awards && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Awards
                  </h4>
                  <p className="text-zinc-300">{production.awards}</p>
                </div>
              )}
            </div>
          )}

          {/* Award Specific Details */}
          {!isProduction && award && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {award.project && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    Project
                  </h4>
                  <p className="text-zinc-300">{award.project}</p>
                </div>
              )}
              {award.category && (
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                    Category
                  </h4>
                  <p className="text-zinc-300">{award.category}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const [activeActivityTab, setActiveActivityTab] =
    useState<ActivityTab>("awards");
  const [productions, setProductions] = useState<Production[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodsData, awardsData] = await Promise.all([
          getProductions(undefined, true), // Get featured productions
          getAwards(true), // Get featured awards
        ]);
        setProductions(prodsData);
        setAwards(awardsData);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map backend data to Activity format
  const recentActivities: Record<ActivityTab, Activity[]> = {
    productions: productions.map((prod) => ({
      title: prod.title,
      event: prod.category || "Production",
      date: prod.year || new Date().getFullYear().toString(),
      image: prod.image || "",
      originalData: prod,
      type: "production" as const,
    })),
    awards: awards.map((award) => ({
      title: award.title,
      event: award.category || "Award",
      date: award.year || "",
      image: award.image || "",
      originalData: award,
      type: "award" as const,
    })),
  };

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
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
      key: "productions" as ActivityTab,
      label: "Featured Productions",
      shortLabel: "Productions",
      icon: "🎬",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  return (
    <section
      className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden"
      id="recent-activity"
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-block mb-4">
            <span className="text-sm font-bold text-amber-400 uppercase tracking-wider px-4 py-2 bg-amber-400/10 rounded-full border border-amber-400/20">
              Recent Activity
            </span>
          </div> */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              Journey
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From award-winning films to viral marketing campaigns, explore our
            creative journey through the industry.
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
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.color.split("-")[1]}-500/50 scale-105`
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
              {activeActivityTab === tab.key && (
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color} opacity-20 blur-xl`}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="relative">
          <div className="space-y-24">
            {tabs
              .filter((tab) => tab.key === activeActivityTab)
              .map((tab) => (
                <div
                  key={tab.key}
                  id={`section-${tab.key}`}
                  className="relative"
                >
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                      <p className="mt-4 text-zinc-400">Loading...</p>
                    </div>
                  ) : recentActivities[tab.key].length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
                        <span className="text-4xl">{tab.icon}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No {tab.label} Found</h3>
                      <p className="text-zinc-400 max-w-md mx-auto">
                        {tab.label} will appear here once they are added to the system.
                      </p>
                    </div>
                  ) : (
                    /* Modern Grid Layout */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recentActivities[tab.key]
                        .slice(0, 6)
                        .map((activity, idx) => (
                          <ModernActivityCard
                            key={`${tab.key}-${idx}`}
                            activity={activity}
                            tab={tab}
                            index={idx}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                    </div>
                  )}

                  {/* View More Button */}
                  <div className="mt-12 text-center">
                    <button
                      className={`group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${tab.color} hover:shadow-lg hover:shadow-${tab.color.split("-")[1]}-500/50 transition-all duration-300 hover:scale-105`}
                    >
                      View All {tab.label}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

// Modern Card Component
function ModernActivityCard({
  activity,
  tab,
  index,
  onViewDetails,
}: {
  activity: Activity;
  tab: { key: ActivityTab; color: string; bgColor: string; icon: string };
  index: number;
  onViewDetails: (activity: Activity) => void;
}) {
  const hasImage = activity.image && activity.image.trim() !== "";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-zinc-900/50">
        {hasImage ? (
          <img
            src={imageUrl(activity.image) || DEFAULT_IMAGE}
            alt={activity.title}
            className={`w-full h-full object-contain transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.endsWith("feature-film.jpg")) {
                target.src = DEFAULT_IMAGE;
              }
            }}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br ${tab.color} opacity-20`}
          >
            {tab.icon}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tab.color} shadow-lg`}
          >
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
        <button 
          onClick={() => onViewDetails(activity)}
          className="w-full mt-4 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          View Details
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Shine Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}
      ></div>
    </div>
  );
}
