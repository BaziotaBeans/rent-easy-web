"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { AddHomeIcon } from "./svg/add-home-icon";
import { RentHomeIcon } from "./svg/rent-home-icon";
import { AccountPopover } from "./account-popover";
import { useAuth } from "@/hooks/use-auth";
import { useSignInDialog } from "@/contexts/sign-in-dialog-provider";
import { SignInDialog } from "@/app/auth/components/sign-in-dialog";

export function Header() {
  const { isAuthenticated } = useAuth();
  const { setOpenSignInDialog, openSignInDialog } = useSignInDialog();


  return (
    <>
      <header className="w-full z-50 bg-white">
        <div className="flex items-center justify-between py-4 px-6 h-16  border-b border-b-zinc-200 ">
          <Link href="/">
            <Image
              src="/RentEasy.png"
              alt=""
              className="object-cover h-9"
              width={130}
              height={36}
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="outline-primary">
              <AddHomeIcon size={20} />
              Anuncie seu imóvel
            </Button>
            {/* <Button variant="primary">
            <RentHomeIcon size={20} />
            Alugar
          </Button> */}
          </div>

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
        </div>
      </header>

      <SignInDialog />
    </>
  );
}
