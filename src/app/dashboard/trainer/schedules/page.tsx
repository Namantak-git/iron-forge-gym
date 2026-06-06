'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Session {
  id: string;
  clientName: string;
  time: string;
  date: string;
  status: 'Confirmed' | 'Pending';
}

export default function TrainerSchedules() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', clientName: 'John Doe', time: '06:00 AM - 07:00 AM', date: 'June 07, 2026', status: 'Confirmed' },
    { id: '2', clientName: 'Rohan Sharma', time: '08:30 AM - 09:30 AM', date: 'June 07, 2026', status: 'Pending' },
  ]);

  const [form, setForm] = useState({ clientName: 'John Doe', time: '10:00 AM - 11:00 AM', date: '2026-06-07' });
  const [success, setSuccess] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: Session = {
      id: Date.now().toString(),
      clientName: form.clientName,
      time: form.time,
      date: form.date,
      status: 'Pending',
    };
    setSessions([...sessions, newSession]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout role="trainer">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Training Schedules</h2>
          <p className="text-xs text-neutral-500">Coordinate timing sheets and slot assignments for personal coaching clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scheduled list */}
        <Card className="lg:col-span-2 border" hoverable={false}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Confirmed Calendar</h3>
          
          <div className="divide-y divide-white/5">
            {sessions.map((session) => (
              <div key={session.id} className="py-4 flex justify-between items-center text-sm">
                <div>
                  <h4 className="font-bold text-white uppercase">{session.clientName}</h4>
                  <p className="text-neutral-400 text-xs mt-0.5">{session.date} • {session.time}</p>
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    session.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-amber-950 text-amber-400 border border-amber-900'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Schedule Form */}
        <Card hoverable={false} className="border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Book New Slot</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            {success && (
              <div className="bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-xs px-4 py-2 rounded-lg font-bold">
                Session slot queued successfully!
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Client</label>
              <select
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option>John Doe</option>
                <option>Rohan Sharma</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Time Block</label>
              <input
                type="text"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" fullWidth>
              Save Slot
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
