import type { Metadata } from "next";

const baseUrl = "https://pfcfilms.newtab.in";

export const metadata: Metadata = {
  title: "Productions | Films, Awards & Projects | PFC FILMS",
  description:
    "Explore PFC FILMS productions, awards, and projects. Top films, dance academy achievements, acting school success. Kanpur & Mumbai.",
  openGraph: {
    title: "Productions | Films, Awards & Projects | PFC FILMS",
    description:
      "Films, awards, and projects. PFC FILMS productions. Dance academy & acting school success.",
    url: `${baseUrl}/productions`,
    siteName: "PFC FILMS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "PFC FILMS Productions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productions | Films, Awards & Projects | PFC FILMS",
    description: "Films, awards, and projects. PFC FILMS.",
  },
  alternates: { canonical: `${baseUrl}/productions` },
};

export default function ProductionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
