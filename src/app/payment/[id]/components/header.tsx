import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white h-16 w-full p-4">
      <MaxWidthWrapper>
        <Link href="/">
          <Image
            // src="/RentEasy.png"
            src="/logo-rf.png"
            alt=""
            className="object-cover"
            width={130}
            height={36}
          />
        </Link>
      </MaxWidthWrapper>
    </header>
  );
}
