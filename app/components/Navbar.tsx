"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getNavItemLink = (item: string) => {
    if (item === "Home") return "/";
    if (item === "About") return "/about";
    if (item === "Productions") return "/productions";
    if (item === "Academy") return "/academy";
    if (item === "Gallery") return "/gallery";
    if (item === "Contact") return "/contact";
    return "/"; // Return to home for other sections
  };

  const isCurrentPage = (item: string) => {
    if (item === "About") return pathname === "/about";
    if (item === "Productions") return pathname === "/productions";
    if (item === "Academy") return pathname === "/academy";
    if (item === "Gallery") return pathname === "/gallery";
    if (item === "Contact") return pathname === "/contact";
    if (item === "Home") return pathname === "/";
    return pathname === "/" && activeSection === item.toLowerCase();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-amber-500/5" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex flex-col group cursor-pointer">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-zinc-900">
                PFC
              </span>
              <span className="text-2xl font-bold tracking-[0.15em] text-amber-500 ml-2 group-hover:ml-3 transition-all duration-300">
                FILMS
              </span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Productions", "Academy", "Gallery", "Contact"].map(
              (item, idx) => {
                const isActive = isCurrentPage(item);
                const href = getNavItemLink(item);

                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                      isActive
                        ? "text-amber-500"
                        : "text-zinc-800 hover:text-amber-500"
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}
                    ></span>
                  </Link>
                );
              },
            )}
          </div>

          <button
            className="md:hidden transform transition-all duration-300 hover:scale-110 text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl animate-slideDown shadow-xl">
          <div className="px-4 py-4 space-y-3">
            {["Home", "About", "Productions", "Academy", "Gallery", "Contact"].map(
              (item, idx) => {
                const href = getNavItemLink(item);
                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-sm font-medium text-zinc-800 hover:text-amber-500 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-amber-500 pl-4"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {item}
                  </Link>
                );
              },
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
