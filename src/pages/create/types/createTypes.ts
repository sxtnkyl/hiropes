/**
 * Fetched Workout
 */
export type RoutineOption = 'endurance' | 'power' | 'fingerStrength';
export type StrengthOption = 'benchAndSquat' | 'absAndShoulders' | 'cardio';
export type WorkoutSession = {
  id: string;
  date: Date;
  project: ProjectRoute;
  routineOption: RoutineOption;
  routineFocus: RoutineOptions[WorkoutSession['routineOption']];
  strengthOption: StrengthOption;
};

/**
 * Project Info Types
 *
 */
export type GradeRange = '0-2' | '2-4' | '4-6' | '6-8' | '8-10' | '10+';
export type WallSection = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'other';
export type RouteColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'black'
  | 'orange'
  | 'purple'
  | 'other';

export type ProjectRoute = {
  section: WallSection;
  color: RouteColor;
  grade: GradeRange;
  sessionCount: number;
  imageUrl?: string;
  description?: string;
};

/**
 * Create Workout Types
 */

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
  defaultSets: number;
  breakInterval: number;
  bottomRange: GradeRange;
  topRange: GradeRange;
};

export type EnduranceWorkoutKeys =
  | 'sixBySix'
  | 'fourByFour'
  | 'thirtyCircuit'
  | 'pyramidLong';
export type PowerWorkoutKeys = 'tempPower';
export type FingerStrengthWorkoutKeys = 'tempFinger';

/**
 * Strenght Workout Types
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
