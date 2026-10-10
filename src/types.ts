import type { Exercise, Training, LibraryExercise, SportGoal, NutritionEntry, GoalProgress, NutritionGoals, NutritionEntryType } from './types';

export const exerciseCategories = [
  'Klatka',
  'Plecy',
  'Nogi',
  'Barki',
  'Triceps',
  'Biceps',
  'Brzuch',
  'Mobilność',
  'Cardio',
  'Całe ciało',
  'Inne'
] as const;

export const defaultLibrary: LibraryExercise[] = [
  { id: 'l1', name: 'Przysiady', category: 'Nogi', defaultDifficulty: 7, usuallyUsesLoad: true, favorite: true, tags: ['siła nóg', 'moc'] },
  { id: 'l2', name: 'Wykroki', category: 'Nogi', defaultDifficulty: 6, usuallyUsesLoad: true, favorite: true, tags: ['siła nóg', 'stabilizacja'] },
  { id: 'l3', name: 'Pompki', category: 'Klatka', defaultDifficulty: 6, usuallyUsesLoad: false, favorite: true, tags: ['siła górna', 'moc'] },
  { id: 'l4', name: 'Podciąganie', category: 'Plecy', defaultDifficulty: 8, usuallyUsesLoad: false, favorite: true, tags: ['siła', 'moc'] },
  { id: 'l5', name: 'Wyciskanie sztangi', category: 'Klatka', defaultDifficulty: 8, usuallyUsesLoad: true, favorite: true, tags: ['siła górna', 'moc'] },
  { id: 'l6', name: 'Wyciskanie hantli', category: 'Klatka', defaultDifficulty: 7, usuallyUsesLoad: true, favorite: false, tags: ['siła górna'] },
  { id: 'l7', name: 'Wiosłowanie', category: 'Plecy', defaultDifficulty: 7, usuallyUsesLoad: true, favorite: false, tags: ['siła', 'wytrzymałość'] },
  { id: 'l8', name: 'Wyciskanie nad głowę', category: 'Barki', defaultDifficulty: 7, usuallyUsesLoad: true, favorite: false, tags: ['siła górna', 'stabilizacja'] },
  { id: 'l9', name: 'Uginanie ramion', category: 'Biceps', defaultDifficulty: 5, usuallyUsesLoad: true, favorite: false, tags: ['siła', 'moc'] },
  { id: 'l10', name: 'Prostowanie ramion na triceps', category: 'Triceps', defaultDifficulty: 5, usuallyUsesLoad: true, favorite: false, tags: ['siła górna'] },
  { id: 'l11', name: 'Wspięcia na palce', category: 'Nogi', defaultDifficulty: 4, usuallyUsesLoad: true, favorite: false, tags: ['siła nóg', 'stabilizacja'] },
  { id: 'l12', name: 'Wspięcia na palce jednonóż', category: 'Nogi', defaultDifficulty: 5, usuallyUsesLoad: false, favorite: false, tags: ['równowaga', 'siła nóg'] },
  { id: 'l13', name: 'Skoki dosiężne', category: 'Cardio', defaultDifficulty: 6, usuallyUsesLoad: false, favorite: true, tags: ['wyskok', 'moc'] },
  { id: 'l14', name: 'Skoki z przysiadu', category: 'Nogi', defaultDifficulty: 7, usuallyUsesLoad: false, favorite: true, tags: ['moc', 'siła nóg'] },
  { id: 'l15', name: 'Wskoki na podwyższenie', category: 'Nogi', defaultDifficulty: 6, usuallyUsesLoad: false, favorite: false, tags: ['wyskok', 'moc'] },
  { id: 'l16', name: 'Plank', category: 'Brzuch', defaultDifficulty: 4, usuallyUsesLoad: false, favorite: false, tags: ['stabilizacja', 'core'] },
  { id: 'l17', name: 'Brzuszki', category: 'Brzuch', defaultDifficulty: 6, usuallyUsesLoad: false, favorite: true, tags: ['siła core', 'wytrzymałość'] },
  { id: 'l18', name: 'Ćwiczenia mobilności', category: 'Mobilność', defaultDifficulty: 3, usuallyUsesLoad: false, favorite: false, tags: ['mobilność', 'regeneracja'] }
];

export const defaultGoals: SportGoal[] = [
  {
    id: 'g1',
    name: 'Wyskok i moc nóg',
    discipline: 'Koszykówka',
    description: 'Utrwalanie siły eksplozywnej i dynamiki ruchu w skoku.',
    areas: ['wyskok', 'siła nóg', 'moc'],
    progression: 42,
    lastUpdated: new Date().toISOString(),
    level: 'Rozwijający się',
    trainingsSupporting: 6,
    target: 85,
    current: 42,
    status: 'active'
  },
  {
    id: 'g2',
    name: 'Szybkość i przyspieszenie',
    discipline: 'Piłka nożna',
    description: 'Zwiększanie dynamiki, tempa i startu w pierwszych krokach.',
    areas: ['szybkość', 'przyspieszenie', 'moc'],
    progression: 36,
    lastUpdated: new Date().toISOString(),
    level: 'Fundamenty',
    trainingsSupporting: 4,
    target: 80,
    current: 36,
    status: 'active'
  }
];

export const defaultNutritionGoals: NutritionGoals = {
  calories: 2400,
  protein: 160,
  carbs: 250,
  fat: 70
};

export const emptyTraining = (): Training => ({
  id: '',
  name: '',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
  exercises: []
});

export const createExercise = (name = '', category = 'Nogi', difficulty = 6): Exercise => ({
  id: crypto.randomUUID(),
  name,
  category,
  difficulty,
  series: [{ id: crypto.randomUUID(), reps: 8, weight: undefined }],
  load: 0,
  loadType: 'bodyweight',
  rpe: 7,
  notes: '',
  bodyweight: false,
  points: 0
});

export function getTotalReps(exercise: Exercise): number {
  return exercise.series.reduce((sum, set) => sum + (Number(set.reps) || 0), 0);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export function getVolume(exercise: Exercise): number {
  return exercise.series.reduce((total, set) => {
    const weight = Number(set.weight ?? 0);
    const reps = Number(set.reps ?? 0);
    return total + weight * reps;
  }, 0);
}

export function getWorkoutStats(trainings: Training[]) {
  const totalExercises = trainings.reduce((sum, training) => sum + training.exercises.length, 0);
  const totalSeries = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + exercise.series.length, 0), 0);
  const totalReps = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + getTotalReps(exercise), 0), 0);
  const totalVolume = trainings.reduce((sum, training) => sum + training.exercises.reduce((inner, exercise) => inner + getVolume(exercise), 0), 0);

  return { totalExercises, totalSeries, totalReps, totalVolume };
}

export const defaultNutritionEntries: NutritionEntry[] = [
  { id: 'n1', date: new Date().toISOString().slice(0, 10), mealName: 'Śniadanie', calories: 420, protein: 32, carbs: 42, fat: 15, notes: '', entryType: 'meal' },
  { id: 'n2', date: new Date().toISOString().slice(0, 10), mealName: 'Obiad', calories: 610, protein: 41, carbs: 56, fat: 18, notes: '', entryType: 'meal' }
];
