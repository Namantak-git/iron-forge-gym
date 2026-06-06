'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function TrainerDiets() {
  const [selectedClient, setSelectedClient] = useState('John Doe');
  const [dietTitle, setDietTitle] = useState('Clean Bulking Plan');
  const [calories, setCalories] = useState('2800 kcal');
  const [success, setSuccess] = useState(false);

  const [meals, setMeals] = useState([
    { meal: 'Breakfast', food: '4 Egg whites, 2 Whole eggs, 75g Rolled oats, 1 Banana' },
    { meal: 'Lunch', food: '200g Grilled Chicken breast, 100g Basmati Rice, Broccoli, Olive oil drizzle' },
    { meal: 'Pre-Workout Snack', food: '1 Scoop Whey isolate, 1 Apple, 25g Almonds' },
    { meal: 'Dinner', food: '180g Baked Salmon or Paneer, Sweet potato, Mixed green salad' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout role="trainer">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Diet Chart Creator</h2>
          <p className="text-xs text-neutral-500">Configure calories, macros and meals for client diet profiles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creator Form */}
        <Card className="lg:col-span-2 border" hoverable={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-emerald-950/50 border border-emerald-900 text-emerald-400 text-sm px-4 py-2.5 rounded-lg font-bold">
                Diet Chart assigned to {selectedClient} successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Select Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
                >
                  <option>John Doe</option>
                  <option>Rohan Sharma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Diet Title</label>
                <input
                  type="text"
                  required
                  value={dietTitle}
                  onChange={(e) => setDietTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Target Calories</label>
                <input
                  type="text"
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Meal Breakdown</h3>
              {meals.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-semibold text-white text-sm">{item.meal}</div>
                  <input
                    type="text"
                    value={item.food}
                    onChange={(e) => {
                      const newMeals = [...meals];
                      newMeals[index].food = e.target.value;
                      setMeals(newMeals);
                    }}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-primary rounded-lg px-4 py-2 text-sm text-neutral-300 focus:outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            <Button type="submit" variant="primary">
              Assign Diet Chart
            </Button>
          </form>
        </Card>

        {/* Info panel */}
        <Card hoverable={false} className="border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Macronutrient Guide</h3>
          <p className="text-neutral-400 text-xs leading-relaxed mb-4">
            Protein provides the blocks for muscle growth, carbohydrates provide glycogen for maximum force generation, and healthy fats regulate hormone profiles.
          </p>
          <div className="p-4 bg-neutral-900/80 border border-white/5 rounded-lg space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-400">Bulking ratio:</span>
              <span className="text-white font-bold">50% C / 30% P / 20% F</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Cutting ratio:</span>
              <span className="text-white font-bold">20% C / 45% P / 35% F</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
