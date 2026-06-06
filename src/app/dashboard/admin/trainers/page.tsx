'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Award, Plus, Star } from 'lucide-react';

interface TrainerItem {
  id: string;
  name: string;
  email: string;
  trainerProfile: {
    id: string;
    bio: string | null;
    rating: number;
    specializations: string[];
    qualifications: string[];
  } | null;
}

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState<TrainerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          const onlyTrainers = data.users.filter((u: any) => u.role === 'TRAINER');
          setTrainers(onlyTrainers);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Elite Gym Trainers</h2>
          <p className="text-xs text-neutral-500">Monitor trainer specializations, bio profiles, and reviews</p>
        </div>
      </div>

      <Card hoverable={false} className="border border-white/5">
        {loading ? (
          <div className="text-center text-sm py-8 text-neutral-500 uppercase tracking-widest animate-pulse">
            Fetching Trainer Profiles...
          </div>
        ) : trainers.length === 0 ? (
          <div className="text-center text-sm py-8 text-neutral-500 uppercase tracking-widest">
            No Trainers Registered Yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Specializations</th>
                  <th className="pb-3">Qualifications</th>
                  <th className="pb-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {trainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-neutral-900/30">
                    <td className="py-4 font-bold text-white uppercase tracking-wide">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{trainer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-neutral-400">{trainer.email}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {trainer.trainerProfile?.specializations.map((spec) => (
                          <span key={spec} className="text-[10px] bg-neutral-900 border border-white/5 text-neutral-300 px-2 py-0.5 rounded">
                            {spec}
                          </span>
                        )) || <span className="text-neutral-600 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="py-4 text-neutral-400">
                      {trainer.trainerProfile?.qualifications.join(', ') || 'N/A'}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-1 text-amber-500 font-bold">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{trainer.trainerProfile?.rating.toFixed(1) || '5.0'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
