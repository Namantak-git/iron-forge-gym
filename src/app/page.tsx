'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BmiCalculator from '@/components/features/BmiCalculator';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Dumbbell, Target, Zap, Trophy, ShieldCheck, Mail, Phone, MapPin, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black">
        {/* Dynamic Glowing Accents */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

        {/* Cinematic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-neutral-900 border border-white/10 px-4 py-1.5 rounded-full"
          >
            <Dumbbell className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Forging Champions Daily
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none"
          >
            NO WEAKNESS.<br />
            ONLY <span className="text-primary text-glow-red">IRON.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-neutral-400 text-lg sm:text-xl leading-relaxed"
          >
            Welcome to Iron Forge Gym, Bangalore's premier training hub. Elite equipment, world-class certified coaches, personalized nutrition guides, and a community that commands greatness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#pricing">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explore Memberships
              </Button>
            </a>
            <a href="#bmi">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Calculate BMI Index
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Diagonal Cut decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#030303] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              WHO WE <span className="text-primary">ARE</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            <p className="text-neutral-400 mt-6 leading-relaxed">
              We don't offer generic templates or standard gym memberships. We provide a tailored, luxury SaaS environment combining state-of-the-art weights with elite trainer analytics and progression models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border border-white/5 hover:border-primary/20">
              <Target className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Targeted Coaching</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Work side-by-side with verified trainers who curate workout and diet charts tailored strictly to your goals.
              </p>
            </Card>

            <Card className="text-center border border-white/5 hover:border-primary/20">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">High Intensity</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                State-of-the-art powerlifting racks, extensive cardiovascular sections, and performance monitoring software.
              </p>
            </Card>

            <Card className="text-center border border-white/5 hover:border-primary/20">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Championship Mindset</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Join our premium transformation challenges, track your metrics inside your member profile, and conquer.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trainers Showcase */}
      <section id="trainers" className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              ELITE <span className="text-primary text-glow-red">TRAINERS</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            <p className="text-neutral-400 mt-6">
              Our coaches are certified, dedicated, and ready to guide you to greatness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trainer 1 */}
            <Card className="relative overflow-hidden border border-white/5 hover:border-primary/20">
              <div className="h-72 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Dumbbell className="h-16 w-16 text-neutral-800" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Alex Mercer</h3>
              <p className="text-primary text-sm font-semibold">Elite Strength Coach</p>
              <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                Specializes in powerlifting and physical conditioning. 8+ years coaching champions.
              </p>
            </Card>

            {/* Trainer 2 */}
            <Card className="relative overflow-hidden border border-white/5 hover:border-primary/20">
              <div className="h-72 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Users className="h-16 w-16 text-neutral-800" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Sarah Jenkins</h3>
              <p className="text-primary text-sm font-semibold">Diet & Conditioning Specialist</p>
              <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                Expert in ketogenic dieting, body transformations, and athletic stamina building.
              </p>
            </Card>

            {/* Trainer 3 */}
            <Card className="relative overflow-hidden border border-white/5 hover:border-primary/20">
              <div className="h-72 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Heart className="h-16 w-16 text-neutral-800" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Vikram Rathore</h3>
              <p className="text-primary text-sm font-semibold">Functional Training Coach</p>
              <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                CrossFit veteran, specializing in endurance, core stability, and high-performance workouts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#030303] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              PRICING <span className="text-primary">PLANS</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
            <p className="text-neutral-400 mt-6">
              Choose a subscription tier that matches your ambitions. Premium access guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Silver Plan */}
            <Card className="flex flex-col border border-white/5 hover:border-primary/10">
              <h3 className="text-xl font-bold text-neutral-300 uppercase">Silver Starter</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">₹1,500</span>
                <span className="text-neutral-500 text-sm ml-2">/ month</span>
              </div>
              <p className="text-neutral-500 text-sm mt-3">Access to basic equipment sections.</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300 flex-1">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Cardio and weight room access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>QR Code digital entry</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Locker room facility</span>
                </li>
              </ul>
              <div className="mt-8">
                <a href="/register">
                  <Button variant="outline" fullWidth>Select Plan</Button>
                </a>
              </div>
            </Card>

            {/* Gold Plan */}
            <Card className="flex flex-col border border-primary/30 glow-border-red relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white uppercase">Gold Quarterly</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">₹4,000</span>
                <span className="text-neutral-500 text-sm ml-2">/ 3 months</span>
              </div>
              <p className="text-neutral-500 text-sm mt-3">Advanced workouts and trainer sessions.</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300 flex-1">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Full access to gym facilities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>2 Personal Trainer consultations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Personalized Diet plan creation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>1 Free steam bath monthly</span>
                </li>
              </ul>
              <div className="mt-8">
                <a href="/register">
                  <Button variant="primary" fullWidth>Select Plan</Button>
                </a>
              </div>
            </Card>

            {/* Platinum Plan */}
            <Card className="flex flex-col border border-white/5 hover:border-primary/10">
              <h3 className="text-xl font-bold text-neutral-300 uppercase">Iron Platinum</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">₹12,000</span>
                <span className="text-neutral-500 text-sm ml-2">/ year</span>
              </div>
              <p className="text-neutral-500 text-sm mt-3">All-inclusive VIP membership tier.</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300 flex-1">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>24/7 Priority check-in access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Dedicated Personal Trainer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Weekly progress analysis reviews</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Unlimited steam and massage rooms</span>
                </li>
              </ul>
              <div className="mt-8">
                <a href="/register">
                  <Button variant="outline" fullWidth>Select Plan</Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="bmi" className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BmiCalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#030303] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              CLIENT <span className="text-primary">SUCCESS</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-white/5">
              <p className="italic text-neutral-300 leading-relaxed">
                "Joining Iron Forge completely changed my lifestyle. The personalized diet chart vikram created let me lose 12kg of fat while gaining strength. The dashboard metrics are incredibly rewarding!"
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-neutral-800" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Rajesh Kumar</h4>
                  <p className="text-xs text-primary">Member since 2025</p>
                </div>
              </div>
            </Card>

            <Card className="border border-white/5">
              <p className="italic text-neutral-300 leading-relaxed">
                "The admin interface lets me manage my client workout charts instantly. I can track John's weight trends, upload his weekly progress files, and keep in touch. Excellent SaaS infrastructure."
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-neutral-800" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Alex Mercer</h4>
                  <p className="text-xs text-primary">Personal Trainer</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
                GET IN <span className="text-primary text-glow-red">TOUCH</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                Have questions about our plans, coaching styles, or facilities? Fill out the contact form, and our support team will reach back to you in under 12 hours.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-neutral-300">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>101 Fitness Blvd, Bangalore, India</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@ironforgegym.com</span>
                </div>
              </div>
            </div>

            <Card className="border border-white/5" hoverable={false}>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Type your query..."
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
                {contactSuccess && (
                  <p className="text-emerald-500 text-sm font-semibold">
                    Thank you! Your message was submitted successfully.
                  </p>
                )}
                <Button type="submit" variant="primary" fullWidth>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
