# Pop Cult / Character World Post-Launch Checklist

This checklist reflects the current production state for `https://popcult.online`. It is no longer a pre-launch import, deployment, or DNS-cutover checklist.

## Completed infrastructure

- Repository transferred to the client-owned `popcultonline` GitHub organization/account.
- Client-owned Vercel project connected to the GitHub repository.
- Production domain `popcult.online` connected to Vercel.
- DNS web records cut over to Vercel.
- `NEXT_PUBLIC_SITE_URL` configured as `https://popcult.online`.
- Vercel environment variables configured:
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `MAILCHIMP_API_KEY`
  - `MAILCHIMP_SERVER_PREFIX`
  - `MAILCHIMP_AUDIENCE_ID`
- Vercel Web Analytics code installed and mounted.
- Vercel Speed Insights code installed and mounted.
- GA4 property and web stream created.
- Search Console property created and DNS verification added.
- Mailchimp account, audience, single opt-in behavior, website tags, and API integration configured.
- Generated routes include:
  - Homepage
  - About
  - Contact
  - Locations index
  - Four state location pages
  - Eleven canonical store pages
  - Sitemap
  - Robots

## Verify now

### Production routes

- Confirm these canonical routes return `200` on `https://popcult.online`:
  - `/`
  - `/about`
  - `/contact`
  - `/locations`
  - `/locations/florida`
  - `/locations/georgia`
  - `/locations/south-carolina`
  - `/locations/tennessee`
  - `/locations/florida/orlando`
  - `/locations/florida/citrus-park`
  - `/locations/florida/clearwater`
  - `/locations/florida/brandon`
  - `/locations/florida/lutz`
  - `/locations/georgia/alpharetta`
  - `/locations/georgia/buford`
  - `/locations/south-carolina/greenville`
  - `/locations/tennessee/nashville`
  - `/locations/tennessee/knoxville`
  - `/locations/tennessee/chattanooga`

### Legacy redirects

- Confirm these legacy paths redirect once to their canonical destinations:
  - `/locations/tenesse/knoxville` → `/locations/tennessee/knoxville`
  - `/locations/southcarolina` → `/locations/south-carolina`
  - `/locations/southcarolina/greenville` → `/locations/south-carolina/greenville`
  - `/locations/florida/citruspark` → `/locations/florida/citrus-park`
  - `/locations/georgia/characterworld` → `/locations/georgia/buford`
  - `/locations/georgia/character-world` → `/locations/georgia/buford`
  - `/locations/georgia/mall-of-georgia` → `/locations/georgia/buford`
  - `/locations/florida/countryside` → `/locations/florida/clearwater`
  - `/locations/florida/tampa-premium-outlets` → `/locations/florida/lutz`
  - `/locations/georgia/north-point` → `/locations/georgia/alpharetta`
  - `/locations/south-carolina/haywood` → `/locations/south-carolina/greenville`
  - `/locations/tennessee/hamilton-place` → `/locations/tennessee/chattanooga`
  - `/our-locations` → `/locations`
  - `/our-locations/florida` → `/locations/florida`
  - `/our-locations/georgia` → `/locations/georgia`
  - `/our-locations/southcarolina` → `/locations/south-carolina`
  - `/our-locations/south-carolina` → `/locations/south-carolina`
  - `/our-locations/tennessee` → `/locations/tennessee`

### SEO and indexing

- Confirm `/sitemap.xml` returns `200` and lists only canonical production URLs.
- Confirm `/robots.txt` returns `200` and points to `https://popcult.online/sitemap.xml`.
- Submit or re-submit `https://popcult.online/sitemap.xml` in Search Console.
- Inspect at least these URLs in Search Console:
  - `https://popcult.online/`
  - `https://popcult.online/locations`
  - One Florida store page
  - One Tennessee store page
- Confirm no temporary `vercel.app` URL appears in page metadata, sitemap, or robots output.

### Analytics

- In GA4 Realtime, confirm a page view appears for:
  - Homepage load
  - Client-side navigation to `/locations`
  - Client-side navigation to a store page
- In GA4 Realtime and Vercel Analytics, confirm these custom events after intentional actions:
  - `find_store_click`
  - `directions_click`
  - `phone_click`
  - `category_view`
  - `newsletter_signup`
- Confirm `directions_click` includes:
  - `location_id`
  - `location_city`
  - `state`
  - `placement`
- Confirm `phone_click` includes:
  - `location_id`
  - `location_city`
  - `state`
  - `placement`
  - `contact_type`
- Confirm Chattanooga phone clicks use `contact_type: mall_information`.

### Mailchimp

- Submit one client-approved test email through the live newsletter form.
- Confirm the subscriber appears in Mailchimp as subscribed, not pending.
- Confirm the `Website Signup` tag is applied.
- Confirm preferred-state tags work when selected:
  - `Preferred State: FL`
  - `Preferred State: GA`
  - `Preferred State: SC`
  - `Preferred State: TN`
- Confirm first name maps to `FNAME` when the merge field exists.
- Confirm the form shows a success state and no Mailchimp internals are exposed to the visitor.

### Content and UX

- Review the site on mobile and desktop.
- Keyboard-test the header, mobile menu, hero carousel controls, category cards, location cards, contact links, and newsletter form.
- Confirm visible focus states are easy to see.
- Confirm every store page shows either `Store Hours` or `Regular Mall Hours`.
- Confirm provisional locations still show `Regular Mall Hours` until the client confirms store-specific hours.
- Confirm no public copy says “coming soon,” “TBD,” “placeholder,” or equivalent unfinished language.

### Current client data confirmations

- Knoxville phone conflict: current site uses `(865) 253-7363`; previous repository value was `(865) 253-7228`.
- Chattanooga direct-phone uncertainty: current site labels `(423) 855-5282` as `Hamilton Place information`, not a direct store phone.
- Citrus Park phone history: current site uses `(813) 792-7070`; previously surfaced conflicting value was `(706) 921-9726`.
- Brandon phone change: current site uses `(813) 699-2842`; previous repository value was `(813) 643-5528`.
- Provisional hours remain for Citrus Park, Lutz, Alpharetta, and Chattanooga.
- Orlando Saturday closing time is currently listed as `9 PM`; reconfirm if the client wants extra certainty.
- No general business-inquiry email is published because no verified destination has been provided.
- Character World at Mall of Georgia is preserved as `Character World`; do not publicly call it “A Pop Cult store” unless the client confirms that wording.

## Monitor after launch

- Check Vercel deployment status after each production push.
- Review Vercel Web Analytics for traffic and custom-event continuity.
- Review Vercel Speed Insights for LCP, CLS, and INP trends after real traffic accumulates.
- Review GA4 Realtime and Events after each content or analytics change.
- Check Search Console indexing, sitemap processing, crawl errors, and page indexing status.
- Check Mailchimp signup volume, tags, and duplicate/existing subscriber behavior.
- Spot-check Maps and phone links after store data changes.
- Re-run local validation before each production deployment:
  - `npm run lint`
  - `npm run build`
  - `git diff --check`

## Future optional work

- Add a verified business-inquiry email or contact workflow if the client provides one.
- Add confirmed direct Chattanooga phone if available.
- Convert provisional mall hours to verified store hours after client confirmation.
- Add store-specific images only when real approved photography is available.
- Add Search Console HTML verification metadata only if DNS verification becomes insufficient.
- Add richer location content if the client provides confirmed suite numbers, holiday hours, or store-specific services.
- Consider a lightweight visual regression check after the design stabilizes.

## Emergency rollback

Use this section only if the production domain or deployment has a serious issue.

### Vercel rollback

1. In Vercel, open the project deployments list.
2. Promote the last known-good deployment.
3. Confirm `https://popcult.online`, `/locations`, `/sitemap.xml`, and `/robots.txt` return successfully.
4. Re-check GA4 page views and newsletter form behavior after rollback.

### DNS rollback

If DNS web records must be reverted:

1. Locate the DNS screenshots or export taken before the Vercel cutover.
2. Revert only the web records needed to restore the previous site.
3. Preserve all email-related records:
   - MX records
   - SPF TXT records
   - DKIM TXT/CNAME records
   - DMARC TXT records
   - Google Workspace or Microsoft verification records
   - Mailchimp authentication records
   - Search Console DNS verification records, unless intentionally replacing verification
4. Do not replace nameservers unless the client explicitly approves and email impact has been checked.
5. Confirm email delivery is unaffected.
6. Confirm the domain resolves to the intended rollback target.
7. Document the changed values, timestamps, screenshots, and reason for rollback.

### Mailchimp rollback

- If newsletter signups fail, temporarily remove or hide the newsletter section only after confirming the failure is production-impacting.
- Do not expose API keys in debugging output.
- Do not change opt-in behavior from single opt-in to double opt-in without client approval.
