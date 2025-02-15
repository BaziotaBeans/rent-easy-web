"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { AccountPopover } from "./account-popover";
import { useAuth } from "@/hooks/use-auth";
import { useSignInDialog } from "@/contexts/sign-in-dialog-provider";
import { SignInDialog } from "@/app/auth/components/sign-in-dialog";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Ícones para o menu hamburguer

export function Header() {
  const { isAuthenticated } = useAuth();
  const { setOpenSignInDialog } = useSignInDialog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full z-50 bg-white border-b border-b-zinc-200">
        <div className="flex items-center justify-between py-4 px-6 h-16">
          {/* Logo */}
          <Link href="/" aria-label="Página inicial">
            <Image
              src="/RentEasy.png"
              alt="RentEasy - Página Inicial"
              className="object-cover h-9"
              width={130}
              height={36}
            />
          </Link>

          {/* Ícone do menu hamburguer - Visível apenas no mobile */}
          <button
            className="block md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Botões de Ações - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Button variant="outline-primary">
              <AddHomeIcon size={20} />
              Anuncie seu imóvel
            </Button> */}
            {/* <Button variant="primary">
              <RentHomeIcon size={20} />
              Alugar
            </Button> */}
          </div>

          {/* Área de autenticação - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <AccountPopover />
            ) : (
              <>
                <Button variant="ghost" onClick={() => setOpenSignInDialog(true)}>
                  Entrar
                </Button>
                <Button asChild variant="primary">
                  <Link href="/auth/sign-up">Junte-se a nós</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Menu Mobile (Aparece quando o estado isMobileMenuOpen for true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-zinc-200 bg-white">
            {isAuthenticated ? (
              <AccountPopover />
            ) : (
              <>
                <Button variant="ghost" onClick={() => setOpenSignInDialog(true)}>
                  Entrar
                </Button>
                <Button asChild variant="primary">
                  <Link href="/auth/sign-up">Junte-se a nós</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </header>

      <SignInDialog />
    </>
  );
}
