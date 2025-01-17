"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { SignInDialog } from "@/app/auth/components/sign-in-dialog";
import { AccountPopover } from "@/components/account-popover";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useSignInDialog } from "@/contexts/sign-in-dialog-provider";
import { useAuthStore } from "@/store/use-auth-store";

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setOpenSignInDialog } = useSignInDialog();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // ou um skeleton/loading state
  }

  return (
    <>
      <header className="w-full z-50 bg-white py-4 px-6 h-16  border-b border-b-zinc-200">
        <MaxWidthWrapper className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/RentEasy.png"
              alt=""
              className="object-cover h-9"
              width={130}
              height={36}
            />
          </Link>

          {isAuthenticated ? (
            <AccountPopover />
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setOpenSignInDialog(true)}>
                Entrar
              </Button>

              <Button asChild variant="primary">
                <Link href="/auth/sign-up">Junte-se a nós</Link>
              </Button>
            </div>
          )}
        </MaxWidthWrapper>
      </header>

      <SignInDialog />
    </>
  );
}
