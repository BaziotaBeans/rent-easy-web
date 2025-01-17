"use client";

import { useMemo } from "react";
import { usePropertiesWithStatusTrue } from "@/services/hooks/use-property";
import type { PropertyResponse } from "@/types/property";

interface Filters {
  location?: { display_name: string }; // Representa o local selecionado
  priceRange?: [number, number]; // Faixa de preços [min, max]
  purpose?: string; // Finalidade, como "Aluguel" ou "Compra"
  types?: string[]; // Tipos de imóvel selecionados
}

export function useFilteredProperties(filters: Filters) {
  const { data: properties, isLoading, error } = usePropertiesWithStatusTrue();

  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter((property) => {
      const {
        property: { province, county, address, price, fkPropertyTypeEntity },
      } = property;

      // Filtro de Localização: Verifica se o display_name contém partes do province, county ou address
      const matchesLocation =
        !filters.location ||
        [province, county, address]
          .filter((field) => field) // Ignora campos indefinidos ou vazios
          .some((field) =>
            field.toLowerCase().includes(filters.location!.display_name.toLowerCase())
          );

      // Filtro de Preço: Verifica se o preço está dentro do intervalo definido
      const matchesPrice =
        !filters.priceRange ||
        (price >= filters.priceRange[0] && price <= filters.priceRange[1]);

      // Filtro de Finalidade: Verifica se a finalidade corresponde ao filtro
      const matchesPurpose =
        !filters.purpose || fkPropertyTypeEntity.designation === filters.purpose;

      // Filtro de Tipo: Verifica se o tipo está na lista de tipos selecionados
      const matchesTypes =
        !filters.types || filters.types.includes(fkPropertyTypeEntity.designation);

      // O imóvel deve passar por todos os filtros definidos
      return matchesLocation && matchesPrice && matchesPurpose && matchesTypes;
    });
  }, [properties, filters]);

  return { data: filteredProperties, isLoading, error };
}
