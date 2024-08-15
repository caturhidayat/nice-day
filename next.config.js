/** @type {import('next').NextConfig} */
const nextConfig = {
    // allow image from external source
    images: {
        domains: ['openstreetmap.org', 'images.unsplash.com'],
    },
}

module.exports = nextConfig
