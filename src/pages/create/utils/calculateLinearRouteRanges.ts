import { GradeRange } from '@/pages/projects/types/projectTypes';
import { gradeRanges } from '@/pages/projects/utils/projectValues';

export const calculateLinearRouteRanges = ({
  bottomRange,
  topRange,
  numberOfRoutes,
}: {
  bottomRange: GradeRange;
  topRange: GradeRange;
  numberOfRoutes: number;
}): number[] => {
  const bottomRangeValue = gradeRanges.indexOf(bottomRange) * 2;
  const topRangeValue = gradeRanges.indexOf(topRange) * 2 + 2;
  const stepValue = (topRangeValue - bottomRangeValue) / (numberOfRoutes - 1);

  const routeValuesArray = new Array(numberOfRoutes);
  routeValuesArray[0] = bottomRangeValue;

  for (let i = 1; i < numberOfRoutes; i++) {
    routeValuesArray[i] = routeValuesArray[i - 1] + stepValue;
  }

  routeValuesArray.forEach(
    (val, idx) => (routeValuesArray[idx] = Math.round(val))
  );
  return routeValuesArray;
};
