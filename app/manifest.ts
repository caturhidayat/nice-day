import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Niceday',
    short_name: 'Niceday',
    description: 'Niceday is a platform for managing your daily Attendance',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/Yusen_Original.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/Yusen_Original.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}