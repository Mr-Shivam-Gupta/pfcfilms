import type { Metadata } from "next";

const baseUrl = "https://pfcfilms.newtab.in";

export const metadata: Metadata = {
  title: "Contact PFC FILMS | Dance Academy & Acting School Kanpur",
  description:
    "Contact PFC FILMS for dance classes, acting courses, and film production in Kanpur. Book a free trial or demo class. Dhamal India Dance & acting school.",
  openGraph: {
    title: "Contact PFC FILMS | Dance Academy & Acting School Kanpur",
    description:
      "Get in touch for dance classes, acting courses, and film production. Book a free trial or demo in Kanpur.",
    url: `${baseUrl}/contact`,
    siteName: "PFC FILMS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "PFC FILMS - Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PFC FILMS | Dance Academy & Acting School Kanpur",
    description: "Book a free trial or demo. Dance academy & acting school in Kanpur.",
  },
  alternates: { canonical: `${baseUrl}/contact` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
