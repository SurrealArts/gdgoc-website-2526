/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this images block to whitelist your Supabase URL
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uaxkzwllsbpwgoeapvem.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**', // This allows any image in your public buckets
      },
    ],
  },
};

module.exports = nextConfig;