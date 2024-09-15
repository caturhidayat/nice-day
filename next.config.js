/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow image from external source
  images: {
    domains: ["openstreetmap.org", "images.unsplash.com"],
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
