'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Apple, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function MemberDiets() {
  const [isVeg, setIsVeg] = useState(false);

  const nonVegDiet = {
    title: 'Clean Bulking Plan',
    calories: '2800 kcal',
    meals: [
      { name: 'Breakfast (08:00 AM)', description: '4 Egg whites, 2 Whole eggs, 75g Rolled oats cooked in water, 1 Banana' },
      { name: 'Lunch (01:30 PM)', description: '200g Grilled Chicken breast, 100g Basmati Rice, Steamed Broccoli, Olive oil drizzle' },
      { name: 'Pre-Workout Snack (05:00 PM)', description: '1 Scoop Whey protein isolate, 1 Apple, 25g Raw almonds' },
      { name: 'Dinner (08:30 PM)', description: '180g Baked Salmon, Roasted sweet potato, Mixed green salad' },
    ],
  };

  const vegDiet = {
    title: 'Clean Vegetarian Bulking Plan',
    calories: '2750 kcal',
    meals: [
      { name: 'Breakfast (08:00 AM)', description: '100g Grilled Paneer bhurji, 2 Slices Whole wheat bread, 75g Oats, 1 Banana' },
      { name: 'Lunch (01:30 PM)', description: '200g Grilled Tofu or Soya chunks, 100g Basmati Rice, Steamed Broccoli, Olive oil' },
      { name: 'Pre-Workout Snack (05:00 PM)', description: '1 Scoop Plant protein, 1 Apple, 25g Raw almonds' },
      { name: 'Dinner (08:30 PM)', description: '180g Grilled Paneer, Roasted sweet potato, Chickpea salad, Green salad' },
    ],
  };

  const currentDiet = isVeg ? vegDiet : nonVegDiet;

  return (
    <DashboardLayout role="member">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">My Nutrition Guide</h2>
          <p className="text-xs text-neutral-500">Meal schedule and target macros configured by your trainer</p>
        </div>
        
        {/* Veg/Non-veg dynamic switch */}
        <div className="flex items-center bg-neutral-900 border border-white/5 p-1.5 rounded-lg space-x-2">
          <button
            onClick={() => setIsVeg(false)}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              !isVeg ? 'bg-primary text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Non-Veg Plan
          </button>
          <button
            onClick={() => setIsVeg(true)}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              isVeg ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Veg Alternates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
              isVeg ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'bg-red-950 border border-red-800 text-primary'
            }`}>
              {isVeg ? 'Vegetarian Plan' : 'Non-Vegetarian Plan'}
            </span>
            <span className="text-neutral-500 text-xs">• Active Plan</span>
          </div>

          {currentDiet.meals.map((meal, idx) => (
            <Card key={idx} hoverable={false} className="border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-primary">
                {meal.name}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {meal.description}
              </p>
            </Card>
          ))}
        </div>

        <Card hoverable={false} className="h-fit border border-white/5">
          <Apple className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Target Calories</h3>
          <div className="text-3xl font-black text-white">{currentDiet.calories}</div>
          <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
            Drink at least 3.0 Liters of water daily. Clean eating ensures optimal protein synthesis and clean muscle growth. Avoid carbonated sugar drinks.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
