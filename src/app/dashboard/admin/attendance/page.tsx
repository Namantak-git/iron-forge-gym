'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { UserCheck, LogIn, LogOut } from 'lucide-react';

interface AttendanceLog {
  id: string;
  name: string;
  email: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
}

const mockLogs: AttendanceLog[] = [
  { id: '1', name: 'John Doe', email: 'member1@ironforge.com', date: 'June 06, 2026', checkIn: '06:15 AM', checkOut: '07:45 AM' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh@example.com', date: 'June 06, 2026', checkIn: '07:02 AM', checkOut: '08:30 AM' },
  { id: '3', name: 'Samantha D', email: 'samantha@example.com', date: 'June 06, 2026', checkIn: '08:12 AM', checkOut: null },
  { id: '4', name: 'Amit Sharma', email: 'amit@example.com', date: 'June 06, 2026', checkIn: '09:00 AM', checkOut: null },
];

export default function AdminAttendance() {
  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gym Attendance Logs</h2>
          <p className="text-xs text-neutral-500">Real-time check-in and check-out logs via member QR entries</p>
        </div>
      </div>

      <Card hoverable={false} className="border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                <th className="pb-3">Member Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Check-In</th>
                <th className="pb-3">Check-Out</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-900/30">
                  <td className="py-4 font-bold text-white uppercase tracking-wide">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      <span>{log.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-neutral-400">{log.email}</td>
                  <td className="py-4 text-neutral-300">{log.date}</td>
                  <td className="py-4">
                    <span className="flex items-center text-emerald-400 font-medium">
                      <LogIn className="h-3.5 w-3.5 mr-1" /> {log.checkIn}
                    </span>
                  </td>
                  <td className="py-4">
                    {log.checkOut ? (
                      <span className="flex items-center text-neutral-400">
                        <LogOut className="h-3.5 w-3.5 mr-1" /> {log.checkOut}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-primary font-bold animate-pulse">
                        Active Training
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      log.checkOut ? 'bg-neutral-900 text-neutral-400 border border-white/5' : 'bg-primary/20 text-primary border border-primary/30'
                    }`}>
                      {log.checkOut ? 'Completed' : 'Gym Floor'}
                    </span>
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
