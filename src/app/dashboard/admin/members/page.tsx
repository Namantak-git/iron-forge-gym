'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Mail, Phone, ShieldCheck, UserMinus, ShieldAlert } from 'lucide-react';

interface MemberItem {
  id: string;
  name: string;
  email: string;
  memberProfile: {
    id: string;
    phone: string | null;
    status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
    membership: { name: string } | null;
    trainer: { user: { name: string } } | null;
  } | null;
}

export default function AdminMembers() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          const onlyMembers = data.users.filter((u: any) => u.role === 'MEMBER');
          setMembers(onlyMembers);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gym Members</h2>
          <p className="text-xs text-neutral-500">Manage accounts, active memberships, and coach assignments</p>
        </div>
      </div>

      <Card hoverable={false} className="border border-white/5">
        {loading ? (
          <div className="text-center text-sm py-8 text-neutral-500 uppercase tracking-widest animate-pulse">
            Fetching Member Roster...
          </div>
        ) : members.length === 0 ? (
          <div className="text-center text-sm py-8 text-neutral-500 uppercase tracking-widest">
            No Members Registered Yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Membership</th>
                  <th className="pb-3">Assigned Trainer</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-neutral-900/30">
                    <td className="py-4 font-bold text-white uppercase tracking-wide">{member.name}</td>
                    <td className="py-4 text-neutral-400">{member.email}</td>
                    <td className="py-4 text-neutral-400">{member.memberProfile?.phone || 'N/A'}</td>
                    <td className="py-4 text-neutral-300">
                      {member.memberProfile?.membership?.name || (
                        <span className="text-neutral-600 text-xs">No Plan</span>
                      )}
                    </td>
                    <td className="py-4 text-neutral-300">
                      {member.memberProfile?.trainer?.user?.name || (
                        <span className="text-neutral-600 text-xs">None Assigned</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          member.memberProfile?.status === 'ACTIVE'
                            ? 'bg-emerald-950 border border-emerald-900 text-emerald-400'
                            : member.memberProfile?.status === 'PENDING'
                            ? 'bg-amber-950 border border-amber-900 text-amber-400'
                            : 'bg-red-950 border border-red-900 text-red-400'
                        }`}
                      >
                        {member.memberProfile?.status || 'PENDING'}
                      </span>
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
