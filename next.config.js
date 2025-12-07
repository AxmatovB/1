/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Enable image optimization
  images: {
    domains: [],
  },
  // Headers for API calls
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

