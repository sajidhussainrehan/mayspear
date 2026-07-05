/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — deploys to any static host (Vercel, Netlify,
  // GitHub Pages, S3, Cloudflare Pages). Run `npm run build` -> /out.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
