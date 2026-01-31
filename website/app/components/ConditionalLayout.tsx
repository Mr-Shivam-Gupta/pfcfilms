"use client";

import { usePathname } from "next/navigation";
import ScrollObserver from "./ScrollObserver";
import Footer from "./Footer";

export function ConditionalScrollObserver() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <ScrollObserver />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Footer />;
}
