"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Calendar,
  Award,
  Star,
  Film,
  Trophy,
  Tv,
  Rocket,
  ChevronRight,
  MapPin,
  X,
  Clock,
  Tag,
} from "lucide-react";
import { getProductions, getAwards, imageUrl, type Production, type Award as AwardType } from "../lib/api";

// Modern Production Card Component
function ModernProductionCard({
  production,
  index,
  onViewDetails,
  isUrl,
}: {
  production: Production;
  index: number;
  onViewDetails: (production: Production) => void;
  isUrl: (str: string) => boolean;
}) {
  const hasImage = production.image && isUrl(production.image);
  const [isHovered, setIsHovered] = useState(false);

  // Color mapping for different categories
  const categoryColors: Record<string, string> = {
    "Feature Films": "from-purple-400 to-pink-500",
    "Documentaries": "from-blue-400 to-cyan-500",
    "Music Videos": "from-blue-400 to-purple-500",
    "Commercials": "from-orange-400 to-red-500",
    "Short Films": "from-indigo-400 to-purple-500",
    "Web Series": "from-teal-400 to-cyan-500",
    "Reality Shows": "from-rose-400 to-pink-500",
  };

  const color = categoryColors[production.category] || "from-amber-400 to-amber-500";

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-amber-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <Image
            src={imageUrl(production.image)}
            alt={production.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br ${color} opacity-10`}
          >
            🎬
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${color} shadow-lg`}
          >
            {production.category.toUpperCase()}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white shadow-lg">
            <Play className="w-8 h-8 text-amber-600" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-lg font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
          {production.title}
        </h3>

        <div className="space-y-2 mb-4">
          {(production.genre || production.duration) && (
            <div className="flex items-center gap-2 text-zinc-600 text-sm">
              <Tag className="w-4 h-4 text-amber-500" />
              <span className="line-clamp-1">
                {production.genre || ""} {production.genre && production.duration ? "•" : ""} {production.duration || ""}
              </span>
            </div>
          )}
          {production.year && (
            <div className="flex items-center gap-2 text-zinc-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>{production.year}</span>
            </div>
          )}
        </div>

        {production.description && (
          <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
            {production.description}
          </p>
        )}

        {production.awards && (
          <div className="flex items-center gap-2 text-amber-600 text-sm mb-4">
            <Award className="w-4 h-4" />
            <span className="line-clamp-1">{production.awards}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(production)}
          className="w-full mt-4 px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-semibold border border-amber-200 hover:border-amber-300 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          View Details
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Shine Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}
      ></div>
    </div>
  );
}

// Production Details Modal Component
function ProductionDetailsModal({
  production,
  onClose,
}: {
  production: Production;
  onClose: () => void;
}) {
  const isUrl = (str: string) => str.startsWith("http") || str.startsWith("/");
  const hasImage = production.image && isUrl(production.image);

  const categoryColors: Record<string, string> = {
    "Feature Films": "from-purple-400 to-pink-500",
    "Documentaries": "from-blue-400 to-cyan-500",
    "Music Videos": "from-blue-400 to-purple-500",
    "Commercials": "from-orange-400 to-red-500",
    "Short Films": "from-indigo-400 to-purple-500",
    "Web Series": "from-teal-400 to-cyan-500",
    "Reality Shows": "from-rose-400 to-pink-500",
  };

  const color = categoryColors[production.category] || "from-amber-400 to-amber-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          {hasImage ? (
            <Image
              src={imageUrl(production.image)}
              alt={production.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
              <span className="text-6xl">🎬</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 transition-colors z-10 shadow-lg"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-5 h-5 text-amber-600" />
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${color} shadow-lg`}>
                {production.category}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
              {production.title}
            </h2>
            <div className="flex items-center gap-4 text-zinc-600 text-sm">
              {production.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{production.year}</span>
                </div>
              )}
              {production.status && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{production.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          {production.description && (
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                Description
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                {production.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {production.genre && (
              <div>
                <h4 className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider">
                  Genre
                </h4>
                <p className="text-zinc-700">{production.genre}</p>
              </div>
            )}
            {production.duration && (
              <div>
                <h4 className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration
                </h4>
                <p className="text-zinc-700">{production.duration}</p>
              </div>
            )}
            {production.status && (
              <div>
                <h4 className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider">
                  Status
                </h4>
                <p className="text-zinc-700">{production.status}</p>
              </div>
            )}
            {production.awards && (
              <div>
                <h4 className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Awards
                </h4>
                <p className="text-zinc-700">{production.awards}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-zinc-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold border border-amber-200 hover:border-amber-300 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Productions() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [productions, setProductions] = useState<Production[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Feature Films",
    "Documentaries",
    "Music Videos",
    "Commercials",
    "Short Films",
    "Web Series",
    "Reality Shows",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodsData, awardsData] = await Promise.all([
        getProductions(),
        getAwards(),
      ]);
      setProductions(prodsData);
      setAwards(awardsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProductions =
    activeCategory === "all"
      ? productions
      : productions.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );

  const releases = productions.filter((p) => p.status === "Upcoming");
  const inProduction = productions.filter((p) => p.status === "In Production");
  const [selectedProduction, setSelectedProduction] = useState<Production | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (production: Production) => {
    setSelectedProduction(production);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduction(null);
  };

  const isUrl = (str: string) => str.startsWith("http") || str.startsWith("/");

  /* ===================== UI ===================== */

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen">
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
              Productions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600 leading-relaxed">
            Cinema, documentaries & visual stories crafted with passion
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="py-12 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className={`group relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat.toLowerCase()
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 scale-105"
                    : "bg-white text-zinc-600 hover:bg-amber-50 hover:text-amber-700 border border-zinc-200 hover:border-amber-300"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat.toLowerCase() && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-20 blur-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* IN PRODUCTION SECTION */}
      {inProduction.length > 0 && (
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
                In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">Production</span>
              </h2>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Currently working on these exciting projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProduction.map((production, idx) => (
                <ModernProductionCard
                  key={production._id}
                  production={production}
                  index={idx}
                  onViewDetails={handleViewDetails}
                  isUrl={isUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTIONS GRID */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-zinc-200 animate-pulse"
                >
                  <div className="h-48 bg-zinc-200" />
                  <div className="p-6">
                    <div className="h-6 bg-zinc-200 rounded mb-2" />
                    <div className="h-4 bg-zinc-200 rounded mb-3 w-2/3" />
                    <div className="h-4 bg-zinc-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProductions.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-4">
                <Film className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Productions Found</h3>
              <p className="text-zinc-600 max-w-md mx-auto">
                Productions will appear here once they are added to the system.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProductions.map((production, idx) => (
                <ModernProductionCard
                  key={production._id}
                  production={production}
                  index={idx}
                  onViewDetails={handleViewDetails}
                  isUrl={isUrl}
                />
              ))}
            </div>
          )}
        </div>
        </section>

      {/* AWARDS */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">Awards</span>
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Recognition for excellence in filmmaking
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 animate-pulse">
                  <div className="w-full h-48 bg-zinc-200" />
                  <div className="p-6">
                    <div className="h-5 bg-zinc-200 rounded mb-2" />
                    <div className="h-4 bg-zinc-200 rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : awards.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-4">
                  <Award className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Awards Found</h3>
                <p className="text-zinc-600 max-w-md mx-auto">
                  Awards will appear here once they are added to the system.
                </p>
              </div>
            ) : (
              awards.map((a, idx) => (
                <div
                  key={a._id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-amber-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/5 group-hover:to-amber-600/5 transition-opacity duration-500"></div>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imageUrl(a.image)}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-amber-600 shadow-lg">
                        AWARD
                      </div>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      {a.category} – {a.project}
                    </p>
                    {a.year && (
                      <div className="flex items-center gap-2 text-zinc-500 text-xs mt-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{a.year}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING RELEASES */}
      {releases.length > 0 && (
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">Releases</span>
              </h2>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Coming soon to theaters and streaming platforms
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {releases.map((r, idx) => (
                <div
                  key={r._id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-green-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-600/0 group-hover:from-green-500/5 group-hover:to-emerald-600/5 transition-opacity duration-500"></div>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={imageUrl(r.image)}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                        UPCOMING
                      </div>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-zinc-600 mb-4 line-clamp-3">{r.description}</p>
                    {r.year && (
                      <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{r.year}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Production Details Modal */}
      {isModalOpen && selectedProduction && (
        <ProductionDetailsModal
          production={selectedProduction}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
