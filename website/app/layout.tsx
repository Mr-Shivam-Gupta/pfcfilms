import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalScrollObserver, ConditionalFooter } from "./components/ConditionalLayout";
import { ADDRESS, SOCIAL, PHONE_E164, SITE, GOOGLE_REVIEWS } from "./lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Films Acting Academy & Dance Academy in Kanpur | PFC FILMS",
  description: "PFC FILMS - Premier Dance Academy & Acting School in Kanpur | Mumbai. Join Dhamal India Dance for Bollywood, Hip Hop & Classical dance classes. Professional acting training by Pramod Kumar Gupta. Enroll now!",
  keywords: "Dance Academy in Kanpur, Acting School in Kanpur, Best Dance Academy Kanpur, Best Acting School Kanpur, Dance Classes Kanpur, Acting Classes Kanpur, Bollywood Dance Classes Kanpur, Hip Hop Dance Classes Kanpur, Film Acting Course Kanpur, PFC FILMS Kanpur, Dhamal India Dance Kanpur, Pramod Kumar Gupta Dance Academy",
  authors: [{ name: "Pramod Kumar Gupta" }],
  creator: "PFC FILMS",
  publisher: "PFC FILMS",
  openGraph: {
    title: "Best Films Acting Academy & Dance Academy in Kanpur | PFC FILMS",
    description: "Premier Dance Academy & Acting School in Kanpur | Mumbai. Join Dhamal India Dance for professional dance and acting training.",
    url: "https://pfcfilms.newtab.in",
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
    title: "Best Films Acting Academy & Dance Academy in Kanpur | PFC FILMS",
    description: "Premier Dance Academy & Acting School in Kanpur | Mumbai. Join Dhamal India Dance for professional training.",
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
    canonical: "https://pfcfilms.newtab.in",
  },
  metadataBase: new URL("https://pfcfilms.newtab.in"),
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
  verification: {
    google: "Q99D1ubZ1DJdVvVz1v2Iv8tBHBE8o4iml6PLU80hZjc",
  },
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
              "@type": "WebSite",
              "name": "PFC FILMS",
              "alternateName": "Dhamal India Dance",
              "url": "https://pfcfilms.newtab.in",
              "description": "Premier Dance Academy and Acting School in Kanpur | Mumbai",
              "publisher": { "@id": "https://pfcfilms.newtab.in/#organization" },
              "inLanguage": "en-IN",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://pfcfilms.newtab.in/#organization",
              "name": "PFC FILMS",
              "alternateName": "Dhamal India Dance",
              "description": "Premier Dance Academy and Acting School in Kanpur, Uttar Pradesh",
              "url": "https://pfcfilms.newtab.in",
              "logo": "https://pfcfilms.newtab.in/logo.jpg",
              "image": "https://pfcfilms.newtab.in/logo.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": ADDRESS.line1,
                "addressLocality": ADDRESS.locality,
                "addressRegion": ADDRESS.region,
                "postalCode": ADDRESS.postalCode,
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.4499",
                "longitude": "80.3319"
              },
              "founder": {
                "@type": "Person",
                "name": SITE.directorName
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
              "sameAs": [SOCIAL.instagram, SOCIAL.youtube, SOCIAL.facebook, SOCIAL.justdial]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PFC FILMS - Production House & Institute",
              "image": "https://pfcfilms.newtab.in/logo.jpg",
              "@id": "https://pfcfilms.newtab.in",
              "url": "https://pfcfilms.newtab.in",
              "telephone": PHONE_E164,
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": ADDRESS.line1,
                "addressLocality": ADDRESS.locality,
                "addressRegion": ADDRESS.region,
                "postalCode": ADDRESS.postalCode,
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
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": GOOGLE_REVIEWS.rating,
                "reviewCount": GOOGLE_REVIEWS.count,
                "bestRating": 5
              },
              "sameAs": [SOCIAL.instagram, SOCIAL.youtube, SOCIAL.facebook, SOCIAL.justdial]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://pfcfilms.newtab.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Dance Academy in Kanpur",
                  "item": "https://pfcfilms.newtab.in/dance-academy-kanpur"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Acting School in Kanpur",
                  "item": "https://pfcfilms.newtab.in/acting-school-kanpur"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "About",
                  "item": "https://pfcfilms.newtab.in/about"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Gallery",
                  "item": "https://pfcfilms.newtab.in/gallery"
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalScrollObserver />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
