import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const API_END_PORT_URL = process.env.API_END_PORT_URL || '';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  transpilePackages: ['@lobehub/ui', 'antd-style'],

  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/openai-dev',
        destination: `${API_END_PORT_URL}/api/openai`,
      },
      {
        source: '/api/chain-dev',
        destination: `${API_END_PORT_URL}/api/chain`,
      },
    ];
  },
};

export default withPWA(nextConfig);
