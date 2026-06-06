'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    const bmiValue = w / Math.pow(h / 100, 2);
    const roundedBmi = Math.round(bmiValue * 10) / 10;
    setBmi(roundedBmi);

    let cat = '';
    let rec = '';

    if (roundedBmi < 18.5) {
      cat = 'Underweight';
      rec = 'Focus on a caloric surplus with nutrient-dense foods and heavy compound strength training to build muscle mass safely.';
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      cat = 'Normal Weight';
      rec = 'Great job! Maintain your fitness with a balanced diet, steady strength workouts, and active cardio routines.';
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      cat = 'Overweight';
      rec = 'Recommend clean eating with a slight caloric deficit, high-intensity interval training (HIIT), and structured weight training.';
    } else {
      cat = 'Obese';
      rec = 'Focus on cardiovascular improvement, calorie-controlled diet plans, and low-impact functional workouts to protect joints while burning fat.';
    }

    setCategory(cat);
    setRecommendation(rec);
  };

  return (
    <Card className="max-w-xl mx-auto w-full relative z-10 overflow-hidden border border-white/10" hoverable={false}>
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />

      <h3 className="text-2xl font-bold text-white mb-2 text-center uppercase tracking-wider">
        Check Your <span className="text-primary text-glow-red">Fitness Index</span>
      </h3>
      <p className="text-neutral-400 text-sm text-center mb-6">
        Enter your details below to instantly calculate your Body Mass Index (BMI).
      </p>

      <form onSubmit={calculateBmi} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            required
            className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            required
            className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none transition-all"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth className="mt-2">
          Calculate BMI
        </Button>
      </form>

      <AnimatePresence>
        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-8 p-5 bg-neutral-900/80 border border-white/5 rounded-lg text-center overflow-hidden"
          >
            <p className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">Your BMI Score</p>
            <div className="text-4xl font-black text-primary text-glow-red mt-1">{bmi}</div>
            <div className="mt-2 text-lg font-bold text-white uppercase tracking-wider">
              Category: <span className="text-primary">{category}</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mt-3 border-t border-white/5 pt-3">
              {recommendation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
