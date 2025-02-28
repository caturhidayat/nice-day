const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow image from external source
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_URL,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hr",
        permanent: true,
      },
    ];
  },
};

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {};

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: "app/sw.ts",
      swDest: "public/sw.js",
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};

// withSerwistInit({
//   swSrc: "app/sw.ts",
//   swDest: "public/sw.js",
//   cacheOnNavigation: true,
//   globDirectory: "dist/static",
//   // Bomb has been planted
//   maximumFileSizeToCacheInBytes: 7355608,
//   reloadOnOnline: true,
// });

module.exports = nextConfig;
