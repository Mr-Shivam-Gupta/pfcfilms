"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

const SERVICES = [
  { label: "Production", href: "/productions" },
  { label: "Academy", href: "/academy" },
  { label: "Dance Academy", href: "/dance-academy-kanpur" },
  { label: "Acting School", href: "/acting-school-kanpur" },
] as const;

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://www.instagram.com/pfcfilms" },
  { icon: Facebook, href: "https://www.facebook.com/pfcfilms" },
  { icon: Twitter, href: "https://twitter.com/pfcfilms" },
  { icon: Youtube, href: "https://www.youtube.com/@pfcfilms" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-4 relative text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/footer/1860-150999621_tiny.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10" suppressHydrationWarning>
            <Link href="/" className="flex items-center space-x-4 mb-6 group cursor-pointer">
              <div className="w-20 h-20 relative rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xl border-2 border-zinc-800 group-hover:border-amber-400/50">
                <Image
                  src="/logo.jpg"
                  alt="PFC Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-black text-3xl text-white tracking-tighter">
                PFC <span className="text-amber-400">FILMS</span>
              </div>
            </Link>
            <p className="text-zinc-300 font-medium text-base mb-6">
              Creating cinematic excellence and nurturing dance talent
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:bg-amber-400 hover:text-black transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
            style={{ transitionDelay: "100ms" }}
            suppressHydrationWarning
          >
            <h4 className="font-extrabold text-lg mb-6 text-white uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3 text-zinc-300 font-medium">
              {QUICK_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div
            className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
            style={{ transitionDelay: "200ms" }}
            suppressHydrationWarning
          >
            <h4 className="font-extrabold text-lg mb-6 text-white uppercase tracking-wider">Services</h4>
            <div className="space-y-3 text-zinc-300 font-medium">
              {SERVICES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="animate-on-scroll opacity-0 transition-all duration-1000 translate-y-10"
            style={{ transitionDelay: "300ms" }}
            suppressHydrationWarning
          >
            <h4 className="font-extrabold text-lg mb-6 text-white uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-zinc-300 font-medium">
              <a href="mailto:info@pfcfilms.com" className="block hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-300">
                info@pfcfilms.com
              </a>
              <a href="tel:+918176000084" className="block hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-300">
                81760 00084
              </a>
              <span className="block">Kanpur Cantonment, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-400 font-medium">
          <p>
            © 2026 Developed by{" "}
            <a 
              href="https://newtab.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium hover:underline"
            >
              New Tab Software Solutions
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
