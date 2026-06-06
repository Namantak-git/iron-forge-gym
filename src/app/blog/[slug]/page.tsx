'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Calendar, User, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
}

const mockPosts: Record<string, BlogPost> = {
  'strength-training-routines-muscle-gains': {
    title: '5 Ultimate Strength Training Routines for Faster Muscle Gains',
    excerpt: 'Unlock full-body power with these tested training splits, built around compound lifts, progressive overload, and targeted recovery tips.',
    content: `
      <h2>The Core Philosophy of Strength & Hypertrophy</h2>
      <p>Building massive strength and physical size is not about spending endless hours on isolation machines. True progress begins in the barbell racks. Compound exercises like squats, deadlifts, bench presses, and overhead presses recruit multiple joint groups, stimulating maximum muscle fiber recruitment and testosterone release.</p>
      
      <h2>1. The Push-Pull-Legs (PPL) Split</h2>
      <p>The PPL split remains the gold standard for hypertrophy. It isolates muscle groups based on their mechanical movement style:</p>
      <ul>
        <li><strong>Push Day</strong>: Targets Chest, Shoulders, and Triceps. Exercises include Bench Press, Overhead Press, and Tricep Dips.</li>
        <li><strong>Pull Day</strong>: Targets Back and Biceps. Key movements: Deadlifts, Pull-ups, and Barbell Rows.</li>
        <li><strong>Legs Day</strong>: Targets Quads, Hamstrings, and Calves. Built around Back Squats, Romanian Deadlifts, and Leg Presses.</li>
      </ul>

      <blockquote>
        "Consistency with basic compound exercises beats complex isolation tricks 100% of the time."
      </blockquote>

      <h2>2. Progressive Overload Structure</h2>
      <p>To keep the muscles growing, you must force adaptation. This is achieved by systematically adding 2.5kg to the bar, doing 1 more repetition, or adjusting your set tempo. Record every single workout in your Iron Forge Dashboard so that you have absolute data on your progressive overload trajectory.</p>
    `,
    date: 'June 01, 2026',
    author: 'Alex Mercer',
    readTime: '6 min read',
    tags: ['Bodybuilding', 'Powerlifting', 'Strength'],
  },
  'clean-keto-diet-fat-loss': {
    title: 'The Clean Ketogenic Diet: How to Shred Fat Without Losing Muscle',
    excerpt: 'Discover the macronutrient secrets of structural keto dieting. Maintain protein thresholds and fuel intense gym sessions with smart fats.',
    content: `
      <h2>Introduction to Structural Keto</h2>
      <p>Traditional ketogenic dieting is often misunderstood as an excuse to consume excessive saturated fats. For athletes, "Clean Keto" is the proper path. It focuses on unsaturated fats, dense leafy greens, and highly tailored protein levels to preserve lean muscle while converting your body into a fat-burning furnace.</p>
      
      <h2>Macronutrient Ratios for Athletes</h2>
      <p>An active athlete should maintain these ratios to ensure energy levels do not drop during heavy squats:</p>
      <ul>
        <li><strong>Fats (70%)</strong>: Focus on avocados, extra virgin olive oil, whole eggs, wild salmon, and almonds.</li>
        <li><strong>Protein (25%)</strong>: Lean chicken breast, turkey, whey isolate, and beef. Ensure you hit at least 1.8g of protein per kg of bodyweight.</li>
        <li><strong>Carbs (5%)</strong>: Strictly leafy green vegetables (spinach, kale, broccoli).</li>
      </ul>

      <blockquote>
        "Shredding fat requires a caloric deficit, but preserving muscle requires hitting your protein targets and lifting heavy."
      </blockquote>
    `,
    date: 'May 28, 2026',
    author: 'Sarah Jenkins',
    readTime: '8 min read',
    tags: ['Diet', 'Keto', 'Fat Loss'],
  },
  'progressive-overload-golden-rule': {
    title: 'Why Progressive Overload is the Golden Rule of Hypertrophy',
    excerpt: 'If you arent increasing the weight, reps, or volume, you arent growing. Learn how to systematically structure progress tracking.',
    content: `
      <h2>The Adaptation Trap</h2>
      <p>Many gym-goers enter the weights room, pick up the exact same 10kg dumbbells they used last year, perform the same sets, and wonder why their physique has not transformed. Your muscles only grow when they are forced to adapt to a stimulus they haven't encountered before. This is the law of progressive overload.</p>
      
      <h2>Tracking Metrics</h2>
      <p>Use the progress tracker inside your Iron Forge Member Dashboard. Record your weights, log your daily water intake, and upload your weekly transformation photos. Keep the metrics visible, track the numbers, and let the science of hypertrophy handle the rest.</p>
    `,
    date: 'May 20, 2026',
    author: 'Chief Admin',
    readTime: '5 min read',
    tags: ['Workout Plan', 'Fitness', 'Muscle Growth'],
  },
};

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = mockPosts[slug as string];

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-4">
          <h1 className="text-3xl font-black uppercase text-white">Post Not Found</h1>
          <p className="text-neutral-400 mt-2">The article you are looking for does not exist.</p>
          <Link href="/blog" className="mt-6">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <article className="py-32 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center text-sm text-neutral-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all articles
          </Link>

          {/* Tag & Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center space-x-6 text-sm text-neutral-500 border-y border-white/5 py-4 mb-8">
            <span className="flex items-center"><User className="h-4 w-4 mr-2 text-primary" />By {post.author}</span>
            <span className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" />{post.date}</span>
            <span className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary" />{post.readTime}</span>
          </div>

          {/* Blog Image placeholder */}
          <div className="h-96 w-full bg-neutral-900 rounded-xl mb-8 flex items-center justify-center text-neutral-700 font-black text-2xl uppercase tracking-widest border border-white/5">
            {post.title.split(' ')[0]} Training
          </div>

          {/* Article content */}
          <div 
            className="prose prose-invert max-w-none text-neutral-300 space-y-6 leading-relaxed
              prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
              prose-h2:text-2xl prose-h2:pt-4
              prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-400 prose-blockquote:bg-neutral-900/50 prose-blockquote:py-3 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & Actions */}
          <div className="border-t border-white/5 mt-12 pt-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2 text-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span>Like</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 text-sm">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Link href="/register">
              <Button variant="primary">Start Your Progress Today</Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
