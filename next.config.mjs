/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // FIX 1: Removed 'interest-cohort=()' — unrecognized feature causes console errors
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: https://picsum.photos https://fastly.picsum.photos",
      // FIX 2: Added ws: and wss: so Next.js HMR WebSocket can connect in dev
      "connect-src 'self' ws: wss: https://export.arxiv.org https://arxiv.org https://hn.algolia.com https://*.vercel-insights.com https://api.semanticscholar.org",
      "frame-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

// When deployed to GitHub Pages, PAGES_BASE_PATH is injected by actions/configure-pages.
// Locally and on Vercel it's undefined, so basePath stays empty.
const basePath = process.env.PAGES_BASE_PATH ?? ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { optimizeCss: true },
  onDemandEntries: { maxInactiveAge: 60 * 1000, pagesBufferLength: 5 },
  staticPageGenerationTimeout: 120,
  // FIX 3: Allow cross-origin dev access from your local IP (192.168.137.1)
  allowedDevOrigins: ['192.168.137.1'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
