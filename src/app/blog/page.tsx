'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
}

const mockPosts: BlogPost[] = [
  {
    title: '5 Ultimate Strength Training Routines for Faster Muscle Gains',
    slug: 'strength-training-routines-muscle-gains',
    excerpt: 'Unlock full-body power with these tested training splits, built around compound lifts, progressive overload, and targeted recovery tips.',
    date: 'June 01, 2026',
    author: 'Alex Mercer',
    readTime: '6 min read',
    tags: ['Bodybuilding', 'Powerlifting', 'Strength'],
  },
  {
    title: 'The Clean Ketogenic Diet: How to Shred Fat Without Losing Muscle',
    slug: 'clean-keto-diet-fat-loss',
    excerpt: 'Discover the macronutrient secrets of structural keto dieting. Maintain protein thresholds and fuel intense gym sessions with smart fats.',
    date: 'May 28, 2026',
    author: 'Sarah Jenkins',
    readTime: '8 min read',
    tags: ['Diet', 'Keto', 'Fat Loss'],
  },
  {
    title: 'Why Progressive Overload is the Golden Rule of Hypertrophy',
    slug: 'progressive-overload-golden-rule',
    excerpt: 'If you arent increasing the weight, reps, or volume, you arent growing. Learn how to systematically structure progress tracking.',
    date: 'May 20, 2026',
    author: 'Chief Admin',
    readTime: '5 min read',
    tags: ['Workout Plan', 'Fitness', 'Muscle Growth'],
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <section className="py-32 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wider text-white">
              IRON <span className="text-primary text-glow-red">FORGE</span> BLOG
            </h1>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            <p className="text-neutral-400 mt-6 text-lg">
              Explore fitness insights, macronutrient guides, and elite workout split methods designed by certified professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col border border-white/5 hover:border-primary/20 transition-all duration-300">
                {/* Image Placeholder */}
                <div className="h-48 bg-neutral-900 rounded-lg mb-6 flex items-center justify-center text-neutral-800 font-extrabold uppercase tracking-widest text-xs">
                  {post.tags[0]}
                </div>

                <div className="flex items-center space-x-4 text-xs text-neutral-500 mb-3">
                  <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{post.date}</span>
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-3 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-neutral-900 border border-white/5 text-neutral-400 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                    Read Article <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
