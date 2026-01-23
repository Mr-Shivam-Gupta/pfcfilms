"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait for hydration to complete before observing
    let observer: IntersectionObserver | null = null;
    let reObserveTimeout: NodeJS.Timeout | null = null;

    const timeoutId = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              // Optional: unobserve if you only want it to animate once
              // observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -10% 0px",
        },
      );

      const observeElements = () => {
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observer?.observe(el));
      };

      // Initial observation
      observeElements();

      // Re-observe when DOM might have changed (though pathname change triggers unmount/mount usually)
      // Adding a small timeout to ensure DOM is ready after route transition
      reObserveTimeout = setTimeout(observeElements, 100);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (reObserveTimeout) clearTimeout(reObserveTimeout);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}
