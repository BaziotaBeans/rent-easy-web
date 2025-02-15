"use client";

import { AccountPopover } from "@/components/account-popover";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { RentHomeIcon } from "@/components/svg/rent-home-icon";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-primary-base py-4 px-6 h-16  border-b border-b-zinc-200">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link href="/agent">
          <Image
            src="/RentEasy-White.png"
            alt=""
            className="object-cover h-9 aspect-square"
            width={130}
            height={36}
          />
        </Link>

        <nav className="w-full flex items-end justify-center">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/agent" className="flex items-center gap-2 hover:bg-white/10 text-white text-sm font-medium px-2 py-1 rounded-md transition-all">
                <RentHomeIcon size={16}/> Imóveis
              </Link>
            </li>
            <li>
              <Link href="/agent/contracts" className="flex items-center gap-2 hover:bg-white/10 text-white text-sm font-medium px-2 py-1 rounded-md transition-all">
                Contractos
              </Link>
            </li>
            <li>
              <Link href="/agent/scheduling" className="flex items-center gap-2 hover:bg-white/10 text-white text-sm font-medium px-2 py-1 rounded-md transition-all">
                Agendamentos
              </Link>
            </li>
            <li>
              <Link href="/agent/payments" className="flex items-center gap-2 hover:bg-white/10 text-white text-sm font-medium px-2 py-1 rounded-md transition-all">
                Pagamentos
              </Link>
            </li>
          </ul>
          
        </nav>

        <AccountPopover isWhite/>
      </MaxWidthWrapper>
    </header>
  );
}
