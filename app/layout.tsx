import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollObserver from "./components/ScrollObserver";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Dance Academy & Acting School in Kanpur | PFC FILMS",
  description: "PFC FILMS - Premier Dance Academy & Acting School in Kanpur. Join Dhamal India Dance for Bollywood, Hip Hop & Classical dance classes. Professional acting training by Pramod Kumar Gupta. Enroll now!",
  keywords: "Dance Academy in Kanpur, Acting School in Kanpur, Best Dance Academy Kanpur, Best Acting School Kanpur, Dance Classes Kanpur, Acting Classes Kanpur, Bollywood Dance Classes Kanpur, Hip Hop Dance Classes Kanpur, Film Acting Course Kanpur, PFC FILMS Kanpur, Dhamal India Dance Kanpur, Pramod Kumar Gupta Dance Academy",
  authors: [{ name: "Pramod Kumar Gupta" }],
  creator: "PFC FILMS",
  publisher: "PFC FILMS",
  openGraph: {
    title: "Best Dance Academy & Acting School in Kanpur | PFC FILMS",
    description: "Premier Dance Academy & Acting School in Kanpur. Join Dhamal India Dance for professional dance and acting training.",
    url: "https://pfcfilms.com",
    siteName: "PFC FILMS",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "PFC FILMS - Dance Academy & Acting School in Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dance Academy & Acting School in Kanpur | PFC FILMS",
    description: "Premier Dance Academy & Acting School in Kanpur. Join Dhamal India Dance for professional training.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pfcfilms.com",
  },
  metadataBase: new URL("https://pfcfilms.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "PFC FILMS",
              "alternateName": "Dhamal India Dance",
              "description": "Premier Dance Academy and Acting School in Kanpur, Uttar Pradesh",
              "url": "https://pfcfilms.com",
              "logo": "https://pfcfilms.com/logo.jpg",
              "image": "https://pfcfilms.com/logo.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kanpur",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "208001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.4499",
                "longitude": "80.3319"
              },
              "founder": {
                "@type": "Person",
                "name": "Pramod Kumar Gupta"
              },
              "areaServed": {
                "@type": "City",
                "name": "Kanpur"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Dance and Acting Courses",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Dance Academy in Kanpur",
                      "description": "Professional dance training in Bollywood, Hip Hop, Classical and Contemporary styles"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Acting School in Kanpur",
                      "description": "Comprehensive acting training for film, television and theatre"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.instagram.com/pfcfilms",
                "https://www.youtube.com/@pfcfilms",
                "https://www.facebook.com/pfcfilms"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PFC FILMS - Dance Academy & Acting School",
              "image": "https://pfcfilms.com/logo.jpg",
              "@id": "https://pfcfilms.com",
              "url": "https://pfcfilms.com",
              "telephone": "+91-XXXXXXXXXX",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kanpur",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "208001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.4499",
                "longitude": "80.3319"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.instagram.com/pfcfilms",
                "https://www.youtube.com/@pfcfilms",
                "https://www.facebook.com/pfcfilms"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollObserver />
        {children}
        <Footer />
      </body>
    </html>
  );
}
