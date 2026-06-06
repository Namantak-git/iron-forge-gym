import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestSchema = z.object({
  weight: z.number().positive(),
  height: z.number().positive(),
  bmi: z.number().positive(),
  goal: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = RequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid body parameters', details: result.error.issues }, { status: 400 });
    }

    const { weight, height, bmi, goal } = result.data;

    let planType = 'Hypertrophy Strength Build';
    let recommendations = [
      'Perform compound movements: Squats, Deadlifts, Bench Press.',
      'Maintain protein intake at 1.6-2.0g per kg of bodyweight.',
      'Sleep 7-8 hours daily for optimal muscle protein synthesis.',
    ];

    if (bmi >= 25) {
      planType = 'High Intensity Fat Shred';
      recommendations = [
        'Include HIIT (High-Intensity Interval Training) sessions twice a week.',
        'Target a caloric deficit of 300-500 calories under maintenance.',
        'Drink at least 3.5 Liters of water daily to maintain metabolic efficiency.',
      ];
    } else if (bmi < 18.5) {
      planType = 'Caloric Surplus Mass Build';
      recommendations = [
        'Increase daily caloric intake by 500 kcal above maintenance.',
        'Limit steady-state cardio to prevent excess calorie burn.',
        'Consume nutrient-dense foods (nuts, peanut butter, whole grains, eggs).',
      ];
    }

    return NextResponse.json({
      success: true,
      recommendation: {
        planType,
        recommendations,
        calculatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('AI Recommendation Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
