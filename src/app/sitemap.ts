import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `http://localhost:3000/`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/payment`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/property`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy/contracts`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy/orders`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy/scheduling`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy/settings`,
      lastModified: new Date(),
    },
    {
      url: `http://localhost:3000/myrenteasy/favorites`,
      lastModified: new Date(),
    },
  ];
}
