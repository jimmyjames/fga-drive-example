/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/folder/",
        permanent: true,
      },
    ];
  },
  experimental: {
    instrumentationHook: true
  }
};

export default nextConfig;
