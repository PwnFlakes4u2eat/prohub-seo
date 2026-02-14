import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for Vercel
  output: 'standalone',
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'exdjpucnusrvonbxwfyh.supabase.co',
      },
    ],
  },
  
  // Redirects
  async redirects() {
    return [
      // Homepage redirects to main app
      {
        source: '/',
        destination: 'https://app.prohub.co.za',
        permanent: false,
      },
    ];
  },
  
  // Headers for SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
