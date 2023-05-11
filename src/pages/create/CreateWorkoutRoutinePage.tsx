import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { GradeRange } from '../projects/types/projectTypes';
import { routeGradeSelectItems } from '../projects/utils/projectValues';
import { useRoutineIntervalTimer } from './hooks/useRoutineIntervalTimer';
import { WorkoutIntervalTimer } from './utils/WorkoutIntervalTimer';

export const CreateWorkoutRoutinePage = () => {
  const { focusWorkoutDetails, savedRoutineInterval, resumeTimer, pauseTimer } =
    useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();

  const { name, description, bottomRange, topRange } = focusWorkoutDetails;

  const routineInterval = useRoutineIntervalTimer({
    ...(savedRoutineInterval ?? focusWorkoutDetails),
  });

  const [bottomGradeRangeValue, setBottomGradeRangeValue] =
    useState<GradeRange>(bottomRange);
  const [topGradeRangeValue, setTopGradeRangeValue] =
    useState<GradeRange>(topRange);

  const handleResumeRoutineTimer = () => {
    routineInterval.setRoutineIsInProgress(true);
    resumeTimer();
  };
  const handlePauseRoutineTimer = () => {
    routineInterval.setRoutineIsInProgress(false);
    pauseTimer();
  };

  const estimatedRoutineCompletionTimeSeconds = useMemo(() => {
    if (focusWorkoutDetails) {
      const {
        defaultReps,
        repInterval,
        defaultSets,
        repBreakInterval,
        setBreakInterval,
      } = focusWorkoutDetails;
      return (
        repInterval * defaultReps +
        defaultReps * repBreakInterval +
        defaultSets * setBreakInterval
      );
    } else {
      return 0;
    }
  }, [focusWorkoutDetails]);
  const { minutes: completionMinutes, seconds: completionSeconds } =
    formattedSecondsToMinuteSeconds(estimatedRoutineCompletionTimeSeconds);

  return (
    <Stack spacing={2}>
      <CardContentContainer stackProps={{ spacing: 4 }}>
        <Typography variant="h2" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="h5" fontStyle="italic">
          {description}
        </Typography>

        <PauseResumeButton
          paused={!routineInterval.routineIsInProgress}
          resumeAction={handleResumeRoutineTimer}
          resumeText={
            savedRoutineInterval ? 'Continue Workout' : 'Start Workout'
          }
          pauseAction={handlePauseRoutineTimer}
          pauseText="Pause Workout"
        />
      </CardContentContainer>

      <WorkoutIntervalTimer
        routineInterval={routineInterval}
        workoutDetail={focusWorkoutDetails}
      />

      <CardContentContainer stackProps={{ spacing: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          Estimated Completion Time
        </Typography>
        <Typography variant="h5" fontStyle="italic">
          {completionMinutes} M: {completionSeconds} S
        </Typography>
      </CardContentContainer>

      <CardContentContainer stackProps={{ spacing: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          Difficulty Ranges
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Lower Difficulty Range</InputLabel>
          <Select
            fullWidth
            value={bottomGradeRangeValue}
            onChange={(e) =>
              setBottomGradeRangeValue(e.target.value as GradeRange)
            }
            label="Lower Difficulty Range"
          >
            {routeGradeSelectItems}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Upper Difficulty Range</InputLabel>
          <Select
            fullWidth
            value={topGradeRangeValue}
            onChange={(e) =>
              setTopGradeRangeValue(e.target.value as GradeRange)
            }
            label="Upper Difficulty Range"
          >
            {routeGradeSelectItems}
          </Select>
        </FormControl>
      </CardContentContainer>
    </Stack>
  );
};
