'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'trainer' | 'member';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.authenticated) {
          setUser(data.user);
          if (data.user.role.toLowerCase() !== role) {
            router.push(`/dashboard/${data.user.role.toLowerCase()}`);
          }
        }
      })
      .catch(() => {
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-400">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <span className="text-sm font-semibold uppercase tracking-wider animate-pulse">Loading Profile Vault...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex bg-black min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar role={role} />

      {/* Main content viewport */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <div>
            <h1 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">
              Iron Forge Dashboard
            </h1>
            <p className="text-xl font-bold text-white uppercase tracking-wider mt-0.5">
              Welcome back, <span className="text-primary">{user.name}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-neutral-900 border border-white/5 rounded-lg px-4 py-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-400 font-bold uppercase tracking-wider">
              {role} Account
            </span>
          </div>
        </header>

        <div className="space-y-8">{children}</div>
      </main>
    </div>
  );
}
