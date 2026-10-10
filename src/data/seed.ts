import type { LibraryExercise, NutritionEntry, SportGoal, Training } from '../types';

const STORAGE_KEYS = {
  trainings: 'fitness-tracker-trainings',
  library: 'fitness-tracker-library',
  nutrition: 'fitness-tracker-nutrition',
  goals: 'fitness-tracker-sport-goals',
  customGoals: 'fitness-tracker-custom-goals',
  nutritionGoals: 'fitness-tracker-nutrition-goals'
};

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Błąd zapisu do localStorage');
  }
}

export function exportAllData() {
  const payload = {
    trainings: readStorage<Training[]>(STORAGE_KEYS.trainings, []),
    library: readStorage<LibraryExercise[]>(STORAGE_KEYS.library, []),
    nutrition: readStorage<NutritionEntry[]>(STORAGE_KEYS.nutrition, []),
    goals: readStorage<SportGoal[]>(STORAGE_KEYS.goals, []),
    customGoals: readStorage<any[]>(STORAGE_KEYS.customGoals, []),
    nutritionGoals: readStorage<any>(STORAGE_KEYS.nutritionGoals, null)
  };

  return JSON.stringify(payload, null, 2);
}

export function importAllData(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object') return false;
    writeStorage(STORAGE_KEYS.trainings, parsed.trainings ?? []);
    writeStorage(STORAGE_KEYS.library, parsed.library ?? []);
    writeStorage(STORAGE_KEYS.nutrition, parsed.nutrition ?? []);
    writeStorage(STORAGE_KEYS.goals, parsed.goals ?? []);
    writeStorage(STORAGE_KEYS.customGoals, parsed.customGoals ?? []);
    writeStorage(STORAGE_KEYS.nutritionGoals, parsed.nutritionGoals ?? null);
    return true;
  } catch {
    return false;
  }
}

export function clearAppData() {
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
}
