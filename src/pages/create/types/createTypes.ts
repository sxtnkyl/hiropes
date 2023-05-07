import { Project } from '@/API';
import { GradeRange } from '@/pages/projects/types/projectTypes';

/**
 * TODO:
 * figure how to properly type the routineFocus/routineFocusWorkout
 * to allow access of the routineDetails object with
 * create workout context activeWorkout state like:
 * routineDetails[routineFocus][routineFocusWorkout]
 */

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
 * repInterval= time during rep (min),
 * repBreakInterval = break time between reps (min)
 * defaultSets = number of sets
 * setBreakInterval: break time between sets (min)
 * bottomRange: low end of rep
 * topRange: high end of rep
 */
export type WorkoutDetail = {
  name: string;
  description: string;
  defaultReps: number;
  repInterval: number;
  repBreakInterval: number;
  defaultSets: number;
  setBreakInterval: number;
  bottomRange: GradeRange;
  topRange: GradeRange;
};

// export type EnduranceWorkoutKeys =
//   | 'sixBySix'
//   | 'fourByFour'
//   | 'thirtyCircuit'
//   | 'pyramidLong';
// export type PowerWorkoutKeys = 'twentyInTwenty' | 'pyramidPump' | 'sevenThrees';
// export type FingerStrengthWorkoutKeys = 'tempFinger';

// export type EnduranceWorkouts = {
//   [K in EnduranceWorkoutKeys]: WorkoutDetail;
// };
// export type PowerWorkouts = {
//   [K in PowerWorkoutKeys]: WorkoutDetail;
// };
// export type FingerStrengthWorkouts = {
//   [K in FingerStrengthWorkoutKeys]: WorkoutDetail;
// };

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
// export type RoutineFocusWorkout<T = RoutineFocus> =
//   NonNullable<T> extends 'endurance'
//     ? EnduranceWorkoutKeys
//     : NonNullable<T> extends 'power'
//     ? PowerWorkoutKeys
//     : NonNullable<T> extends 'power' ?
//     FingerStrengthWorkoutKeys : undefined;

export interface WorkoutSession {
  routineFocus?: RoutineFocus;
  // routineFocusWorkout?: Extract<RoutineFocus, WorkoutSession['routineFocus']>;
  routineFocusWorkout?: string;
  strengthWorkout?: StrengthWorkout;
  project?: Project;
}

export type RoutineWorkoutsLookupObject = {
  // [key in RoutineFocus]: {
  //   [key in NonNullable<WorkoutSession['routineFocusWorkout']>]: WorkoutDetail;
  // };
  [key in RoutineFocus]: {
    [key: string]: WorkoutDetail;
  };
};
