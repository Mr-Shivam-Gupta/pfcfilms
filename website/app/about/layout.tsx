import type { Metadata } from "next";

const baseUrl = "https://pfcfilms.newtab.in";

export const metadata: Metadata = {
  title: "About PFC FILMS | Dance Academy & Acting School in Kanpur",
  description:
    "Learn about PFC FILMS and founder Pramod Kumar Gupta. Premier dance academy (Dhamal India Dance) and acting school in Kanpur. Film production, dance classes, and acting training.",
  openGraph: {
    title: "About PFC FILMS | Dance Academy & Acting School in Kanpur",
    description:
      "Premier dance academy and acting school in Kanpur. Film production, Dhamal India Dance, and acting training by Pramod Kumar Gupta.",
    url: `${baseUrl}/about`,
    siteName: "PFC FILMS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "PFC FILMS - About" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PFC FILMS | Dance Academy & Acting School in Kanpur",
    description: "Premier dance academy and acting school in Kanpur.",
  },
  alternates: { canonical: `${baseUrl}/about` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
