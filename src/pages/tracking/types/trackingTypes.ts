import {
  RepSetDataObject,
  RoutineFocus,
  SavedStrengthSliders,
  StrengthWorkoutGroup,
} from '@/pages/create/types/createTypes';

export type ViewEditWorkoutCardFormValues = {
  id: string;
  routineFocus: RoutineFocus;
  routineFocusWorkout: string;
  routineWorkoutData: RepSetDataObject;
  strengthWorkout: StrengthWorkoutGroup;
  strengthWorkoutData: SavedStrengthSliders;
  workoutProjectId: string;
};
