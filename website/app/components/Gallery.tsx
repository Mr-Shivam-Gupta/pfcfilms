"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Image as ImageIcon, Video, Camera } from "lucide-react";
import { getGallery, imageUrl, type GalleryItem } from "../lib/api";

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

  // const defaultPhotos = [
  //   {
  //     id: 1,
  //     title: "Behind the Scenes - Echoes of Silence",
  //     category: "Production",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=BTS+1",
  //   },
  //   {
  //     id: 2,
  //     title: "Film Direction Workshop",
  //     category: "Academy",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Workshop+1",
  //   },
  //   {
  //     id: 3,
  //     title: "Cinematography Training Session",
  //     category: "Academy",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Training+1",
  //   },
  //   {
  //     id: 4,
  //     title: "Award Ceremony 2024",
  //     category: "Events",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Awards+2024",
  //   },
  //   {
  //     id: 5,
  //     title: "On Set - Beyond Horizons",
  //     category: "Production",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=On+Set+1",
  //   },
  //   {
  //     id: 6,
  //     title: "Student Graduation Ceremony",
  //     category: "Academy",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Graduation",
  //   },
  //   {
  //     id: 7,
  //     title: "Camera Equipment Setup",
  //     category: "Production",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Equipment",
  //   },
  //   {
  //     id: 8,
  //     title: "Acting Workshop",
  //     category: "Academy",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Acting+Workshop",
  //   },
  //   {
  //     id: 9,
  //     title: "Film Festival Screening",
  //     category: "Events",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Festival",
  //   },
  //   {
  //     id: 10,
  //     title: "Lighting Setup - Night Shoot",
  //     category: "Production",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Night+Shoot",
  //   },
  //   {
  //     id: 11,
  //     title: "Post-Production Lab",
  //     category: "Academy",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Post+Production",
  //   },
  //   {
  //     id: 12,
  //     title: "Celebrity Guest Lecture",
  //     category: "Events",
  //     image: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Guest+Lecture",
  //   },
  // ];

  // const defaultVideos = [
  //   {
  //     id: 1,
  //     title: "Echoes of Silence - Official Trailer",
  //     category: "Trailers",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Trailer+1",
  //     duration: "2:30",
  //   },
  //   {
  //     id: 2,
  //     title: "Film Direction Course Overview",
  //     category: "Academy",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Course+Video",
  //     duration: "5:45",
  //   },
  //   {
  //     id: 3,
  //     title: "Behind the Scenes Montage",
  //     category: "BTS",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=BTS+Video",
  //     duration: "8:20",
  //   },
  //   {
  //     id: 4,
  //     title: "Student Success Stories",
  //     category: "Testimonials",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Testimonials",
  //     duration: "4:15",
  //   },
  //   {
  //     id: 5,
  //     title: "Beyond Horizons - Teaser",
  //     category: "Trailers",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Teaser",
  //     duration: "1:30",
  //   },
  //   {
  //     id: 6,
  //     title: "Cinematography Masterclass Highlights",
  //     category: "Academy",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Masterclass",
  //     duration: "6:50",
  //   },
  //   {
  //     id: 7,
  //     title: "Award Night Highlights 2024",
  //     category: "Events",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Award+Night",
  //     duration: "3:40",
  //   },
  //   {
  //     id: 8,
  //     title: "Making of Urban Stories Documentary",
  //     category: "BTS",
  //     thumbnail: "https://placehold.co/800x600/1a1a1a/fbbf24?text=Documentary+BTS",
  //     duration: "7:25",
  //   },
  // ];

  // const stats = [
  //   { icon: <ImageIcon className="w-6 h-6" />, number: "500+", label: "Photos" },
  //   { icon: <Video className="w-6 h-6" />, number: "100+", label: "Videos" },
  //   { icon: <Camera className="w-6 h-6" />, number: "50+", label: "Productions" },
  // ];

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
              Gallery
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600 leading-relaxed">
            Explore our journey through captivating visuals and memorable moments
          </p>
        </div>
      </section>

      <div className="relative py-10">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto  ">
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
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-zinc-200 animate-pulse"
                  />
                ))
              ) : photos.length === 0 ? (
                <div className="col-span-full text-center py-12 text-zinc-500">No photos found</div>
              ) : (
                photos.map((photo, index) => (
                  <div
                    key={photo._id}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer animate-fadeInUp shadow-sm"
                    style={{ animationDelay: `${600 + index * 50}ms` }}
                    onClick={() => setSelectedMedia({ ...photo, type: "photo" })}
                  >
                    <Image
                      src={photo.image ? (imageUrl(photo.image) || "/projects/feature-film.jpg") : "/projects/feature-film.jpg"}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== "/projects/feature-film.jpg") {
                          target.src = "/projects/feature-film.jpg";
                        }
                      }}
                      unoptimized={true}
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
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl bg-zinc-200 animate-pulse"
                  />
                ))
              ) : videos.length === 0 ? (
                <div className="col-span-full text-center py-12 text-zinc-500">No videos found</div>
              ) : (
                videos.map((video, index) => (
                  <div
                    key={video._id}
                    className="group relative aspect-video rounded-xl overflow-hidden border border-zinc-200 transform transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer animate-fadeInUp shadow-sm"
                    style={{ animationDelay: `${600 + index * 50}ms` }}
                    onClick={() => setSelectedMedia({ ...video, type: "video" })}
                  >
                    <Image
                      src={(video.thumbnail || video.image) ? (imageUrl(video.thumbnail || video.image) || "/projects/feature-film.jpg") : "/projects/feature-film.jpg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== "/projects/feature-film.jpg") {
                          target.src = "/projects/feature-film.jpg";
                        }
                      }}
                      unoptimized={true}
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
                  src={selectedMedia.image ? (imageUrl(selectedMedia.image) || "/projects/feature-film.jpg") : "/projects/feature-film.jpg"}
                  alt={selectedMedia.title}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/projects/feature-film.jpg") {
                      target.src = "/projects/feature-film.jpg";
                    }
                  }}
                  unoptimized={true}
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
