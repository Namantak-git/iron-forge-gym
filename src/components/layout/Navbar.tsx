'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dumbbell, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const res = await fetch('/api/auth/me', { method: 'POST' });
    if (res.ok) {
      window.location.href = '/';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-white">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="font-extrabold text-xl tracking-wider uppercase">
              Iron <span className="text-primary text-glow-red">Forge</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors text-neutral-300">
              About
            </Link>
            <Link href="/#trainers" className="text-sm font-medium hover:text-primary transition-colors text-neutral-300">
              Trainers
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors text-neutral-300">
              Membership
            </Link>
            <Link href="/#bmi" className="text-sm font-medium hover:text-primary transition-colors text-neutral-300">
              BMI Calculator
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors text-neutral-300">
              Blog
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href={`/dashboard/${user.role.toLowerCase()}`}>
                  <Button variant="glass" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-white transition-colors text-neutral-400">
                  Sign In
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-xl border border-white/10 p-6 absolute left-0 right-0">
          <div className="flex flex-col space-y-4">
            <Link
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-neutral-300 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/#trainers"
              onClick={() => setIsOpen(false)}
              className="text-neutral-300 hover:text-primary transition-colors"
            >
              Trainers
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="text-neutral-300 hover:text-primary transition-colors"
            >
              Membership
            </Link>
            <Link
              href="/#bmi"
              onClick={() => setIsOpen(false)}
              className="text-neutral-300 hover:text-primary transition-colors"
            >
              BMI Calculator
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-neutral-300 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            
            <hr className="border-white/10" />

            {user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href={`/dashboard/${user.role.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" fullWidth onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
