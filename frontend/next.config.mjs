/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    memoryBasedWorkers: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
