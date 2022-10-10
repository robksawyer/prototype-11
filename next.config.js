/**
 * @file next.config.js
 */

const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? 'https://static.fomolol.com/public' : '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:all*(jpg|mp4|png|webp|svg)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {},
  webpack: (config, { dev, webpack }) => {
    // SVG Loader
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });

    // Load GLSL Shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
  env: {
    NEXT_PUBLIC_ASSETS_BASE_PATH: assetPath,
    NEXT_PUBLIC_SOCIAL_TIKTOK: 'https://www.tiktok.com/@fomolol',
    NEXT_PUBLIC_SOCIAL_TWITTER: 'https://twitter.com/fomolol',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: isProd,
  },
};

module.exports = nextConfig;
