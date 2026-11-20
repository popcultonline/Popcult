# Thanksgiving weekend offers

The campaign sits below the navigation and above the main homepage hero. Compact cards place the offer name beside the percentage; desktop uses two columns, mobile stacks two short rows. Decorative accents and terms remain visible without a fixed-height crop or inner scrollbar. Both offers are visible together: Black Friday, November 27, 2026 (20% off storewide), and Saturday, November 28 (10% off storewide). The user's November update supersedes the prior October and November monthly offers and prior exclusions.

Shared wording: “Excludes snacks, drinks, and select statues and figurines.” No additional exclusions, specific statue brands, hours, coupon codes, or Sunday/Cyber Monday offers are assumed.

Cream, sourced Twemoji autumn leaves, and a small Thanksgiving weekend label frame the paired plum and lilac cards. Berkshire Swash display type, yellow discount emphasis, and small Lucide sparkles retain the playful campaign direction. Source asset licenses are included in public/seasonal; visible leaf attribution is below the banner.

`data/promotions.ts` owns the two offers, exclusions, year, visibility, and date logic. Dates use America/New_York, matching the established campaign clock. The countdown names Black Friday until the 27th; Friday and Saturday have their own current-day messages and highlighted cards. The entire campaign disappears at midnight Eastern on Sunday November 29. The browser checks the clock every 30 seconds and when the window regains focus; the homepage renders the initial clock at request time so the banner is present on refresh and expired offers are never served from a static build. These are calendar-day labels, not opening-hour claims. Store hours remain on the locations pages. Offers never recur automatically in a later year.

The Find a Store link points to /locations and keeps find_store_click analytics. No faux tabs or navigation links are used for the two simultaneously visible cards.

Validation: node --test tests/promotions.test.mjs, npm run lint, npm run build, git diff --check, plus mobile/desktop visual and CTA checks. This change is local and does not deploy.
