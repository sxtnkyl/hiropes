import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import {
  IntervalType,
  RoutineInterval,
} from '../hooks/useRoutineIntervalTimer';
import { WorkoutDetail } from '../types/createTypes';

const StBox = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 1rem;
`;

export const WorkoutIntervalTimer = ({
  routineInterval,
  workoutDetail,
}: {
  routineInterval: RoutineInterval;
  workoutDetail: WorkoutDetail;
}) => {
  const {
    activeInterval,
    currentRep,
    currentRepBreak,
    currentSet,
    currentSetBreak,
    secondsLeft,
    routineIsInProgress,
  } = routineInterval;
  const { defaultReps, defaultSets } = workoutDetail;
  const highlightActiveInterval = useCallback(
    (intervalType: IntervalType) => {
      return intervalType === activeInterval
        ? theme.palette.secondary.main
        : theme.palette.primary.main;
    },
    [activeInterval]
  );

  return (
    <CardContentContainer stackProps={{ spacing: 2 }}>
      <Typography variant="h2" fontWeight="bold">
        {routineIsInProgress
          ? activeInterval.toLocaleUpperCase()
          : 'Active Interval'}
      </Typography>

      <Stack width="100%" spacing={2}>
        <Box justifyContent="center">
          <Typography variant="h5" fontStyle="italic" mb="1rem">
            Seconds Remaining
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {Math.floor(secondsLeft)}
          </Typography>
        </Box>
        <StBox color={highlightActiveInterval('rep')}>
          <Typography display="inline" variant="h5" fontStyle="italic">
            Rep #
          </Typography>
          <Typography display="inline" variant="h5">
            {currentRep} / {defaultReps}
          </Typography>
        </StBox>
        <StBox color={highlightActiveInterval('repBreak')}>
          <Typography variant="h5" fontStyle="italic">
            Rep Break #
          </Typography>
          <Typography variant="h5">{currentRepBreak}</Typography>
        </StBox>
        <StBox color={highlightActiveInterval('set')}>
          <Typography variant="h5" fontStyle="italic">
            Set #
          </Typography>
          <Typography variant="h5">
            {currentSet} / {defaultSets}
          </Typography>
        </StBox>
        <StBox color={highlightActiveInterval('setBreak')}>
          <Typography variant="h5" fontStyle="italic">
            Set Break #
          </Typography>
          <Typography variant="h5">{currentSetBreak}</Typography>
        </StBox>
      </Stack>
    </CardContentContainer>
  );
};
