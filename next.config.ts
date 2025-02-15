import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
        //pathname: '/v0/b/**', // Permite URLs específicas (ajuste se necessário)
      },
    ],
  },
  //   async headers() {
  //     return [
  //         {
  //             // matching all API routes
  //             source: "/api/:path*",
  //             headers: [
  //                 { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //             ]
  //         }
  //     ]
  // }
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Proxy para o back-end
      },
    ];
  },
};

export default nextConfig;
