import { PropertyResponse } from "@/types/property";

// src/utils/filterProperties.ts
interface Property {
  property: {
    title: string;
    propertyType: string;
    createdAt: string;
  };
}

type SortOrder = "recent" | "asc" | "desc";

export const filterAndSortProperties = (
  data: PropertyResponse[],
  searchTerm: string,
  propertyTypes: string[],
  sortOrder: SortOrder
): PropertyResponse[] => {
  return data
    .filter((item) => {
      const matchesTitle = item.property.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType =
        propertyTypes.length === 0 ||
        propertyTypes.includes(item.property.propertyType ?? '');

      return matchesTitle && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.property.createdAt).getTime();
      const dateB = new Date(b.property.createdAt).getTime();

      if (sortOrder === "asc") return dateA - dateB;
      if (sortOrder === "desc") return dateB - dateA;

      // "recent" mantém a ordem padrão (do mais novo para o mais antigo)
      return dateB - dateA;
    });
};
