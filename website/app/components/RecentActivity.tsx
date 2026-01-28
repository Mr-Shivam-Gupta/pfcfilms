"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowRight, Calendar, X, Award, Film, Clock, Tag } from "lucide-react";
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
        className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden">
          {/* Right Side - Image (Shows first on mobile, second on desktop) */}
          <div className="relative bg-zinc-900 overflow-hidden order-1 md:order-2">
            {hasImage ? (
              <div className="relative w-full h-full min-h-[400px] md:min-h-[700px]">
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
              </div>
            ) : (
              <div className="w-full h-full min-h-[400px] md:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-600/20">
                <span className="text-6xl">{isProduction ? "🎬" : "🏆"}</span>
              </div>
            )}
          </div>

          {/* Left Side - Details (Shows second on mobile, first on desktop) */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 order-2 md:order-1">
            {/* Header */}
            <div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {activity.title}
              </h2>
              {activity.date && (
                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>{activity.date}</span>
                </div>
              )}
            </div>

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
              <div className="grid grid-cols-1 gap-6">
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

            {/* Award Specific Details - Removed year, category, project fields */}

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
    </div>
  );
}

export default function RecentActivity() {
  const router = useRouter();
  const [activeActivityTab, setActiveActivityTab] =
    useState<ActivityTab>("productions");
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
      date: "",
      image: prod.image || "",
      originalData: prod,
      type: "production" as const,
    })),
    awards: awards.map((award) => ({
      title: award.title,
      event: "Award",
      date: "",
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
      label: "Awards & Celebrities",
      shortLabel: "Awards & Celebrities",
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

  const activeTab = tabs.find((t) => t.key === activeActivityTab)!;
  const activities = recentActivities[activeActivityTab];

  return (
    <section
      className="py-20 px-4 bg-zinc-50 relative overflow-hidden"
      id="recent-activity"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - matches Top Projects */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-black" suppressHydrationWarning>
          Our <span className="text-amber-500">Journey</span>
        </h2>
        <p
          className="text-center text-zinc-600 mb-8 animate-on-scroll opacity-0 transition-all duration-1000"
          style={{ transitionDelay: "100ms" }}
          suppressHydrationWarning
        >
          From award-winning films to viral marketing campaigns, explore our
          creative journey through the industry.
        </p>

        {/* Tab Navigation - light theme */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveActivityTab(tab.key)}
              className={`group relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeActivityTab === tab.key
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-amber-400 hover:text-amber-600"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-zinc-600">Loading...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 mb-4">
              <span className="text-4xl">{activeTab.icon}</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">No {activeTab.label} Found</h3>
            <p className="text-zinc-600 max-w-md mx-auto">
              {activeTab.label} will appear here once they are added to the system.
            </p>
          </div>
        ) : (
          /* Grid layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 6).map((activity, idx) => (
              <ModernActivityCard
                key={`${activeTab.key}-${idx}`}
                activity={activity}
                tab={activeTab}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* View All + View Details CTA */}
        {!loading && activities.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/productions")}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              View All {activeTab.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
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

// Card Component - matches Top Projects design + View Details button
function ModernActivityCard({
  activity,
  tab,
  onViewDetails,
}: {
  activity: Activity;
  tab: { key: ActivityTab; color: string; bgColor: string; icon: string };
  onViewDetails: (activity: Activity) => void;
}) {
  const hasImage = activity.image && activity.image.trim() !== "";
  const imgSrc = imageUrl(activity.image) || DEFAULT_IMAGE;

  return (
    <div className="group/card">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onViewDetails(activity)}
        onKeyDown={(e) => e.key === "Enter" && onViewDetails(activity)}
        className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 transition-all cursor-pointer transform hover:scale-105 h-full shadow-lg"
      >
        <div
          className={`aspect-square flex items-center justify-center text-6xl bg-gradient-to-br ${tab.color} relative overflow-hidden`}
        >
          {hasImage ? (
            <Image
              src={imgSrc}
              alt={activity.title}
              fill
              className="object-cover transform transition-all duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith("feature-film.jpg")) {
                  target.src = DEFAULT_IMAGE;
                }
              }}
              unoptimized={imgSrc.startsWith("http://") || imgSrc.startsWith("https://")}
            />
          ) : (
            <span className="relative z-10">{tab.icon}</span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
        </div>
        <div className="p-6 relative">
          <div className="text-xs text-amber-600 mb-2 font-semibold uppercase tracking-wider">
            {activity.event}
          </div>
          <h3 className="text-xl font-bold transform transition-all duration-300 group-hover:translate-x-2 text-black line-clamp-2">
            {activity.title}
          </h3>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(activity);
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group/btn"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl transform scale-105 pointer-events-none" />
      </div>
    </div>
  );
}
