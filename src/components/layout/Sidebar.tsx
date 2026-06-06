'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, LayoutDashboard, Users, UserCheck, Settings, LogOut, FileText, CalendarCheck, Activity, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  role: 'admin' | 'trainer' | 'member';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/me', { method: 'POST' });
    if (res.ok) {
      window.location.href = '/';
    }
  };

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
          { label: 'Trainers', href: '/dashboard/admin/trainers', icon: Award },
          { label: 'Members', href: '/dashboard/admin/members', icon: Users },
          { label: 'Attendance', href: '/dashboard/admin/attendance', icon: UserCheck },
          { label: 'Blog Posts', href: '/dashboard/admin/blogs', icon: FileText },
          { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
        ];
      case 'trainer':
        return [
          { label: 'Clients', href: '/dashboard/trainer', icon: Users },
          { label: 'Workouts', href: '/dashboard/trainer/workouts', icon: Dumbbell },
          { label: 'Diet Charts', href: '/dashboard/trainer/diets', icon: FileText },
          { label: 'Schedules', href: '/dashboard/trainer/schedules', icon: CalendarCheck },
        ];
      case 'member':
        return [
          { label: 'My Profile', href: '/dashboard/member', icon: LayoutDashboard },
          { label: 'Workout Plan', href: '/dashboard/member/workouts', icon: Dumbbell },
          { label: 'Diet Chart', href: '/dashboard/member/diets', icon: FileText },
          { label: 'Progress log', href: '/dashboard/member/progress', icon: Activity },
        ];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-neutral-950 border-r border-white/5 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Upper Area */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 text-white mb-8">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="font-extrabold text-lg tracking-wider uppercase">
            Iron <span className="text-primary">Forge</span>
          </span>
        </Link>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-6 border-t border-white/5">
        <div className="text-xs uppercase text-neutral-500 font-bold mb-4 tracking-wider">
          Role: <span className="text-primary">{role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-white/5 transition-all cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
