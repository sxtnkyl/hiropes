import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { RoutineRangePanel } from './components/RoutineRangePanel';
import { WorkoutIntervalTimer } from './components/WorkoutIntervalTimer';
import { useRoutineIntervalTimer } from './hooks/useRoutineIntervalTimer';

export const CreateWorkoutRoutinePage = () => {
  const { focusWorkoutDetails, savedRoutineInterval, resumeTimer, pauseTimer } =
    useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();

  const routineInterval = useRoutineIntervalTimer({
    ...(savedRoutineInterval ?? focusWorkoutDetails),
  });

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
      <CardContentContainer stackProps={{ spacing: 6 }}>
        <Typography variant="h2" fontWeight="bold">
          {focusWorkoutDetails.name}
        </Typography>
        <Typography variant="h5" fontStyle="italic">
          {focusWorkoutDetails.description}
        </Typography>

        <Stack>
          <Typography variant="h6" fontWeight="bold">
            Estimated Completion Time
          </Typography>
          <Typography variant="h5" fontStyle="italic">
            {completionMinutes} M: {completionSeconds} S
          </Typography>
        </Stack>

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

      {focusWorkoutDetails && (
        <RoutineRangePanel routineInterval={routineInterval} />
      )}
    </Stack>
  );
};
