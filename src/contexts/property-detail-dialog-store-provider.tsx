"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type PropertyDetailDialogStore,
  createPropertyDetailDialogStore,
} from "@/store/property-detail-dialog-store";

export type PropertyDetailDialogStoreApi = ReturnType<
  typeof createPropertyDetailDialogStore
>;

export const PropertyDetailDialogContext = createContext<
  PropertyDetailDialogStoreApi | undefined
>(undefined);

export interface PropertyDetailDialogProps {
  children: ReactNode;
}

export const PropertyDetailDialogProvider = ({
  children,
}: PropertyDetailDialogProps) => {
  const storeRef = useRef<PropertyDetailDialogStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createPropertyDetailDialogStore();
  }

  return (
    <PropertyDetailDialogContext.Provider value={storeRef.current}>
      {children}
    </PropertyDetailDialogContext.Provider>
  );
};

export const usePropertyDetailDialogStore = <T,>(
    selector: (store: PropertyDetailDialogStore) => T,
  ): T => {
    const propertyDetailDialogContext = useContext(PropertyDetailDialogContext)
  
    if (!propertyDetailDialogContext) {
      throw new Error(`usePropertyDetailDialogStore must be used within PropertyDetailDialogProvider`)
    }
  
    return useStore(propertyDetailDialogContext, selector)
  }
