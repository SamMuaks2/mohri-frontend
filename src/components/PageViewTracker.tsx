"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();
  const hasTracked = useRef(new Set<string>());

  useEffect(() => {
    // Skip if already tracked this path in this session
    if (hasTracked.current.has(pathname)) {
      return;
    }

    // Skip admin routes
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/login') || 
        pathname.startsWith('/admin')) {
      return;
    }

    const trackPageView = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        if (!apiUrl) {
          console.debug('Analytics: API URL not configured');
          return;
        }

        const response = await fetch(`${apiUrl}/analytics`, {
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
              viewport: `${window.innerWidth}x${window.innerHeight}`,
            },
          }),
        });

        if (response.ok) {
          // Mark as tracked only if successful
          hasTracked.current.add(pathname);
          console.debug('Analytics: Page view tracked', pathname);
        } else {
          console.debug('Analytics: Failed to track', response.status);
        }
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.debug('Analytics tracking error:', error);
      }
    };

    // Small delay to avoid blocking page load
    const timeout = setTimeout(trackPageView, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}