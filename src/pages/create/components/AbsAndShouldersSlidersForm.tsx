import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import {
  AbsAndShouldersSlidersFormValues,
  AbsAndShouldersWorkout,
  AbsAndShouldersWorkoutNames,
} from '../types/createTypes';
import { AbsAndShouldersSliderCard } from './AbsAndShouldersSliderCard';

export const AbsAndShouldersSlidersForm = ({
  workouts,
}: {
  workouts: AbsAndShouldersWorkout;
}) => {
  const initialValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(workouts.workouts).map(([key, val]) => {
        const { name, defaultSets, ...rest } = val;
        return [key, rest];
      })
    ) as AbsAndShouldersSlidersFormValues;
  }, [workouts.workouts]);

  const workoutCards = useMemo(() => {
    return Object.entries(workouts.workouts).map(
      ([workoutKey, workoutDetails]) => {
        return (
          <AbsAndShouldersSliderCard
            key={workoutKey}
            workoutKey={workoutKey as AbsAndShouldersWorkoutNames}
            workoutDetails={workoutDetails}
          />
        );
      }
    );
  }, [workouts.workouts]);

  const onSubmit = useCallback(() => {
    return undefined;
  }, []);

  return (
    <Formik<AbsAndShouldersSlidersFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <Stack spacing={3}>{workoutCards}</Stack>
        </Form>
      )}
    </Formik>
  );
};
