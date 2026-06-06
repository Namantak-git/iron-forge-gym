'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminSettings() {
  const [form, setForm] = useState({
    gymName: 'Iron Forge Gym',
    currency: 'INR (₹)',
    razorpayKey: 'rzp_test_xxxxxxxxx',
    cloudinaryCloudName: 'iron-forge-cloud',
    openAiApiKey: 'sk-proj-xxxxxxxxxxxx',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gym Configuration Panel</h2>
          <p className="text-xs text-neutral-500">Configure global SaaS variables, key APIs, and payment settings</p>
        </div>
      </div>

      <Card hoverable={false} className="max-w-2xl border border-white/5">
        <form onSubmit={handleSave} className="space-y-6">
          {saved && (
            <div className="bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-sm px-4 py-2.5 rounded-lg font-bold">
              Settings updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Gym Platform Name</label>
              <input
                type="text"
                value={form.gymName}
                onChange={(e) => setForm({ ...form, gymName: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Currency Code</label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <hr className="border-white/5" />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Razorpay Sandbox Config</h3>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Razorpay Key ID</label>
            <input
              type="text"
              value={form.razorpayKey}
              onChange={(e) => setForm({ ...form, razorpayKey: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Cloudinary Asset Config</h3>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Cloudinary Cloud Name</label>
            <input
              type="text"
              value={form.cloudinaryCloudName}
              onChange={(e) => setForm({ ...form, cloudinaryCloudName: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">AI Engine Config</h3>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">OpenAI Project Key</label>
            <input
              type="password"
              value={form.openAiApiKey}
              onChange={(e) => setForm({ ...form, openAiApiKey: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
            />
          </div>

          <Button type="submit" variant="primary" className="px-8">
            Save Changes
          </Button>
        </form>
      </Card>
    </DashboardLayout>
  );
}
