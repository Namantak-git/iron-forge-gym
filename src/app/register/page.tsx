'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Registration successful, auto-login or redirect to login
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-6 left-6 inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
      </Link>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-white">
            <Dumbbell className="h-10 w-10 text-primary" />
            <span className="font-extrabold text-2xl tracking-wider uppercase">
              Iron <span className="text-primary">Forge</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white mt-4">Create Your Account</h2>
          <p className="text-neutral-500 text-sm mt-1">Begin your elite fitness journey today.</p>
        </div>

        <Card hoverable={false} className="border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/50 border border-red-900 text-red-400 text-sm px-4 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
