"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { ADDRESS, SOCIAL, PHONE_DISPLAY, PHONE_E164, GOOGLE_MAPS_URL } from "../lib/constants";

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
    try {
      const { submitContact } = await import("../lib/api");
      const result = await submitContact(formData);
      if (result.success) {
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(result.message || "Failed to submit. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialMediaLinks = [
    { name: "Instagram", handle: "@pfcfilms", url: SOCIAL.instagram },
    { name: "YouTube", handle: "PFC Films Production House", url: SOCIAL.youtube },
    { name: "Facebook", handle: "PFC Films", url: SOCIAL.facebook },
  ];

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
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
              Touch
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600 leading-relaxed">
            Join the Best Films Acting Academy & Dance Academy in Kanpur! Contact PFC FILMS for dance classes, acting courses, and film training.
          </p>
        </div>
      </section>

      <div className="relative py-20">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    {/* <p className="text-sm text-zinc-500 mt-1">For Dance Academy: dhamalindiadance@pfcfilms.com</p> */}
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-white p-3 rounded-lg group-hover:bg-amber-50 border border-zinc-200 shadow-sm transition-all duration-300">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black">Phone</h4>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="text-zinc-600 hover:text-amber-600 transition-colors"
                    >
                      {PHONE_DISPLAY}
                    </a>
                    <p className="text-sm text-zinc-500 mt-1">Call for Dance Classes & Acting Courses in Kanpur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-white p-3 rounded-lg group-hover:bg-amber-50 border border-zinc-200 shadow-sm transition-all duration-300">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-black">Location</h4>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-amber-600 transition-colors block"
                    >
                      PFC FILMS — Production House & Institute
                      <br />
                      {ADDRESS.full}
                    </a>
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
      </div>
    </section>
  );
}
