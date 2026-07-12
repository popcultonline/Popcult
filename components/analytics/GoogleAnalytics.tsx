import Script from "next/script";
import { GoogleAnalyticsPageViews } from "@/components/analytics/GoogleAnalyticsPageViews";

export function GoogleAnalytics({
  measurementId,
}: {
  measurementId?: string;
}) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)});
        `}
      </Script>
      <GoogleAnalyticsPageViews measurementId={measurementId} />
    </>
  );
}
