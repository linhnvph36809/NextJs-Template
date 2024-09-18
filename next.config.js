import { i18n } from './next-i18next.config';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=604800' },
  { key: 'Content-Security-Policy', value: 'frame-ancestors https://app.safe.global' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  { key: 'Access-Control-Allow-Methods', value: 'GET' },
  { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, content-type, Authorization' },
];

const nextConfig = {
  i18n,
  swcMinify: true,
  output: 'standalone',
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    LOCAL_STORAGE_KEY: process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY,
  },
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  headers: async function headers() {
    if (process.env.NODE_ENV === 'development') {
      return [];
    }
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|otf|ttf|woff|woff2|eot)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  experimental: { esmExternals: true },
};

export default isProd ? nextConfig : withBundleAnalyzerConfig(nextConfig);
