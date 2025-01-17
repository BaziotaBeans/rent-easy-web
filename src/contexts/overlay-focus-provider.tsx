"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface OverLayFocusContextProps {
  isOverlayFocus: boolean;
  setIsOverlayFocus: Dispatch<SetStateAction<boolean>>;
}

const OverLayFocusContext = createContext<OverLayFocusContextProps | null>(
  null
);

export function OverlayFocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOverlayFocus, setIsOverlayFocus] = useState(false);

  return (
    <OverLayFocusContext.Provider
      value={{
        isOverlayFocus,
        setIsOverlayFocus,
      }}
    >
      {children}
    </OverLayFocusContext.Provider>
  );
}

export const useOverlayFocus = () => {
  const context = useContext(OverLayFocusContext);
  if (!context) {
    throw new Error(
      "useOverlayFocus deve ser usado dentro de um OverlayFocusProvider"
    );
  }
  return context;
};