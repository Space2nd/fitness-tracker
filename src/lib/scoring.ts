export type LoadType = 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'other';
export type NutritionEntryType = 'meal' | 'daily';

export type WorkoutSet = {
  id: string;
  reps: number;
  weight?: number;
  notes?: string;
};

export type Exercise = {
  id: string;
  name: string;
  category: string;
  difficulty: number;
  series: WorkoutSet[];
  load?: number;
  loadType?: LoadType;
  rpe?: number;
  notes?: string;
  bodyweight?: boolean;
  points?: number;
};

export type Training = {
  id: string;
  name: string;
  date: string;
  notes: string;
  exercises: Exercise[];
};

export type LibraryExercise = {
  id: string;
  name: string;
  category: string;
  defaultDifficulty: number;
  usuallyUsesLoad: boolean;
  favorite: boolean;
  tags: string[];
};

export type GoalStatus = 'active' | 'completed' | 'paused';

export type SportGoal = {
  id: string;
  name: string;
  discipline: string;
  description: string;
  areas: string[];
  progression: number;
  lastUpdated: string;
  level: string;
  trainingsSupporting: number;
  target: number;
  current: number;
  status: GoalStatus;
};

export type CustomGoal = {
  id: string;
  name: string;
  category: string;
  initialValue: number;
  targetValue: number;
  unit: string;
  deadline?: string;
  linkedExercises: string[];
  currentProgress: number;
  status: GoalStatus;
};

export type NutritionEntry = {
  id: string;
  date: string;
  mealName?: string;
  calories: number;
  protein: number;
  carbs?: number;
  fat?: number;
  notes?: string;
  entryType: NutritionEntryType;
};

export type NutritionGoals = {
  calories: number;
  protein: number;
  carbs?: number;
  fat?: number;
};

export type DailySummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type WorkoutScore = {
  exercisePoints: number;
  trainingPoints: number;
};

export type ExerciseInsight = {
  name: string;
  score: number;
  category: string;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
};
