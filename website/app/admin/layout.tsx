import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PFC Films Admin Panel",
  description: "Admin panel for PFC Films website",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
