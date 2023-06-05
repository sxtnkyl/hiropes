import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { strengthWorkouts } from '@/utils/workoutDetails';
import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { AbsAndShouldersSlidersForm } from './components/AbsAndShouldersSlidersForm';
import { BenchAndSquatSlidersForm } from './components/BenchAndSquatSlidersForm';
import {
  AbsAndShouldersWorkout,
  BenchAndSquatWorkout,
} from './types/createTypes';

export const CreateWorkoutStrengthPage = () => {
  const { activeWorkout, pauseTimer, resumeTimer, timerIsPaused } =
    useCurrentActiveWorkout();
  const { strengthWorkout } = activeWorkout;

  const strengthWorkoutDetails = useMemo(() => {
    if (strengthWorkout) {
      return strengthWorkouts[strengthWorkout];
    }
  }, [strengthWorkout]);

  const isBenchAndSquatAndHasData = useMemo(() => {
    return strengthWorkout === 'benchAndSquat' && strengthWorkoutDetails;
  }, [strengthWorkout, strengthWorkoutDetails]);
  const isAbsAndShouldersAndHasData = useMemo(() => {
    return strengthWorkout === 'absAndShoulders' && strengthWorkoutDetails;
  }, [strengthWorkout, strengthWorkoutDetails]);

  return (
    <Stack spacing={2}>
      <CardContentContainer stackProps={{ spacing: 6 }}>
        <Typography variant="h2" fontWeight="bold">
          {strengthWorkoutDetails?.name ?? ''}
        </Typography>

        <PauseResumeButton
          paused={timerIsPaused}
          resumeAction={resumeTimer}
          resumeText="Resume Workout"
          pauseAction={pauseTimer}
          pauseText="Pause Workout"
        />
      </CardContentContainer>

      {isBenchAndSquatAndHasData && (
        <BenchAndSquatSlidersForm
          workouts={strengthWorkoutDetails as BenchAndSquatWorkout}
        />
      )}
      {isAbsAndShouldersAndHasData && (
        <AbsAndShouldersSlidersForm
          workouts={strengthWorkoutDetails as AbsAndShouldersWorkout}
        />
      )}
    </Stack>
  );
};
