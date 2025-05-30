import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t">
      {/* Seção principal */}
      <div className="bg-zinc-800">
        <MaxWidthWrapper className="py-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between text-center lg:text-left gap-6">
            {/* Logo e texto */}
            <div className="flex flex-col gap-2 items-center lg:items-start text-white">
              <Link href="/">
                <Image
                  src="/logo-white.png"
                  // src="/RentEasy-White.png"
                  alt="RentEasy Logo"
                  className="object-cover"
                  width={130}
                  height={36}
                />
              </Link>
              <p className="text-xl lg:text-2xl font-bold max-w-80">
                A escolha certa para quem busca mais do que um lugar para morar.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Seção inferior */}
      <div className="bg-zinc-900">
        <MaxWidthWrapper className="py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Direitos autorais */}
          <p className="text-sm text-white text-center sm:text-left">
            © {new Date().getFullYear()} RentEasy. Todos os direitos reservados.
          </p>

          {/* Links de políticas */}
          <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm text-white">
            <li>
              <Link href="/terms-of-service" target="_blank">
                Termos de Serviço
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" target="_blank">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/cookies" target="_blank">
                Cookies
              </Link>
            </li>
          </ul>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
}
