import { clamp, formatNumber } from './utils';
import type { Exercise, Training } from '../types';

export function calculateExercisePoints(exercise: Exercise): number {
  const totalReps = exercise.series.reduce((sum, set) => sum + (Number(set.reps) || 0), 0);
  const seriesCount = exercise.series.length;

  const difficultyBase = 1.2 + exercise.difficulty * 1.15;
  const seriesFactor = 1 + Math.min((seriesCount - 1) * 0.18, 1.35);
  const repsFactor = 1 + Math.min(totalReps * 0.055, 2.1);

  const rawLoad = Number(exercise.load ?? 0);
  let loadFactor = 1;

  if (exercise.bodyweight || rawLoad <= 0) {
    loadFactor = 1.05 + Math.min(totalReps / 90, 0.65) + (exercise.category.toLowerCase().includes('nogi') ? 0.1 : 0);
  } else {
    const loadBonus = Math.min(rawLoad / 35, 2.2);
    loadFactor = 1 + loadBonus * 0.78;
  }

  const effort = Number(exercise.rpe ?? 7);
  const effortFactor = clamp(0.8 + effort * 0.09, 0.85, 1.35);

  const normalized = difficultyBase * seriesFactor * repsFactor * loadFactor * effortFactor;
  return Number((normalized * (exercise.category === 'Mobilność' ? 0.8 : 1)).toFixed(1));
}

export function calculateTrainingPoints(training: Training): number {
  return training.exercises.reduce((sum, exercise) => sum + calculateExercisePoints(exercise), 0);
}

export function calculateScoreBreakdown(training: Training) {
  return training.exercises.map((exercise) => ({
    name: exercise.name || 'Ćwiczenie',
    points: calculateExercisePoints(exercise),
    category: exercise.category
  }));
}

export function getDashboardMetrics(trainings: Training[]) {
  const totalPoints = trainings.reduce((sum, training) => sum + calculateTrainingPoints(training), 0);
  const exercisesCount = trainings.reduce((sum, training) => sum + training.exercises.length, 0);
  const seriesCount = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + exercise.series.length, 0), 0);
  const totalReps = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + exercise.series.reduce((setSum, set) => setSum + (Number(set.reps) || 0), 0), 0), 0);
  const totalVolume = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + exercise.series.reduce((setSum, set) => setSum + (Number(set.weight || 0) * Number(set.reps || 0)), 0), 0), 0);

  return {
    points: Number(totalPoints.toFixed(1)),
    trainings: trainings.length,
    exercises: exercisesCount,
    series: seriesCount,
    reps: totalReps,
    volume: Number(totalVolume.toFixed(1))
  };
}

export function getWeeklyPoints(trainings: Training[], days = 7) {
  const today = new Date();
  const values = Array.from({ length: days }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - index - 1));
    const iso = date.toISOString().slice(0, 10);
    const sum = trainings
      .filter((training) => training.date === iso)
      .reduce((acc, item) => acc + calculateTrainingPoints(item), 0);
    return { date: iso, points: Number(sum.toFixed(1)) };
  });

  return values;
}

export function getMonthlyPoints(trainings: Training[]) {
  const dates = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    const iso = date.toISOString().slice(0, 10);
    const sum = trainings
      .filter((training) => training.date === iso)
      .reduce((acc, item) => acc + calculateTrainingPoints(item), 0);
    return { date: iso, points: Number(sum.toFixed(1)) };
  });
  return dates;
}

export function formatPercentage(value: number): string {
  return `${Math.min(100, Math.max(0, value)).toFixed(0)}%`;
}

export function getLevelFromPoints(points: number): { level: string; current: number; target: number; progress: number } {
  const thresholds = [
    { level: 'Początkujący', target: 500 },
    { level: 'Rozwojowy', target: 1300 },
    { level: 'Zaawansowany', target: 2600 },
    { level: 'Ekspert', target: 4300 }
  ];

  let currentLevel = thresholds[0];
  for (const item of thresholds) {
    if (points >= item.target) currentLevel = item;
  }

  const next = thresholds.find((item) => points < item.target) ?? thresholds[thresholds.length - 1];
  const start = thresholds[thresholds.indexOf(currentLevel)]?.target ?? 0;
  const currentProgress = points - start;
  const totalRange = next.target - start || 1;
  const progress = clamp((currentProgress / totalRange) * 100, 0, 100);

  return {
    level: currentLevel.level,
    current: Math.round(points),
    target: next.target,
    progress
  };
}

export function getSportGoalProgress(progress: number): string {
  if (progress < 20) return 'Fundamenty';
  if (progress < 45) return 'Rozwój';
  if (progress < 70) return 'Zaawansowany rozwój';
  if (progress < 90) return 'Wysoki poziom';
  return 'Cel ukończony';
}

export function sumNutritionEntries(entries: any[]) {
  return entries.reduce(
    (acc, item) => ({
      calories: acc.calories + Number(item.calories || 0),
      protein: acc.protein + Number(item.protein || 0),
      carbs: acc.carbs + Number(item.carbs || 0),
      fat: acc.fat + Number(item.fat || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
