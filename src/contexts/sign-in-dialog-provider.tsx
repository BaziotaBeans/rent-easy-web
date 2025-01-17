"use client";

import { createContext, Dispatch, SetStateAction, useState, useContext } from "react";

interface SignInDialogContextProps {
  openSignInDialog: boolean;
  setOpenSignInDialog: Dispatch<SetStateAction<boolean>>;
}

export const SignInDialogContext =
  createContext<SignInDialogContextProps | null>(null);

export function SignInDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  return (
    <SignInDialogContext.Provider
      value={{
        openSignInDialog,
        setOpenSignInDialog,
      }}
    >
      {children}
    </SignInDialogContext.Provider>
  );
}

export const useSignInDialog = () => {
  const context = useContext(SignInDialogContext);

  if (!context) {
    throw new Error(
      "useSignInDialog deve ser usado dentro de um SignInDialogProvider"
    );
  }

  return context;
};
