import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   },
  // },
  // logging: {
  //   fetches: {
  //     fullUrl: false,
  //   },
  // },
  // devIndicators: {
  //   appIsrStatus: false,
  //   buildActivity: false,
  // },
};

export default nextConfig;
