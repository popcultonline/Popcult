"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { getCampaignClock, getOfferStatus, offerTerms, seasonalCampaigns, seasonalPromotion } from "@/data/promotions";
import styles from "./SeasonalCampaign.module.css";

// Hydrate from the request-time clock, then keep updating while the page is open.
function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 30000);
  window.addEventListener("focus", callback);
  return () => { window.clearInterval(timer); window.removeEventListener("focus", callback); };
}
const snapshot = () => Math.floor(Date.now() / 60000);

export function SeasonalPromotion({ initialMinute, visible = seasonalPromotion.visible }: { initialMinute: number; visible?: boolean }) {
  const minute = useSyncExternalStore(subscribe, snapshot, () => initialMinute);
  const clock = getCampaignClock(new Date(minute * 60000));
  if (!visible || clock.seasonEnded) return null;
  const countdown = clock.active === "saturday" ? "Saturday savings are on today" : clock.active === "black-friday" ? "Black Friday is here!" : `${clock.daysUntil} ${clock.daysUntil === 1 ? "day" : "days"} until Black Friday`;
  return (
    <section id="seasonal-promotion" aria-labelledby="seasonal-promotion-heading" className={styles.section}>
      <div className={styles.banner}>
        <header className={styles.header}>
          <Image src="/seasonal/maple.svg" alt="" width={85} height={85} className={styles.maple} />
          <p className={styles.eyebrow}>Thanksgiving weekend · In store</p>
          <h2 id="seasonal-promotion-heading">Weekend savings.</h2>
          <p className={styles.countdown} aria-live="polite">{countdown}</p>
          <Image src="/seasonal/leaves.svg" alt="" width={100} height={100} className={styles.leaves} />
        </header>
        <div className={styles.offers}>
          {seasonalCampaigns.map((offer) => {
            const status = getOfferStatus(offer.id, clock);
            return <article key={offer.id} className={styles.offer} data-campaign={offer.id} data-active={clock?.active === offer.id} aria-labelledby={`offer-${offer.id}`}>
              <div className={styles.cardTop}><p className={styles.date}>NOV <strong>{offer.day}</strong></p>{status !== "Coming up" && status !== "In store" && <span className={styles.status}>{status}</span>}</div>
              <h3 id={`offer-${offer.id}`}>{offer.period}</h3>
              <p className={styles.discount}>{offer.discount}<span>off</span></p>
              <p className={styles.storewide}>Storewide<span aria-hidden="true">*</span><span className="sr-only">, exclusions apply</span></p>
              <Sparkles className={styles.spark} size={36} aria-hidden="true" />
            </article>;
          })}
        </div>
        <footer className={styles.footer}>
          <p className={styles.terms}>*{offerTerms}</p>
          <TrackedLink href="/locations" eventName="find_store_click" eventProperties={{ placement: "seasonal_promotion", campaign: "thanksgiving-weekend" }} className={styles.cta}>Find a Store <ArrowRight size={18} aria-hidden="true" /></TrackedLink>
        </footer>
      </div>
      <p className={styles.credit}>Leaf artwork: <a href="https://github.com/twitter/twemoji">Twemoji</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
    </section>
  );
}
