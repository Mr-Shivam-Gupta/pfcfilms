import type { Metadata } from "next";

const baseUrl = "https://pfcfilms.com";

export const metadata: Metadata = {
  title: "Gallery | PFC FILMS - Dance Academy & Acting School Kanpur",
  description:
    "Photo and video gallery of PFC FILMS. Dance academy performances, acting school events, and film production in Kanpur. Dhamal India Dance.",
  openGraph: {
    title: "Gallery | PFC FILMS - Dance Academy & Acting School Kanpur",
    description:
      "Gallery of dance performances, acting events, and film production. PFC FILMS Kanpur.",
    url: `${baseUrl}/gallery`,
    siteName: "PFC FILMS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "PFC FILMS Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | PFC FILMS - Dance Academy & Acting School Kanpur",
    description: "Gallery of dance, acting, and film. PFC FILMS Kanpur.",
  },
  alternates: { canonical: `${baseUrl}/gallery` },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
