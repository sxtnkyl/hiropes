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
export const WorkoutAssertions = {
  /** routine focus */
  endurance: 'Endurance',
  power: 'Power',
  fingerStrength: 'Finger Strength',
  /** routine focus workouts */
  // endurance
  sixBySix: '6x6',
  fourByFour: '4x4',
  thirtyCircuit: '30 Circuit',
  pyramidLong: 'Pyramid Long',
  // power
  twentyInTwenty: 'Twenty In Twenty',
  pyramidPump: 'Pyramid Pump',
  sevenThrees: '7-3s',
  // finger
  quickIntervalTest: 'Quick Interval Test',
  campus: 'Campus',
  oneArmPullUp: 'One Arm Pull Up',
  /** strength */
  benchAndSquat: 'Bench and Squat',
  absAndShoulders: 'Abs and Shoulders',
  // bench and squat
  bench: 'Bench',
  squat: 'Squat',
  singleLegSquat: 'Single Leg Squat',
  dips: 'Dips',
  // abs and shoulders
  hangingKneeRaises: 'Hanging Knee Raises',
  planche: 'Planche',
  overheadPress: 'Overhead Press',
  lateralToFrontRaises: 'Lateral To Front Raises',
  oneArmInvertedRow: 'One Arm Inverted Row',
} as const;

export type RoutineFocus = 'endurance' | 'power' | 'fingerStrength';
export type WorkoutStep =
  | 'start'
  | 'warmup'
  | 'project'
  | 'routine'
  | 'strength';

export type RouteDifficultyRangeSortType =
  | 'linear'
  | 'linear-invert'
  | 'pyramid'
  | 'pyramid-linear'
  | 'hangboard';
export type RepSetDataObject = {
  [key: string]: number;
};

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
  routeDifficultyRangeSortType: RouteDifficultyRangeSortType;
};

export type EnduranceWorkoutKeys =
  | 'sixBySix'
  | 'fourByFour'
  | 'thirtyCircuit'
  | 'pyramidLong';
export type PowerWorkoutKeys = 'twentyInTwenty' | 'pyramidPump' | 'sevenThrees';
export type FingerStrengthWorkoutKeys =
  | 'quickIntervalTest'
  | 'campus'
  | 'oneArmPullUp';
export type RoutineFocusWorkoutKeys =
  | EnduranceWorkoutKeys
  | PowerWorkoutKeys
  | FingerStrengthWorkoutKeys;
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
export type StrengthWorkoutGroup = 'benchAndSquat' | 'absAndShoulders';
export type BenchAndSquatWorkoutNames =
  | 'bench'
  | 'squat'
  | 'singleLegSquat'
  | 'dips';
export type AbsAndShouldersWorkoutNames =
  | 'hangingKneeRaises'
  | 'planche'
  | 'overheadPress'
  | 'lateralToFrontRaises'
  | 'oneArmInvertedRow';
export type StrengthWorkoutKeys =
  | BenchAndSquatWorkoutNames
  | AbsAndShouldersWorkoutNames;

export type StrengthWorkoutDetail = {
  name: string;
  defaultReps: number[];
  defaultSets: number;
  weight: number[];
};

export type StrengthName = { name: string };
export type BenchAndSquatWorkout = {
  workouts: { [key in BenchAndSquatWorkoutNames]: StrengthWorkoutDetail };
} & StrengthName;
export type AbsAndShouldersWorkout = {
  workouts: { [key in AbsAndShouldersWorkoutNames]: StrengthWorkoutDetail };
} & StrengthName;

export type StrengthWorkouts = {
  benchAndSquat: BenchAndSquatWorkout;
  absAndShoulders: AbsAndShouldersWorkout;
};

export type WorkoutFormValue = {
  defaultReps: number[];
  weight: number[];
};
export type BenchAndSquatSlidersFormValues = {
  [key in BenchAndSquatWorkoutNames]: WorkoutFormValue;
};
export type AbsAndShouldersSlidersFormValues = {
  [key in AbsAndShouldersWorkoutNames]: WorkoutFormValue;
};
export type SavedStrengthSliders = { [key: string]: WorkoutFormValue };

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
  strengthWorkout?: StrengthWorkoutGroup;
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
