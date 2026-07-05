/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for production builds only (run `npm run build` -> /out).
  // Kept out of `next dev` so the optional catch-all route doesn't try to
  // pre-match requests like /favicon.ico during development.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
