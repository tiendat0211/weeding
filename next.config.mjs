/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xwfttbdowexyxpmhvvfs.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'statics.pancake.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'content.pancake.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
