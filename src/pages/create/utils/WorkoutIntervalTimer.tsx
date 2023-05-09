import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { Box, Typography } from '@mui/material';
import { RoutineInterval } from '../hooks/useRoutineIntervalTimer';

export const WorkoutIntervalTimer = ({
  activeInterval,
  currentRep,
  currentRepBreak,
  currentSet,
  currentSetBreak,
  secondsLeft,
}: RoutineInterval) => {
  return (
    <CardContentContainer stackProps={{ spacing: 2 }}>
      <Typography variant="h2">Active Interval</Typography>

      <Typography variant="h5">{activeInterval.toLocaleUpperCase()}</Typography>

      <Typography variant="h5">Rep #: {currentRep}</Typography>
      <Typography variant="h5">Rep Break #: {currentRepBreak}</Typography>
      <Typography variant="h5">Set #: {currentSet}</Typography>
      <Typography variant="h5">Set Break #: {currentSetBreak}</Typography>

      <Box>
        <Typography variant="h5">
          Sec left: {Math.floor(secondsLeft)}
        </Typography>
      </Box>
    </CardContentContainer>
  );
};
