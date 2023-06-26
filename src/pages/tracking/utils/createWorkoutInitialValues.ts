import { UpdateWorkoutInput } from '@/API';
import {
  RoutineFocus,
  StrengthWorkoutGroup,
} from '@/pages/create/types/createTypes';
import { ViewEditWorkoutCardFormValues } from '../types/trackingTypes';

export const createWorkoutInitialValues = (
  workout: UpdateWorkoutInput
): ViewEditWorkoutCardFormValues => {
  return {
    id: workout.id,
    routineFocus: workout?.routineFocus as RoutineFocus,
    routineFocusWorkout: workout?.routineFocusWorkout ?? '',
    routineWorkoutData: JSON.parse(workout?.routineWorkoutData ?? '{}'),
    strengthWorkout: workout?.strengthWorkout as StrengthWorkoutGroup,
    strengthWorkoutData: JSON.parse(workout?.strengthWorkoutData ?? '{}'),
    workoutProjectId: workout?.workoutProjectId ?? '',
  };
};
