/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disable problematic aliases
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
 
    
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '40mb',
    },
  },
};

export default nextConfig;
