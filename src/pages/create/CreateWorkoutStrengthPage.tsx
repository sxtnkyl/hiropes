import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { strengthWorkouts } from '@/utils/workoutDetails';
import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { AbsAndShouldersSlidersForm } from './components/AbsAndShouldersSlidersForm';
import { BenchAndSquatSlidersForm } from './components/BenchAndSquatSlidersForm';
import {
  AbsAndShouldersWorkout,
  BenchAndSquatWorkout,
} from './types/createTypes';

export const CreateWorkoutStrengthPage = () => {
  const { activeWorkout } = useCurrentActiveWorkout();
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
