'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function TrainerWorkouts() {
  const [selectedClient, setSelectedClient] = useState('John Doe');
  const [workoutTitle, setWorkoutTitle] = useState('Hypertrophy Split v1');
  const [success, setSuccess] = useState(false);

  const [days, setDays] = useState([
    { day: 'Day 1: Chest & Triceps', exercises: 'Incline Dumbbell Press (4x10), Bench Press (3x8), Skull Crushers (3x12)' },
    { day: 'Day 2: Back & Biceps', exercises: 'Weighted Pull-ups (4x6), Barbell Rows (4x8), Hammer Curls (3x12)' },
    { day: 'Day 3: Legs & Core', exercises: 'Barbell Back Squats (4x8), Leg Press (3x10), Romanian Deadlifts (3x10), Hanging Leg Raises (4x15)' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout role="trainer">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Workout Plan Builder</h2>
          <p className="text-xs text-neutral-500">Design custom hypertrophy or conditioning splits and assign them directly to clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creator Form */}
        <Card className="lg:col-span-2 border" hoverable={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-sm px-4 py-2.5 rounded-lg font-bold">
                Workout Plan assigned to {selectedClient} successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Select Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
                >
                  <option>John Doe</option>
                  <option>Rohan Sharma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Plan Title</label>
                <input
                  type="text"
                  required
                  value={workoutTitle}
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Routine Splitting</h3>
              {days.map((item, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={item.day}
                    onChange={(e) => {
                      const newDays = [...days];
                      newDays[index].day = e.target.value;
                      setDays(newDays);
                    }}
                    className="w-full bg-transparent border-b border-neutral-800 font-semibold text-white focus:border-primary focus:outline-none pb-1"
                  />
                  <textarea
                    rows={2}
                    value={item.exercises}
                    onChange={(e) => {
                      const newDays = [...days];
                      newDays[index].exercises = e.target.value;
                      setDays(newDays);
                    }}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-primary rounded-lg px-4 py-2 text-sm text-neutral-300 focus:outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            <Button type="submit" variant="primary">
              Publish & Assign Plan
            </Button>
          </form>
        </Card>

        {/* Existing plans list */}
        <Card hoverable={false} className="border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Active Routines</h3>
          <div className="space-y-3">
            <div className="p-4 bg-neutral-900/50 border border-white/5 rounded-lg text-xs space-y-1">
              <div className="font-bold text-white uppercase">Hypertrophy Split v1</div>
              <p className="text-neutral-400">Assigned to: John Doe</p>
              <p className="text-neutral-500">Created: June 05, 2026</p>
            </div>
            <div className="p-4 bg-neutral-900/50 border border-white/5 rounded-lg text-xs space-y-1">
              <div className="font-bold text-white uppercase">Fat Loss Interval v3</div>
              <p className="text-neutral-400">Assigned to: Rohan Sharma</p>
              <p className="text-neutral-500">Created: June 01, 2026</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
