'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Dumbbell, Trophy } from 'lucide-react';

export default function MemberWorkouts() {
  const plan = {
    title: 'Hypertrophy Strength Split v1',
    trainer: 'Alex Mercer',
    updatedAt: 'June 05, 2026',
    routines: [
      { day: 'Day 1: Chest & Triceps', exercises: ['Incline Dumbbell Press (4x10)', 'Barbell Bench Press (3x8)', 'Cable Chest Flyes (3x12)', 'Tricep Pushdowns (4x12)', 'Skull Crushers (3x12)'] },
      { day: 'Day 2: Back & Biceps', exercises: ['Weighted Pull-ups (4x6)', 'Barbell Rows (4x8)', 'Lat Pulldowns (3x10)', 'Barbell Bicep Curls (3x10)', 'Hammer Curls (3x12)'] },
      { day: 'Day 3: Legs & Core', exercises: ['Barbell Back Squats (4x8)', 'Leg Press (3x10)', 'Romanian Deadlifts (3x10)', 'Calf Raises (4x15)', 'Hanging Leg Raises (4x15)'] },
    ],
  };

  return (
    <DashboardLayout role="member">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">My Workout Routine</h2>
          <p className="text-xs text-neutral-500">Assigned workouts and performance sets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {plan.routines.map((routine, idx) => (
            <Card key={idx} hoverable={false} className="border border-white/5">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 mb-4">
                {routine.day}
              </h3>
              <ul className="space-y-3">
                {routine.exercises.map((exercise, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-neutral-300">
                    <Dumbbell className="h-4 w-4 text-primary shrink-0" />
                    <span>{exercise}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card hoverable={false} className="h-fit border border-white/5">
          <Trophy className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Coach Guidelines</h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Ensure you perform a 5-10 minute warm-up cardiorespiratory set before lifting weights. Hit the exact target weight reps as written. REST at least 90-120 seconds between sets to ensure strength recovery.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
