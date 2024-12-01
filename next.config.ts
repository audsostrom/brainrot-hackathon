import type { NextConfig } from 'next';

// mecessary for webcontainers
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tenor.com',
        port: '',
        pathname: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.teenvogue.com',
        port: '',
        pathname: '',
        search: '',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
