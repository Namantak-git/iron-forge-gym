'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { DollarSign, Users, Award, Calendar, Bell, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Revenue', value: '₹1,56,800', icon: DollarSign, change: '+12.5% this month' },
    { label: 'Active Members', value: '248', icon: Users, change: '+18 new members' },
    { label: 'Certified Trainers', value: '12', icon: Award, change: '2 on-leave today' },
    { label: 'Attendance Today', value: '42', icon: Calendar, change: 'Peak hours: 6am - 9am' },
  ];

  return (
    <DashboardLayout role="admin">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border border-white/5 relative overflow-hidden" hoverable={false}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mt-1">{stat.value}</h3>
                </div>
                <div className="p-2.5 bg-neutral-900 border border-white/5 rounded-lg text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-emerald-500">{stat.change}</div>
            </Card>
          );
        })}
      </div>

      {/* Analytics & Distribution Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Graph mockup */}
        <Card className="lg:col-span-2 border border-white/5" hoverable={false}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Revenue Stream</h3>
              <p className="text-xs text-neutral-500">Monthly breakdown for {new Date().getFullYear()}</p>
            </div>
            <Button variant="outline" size="sm">Export Report</Button>
          </div>

          {/* Custom high-fidelity SVG chart */}
          <div className="h-64 w-full flex items-end justify-between pt-4 pb-2 px-2 border-b border-white/5">
            {[35, 45, 60, 50, 75, 95].map((height, i) => {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
              return (
                <div key={i} className="flex flex-col items-center space-y-2 w-12">
                  <div className="w-8 bg-primary/25 hover:bg-primary border border-primary/40 rounded-t-md transition-all duration-300 relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/10 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ₹{(height * 2000).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">{months[i]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card className="border border-white/5" hoverable={false}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Recent Activity</h3>
            <Bell className="h-4.5 w-4.5 text-neutral-500" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-xs leading-relaxed">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-neutral-300 font-semibold">John Doe registered as a Member</p>
                <p className="text-neutral-500 mt-0.5">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs leading-relaxed">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-neutral-300 font-semibold">Payment ₹4,000 success for Plan "Gold Quarterly"</p>
                <p className="text-neutral-500 mt-0.5">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs leading-relaxed">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-neutral-300 font-semibold">Trainer Alex Mercer uploaded Workout split for client</p>
                <p className="text-neutral-500 mt-0.5">Yesterday</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs leading-relaxed">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-neutral-300 font-semibold">System backup completed successfully</p>
                <p className="text-neutral-500 mt-0.5">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
