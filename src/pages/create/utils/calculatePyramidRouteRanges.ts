export const calculatePyramidRouteRanges = (array: number[]) => {
  array.sort();
  const largestNumber = array.pop();
  const frontHalf = array.filter((_, idx) => idx % 2 === 0);
  const backHalf = array.filter((_, idx) => idx % 2 !== 0);

  const sortedList = [...frontHalf, largestNumber, ...backHalf.reverse()];
  return sortedList;
};
