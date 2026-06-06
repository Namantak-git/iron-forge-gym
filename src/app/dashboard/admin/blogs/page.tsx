'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminBlogs() {
  const blogPosts = [
    { title: '5 Ultimate Strength Training Routines for Muscle Gains', author: 'Alex Mercer', category: 'Strength', date: 'June 01, 2026' },
    { title: 'The Clean Ketogenic Diet: Fat Loss Without Muscle Waste', author: 'Sarah Jenkins', category: 'Diet', date: 'May 28, 2026' },
    { title: 'Why Progressive Overload is the Golden Rule of Hypertrophy', author: 'Chief Admin', category: 'Muscle', date: 'May 20, 2026' },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gym Blog Manager</h2>
          <p className="text-xs text-neutral-500">Publish articles, updates, and training guidelines</p>
        </div>
        <Button variant="primary" size="sm" className="flex items-center space-x-1.5">
          <Plus className="h-4 w-4" />
          <span>Write Post</span>
        </Button>
      </div>

      <Card hoverable={false} className="border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 text-neutral-500 font-bold uppercase tracking-wider text-xs">
                <th className="pb-3">Article Title</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Published Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogPosts.map((post, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/30">
                  <td className="py-4 font-bold text-white uppercase tracking-wide">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate max-w-xs">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-4 text-neutral-400">{post.author}</td>
                  <td className="py-4">
                    <span className="text-[10px] bg-neutral-900 border border-white/5 text-neutral-300 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 text-neutral-400">{post.date}</td>
                  <td className="py-4 text-right space-x-2">
                    <button className="text-neutral-400 hover:text-white transition-colors cursor-pointer inline-block"><Edit2 className="h-4 w-4" /></button>
                    <button className="text-neutral-500 hover:text-primary transition-colors cursor-pointer inline-block"><Trash2 className="h-4 w-4" /></button>
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
