'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Lock, Users, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin account and platform settings</p>
      </div>

      {/* Account Settings */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" />
            Account Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
              <Input defaultValue="Admin User" placeholder="Full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
              <Input defaultValue="admin@carwash.com" type="email" placeholder="Email" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
              <Input placeholder="+1 (555) 000-0000" type="tel" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Role</label>
              <Input defaultValue="Super Admin" disabled />
            </div>
          </div>

          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                defaultValue="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <Button variant="outline">Change Password</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates about platform activities</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">System Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified about critical system events</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">Weekly Reports</h3>
              <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>

          <Button>Save Preferences</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            These actions cannot be undone. Please be careful.
          </p>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
            Reset All Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
