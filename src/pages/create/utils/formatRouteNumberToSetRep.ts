export const formatRouteNumberToSetRep = ({
  routeNumber,
  defaultSets,
  defaultReps,
}: {
  routeNumber: number;
  defaultSets?: number;
  defaultReps?: number;
}): { set: number; rep: number } | null => {
  if (defaultSets && defaultReps) {
    const set = Math.floor(routeNumber / defaultReps) + 1;
    const rep = (routeNumber % defaultReps) + 1;
    return { set, rep };
  }
  return null;
};
