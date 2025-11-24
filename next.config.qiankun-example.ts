/**
 * Example Next.js configuration with Qiankun support
 *
 * Copy the relevant sections to your next.config.ts file
 */

// ============================================
// 1. Add these constants at the top
// ============================================
const isQiankunMode = process.env.QIANKUN_MODE === 'true';
const pkg = require('./package.json');

const appName = pkg.name;

// ============================================
// 2. Modify the headers() function
// ============================================
export const headersExample = async () => {
  const securityHeaders = [
    {
      key: 'x-robots-tag',
      value: 'all',
    },
  ];

  // Add CORS headers for qiankun mode
  const corsHeaders = isQiankunMode
    ? [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.MAIN_APP_ORIGIN || '*', // Change * to your main app domain in production
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,POST,PUT,DELETE,OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'X-Requested-With,content-type,Authorization',
        },
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
      ]
    : [];

  const shouldUseCSP = true;
  if (shouldUseCSP && !isQiankunMode) {
    // Only apply CSP in standalone mode
    securityHeaders.push(
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'none';",
      },
    );
  }

  return [
    {
      headers: [...securityHeaders, ...corsHeaders],
      source: '/:path*',
    },
    // ... keep other header configurations
  ];
};

// ============================================
// 3. Modify the webpack() function
// ============================================
export const webpackExample = (config: any, { isServer }: { isServer: boolean }) => {
  // ... existing webpack configuration

  // Add qiankun micro-frontend support
  if (isQiankunMode && !isServer) {
    console.log('[Qiankun] Configuring webpack for micro-frontend mode');

    // Configure output for UMD format
    config.output = config.output || {};
    config.output.library = `${appName}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.globalObject = 'window';
    config.output.chunkLoadingGlobal = `webpackJsonp_${appName}`;

    // Ensure public path is dynamic
    config.output.publicPath = '/';
  }

  return config;
};
