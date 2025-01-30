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

module.exports = nextConfig;
