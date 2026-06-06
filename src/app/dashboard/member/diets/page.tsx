'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Apple } from 'lucide-react';

export default function MemberDiets() {
  const diet = {
    title: 'Clean Bulking Plan',
    calories: '2800 kcal',
    meals: [
      { name: 'Breakfast (08:00 AM)', description: '4 Egg whites, 2 Whole eggs, 75g Rolled oats cooked in water, 1 Banana' },
      { name: 'Lunch (01:30 PM)', description: '200g Grilled Chicken breast, 100g Basmati Rice, Steamed Broccoli, Olive oil drizzle' },
      { name: 'Pre-Workout Snack (05:00 PM)', description: '1 Scoop Whey protein isolate, 1 Apple, 25g Raw almonds' },
      { name: 'Dinner (08:30 PM)', description: '180g Baked Salmon or Grilled Paneer, Roasted sweet potato, Mixed green salad' },
    ],
  };

  return (
    <DashboardLayout role="member">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">My Nutrition Guide</h2>
          <p className="text-xs text-neutral-500">Meal schedule and target macros configured by your trainer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {diet.meals.map((meal, idx) => (
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
          <div className="text-3xl font-black text-white">{diet.calories}</div>
          <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
            Drink at least 3.0 Liters of water daily. Clean eating ensures optimal protein synthesis and clean muscle growth. Avoid carbonated sugar drinks.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
