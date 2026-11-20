export type CampaignId = "black-friday" | "saturday";
export const seasonalPromotion = { visible: true };
export const campaignYear = 2026;
export const campaignTimeZone = "America/New_York";
export const offerTerms = "Excludes snacks, drinks, and select statues and figurines.";
export const seasonalCampaigns = [
  { id: "black-friday", period: "Black Friday", day: 27, discount: "20%" },
  { id: "saturday", period: "Saturday", day: 28, discount: "10%" },
] satisfies { id: CampaignId; period: string; day: number; discount: string }[];

// Calendar days, not store opening times. Do not repeat these offers next year.
export function getCampaignClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: campaignTimeZone, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(now);
  const part = (name: string) => Number(parts.find((p) => p.type === name)?.value);
  const year = part("year"), month = part("month"), day = part("day");
  const date = Date.UTC(year, month - 1, day);
  const friday = Date.UTC(campaignYear, 10, 27);
  const saturday = Date.UTC(campaignYear, 10, 28);
  const active: CampaignId | null = date === friday ? "black-friday" : date === saturday ? "saturday" : null;
  return { year, month, day, active, daysUntil: Math.max(0, Math.round((friday - date) / 86400000)), seasonEnded: date > saturday };
}

export function getOfferStatus(id: CampaignId, clock: ReturnType<typeof getCampaignClock> | null) {
  if (!clock) return "In store";
  if (clock.active === id) return "Today";
  const offer = seasonalCampaigns.find((item) => item.id === id)!;
  return Date.UTC(clock.year, clock.month - 1, clock.day) > Date.UTC(campaignYear, 10, offer.day) ? "Ended" : "Coming up";
}
