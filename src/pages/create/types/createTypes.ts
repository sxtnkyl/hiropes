import { Project } from '@/API';
import { GradeRange } from '@/pages/projects/types/projectTypes';

/** Workout Session */
export type RoutineOption = 'endurance' | 'power' | 'fingerStrength';
export type StrengthOption = 'benchAndSquat' | 'absAndShoulders' | 'cardio';
export type WorkoutStep =
  | 'start'
  | 'warmup'
  | 'project'
  | 'routine'
  | 'strength';

export interface WorkoutSession {
  routineOption?: RoutineOption;
  routineOptionWorkout?: WorkoutSession['routineOption'];
  strengthOption?: StrengthOption;
  project?: Project;
}

/**
 * defaultReps = amount per set
 * defaultSets = group of reps
 * breakInterval: time between sets (min)
 * bottomRange: low end of rep
 * topRange: high end of rep
 */
export type WorkoutDetail = {
  name: string;
  description: string;
  defaultReps: number;
  defaultSets: number;
  breakInterval: number;
  bottomRange: GradeRange;
  topRange: GradeRange;
};

export type RoutineOptions = {
  endurance: EnduranceOptions;
  power: PowerOptions;
  fingerStrength: FingerStrengthOptions;
};

export type EnduranceOptions = {
  [K in EnduranceWorkoutKeys]: RoutineWorkout;
};
export type PowerOptions = {
  [K in PowerWorkoutKeys]: RoutineWorkout;
};
export type FingerStrengthOptions = {
  [K in FingerStrengthWorkoutKeys]: RoutineWorkout;
};

export type RoutineWorkout = {
  name: string;
  description: string;
  defaultReps: number;
  repBreakInterval: number;
  defaultSets: number;
  setBreakInterval: number;
  bottomRange: GradeRange;
  topRange: GradeRange;
};

export type EnduranceWorkoutKeys =
  | 'sixBySix'
  | 'fourByFour'
  | 'thirtyCircuit'
  | 'pyramidLong';
export type PowerWorkoutKeys = 'twentyInTwenty' | 'pyramidPump' | 'sevenThrees';
export type FingerStrengthWorkoutKeys = 'tempFinger';

/**
 * Strength Workout Types
 */
export type StrengthOptions = {
  benchAndSquat: BenchAndSquatWorkout;
  absAndShoulders: AbsAndShouldersWorkout;
  cardio: CardioWorkout;
};
export type StrengthWorkout = { name: string };
export type BenchAndSquatWorkout = { weight: number } & StrengthWorkout;
export type AbsAndShouldersWorkout = { reps: number } & StrengthWorkout;
export type CardioWorkout = { distance: number } & StrengthWorkout;
