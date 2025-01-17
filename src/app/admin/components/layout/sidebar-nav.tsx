import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  CreditCard, 
  Calendar,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Imóveis', href: '/admin/properties', icon: Home },
  { name: 'Pagamentos', href: '/admin/payments', icon: CreditCard },
  { name: 'Agendamentos', href: '/admin/schedules', icon: Calendar },
];

interface SidebarNavProps {
  isCollapsed: boolean;
}

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="flex-1 px-3">
      <div className="space-y-1 py-4">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-muted",
              isCollapsed ? "justify-center px-2" : "px-2"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}