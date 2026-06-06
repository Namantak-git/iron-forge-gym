'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProgressLog {
  date: string;
  weight: number;
  fat: number | null;
  muscle: number | null;
}

export default function MemberProgress() {
  const [logs, setLogs] = useState<ProgressLog[]>([
    { date: 'May 10', weight: 73.5, fat: 18.2, muscle: 33.1 },
    { date: 'May 20', weight: 74.2, fat: 17.8, muscle: 33.6 },
    { date: 'May 30', weight: 74.8, fat: 17.5, muscle: 34.0 },
    { date: 'June 05', weight: 75.0, fat: 17.2, muscle: 34.3 },
  ]);

  const [form, setForm] = useState({ weight: '', fat: '', muscle: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: ProgressLog = {
      date: 'Today',
      weight: parseFloat(form.weight),
      fat: form.fat ? parseFloat(form.fat) : null,
      muscle: form.muscle ? parseFloat(form.muscle) : null,
    };
    setLogs([...logs, newLog]);
    setForm({ weight: '', fat: '', muscle: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout role="member">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Progress Log Vault</h2>
          <p className="text-xs text-neutral-500">Log body parameters to track muscle building and weight metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logger input */}
        <Card hoverable={false} className="h-fit border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Log Today's Stats</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <div className="bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-xs px-4 py-2 rounded-lg font-bold">
                Progress parameter logged successfully!
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Body Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="e.g. 75.2"
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Body Fat (%)</label>
              <input
                type="number"
                step="0.1"
                value={form.fat}
                onChange={(e) => setForm({ ...form, fat: e.target.value })}
                placeholder="e.g. 16.5 (Optional)"
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">Muscle Mass (kg)</label>
              <input
                type="number"
                step="0.1"
                value={form.muscle}
                onChange={(e) => setForm({ ...form, muscle: e.target.value })}
                placeholder="e.g. 34.5 (Optional)"
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" fullWidth>
              Log Entries
            </Button>
          </form>
        </Card>

        {/* History charts/trends */}
        <Card className="lg:col-span-2 border" hoverable={false}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Weight Progression Trend</h3>

          {/* SVG representation chart */}
          <div className="h-64 w-full flex items-end justify-between pt-4 pb-2 px-2 border-b border-white/5">
            {logs.map((log, i) => {
              // Scale height relative to a base of 70kg
              const heightPercentage = Math.min(Math.max((log.weight - 70) * 15 + 20, 20), 95);
              return (
                <div key={i} className="flex flex-col items-center space-y-2 w-16">
                  <div className="w-10 bg-primary/20 border border-primary/30 rounded-t-md hover:bg-primary transition-all duration-300 relative group" style={{ height: `${heightPercentage}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/10 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {log.weight} kg
                    </div>
                  </div>
                  <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{log.date}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 text-center text-xs">
            <div className="p-3 bg-neutral-900/40 border border-white/5 rounded">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">Start Weight</span>
              <span className="text-white font-bold text-lg mt-0.5">{logs[0].weight} kg</span>
            </div>
            <div className="p-3 bg-neutral-900/40 border border-white/5 rounded">
              <span className="text-neutral-500 block uppercase tracking-wider font-semibold">Current Weight</span>
              <span className="text-primary font-bold text-lg mt-0.5">{logs[logs.length - 1].weight} kg</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
