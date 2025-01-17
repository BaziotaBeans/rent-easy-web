import { Property } from "@/types/property";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Luxury Villa in Talatona",
    address: "Talatona, Luanda",
    price: 500000,
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    type: "Villa",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=800&auto=format&fit=crop",
    ],
    location: [-8.9179, 13.2894],
  },
  {
    id: "2",
    title: "Modern Apartment in Miramar",
    address: "Miramar, Luanda",
    price: 300000,
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    type: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613545325268-d8f244b2d397?q=80&w=800&auto=format&fit=crop",
    ],
    location: [-8.8389, 13.2394],
  },
  {
    id: "3",
    title: "Family House in Benfica",
    address: "Benfica, Luanda",
    price: 400000,
    bedrooms: 5,
    bathrooms: 4,
    size: 300,
    type: "House",
    images: [
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613553507778-a3a3ac9a963f?q=80&w=800&auto=format&fit=crop",
    ],
    location: [-8.8989, 13.2194],
  },
];
