"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Image as ImageIcon, Video, Camera } from "lucide-react";
import { getGallery, type GalleryItem } from "../lib/api";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getGallery();
      setGalleryItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const photos = galleryItems.filter((item) => item.type === "photo");
  const videos = galleryItems.filter((item) => item.type === "video");

  const defaultPhotos = [
    {
      id: 1,
      title: "Behind the Scenes - Echoes of Silence",
      category: "Production",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=BTS+1",
    },
    {
      id: 2,
      title: "Film Direction Workshop",
      category: "Academy",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Workshop+1",
    },
    {
      id: 3,
      title: "Cinematography Training Session",
      category: "Academy",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Training+1",
    },
    {
      id: 4,
      title: "Award Ceremony 2024",
      category: "Events",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Awards+2024",
    },
    {
      id: 5,
      title: "On Set - Beyond Horizons",
      category: "Production",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=On+Set+1",
    },
    {
      id: 6,
      title: "Student Graduation Ceremony",
      category: "Academy",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Graduation",
    },
    {
      id: 7,
      title: "Camera Equipment Setup",
      category: "Production",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Equipment",
    },
    {
      id: 8,
      title: "Acting Workshop",
      category: "Academy",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Acting+Workshop",
    },
    {
      id: 9,
      title: "Film Festival Screening",
      category: "Events",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Festival",
    },
    {
      id: 10,
      title: "Lighting Setup - Night Shoot",
      category: "Production",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Night+Shoot",
    },
    {
      id: 11,
      title: "Post-Production Lab",
      category: "Academy",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Post+Production",
    },
    {
      id: 12,
      title: "Celebrity Guest Lecture",
      category: "Events",
      image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Guest+Lecture",
    },
  ];

  const defaultVideos = [
    {
      id: 1,
      title: "Echoes of Silence - Official Trailer",
      category: "Trailers",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Trailer+1",
      duration: "2:30",
    },
    {
      id: 2,
      title: "Film Direction Course Overview",
      category: "Academy",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Course+Video",
      duration: "5:45",
    },
    {
      id: 3,
      title: "Behind the Scenes Montage",
      category: "BTS",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=BTS+Video",
      duration: "8:20",
    },
    {
      id: 4,
      title: "Student Success Stories",
      category: "Testimonials",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Testimonials",
      duration: "4:15",
    },
    {
      id: 5,
      title: "Beyond Horizons - Teaser",
      category: "Trailers",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Teaser",
      duration: "1:30",
    },
    {
      id: 6,
      title: "Cinematography Masterclass Highlights",
      category: "Academy",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Masterclass",
      duration: "6:50",
    },
    {
      id: 7,
      title: "Award Night Highlights 2024",
      category: "Events",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Award+Night",
      duration: "3:40",
    },
    {
      id: 8,
      title: "Making of Urban Stories Documentary",
      category: "BTS",
      thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Documentary+BTS",
      duration: "7:25",
    },
  ];

  const stats = [
    { icon: <ImageIcon className="w-6 h-6" />, number: "500+", label: "Photos" },
    { icon: <Video className="w-6 h-6" />, number: "100+", label: "Videos" },
    { icon: <Camera className="w-6 h-6" />, number: "50+", label: "Productions" },
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
            Our{" "}
            <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              Gallery
            </span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Explore our journey through captivating visuals and memorable moments
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-6 mb-12 animate-fadeInUp"
          style={{ animationDelay: "200ms" }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-zinc-200 text-center transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl"
            >
              <div className="flex justify-center mb-3 text-amber-500">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-amber-500 mb-1">{stat.number}</div>
              <div className="text-sm text-zinc-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div
          className="flex justify-center mb-12 animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          <div className="bg-white p-2 rounded-full border border-zinc-200 inline-flex shadow-md">
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "photos"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/50"
                  : "text-zinc-600 hover:text-amber-600 hover:bg-zinc-50"
                }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "videos"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/50"
                  : "text-zinc-600 hover:text-amber-600 hover:bg-zinc-50"
                }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Photos Grid */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">Loading photos...</div>
            ) : photos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-zinc-500">No photos found</div>
            ) : (
              photos.map((photo, index) => (
                <div
                  key={photo._id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer animate-fadeInUp shadow-sm"
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                  onClick={() => setSelectedMedia({ type: "photo", ...photo })}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block bg-amber-400 text-black text-xs px-2 py-1 rounded mb-2">
                        {photo.category}
                      </span>
                      <h3 className="text-white font-semibold text-sm">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">Loading videos...</div>
            ) : videos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-zinc-500">No videos found</div>
            ) : (
              videos.map((video, index) => (
                <div
                  key={video._id}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer animate-fadeInUp shadow-sm"
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                  onClick={() => setSelectedMedia({ type: "video", ...video })}
                >
                  <Image
                    src={video.thumbnail || video.image}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-amber-400 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-black fill-black" />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                      {video.duration}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <span className="inline-block bg-amber-400 text-black text-xs px-2 py-1 rounded mb-2">
                      {video.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm">{video.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeInUp"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 bg-amber-400 text-black rounded-full p-2 hover:bg-amber-500 transition-colors"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "photo" ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-zinc-900 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-20 h-20 text-amber-400 mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">{selectedMedia.title}</p>
                  <p className="text-gray-400 text-sm">Video player placeholder</p>
                </div>
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedMedia.title}</h3>
              <span className="inline-block bg-amber-400 text-black px-4 py-1 rounded-full text-sm">
                {selectedMedia.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
