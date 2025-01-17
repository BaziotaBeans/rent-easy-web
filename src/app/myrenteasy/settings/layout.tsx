import { User, Palette, Wrench, Lock } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import SidebarNav from "./components/sidebar-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col py-10 gap-6 overflow--hidden">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-zinc-600 font-bold">Conta</h1>
        <span className="text-sm text-zinc-600">
          Gerencie as configurações da sua conta e defina preferências de
          e-mail.
        </span>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col space-y-2 md:space-y-2 overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "Perfil",
    icon: <User size={18} />,
    href: "/myrenteasy/settings",
  },
  {
    title: "Conta",
    icon: <Wrench size={18} />,
    href: "/myrenteasy/settings/account",
  },
  {
    title: "Mudar Senha",
    icon: <Lock size={18} />,
    href: "/myrenteasy/settings/change-password",
  },

  {
    title: "Pagamentos",
    icon: <MdOutlinePayments size={18} />,
    href: "/myrenteasy/settings/payments",
  },
  {
    title: "Aparência",
    icon: <Palette size={18} />,
    href: "/myrenteasy/settings/appearance",
  },
];
