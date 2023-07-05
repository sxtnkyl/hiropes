import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { GradeRange } from '@/pages/projects/types/projectTypes';
import { useMemo } from 'react';
import { RepSetDataObject } from '../types/createTypes';
import { calculateLinearPyramidRouteRanges } from '../utils/calculateLinearPyramidRouteRanges';
import { calculateLinearRouteRanges } from '../utils/calculateLinearRouteRanges';
import { calculatePyramidRouteRanges } from '../utils/calculatePyramidRouteRanges';
import { formatRouteNumberToSetRep } from '../utils/formatRouteNumberToSetRep';

export interface CustomRouteRangeProps {
  bottomRange: GradeRange;
  topRange: GradeRange;
}
export interface UseCustomRouteRanges {
  initialValues: RepSetDataObject;
}

/**
 *
 * @returns RepSetDataObject key as 'set-rep'
 * ex. {'1-1': 8, '1-2': 9}
 */
export const useCustomRouteRanges = ({
  bottomRange,
  topRange,
}: CustomRouteRangeProps): UseCustomRouteRanges => {
  const { focusWorkoutDetails } = useCurrentActiveWorkout();
  const { routeDifficultyRangeSortType } = focusWorkoutDetails;

  const numberOfRoutes = useMemo(() => {
    return focusWorkoutDetails.defaultReps * focusWorkoutDetails.defaultSets;
  }, [focusWorkoutDetails.defaultReps, focusWorkoutDetails.defaultSets]);

  const linearRouteRanges = calculateLinearRouteRanges({
    topRange,
    bottomRange,
    numberOfRoutes,
  });

  const linearPyramidRanges = calculateLinearPyramidRouteRanges({
    topRange,
    bottomRange,
  });

  const customDifficultyRanges = useMemo(() => {
    switch (routeDifficultyRangeSortType) {
      case 'linear-invert':
        return linearRouteRanges.reverse();
      case 'pyramid':
        return calculatePyramidRouteRanges(linearRouteRanges);
      case 'pyramid-linear':
        return linearPyramidRanges;
      case 'hangboard':
        return linearRouteRanges;
      // case linear
      default:
        return linearRouteRanges;
    }
  }, [linearPyramidRanges, linearRouteRanges, routeDifficultyRangeSortType]);

  const initialValues = useMemo(() => {
    let obj = {};
    customDifficultyRanges.forEach((value, idx) => {
      const setRep = formatRouteNumberToSetRep({
        routeNumber: idx,
        defaultSets: focusWorkoutDetails?.defaultSets,
        defaultReps: focusWorkoutDetails?.defaultReps,
      });
      const objKey = setRep ? `${setRep.set}-${setRep.rep}` : idx;
      obj = { ...obj, [objKey]: value };
    });
    return obj;
  }, [
    customDifficultyRanges,
    focusWorkoutDetails?.defaultReps,
    focusWorkoutDetails?.defaultSets,
  ]);

  return { initialValues };
};
