import { ReactNode } from "react";
import Link from "next/link";
import MaxWidthWrapper from "../max-width-wrapper";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

export default function TermsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-800">
      <header className="bg-primary-base py-4">
        <MaxWidthWrapper className="flex justify-between items-center">
          <Link href="/">
            <Image
              // src="/RentEasy-White.png"
              src="/logo-white.png"
              alt=""
              className="object-cover"
              width={130}
              height={36}
            />
          </Link>
          <nav className="flex space-x-4">
            <Link
              href="/terms-of-service"
              className="text-white hover:underline"
            >
              Termos
            </Link>
            <Link href="/privacy-policy" className="text-white hover:underline">
              Privacidade
            </Link>
            <Link href="/cookies" className="text-white hover:underline">
              Cookies
            </Link>
          </nav>
        </MaxWidthWrapper>
      </header>
      <main className="py-6">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
      <footer className="bg-zinc-100 py-4 mt-8">
        <div className="container mx-auto text-center text-zinc-600 text-sm">
          © {new Date().getFullYear()} - Renda Fácil - Todos os direitos resvados.
        </div>
      </footer>
    </div>
  );
}
