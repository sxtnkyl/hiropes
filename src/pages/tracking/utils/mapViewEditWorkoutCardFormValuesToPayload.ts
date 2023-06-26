import { UpdateWorkoutInput } from '@/API';
import { ViewEditWorkoutCardFormValues } from '../types/trackingTypes';
export const mapViewEditWorkoutCardFormValuesToPayload = (
  values: ViewEditWorkoutCardFormValues
): UpdateWorkoutInput => {
  const { routineWorkoutData, strengthWorkoutData, ...rest } = values;
  return {
    routineWorkoutData: JSON.stringify(routineWorkoutData),
    strengthWorkoutData: JSON.stringify(strengthWorkoutData),
    ...rest,
  };
};
