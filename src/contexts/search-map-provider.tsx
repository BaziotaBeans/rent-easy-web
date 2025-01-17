"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SearchMapContextProps {
  searchLocation: [number, number] | null;
  setSearchLocation: Dispatch<SetStateAction<[number, number] | null>>;
}

const SearchMapContext = createContext<SearchMapContextProps | null>(null);

export function SearchMapProvider({ children }: { children: React.ReactNode }) {
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(
    null
  );

  return (
    <SearchMapContext.Provider
      value={{
        searchLocation,
        setSearchLocation,
      }}
    >
      {children}
    </SearchMapContext.Provider>
  );
}

export const useSearchMap = () => {
  const context = useContext(SearchMapContext);
  if (!context) {
    throw new Error(
      "useSearchMap deve ser usado dentro de um SearchMapProvider"
    );
  }
  return context;
};
