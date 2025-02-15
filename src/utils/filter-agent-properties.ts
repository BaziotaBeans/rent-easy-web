import { PropertyResponse } from "@/types/property";

// src/utils/filterProperties.ts

type SortOrder = "recent" | "asc" | "desc";

export const filterAndSortProperties = (
  data: PropertyResponse[],
  searchTerm: string,
  propertyTypes: string[],
  propertySoldOrRented: string[],
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

      const isPropertyStatusRented = item.property.propertyStatus == 'RENTED';

      const isPropertySold = item.property.fkPropertyTypeEntity.designation == 'Terreno' || item.property.fkPropertyTypeEntity.designation == 'Venda';
      
      const isPropertyRented = item.property.fkPropertyTypeEntity.designation == 'Arrendamento';

      const propertySoldOrRentedToCompareName = isPropertyStatusRented && isPropertySold ? 'Vendidos' : isPropertyStatusRented && isPropertyRented ? 'Alugados' : '';

      const matchesSoldOrRented = 
      propertySoldOrRented.length === 0 ||
      propertySoldOrRented.includes(propertySoldOrRentedToCompareName);
        

      return matchesTitle && matchesType && matchesSoldOrRented;
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
