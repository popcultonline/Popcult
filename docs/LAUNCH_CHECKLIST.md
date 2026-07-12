# Pop Cult / Character World Launch Checklist

This project is prepared for a Vercel launch, analytics, newsletter capture, and a future Squarespace-to-Vercel domain cutover. Do not change DNS until the client has reviewed the checklist and confirmed account access.

## 1. Vercel deployment

- Import the repository into the client’s Vercel account.
- Confirm the project framework is detected as Next.js.
- Use the default install/build commands unless the project owner changes package managers:
  - Install: `npm install`
  - Build: `npm run build`
- Add the environment variables listed below before the production deployment.
- Deploy a preview first and review every public route:
  - `/`
  - `/locations`
  - `/about`
  - `/contact`
  - `/sitemap.xml`
  - `/robots.txt`

## 2. Required environment variables

Add these in Vercel Project Settings → Environment Variables.

### Public

- `NEXT_PUBLIC_SITE_URL` — the production origin, for example `https://example.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID, for example `G-XXXXXXXXXX`

### Server-side only

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX` — the Mailchimp data center prefix, for example `us21`
- `MAILCHIMP_AUDIENCE_ID`

Never prefix Mailchimp credentials with `NEXT_PUBLIC_`.

## 3. Vercel Web Analytics

- Code is installed via `@vercel/analytics`.
- Confirm Vercel Web Analytics is enabled in Vercel Project Settings → Analytics.
- After launch, verify page views and custom events are appearing:
  - `newsletter_signup`
  - `find_store_click`
  - `directions_click`
  - `phone_click`
  - `category_view`

## 4. Vercel Speed Insights

- Code is installed via `@vercel/speed-insights`.
- Confirm Speed Insights is enabled in Vercel Project Settings → Speed Insights.
- Review production traffic after launch for LCP, CLS, and INP issues.

## 5. GA4 setup

- Create or confirm the GA4 property in Google Analytics.
- Create a Web data stream for the production domain.
- Copy the Measurement ID into `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Do not hardcode the measurement ID in the codebase.
- After deployment, confirm:
  - Real-time page views are appearing.
  - Custom events are appearing with the same event names used for Vercel Analytics.

## 6. Google Search Console

- Add the production domain property in Search Console.
- Prefer DNS verification if the client controls DNS.
- Submit the generated sitemap: `/sitemap.xml`.
- Confirm `/robots.txt` is reachable.
- Check coverage after launch and monitor for crawl or indexing issues.

## 7. Mailchimp audience setup

- Confirm the correct Mailchimp audience/list with the client.
- Copy the Audience ID into `MAILCHIMP_AUDIENCE_ID`.
- Confirm the Mailchimp server prefix from the account URL or API key suffix.
- Confirm default merge fields include `FNAME` if first-name capture should be stored.
- The website applies Mailchimp tags when practical:
  - `Website Signup`
  - `Preferred State: FL`, `Preferred State: GA`, `Preferred State: SC`, or `Preferred State: TN`

## 8. Opt-in behavior

- The website sends intentional newsletter signups to Mailchimp with `status_if_new: subscribed` for single opt-in behavior.
- If the client later wants double opt-in, change the route to use `status_if_new: pending` and confirm the Mailchimp confirmation email flow.
- Before launch, send a test signup and confirm the expected subscriber status in Mailchimp.

## 9. Mailchimp domain authentication

- In Mailchimp, authenticate the sending domain before sending campaigns.
- Add Mailchimp’s required DNS records only after confirming they do not conflict with existing email records.
- Verify SPF/DKIM alignment in Mailchimp before the first campaign.

## 10. Custom domain configuration

- Add the production domain in Vercel Project Settings → Domains.
- Confirm whether the client wants apex, `www`, or both.
- Choose the canonical version and set redirects in Vercel if needed.
- Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin.

## 11. Preserve MX/TXT email records

Before editing DNS, export or screenshot existing Squarespace/domain DNS records.

Preserve:

- MX records for email hosting.
- SPF TXT records.
- DKIM TXT/CNAME records.
- DMARC TXT records.
- Google Workspace or Microsoft verification records.
- Mailchimp authentication records if already present.

Do not replace nameservers unless the client explicitly approves and email impact has been checked.

## 12. Squarespace DNS cutover

Recommended cutover path:

1. Confirm the Vercel production deployment is healthy.
2. Confirm Vercel has the custom domain added and shows the expected DNS target.
3. Lower DNS TTL ahead of the planned cutover if the current DNS provider allows it.
4. In Squarespace or the current DNS host, update only the web records needed for Vercel.
5. Preserve all email-related MX/TXT/CNAME records.
6. Wait for DNS propagation.
7. Confirm the domain resolves to Vercel.
8. Confirm HTTPS certificate issuance in Vercel.
9. Check all public routes, sitemap, robots, analytics, and newsletter signup.

Do not perform this migration from the codebase. It requires client account access and an approved launch window.

## 13. Rollback process

If the launch has a domain issue:

1. Revert the changed web DNS records to their pre-launch values.
2. Keep email records unchanged.
3. Confirm the old Squarespace site resolves again.
4. Leave the Vercel preview deployment available for debugging.
5. Document the failed DNS values, screenshots, and timestamps before retrying.

## 14. Post-launch verification

- Visit the homepage and every nav route on desktop and mobile.
- Confirm the header, footer, location cards, and newsletter form are visually intact.
- Test keyboard navigation and visible focus states.
- Submit a newsletter test with a client-approved test email.
- Confirm the contact appears in Mailchimp with the expected status/tags.
- Click a store directions link and confirm analytics receives `directions_click`.
- Tap a phone link on mobile and confirm analytics receives `phone_click`.
- Click “Find a Store” and confirm analytics receives `find_store_click`.
- Confirm category impressions are tracking as `category_view`.
- Confirm no public verification placeholder language is visible.
- Confirm `/sitemap.xml` and `/robots.txt` use the production domain after `NEXT_PUBLIC_SITE_URL` is set.
