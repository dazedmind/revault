// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['canvas', 'pdfjs-dist'],
  experimental: {
    esmExternals: 'loose', // Allow ESM packages
  },
  webpack: (config, { isServer }) => {
    // Handle canvas and other binary modules
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    // Externalize problematic packages
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas', 'pdfjs-dist'];
    }

    // Handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    });

    // Handle ESM packages
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };

    return config;
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig