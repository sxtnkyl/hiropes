import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import {
  BenchAndSquatSlidersFormValues,
  BenchAndSquatWorkout,
  BenchAndSquatWorkoutNames,
} from '../types/createTypes';
import { BenchAndSquatSliderCard } from './BenchAndSquatSliderCard';

export const BenchAndSquatSlidersForm = ({
  workouts,
}: {
  workouts: BenchAndSquatWorkout;
}) => {
  const initialValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(workouts.workouts).map(([key, val]) => {
        const { name, defaultSets, ...rest } = val;
        return [key, rest];
      })
    ) as BenchAndSquatSlidersFormValues;
  }, [workouts.workouts]);

  const workoutCards = useMemo(() => {
    return Object.entries(workouts.workouts).map(
      ([workoutKey, workoutDetails]) => {
        return (
          <BenchAndSquatSliderCard
            key={workoutKey}
            workoutKey={workoutKey as BenchAndSquatWorkoutNames}
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
    <Formik<BenchAndSquatSlidersFormValues>
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
