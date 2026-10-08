"use client";

import React, { useEffect, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useSettings } from "@/hooks/useCMS";

function AnalyticsTrackerContent() {
  const { data: settings } = useSettings();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fbPixelId = settings?.fbPixelId?.trim();
  const gaId = settings?.googleAnalyticsId?.trim();
  const isAdmin = pathname?.startsWith("/admin");

  // Track page navigation changes in Next.js SPA
  useEffect(() => {
    // Avoid firing analytics events for admin dashboard views
    if (isAdmin || !pathname) return;

    const fullUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // 1. Google Analytics 4 page_view
    if (gaId && typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("config", gaId, {
        page_path: fullUrl,
      });
    }

    // 2. Facebook Pixel PageView
    if (fbPixelId && typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams, fbPixelId, gaId, isAdmin]);

  // If in admin dashboard or neither tracker is configured, do not render scripts
  if (isAdmin || (!fbPixelId && !gaId)) {
    return null;
  }

  return (
    <>
      {/* ================= Google Analytics 4 ================= */}
      {gaId && (
        <>
          <Script
            id="google-analytics-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname + window.location.search,
                });
              `,
            }}
          />
        </>
      )}

      {/* ================= Meta / Facebook Pixel ================= */}
      {fbPixelId && (
        <>
          <Script
            id="facebook-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}

export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerContent />
    </Suspense>
  );
}
