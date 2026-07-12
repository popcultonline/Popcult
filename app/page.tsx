import { AboutPreview } from "@/components/home/AboutPreview";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { Hero } from "@/components/home/Hero";
import { LocationPreview } from "@/components/home/LocationPreview";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function Home() {
  return (
    <>
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
