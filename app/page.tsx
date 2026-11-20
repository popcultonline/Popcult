import { connection } from "next/server";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { SeasonalPromotion } from "@/components/home/SeasonalPromotion";
import { Hero } from "@/components/home/Hero";
import { LocationPreview } from "@/components/home/LocationPreview";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default async function Home() {
  await connection();
  // Request-time Server Component: capture once and reuse during client hydration.
  // eslint-disable-next-line react-hooks/purity -- connection() explicitly opts into request-time rendering.
  const initialMinute = Math.floor(Date.now() / 60000);
  return (
    <>
      <SeasonalPromotion initialMinute={initialMinute} />
      <Hero />
      <CredibilityStrip />
      <div className="flex flex-col">
        <div className="order-2 md:order-1">
          <CategoryGrid />
        </div>
        <div className="order-1 md:order-2">
          <LocationPreview />
        </div>
      </div>
      <AboutPreview />
      <NewsletterSignup />
      <ContactCTA />
    </>
  );
}
