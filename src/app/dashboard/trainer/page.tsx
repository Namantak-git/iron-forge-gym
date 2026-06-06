'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, FileText, Dumbbell, Calendar, MessageSquare } from 'lucide-react';

export default function TrainerOverview() {
  const clients = [
    { name: 'John Doe', email: 'member1@ironforge.com', target: 'Gain 5kg lean mass', currentBmi: '23.1', planStatus: 'Assigned' },
    { name: 'Rohan Sharma', email: 'rohan@example.com', target: 'Shred 8kg fat', currentBmi: '26.4', planStatus: 'Pending Diet' },
  ];

  return (
    <DashboardLayout role="trainer">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverable={false} className="border border-white/5">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Active Clients</p>
          <h3 className="text-3xl font-black text-white mt-1">8</h3>
          <p className="text-xs text-primary font-semibold mt-2">1 new client this week</p>
        </Card>

        <Card hoverable={false} className="border border-white/5">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Workout splits</p>
          <h3 className="text-3xl font-black text-white mt-1">6</h3>
          <p className="text-xs text-neutral-500 font-semibold mt-2">85% assignment rate</p>
        </Card>

        <Card hoverable={false} className="border border-white/5">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Diet Charts</p>
          <h3 className="text-3xl font-black text-white mt-1">7</h3>
          <p className="text-xs text-neutral-500 font-semibold mt-2">1 pending update</p>
        </Card>

        <Card hoverable={false} className="border border-white/5">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Today's Sessions</p>
          <h3 className="text-3xl font-black text-white mt-1">3</h3>
          <p className="text-xs text-emerald-500 font-semibold mt-2">All sessions confirmed</p>
        </Card>
      </div>

      {/* Clients management table */}
      <Card hoverable={false} className="border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Assigned Gym Clients</h3>
          <Button variant="outline" size="sm">Schedule Session</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                <th className="pb-3">Client Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Goal Objective</th>
                <th className="pb-3">Current BMI</th>
                <th className="pb-3">Plan Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map((client, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/30">
                  <td className="py-4 font-bold text-white uppercase tracking-wide">{client.name}</td>
                  <td className="py-4 text-neutral-400">{client.email}</td>
                  <td className="py-4 text-neutral-300 font-semibold">{client.target}</td>
                  <td className="py-4 text-primary font-bold">{client.currentBmi}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      client.planStatus === 'Assigned' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-amber-950 text-amber-400 border border-amber-900'
                    }`}>
                      {client.planStatus}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <Button variant="outline" size="sm" className="px-3 py-1 text-xs">Configure Plans</Button>
                    <button className="text-neutral-400 hover:text-white transition-colors cursor-pointer inline-block align-middle ml-2">
                      <MessageSquare className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
