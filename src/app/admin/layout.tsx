'use client';

import { useState } from 'react';
import { Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileNav } from './components/layout/mobile-nav'
import { SidebarNav } from './components/layout/sidebar-nav';
import { AdminDropdown } from './components/layout/admin-dropdown';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    return (
      <div className="min-h-screen">
        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden border-r bg-background md:fixed md:inset-y-0 md:z-50 md:flex md:flex-col transition-all duration-300",
          isCollapsed ? "md:w-16" : "md:w-64"
        )}>
          <div className="flex h-full flex-col">
            <div className="border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="h-6 w-6" />
                  {!isCollapsed && <span className="ml-2 text-lg font-semibold">Admin</span>}
                </div>
              </div>
            </div>
            <SidebarNav isCollapsed={isCollapsed} />
          </div>
        </div>
  
        {/* Main Content */}
        <div className={cn(
          "flex flex-1 flex-col md:pl-[256px] transition-all duration-300",
          isCollapsed && "md:pl-16"
        )}>
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <Button
                variant="ghost"
                className="mr-2 px-2 hover:bg-transparent"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
              <div className="ml-auto flex items-center space-x-4">
                <AdminDropdown />
              </div>
            </div>
          </div>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
  
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    );
  }