"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: pathname,
            event: "page_view",
            userAgent: navigator.userAgent,
            referrer: document.referrer || "direct",
            metadata: {
              timestamp: new Date().toISOString(),
              screenResolution: `${window.screen.width}x${window.screen.height}`,
            },
          }),
        });
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.debug("Analytics tracking failed:", error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null; 
}