import { GradeRange } from '@/pages/projects/types/projectTypes';
import { gradeRanges } from '@/pages/projects/utils/projectValues';

/**
 * creates an array of integers with the lowest range value having 5 occurrences and the highest value having 1 occurrence
 */
export const calculateLinearPyramidRouteRanges = ({
  bottomRange,
  topRange,
  distribution = [5, 4, 3, 2, 1],
}: {
  bottomRange: GradeRange;
  topRange: GradeRange;
  distribution?: number[];
}): number[] => {
  const firstRangeValue = gradeRanges.indexOf(topRange) * 2 + 2;
  const fifthRangeValue = gradeRanges.indexOf(bottomRange) * 2;
  const thirdRangeValue = firstRangeValue - Math.floor(firstRangeValue / 2);
  const fourthRangeValue =
    thirdRangeValue - Math.floor((thirdRangeValue - fifthRangeValue) / 2);
  const secondRangeValue =
    firstRangeValue - Math.round((firstRangeValue - thirdRangeValue) / 2);

  const rangeValues = [
    fifthRangeValue,
    fourthRangeValue,
    thirdRangeValue,
    secondRangeValue,
    firstRangeValue,
  ];

  const array: number[] = [];
  rangeValues.forEach((value, index) => {
    array.push(...Array(distribution[index]).fill(value));
  });
  return array;
};
