import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/locations/tenesse/:slug",
        destination: "/locations/tennessee/:slug",
        permanent: true,
      },
      {
        source: "/locations/southcarolina",
        destination: "/locations/south-carolina",
        permanent: true,
      },
      {
        source: "/locations/southcarolina/:slug",
        destination: "/locations/south-carolina/:slug",
        permanent: true,
      },
      {
        source: "/locations/florida/citruspark",
        destination: "/locations/florida/citrus-park",
        permanent: true,
      },
      {
        source: "/locations/georgia/characterworld",
        destination: "/locations/georgia/buford",
        permanent: true,
      },
      {
        source: "/locations/georgia/character-world",
        destination: "/locations/georgia/buford",
        permanent: true,
      },
      {
        source: "/locations/georgia/mall-of-georgia",
        destination: "/locations/georgia/buford",
        permanent: true,
      },
      {
        source: "/locations/florida/countryside",
        destination: "/locations/florida/clearwater",
        permanent: true,
      },
      {
        source: "/locations/florida/lutz",
        destination: "/locations/florida",
        permanent: true,
      },
      {
        source: "/locations/florida/tampa-premium-outlets",
        destination: "/locations/florida",
        permanent: true,
      },
      {
        source: "/locations/georgia/north-point",
        destination: "/locations/georgia/alpharetta",
        permanent: true,
      },
      {
        source: "/locations/south-carolina/haywood",
        destination: "/locations/south-carolina/greenville",
        permanent: true,
      },
      {
        source: "/locations/tennessee/hamilton-place",
        destination: "/locations/tennessee/chattanooga",
        permanent: true,
      },
      {
        source: "/our-locations",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/our-locations/florida",
        destination: "/locations/florida",
        permanent: true,
      },
      {
        source: "/our-locations/georgia",
        destination: "/locations/georgia",
        permanent: true,
      },
      {
        source: "/our-locations/southcarolina",
        destination: "/locations/south-carolina",
        permanent: true,
      },
      {
        source: "/our-locations/south-carolina",
        destination: "/locations/south-carolina",
        permanent: true,
      },
      {
        source: "/our-locations/tennessee",
        destination: "/locations/tennessee",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
