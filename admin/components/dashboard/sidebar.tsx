'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  Wrench,
  BarChart3,
  Settings,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Reservations', href: '/dashboard/reservations', icon: Calendar },
  { label: 'Centers', href: '/dashboard/centers', icon: MapPin },
  { label: 'Services', href: '/dashboard/services', icon: Wrench },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-muted rounded-md md:hidden"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 fixed md:static h-full z-40',
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0',
          !isMobile && collapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            {!collapsed && (
              <div>
                <h2 className="text-xl font-bold text-sidebar-primary">CarWash</h2>
                <p className="text-xs text-sidebar-foreground/60">Admin</p>
              </div>
            )}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 hover:bg-sidebar-accent/10 rounded-md transition-colors"
              >
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform',
                    collapsed ? 'rotate-90' : '-rotate-90'
                  )}
                />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="p-3 rounded-lg bg-sidebar-accent/20 text-center">
              {!collapsed && (
                <p className="text-xs text-sidebar-foreground/70">v1.0.0</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
