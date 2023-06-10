import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { SkipButton } from '@/SharedComponents/SkipButton/SkipButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { Button, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import {
  AbsAndShouldersSlidersFormValues,
  AbsAndShouldersWorkout,
  AbsAndShouldersWorkoutNames,
  SavedStrengthSliders,
} from '../types/createTypes';
import { AbsAndShouldersSliderCard } from './AbsAndShouldersSliderCard';

export const AbsAndShouldersSlidersForm = ({
  workouts,
}: {
  workouts: AbsAndShouldersWorkout;
}) => {
  const {
    pauseTimer,
    resumeTimer,
    timerIsPaused,
    pomoTimer,
    strengthWorkoutEstimatedCompletionTimeInSeconds,
    setStrengthWorkoutEstimatedCompletionTimeInSeconds,
    savedStrengthSliders,
    setSavedStrengthSliders,
    setPomoTimer,
    setWorkoutStepsCompleted,
  } = useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();

  const initialValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(savedStrengthSliders ?? workouts.workouts).map(
        ([key, val]) => {
          const { name, defaultSets, ...rest } = val;
          return [key, rest];
        }
      )
    ) as AbsAndShouldersSlidersFormValues;
  }, [savedStrengthSliders, workouts.workouts]);

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

  const endStrengthStep = useCallback(() => {
    setWorkoutStepsCompleted((prev) => [...prev, 'strength']);
    // submit workout
  }, [setWorkoutStepsCompleted]);

  const updateTimerIfNotStarted = useCallback(
    (formTime: number) => {
      if (!strengthWorkoutEstimatedCompletionTimeInSeconds) {
        setStrengthWorkoutEstimatedCompletionTimeInSeconds(formTime);
        setPomoTimer(formTime);
      }
    },
    [
      setPomoTimer,
      setStrengthWorkoutEstimatedCompletionTimeInSeconds,
      strengthWorkoutEstimatedCompletionTimeInSeconds,
    ]
  );

  const updateEstimatedTimeAndPomoTimer = useCallback(
    (newTime: number, values: AbsAndShouldersSlidersFormValues) => {
      const timerHasCountdown =
        strengthWorkoutEstimatedCompletionTimeInSeconds &&
        pomoTimer < strengthWorkoutEstimatedCompletionTimeInSeconds;

      setPomoTimer((prev) =>
        !timerHasCountdown || newTime < pomoTimer ? newTime : prev
      );
      setStrengthWorkoutEstimatedCompletionTimeInSeconds(newTime);
      setSavedStrengthSliders(values as unknown as SavedStrengthSliders);
    },
    [
      pomoTimer,
      setPomoTimer,
      setSavedStrengthSliders,
      setStrengthWorkoutEstimatedCompletionTimeInSeconds,
      strengthWorkoutEstimatedCompletionTimeInSeconds,
    ]
  );

  const canUpdateStrengthWorkoutEstimatedCompletionTimeInSeconds = useCallback(
    (formTime: number) => {
      return strengthWorkoutEstimatedCompletionTimeInSeconds !== formTime;
    },
    [strengthWorkoutEstimatedCompletionTimeInSeconds]
  );

  const resetFormSliders = useCallback(
    (formTime: number) => {
      setSavedStrengthSliders(undefined);
      setStrengthWorkoutEstimatedCompletionTimeInSeconds(undefined);
      setPomoTimer(formTime);
    },
    [
      setPomoTimer,
      setSavedStrengthSliders,
      setStrengthWorkoutEstimatedCompletionTimeInSeconds,
    ]
  );

  return (
    <Formik<AbsAndShouldersSlidersFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values }) => {
        const formEstimatedCompletionTimeInSeconds = Object.entries(
          values
        ).reduce((a, [, details]) => {
          return a + details.defaultReps.reduce((a, b) => a + b) * 15;
        }, 0);
        const { minutes: completionMinutes, seconds: completionSeconds } =
          formattedSecondsToMinuteSeconds(formEstimatedCompletionTimeInSeconds);
        setTimeout(() => {
          updateTimerIfNotStarted(formEstimatedCompletionTimeInSeconds);
        }, 0);

        return (
          <Form>
            <Stack spacing={3}>
              <CardContentContainer stackProps={{ spacing: 6 }}>
                <Typography variant="h2" fontWeight="bold">
                  {workouts.name}
                </Typography>

                <Typography variant="h5" fontStyle="italic">
                  Use the remaining time to complete the following strength
                  workouts. Estimated time calculated according to 10 seconds
                  per rep.
                </Typography>

                <Stack>
                  <Typography variant="h6" fontWeight="bold">
                    Estimated Completion Time
                  </Typography>
                  <Typography variant="h5" fontStyle="italic">
                    {completionMinutes} M: {completionSeconds} S
                  </Typography>
                </Stack>

                {canUpdateStrengthWorkoutEstimatedCompletionTimeInSeconds(
                  formEstimatedCompletionTimeInSeconds
                ) && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      updateEstimatedTimeAndPomoTimer(
                        formEstimatedCompletionTimeInSeconds,
                        values
                      )
                    }
                  >
                    Update Timer
                  </Button>
                )}

                {savedStrengthSliders && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      resetFormSliders(formEstimatedCompletionTimeInSeconds)
                    }
                  >
                    Reset Workouts
                  </Button>
                )}

                <PauseResumeButton
                  paused={timerIsPaused}
                  resumeAction={resumeTimer}
                  resumeText="Resume Workout"
                  pauseAction={pauseTimer}
                  pauseText="Pause Workout"
                />
                <SkipButton
                  onClick={endStrengthStep}
                  buttonText="end workout"
                />
              </CardContentContainer>

              {workoutCards}
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
