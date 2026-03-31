'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-8">
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 md:gap-3 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 md:z-50">
              <div className="p-4 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
