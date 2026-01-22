"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data for Celebrities
const CELEBRITIES = [
  {
    id: 1,
    name: "Celebrity 1",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+1",
    gallery: [
      "https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+1-1",
      "https://placehold.co/600x400/2a2a2a/fbbf24?text=Gallery+1-2",
      "https://placehold.co/600x400/3a3a3a/fbbf24?text=Gallery+1-3",
    ],
  },
  {
    id: 2,
    name: "Celebrity 2",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+2",
    gallery: [
      "https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+2-1",
      "https://placehold.co/600x400/2a2a2a/fbbf24?text=Gallery+2-2",
    ],
  },
  {
    id: 3,
    name: "Celebrity 3",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+3",
    gallery: ["https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+3-1"],
  },
  {
    id: 4,
    name: "Celebrity 4",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+4",
    gallery: [
      "https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+4-1",
      "https://placehold.co/600x400/2a2a2a/fbbf24?text=Gallery+4-2",
    ],
  },
  {
    id: 5,
    name: "Celebrity 5",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+5",
    gallery: [
      "https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+5-1",
      "https://placehold.co/600x400/2a2a2a/fbbf24?text=Gallery+5-2",
    ],
  },
  {
    id: 6,
    name: "Celebrity 6",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+6",
    gallery: ["https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+6-1"],
  },
  {
    id: 7,
    name: "Celebrity 7",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+7",
    gallery: ["https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+7-1"],
  },
  {
    id: 8,
    name: "Celebrity 8",
    thumbnail: "https://placehold.co/400x400/1a1a1a/fbbf24?text=Celebrity+8",
    gallery: [
      "https://placehold.co/600x400/1a1a1a/fbbf24?text=Gallery+8-1",
      "https://placehold.co/600x400/2a2a2a/fbbf24?text=Gallery+8-2",
    ],
  },
];

// --- JS Animation Hook ---
function useTicker({
  initialSpeed = 1,
  direction = 1, // 1 or -1
  isPaused = false,
  dragOffset = 0,
}) {
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== undefined) {
        // Delta time makes it framerate independent
        const deltaTime = time - lastTimeRef.current;
        // Basic speed factor
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

  // Combined offset (auto-scroll + drag)
  // We apply drag entirely as visual offset here for simplicity in the row
  // In a real physics engine, drag would modify the velocity and base offset.
  // Here, we just return the auto-scroll offset. The component will add drag.
  return offset;
}

const ItemWidth = 280; // Width + gap approx
const TotalItemsWidth = CELEBRITIES.length * ItemWidth;

const MarqueeRow = ({
  speed = 1,
  reverse = false,
  className = "",
  dragX = 0, // Global drag offset
  onItemClick,
}: {
  speed?: number;
  reverse?: boolean;
  className?: string;
  dragX: number;
  onItemClick: (celeb: (typeof CELEBRITIES)[0]) => void;
}) => {
  const autoOffset = useTicker({
    initialSpeed: speed,
    direction: reverse ? -1 : 1,
  });

  // Total moves
  const totalOffset = autoOffset + dragX;

  // Normalize to keep within bounds for infinite loop
  // We have 2 sets of items.
  // Visual range is roughly -TotalItemsWidth to 0.
  // We use modulo to keep it looping.
  const x = totalOffset % TotalItemsWidth;

  return (
    <div
      className={`flex flex-row gap-6 relative overflow-visible w-[150vw] -ml-[25vw] ${className}`}
      style={{
        transform: `translate3d(${x}px, 0, 0)`,
        willChange: "transform",
      }}
    >
      {/* Triple the items for smoother infinite scroll cover */}
      {[...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES].map((celeb, i) => (
        <div
          key={`${celeb.id}-${i}`}
          onClick={() => onItemClick(celeb)}
          className="relative w-64 h-40 rounded-xl overflow-hidden shadow-xl border-2 border-amber-500/20 shrink-0 transform transition-transform hover:scale-105 cursor-pointer bg-black"
        >
          <Image
            src={celeb.thumbnail}
            alt={celeb.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            pointerEvents="none" // Prevent image dragging ghost
          />
        </div>
      ))}
    </div>
  );
};

export default function Marquee3D() {
  const [selectedCelebrity, setSelectedCelebrity] = useState<
    (typeof CELEBRITIES)[0] | null
  >(null);

  // Drag Logic
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastDragX, setLastDragX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setLastDragX(dragX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setDragX(lastDragX + delta * 1.5); // 1.5 multiplier for faster feel
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  // Popup Navigation
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (!selectedCelebrity) return;
    setCurrentImageIndex(
      (prev) => (prev + 1) % selectedCelebrity.gallery.length,
    );
  };

  const handlePrevImage = () => {
    if (!selectedCelebrity) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedCelebrity.gallery.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedCelebrity]);

  return (
    <>
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center pointer-events-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/80 z-10 pointer-events-none"></div>

        {/* 3D Container */}
        <div
          className="flex flex-col gap-8 transform-gpu pointer-events-none" // pointer-events-none on container so clicks pass through to items? No, items need pointer-events-auto
          style={{
            perspective: "1000px",
            transform:
              "rotateX(20deg) rotateY(-10deg) rotateZ(5deg) scale(1.1)",
          }}
        >
          {/* We need pointer-events-auto on items even if container has logic? 
              Actually, the parent div handles drag. The items need to handle click.
              If parent consumes MouseDown, Click might still work on MouseUp if not moved much.
          */}
          <div className="pointer-events-auto">
            <MarqueeRow
              speed={0.8}
              dragX={dragX}
              onItemClick={setSelectedCelebrity}
            />
          </div>
          <div className="pointer-events-auto">
            <MarqueeRow
              speed={1.2}
              reverse
              dragX={dragX}
              onItemClick={setSelectedCelebrity}
            />
          </div>
          <div className="pointer-events-auto">
            <MarqueeRow
              speed={1.0}
              dragX={dragX}
              className="hidden md:flex"
              onItemClick={setSelectedCelebrity}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCelebrity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeInUp">
          <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">{selectedCelebrity.name}</h3>
              <button
                onClick={() => setSelectedCelebrity(null)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 bg-zinc-50 flex flex-col items-center">
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-4 group">
                <Image
                  src={selectedCelebrity.gallery[currentImageIndex]}
                  alt="Gallery"
                  fill
                  className="object-contain"
                />

                {selectedCelebrity.gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {selectedCelebrity.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-2 w-full justify-center">
                  {selectedCelebrity.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${currentImageIndex === idx ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <Image
                        src={img}
                        alt="thumb"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
