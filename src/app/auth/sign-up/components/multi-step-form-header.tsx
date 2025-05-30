import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MultiStepFormHeader() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image
          // src="/RentEasy.png"
          src="/logo-rf.png"
          alt="logo"
          className="object-cover max-w-[118px] w-full"
          width={130}
          height={36}
        />
      </Link>

      <Button variant="ghost" className="text-base" asChild>
        <Link href="/auth/sign-up">
          <ChevronLeft className="w-6 h-6" />
          Selecionar tipo de usuário
        </Link>
      </Button>
    </div>
  );
}
