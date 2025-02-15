import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
        // disallow: ["/admin", "/privacy-policy", "/terms-of-service", "cookies", "/agent"],
      },
    ],
    sitemap: `http://localhost:3000/sitemap.xml`,
  };
}