import type { Metadata } from "next";

const baseUrl = "https://pfcfilms.newtab.in";

export const metadata: Metadata = {
  title: "Academy | Dance & Acting Courses in Kanpur | PFC FILMS",
  description:
    "Explore dance and acting courses at PFC FILMS Academy in Kanpur. Dhamal India Dance, acting classes, film-making workshops. Enroll now for professional training.",
  openGraph: {
    title: "Academy | Dance & Acting Courses in Kanpur | PFC FILMS",
    description:
      "Dance and acting courses in Kanpur. Dhamal India Dance, acting classes, film workshops. Professional training.",
    url: `${baseUrl}/academy`,
    siteName: "PFC FILMS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "PFC FILMS Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy | Dance & Acting Courses in Kanpur | PFC FILMS",
    description: "Dance and acting courses in Kanpur. Professional training.",
  },
  alternates: { canonical: `${baseUrl}/academy` },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
