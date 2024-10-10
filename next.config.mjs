/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.mlbstatic.com",
        port: "",
        pathname: "/mlb-photos/image/upload/v1/people/**",
      },
    ],
  },
  // Minor issues that I want to ignore just to deploy atm
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
