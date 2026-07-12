import { ExternalLink, MapPin, Phone } from "lucide-react";
import {
  getDirectionsUrl,
  type StoreLocation,
} from "@/data/locations";
import { Card, CardContent } from "@/components/ui/card";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function LocationCard({ location }: { location: StoreLocation }) {
  const directionsUrl = getDirectionsUrl(location);
  const phoneHref = `tel:${location.phone.replace(/[^\d+]/g, "")}`;

  return (
    <Card className="gap-0 rounded-[1.75rem] border-0 py-0 shadow-none ring-1 ring-black/10">
      <div className="flex items-center justify-between border-b border-black/10 bg-[#171717] px-6 py-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em]">
          {location.brand}
        </p>
        <span className="rounded-full bg-[#ffe200] px-3 py-1 text-xs font-black text-black">
          {location.stateCode}
        </span>
      </div>
      <CardContent className="flex flex-1 flex-col p-6">
        <div>
          <p className="text-sm font-bold text-primary">{location.mall}</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.035em]">
            {location.city}
            {location.area ? (
              <span className="block text-base font-bold tracking-normal text-muted-foreground">
                {location.area}
              </span>
            ) : null}
          </h3>
        </div>

        <address className="mt-5 space-y-3 not-italic">
          <div className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{location.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <TrackedLink
              href={phoneHref}
              eventName="phone_click"
              eventProperties={{
                location_id: location.id,
                location_city: location.city,
                state: location.stateCode,
              }}
              className="font-bold underline-offset-4 hover:underline"
            >
              {location.phone}
            </TrackedLink>
          </div>
        </address>

        <div className="mt-auto pt-6">
          {directionsUrl ? (
            <TrackedLink
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              eventName="directions_click"
              eventProperties={{
                location_id: location.id,
                location_city: location.city,
                state: location.stateCode,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ffe200] px-4 py-2.5 text-sm font-black text-black hover:bg-[#f2d600]"
            >
              Get Directions
              <ExternalLink aria-hidden="true" className="size-4" />
            </TrackedLink>
          ) : (
            <span className="inline-flex rounded-full border border-black/15 px-4 py-2.5 text-sm font-bold text-muted-foreground">
              Details coming soon
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
