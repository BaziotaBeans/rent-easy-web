import { House, LayoutGrid, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface AccountPopoverProps {
  isWhite?: boolean;
}

export function AccountPopover({ isWhite }: AccountPopoverProps) {
  const { user, signOut } = useAuth();

  console.log(user);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn("", { "hover:bg-zinc-50/10": isWhite })}
        >
          <FaUserCircle
            className={cn("w-6 h-6 fill-zinc-600", {
              "fill-white": isWhite,
            })}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-60 rounded-xl p-0 pt-4 overflow-hidden"
        sideOffset={2}
        align={"end"}
      >
        <div className="flex flex-col space-y-1 p-3">
          <p className="text-sm font-medium leading-none">{user?.username}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <Separator />
        <ul className="flex flex-col ">
          <li className="flex items-center ">
            <Link
              className="w-full px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/myrenteasy/scheduling"
            >
              Agendamentos
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              className="w-full px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/myrenteasy/contracts"
            >
              Contractos
            </Link>
          </li>
          {/* <li className="flex items-center">
            <Link
              className="w-full px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/myrenteasy/favorites"
            >
              Favoritos
            </Link>
          </li> */}
          <li className="flex items-center">
            <Link
              className="w-full px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/myrenteasy/orders"
            >
              Pedidos
            </Link>
          </li>
          <Separator />

          <li className="flex items-center">
            <Link
              className="w-full px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/myrenteasy/settings/"
            >
              Conta
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              className="w-full flex items-center justify-between px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              href="/"
            >
              Home <LayoutGrid className="w-4 h-4" />
            </Link>
          </li>
          <li className="flex items-center">
            <button
              className="w-full flex items-center justify-between px-3 py-2 cursor-pointer text-sm font-medium transition-all hover:bg-zinc-50"
              onClick={signOut}
            >
              Sair <LogOut className="w-4 h-4" />
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
