"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for contacting us! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const socialMediaLinks = [
    {
      name: "Instagram",
      handle: "@pfcfilms",
      url: "#",
      qrCode: "/qr-codes/instagram-qr.png", // Update with actual path
    },
    {
      name: "YouTube",
      handle: "PFC Films",
      url: "#",
      qrCode: "/qr-codes/youtube-qr.png", // Update with actual path
    },
    {
      name: "Facebook",
      handle: "PFC Films",
      url: "#",
      qrCode: "/qr-codes/facebook-qr.png", // Update with actual path
    },
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
            Get In{" "}
            <span className="text-amber-500 inline-block animate-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              Touch
            </span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to learn filmmaking? Reach out to us
            and let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className="space-y-8 animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-white p-3 rounded-lg group-hover:bg-amber-50 border border-zinc-200 shadow-sm transition-all duration-300">
                    <Mail className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black">Email</h4>
                    <a
                      href="mailto:info@pfcfilms.com"
                      className="text-zinc-600 hover:text-amber-600 transition-colors"
                    >
                      info@pfcfilms.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-white p-3 rounded-lg group-hover:bg-amber-50 border border-zinc-200 shadow-sm transition-all duration-300">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black">Phone</h4>
                    <a
                      href="tel:+911234567890"
                      className="text-zinc-600 hover:text-amber-600 transition-colors"
                    >
                      +91 123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-white p-3 rounded-lg group-hover:bg-amber-50 border border-zinc-200 shadow-sm transition-all duration-300">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black">Location</h4>
                    <p className="text-zinc-600">
                      123 Film Street, Cinema City
                      <br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media with QR Codes */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black">
                Follow Us on Social Media
              </h3>
              <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="social-scroll-container group">
                  <div className="social-scroll-content">
                    {socialMediaLinks.map((social, index) => (
                      <a
                        key={`social-${index}`}
                        href={social.url}
                        className="social-card"
                      >
                        <div className="qr-placeholder bg-zinc-100 w-40 h-40 rounded-lg mb-3 flex items-center justify-center text-sm text-zinc-400">
                          QR Code
                        </div>
                        <p className="text-base font-semibold text-black">{social.name}</p>
                        <p className="text-sm text-zinc-500">{social.handle}</p>
                      </a>
                    ))}
                    
                    {/* Duplicate for infinite scroll effect */}
                    {socialMediaLinks.map((social, index) => (
                      <a
                        key={`social-duplicate-${index}`}
                        href={social.url}
                        className="social-card"
                      >
                        <div className="qr-placeholder bg-zinc-100 w-40 h-40 rounded-lg mb-3 flex items-center justify-center text-sm text-zinc-400">
                          QR Code
                        </div>
                        <p className="text-base font-semibold text-black">{social.name}</p>
                        <p className="text-sm text-zinc-500">{social.handle}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xl animate-fadeInUp"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-black">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-zinc-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-black"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-zinc-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-black"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-zinc-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-black"
                  placeholder="+91 123 456 7890"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-zinc-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none text-black"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
