const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahmedibra.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
      path: false,
      crypto: false,
      child_process: false,
    };
    Object.assign(config.resolve.alias, {
        '@mongodb-js/zstd': false,
        '@aws-sdk/credential-providers': false,
        'snappy': false,
        'aws4': false,
        'mongodb-client-encryption': false,
        'kerberos': false,
        'supports-color': false
      });

    return config;
  },
  
};

module.exports = nextConfig;
