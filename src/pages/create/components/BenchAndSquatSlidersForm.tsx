import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import {
  SubmissionStatus,
  SubmitButton,
} from '@/SharedComponents/SubmitButton/SubmitButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, Stack, Typography } from '@mui/material';
import { Form, Formik, useFormikContext } from 'formik';
import _ from 'lodash';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useSubmitWorkout } from '../hooks/useSubmitWorkout';
import {
  BenchAndSquatSlidersFormValues,
  BenchAndSquatWorkout,
  BenchAndSquatWorkoutNames,
} from '../types/createTypes';
import { BenchAndSquatSliderCard } from './BenchAndSquatSliderCard';

export const BenchAndSquatSlidersForm = ({
  loading,
  children,
}: {
  loading: SubmissionStatus;
  children: ReactNode;
}) => {
  const {
    pauseTimer,
    resumeTimer,
    timerIsPaused,
    pomoTimer,
    setPomoTimer,
    strengthWorkoutEstimatedCompletionTimeInSeconds,
    setStrengthWorkoutEstimatedCompletionTimeInSeconds,
    setSavedStrengthSliders,
  } = useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();
  const { values, initialValues, resetForm } =
    useFormikContext<BenchAndSquatSlidersFormValues>();

  const [strengthWorkoutHasStarted, setStrengthWorkoutHasStarted] =
    useState<boolean>(false);

  const formValuesAreEqual = useMemo(() => {
    return _.isEqual(values, initialValues);
  }, [values, initialValues]);

  const formEstimatedCompletionTimeInSeconds = useMemo(() => {
    return Object.entries(values).reduce((a, [, details]) => {
      return a + details.defaultReps.reduce((a, b) => a + b) * 15;
    }, 0);
  }, [values]);

  const { minutes: completionMinutes, seconds: completionSeconds } =
    formattedSecondsToMinuteSeconds(formEstimatedCompletionTimeInSeconds);

  const handleResumeButtonClick = useCallback(() => {
    if (!strengthWorkoutHasStarted) {
      setStrengthWorkoutHasStarted(true);
    }
    resumeTimer();
  }, [resumeTimer, strengthWorkoutHasStarted]);

  const handleResetWorkoutClick = useCallback(() => {
    setSavedStrengthSliders(undefined);
    setStrengthWorkoutEstimatedCompletionTimeInSeconds(undefined);
    setPomoTimer(0);
    setStrengthWorkoutHasStarted(false);
    resetForm();
  }, [
    resetForm,
    setPomoTimer,
    setSavedStrengthSliders,
    setStrengthWorkoutEstimatedCompletionTimeInSeconds,
  ]);

  useEffect(() => {
    if (!strengthWorkoutHasStarted) {
      setStrengthWorkoutEstimatedCompletionTimeInSeconds(
        formEstimatedCompletionTimeInSeconds
      );
      setPomoTimer(formEstimatedCompletionTimeInSeconds);
    }
  }, [
    formEstimatedCompletionTimeInSeconds,
    formattedSecondsToMinuteSeconds,
    pomoTimer,
    setPomoTimer,
    setStrengthWorkoutEstimatedCompletionTimeInSeconds,
    strengthWorkoutEstimatedCompletionTimeInSeconds,
    strengthWorkoutHasStarted,
  ]);

  return (
    <Form>
      <Stack spacing={3}>
        <CardContentContainer stackProps={{ spacing: 6 }}>
          <LoadingOverlay loading={loading === 'pending'} />
          <Typography variant="h2" fontWeight="bold">
            Bench And Squat
          </Typography>

          <Typography variant="h5" fontStyle="italic">
            Use the remaining time to complete the following strength workouts.
            Estimated time calculated according to 10 seconds per rep.
          </Typography>

          <Stack>
            <Typography variant="h6" fontWeight="bold">
              Estimated Completion Time
            </Typography>
            <Typography variant="h5" fontStyle="italic">
              {completionMinutes} M: {completionSeconds} S
            </Typography>
          </Stack>

          {!formValuesAreEqual && (
            <Button
              fullWidth
              variant="outlined"
              endIcon={<RestartAltIcon />}
              onClick={handleResetWorkoutClick}
            >
              Reset Workouts
            </Button>
          )}

          <PauseResumeButton
            paused={timerIsPaused}
            resumeAction={handleResumeButtonClick}
            resumeText="Resume Workout"
            pauseAction={pauseTimer}
            pauseText="Pause Workout"
          />
          <SubmitButton
            status={loading}
            submitText="end workout"
            badgeProps={{
              sx: { width: '100%' },
            }}
            buttonProps={{
              variant: 'contained',
              type: 'submit',
            }}
          />
        </CardContentContainer>

        {children}
      </Stack>
    </Form>
  );
};

export const BenchAndSquatSlidersFormWrapper = ({
  workouts,
}: {
  workouts: BenchAndSquatWorkout;
}) => {
  const { savedStrengthSliders, setSavedStrengthSliders } =
    useCurrentActiveWorkout();
  const { onSubmit, loading } = useSubmitWorkout();

  const initialValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(workouts.workouts).map(([key, val]) => {
        const { name, defaultSets, ...rest } = val;
        return [key, rest];
      })
    ) as BenchAndSquatSlidersFormValues;
  }, [workouts.workouts]);

  useEffect(() => {
    if (!savedStrengthSliders) {
      setSavedStrengthSliders(initialValues);
    }
  }, [initialValues, savedStrengthSliders, setSavedStrengthSliders]);

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

  return (
    <Formik<BenchAndSquatSlidersFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <BenchAndSquatSlidersForm loading={loading}>
        {workoutCards}
      </BenchAndSquatSlidersForm>
    </Formik>
  );
};
