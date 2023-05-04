import { Project } from '@/API';
import { GradeRange } from '@/pages/projects/types/projectTypes';

/** Workout Session */
export type RoutineFocus = 'endurance' | 'power' | 'fingerStrength';
export type WorkoutStep =
  | 'start'
  | 'warmup'
  | 'project'
  | 'routine'
  | 'strength';

/**
 * defaultReps = amount of reps per set
 * repBreakInterval = break time between reps
 * defaultSets = number of sets
 * setBreakInterval: break time between sets
 * bottomRange: low end of rep
 * topRange: high end of rep
 */
export type WorkoutDetail = {
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

export type EnduranceWorkouts = {
  [K in EnduranceWorkoutKeys]: WorkoutDetail;
};
export type PowerWorkouts = {
  [K in PowerWorkoutKeys]: WorkoutDetail;
};
export type FingerStrengthWorkouts = {
  [K in FingerStrengthWorkoutKeys]: WorkoutDetail;
};

export type RoutineWorkoutsLookupObject = {
  endurance: EnduranceWorkouts;
  power: PowerWorkouts;
  fingerStrength: FingerStrengthWorkouts;
};

/**
 * Strength Workout Types
 */
export type StrengthWorkout = 'benchAndSquat' | 'absAndShoulders' | 'cardio';

export type StrengthWorkouts = {
  benchAndSquat: BenchAndSquatWorkout;
  absAndShoulders: AbsAndShouldersWorkout;
  cardio: CardioWorkout;
};
export type StrengthWorkoutBase = { name: string };
export type BenchAndSquatWorkout = { weight: number } & StrengthWorkoutBase;
export type AbsAndShouldersWorkout = { reps: number } & StrengthWorkoutBase;
export type CardioWorkout = { distance: number } & StrengthWorkoutBase;

/** State */
export interface WorkoutSession {
  routineFocus?: RoutineFocus;
  routineFocusWorkout?: WorkoutSession['routineFocus'];
  strengthWorkout?: StrengthWorkout;
  project?: Project;
}
