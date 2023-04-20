import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { routineDetails, strengthWorkouts } from '@/utils/workoutDetails';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import {
  RoutineOption,
  StrengthOption,
  WorkoutSession,
} from './types/createTypes';

const CreateWorkoutStartPage = () => {
  const {
    activeWorkout,
    workoutSetupIsComplete,
    setActiveWorkout,
    setWorkoutInProgress,
    setActiveWorkoutStep,
    updateCompletedSteps,
    setPomoTimer,
    resumeTimer,
  } = useCurrentActiveWorkout();
  const { hoursToSeconds } = timeConverters();

  const handleStartWorkoutClick = () => {
    setWorkoutInProgress(true);
    updateCompletedSteps('start');
    setActiveWorkout((prevSesh) => ({
      ...prevSesh,
      activeStepTimer: 'warmup',
    }));
    setActiveWorkoutStep('warmup');
    setPomoTimer(hoursToSeconds(0.004));
    resumeTimer();
  };

  const handleRoutineOptionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineOption = event.currentTarget.value as RoutineOption;
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        routineOption,
        routineOptionWorkout: undefined,
      }));
    },
    [setActiveWorkout]
  );

  const handleRoutineOptionWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineOptionWorkout = event.currentTarget
        .value as WorkoutSession['routineOption'];
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        routineOptionWorkout,
      }));
    },
    [setActiveWorkout]
  );

  const handleStrengthWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const strengthOption = event.currentTarget.value as StrengthOption;
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        strengthOption,
      }));
    },
    [setActiveWorkout]
  );

  const routineTypeOptionsButtons = useMemo(() => {
    return Object.keys(routineDetails).map((routine) => (
      <Button
        key={routine}
        value={routine}
        onClick={handleRoutineOptionClick}
        variant={
          routine === activeWorkout.routineOption ? 'contained' : 'outlined'
        }
      >
        {routine}
      </Button>
    ));
  }, [handleRoutineOptionClick, activeWorkout.routineOption]);

  const routineOptionWorkoutsButtons = useMemo(() => {
    if (activeWorkout.routineOption) {
      const selectedRoutineWorkouts = Object.entries(
        routineDetails[activeWorkout.routineOption]
      );
      return selectedRoutineWorkouts.map(([workoutName, workoutDetails]) => (
        <Button
          key={workoutName}
          value={workoutName}
          onClick={handleRoutineOptionWorkoutClick}
          variant={
            workoutName === activeWorkout.routineOptionWorkout
              ? 'contained'
              : 'outlined'
          }
        >
          {workoutDetails.name}
        </Button>
      ));
    }
  }, [
    handleRoutineOptionWorkoutClick,
    activeWorkout.routineOption,
    activeWorkout.routineOptionWorkout,
  ]);

  const strengthWorkoutOptionsButtons = useMemo(() => {
    if (activeWorkout.routineOptionWorkout) {
      return Object.entries(strengthWorkouts).map(
        ([workout, workoutDetails]) => (
          <Button
            key={workout}
            value={workout}
            onClick={handleStrengthWorkoutClick}
            variant={
              workout === activeWorkout.strengthOption
                ? 'contained'
                : 'outlined'
            }
          >
            {workoutDetails.name}
          </Button>
        )
      );
    }
  }, [
    handleStrengthWorkoutClick,
    activeWorkout.routineOptionWorkout,
    activeWorkout.strengthOption,
  ]);

  return (
    <Stack spacing={2}>
      <CardContentContainer sx={{ height: 'auto' }} stackProps={{ spacing: 2 }}>
        <Typography variant="h4">Select a routine type:</Typography>
        <Stack spacing={1}>{routineTypeOptionsButtons}</Stack>
      </CardContentContainer>

      {activeWorkout.routineOption && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a routine option:</Typography>
          <Stack spacing={1}>{routineOptionWorkoutsButtons}</Stack>
        </CardContentContainer>
      )}

      {activeWorkout.routineOptionWorkout && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a strength type:</Typography>
          <Stack spacing={1}>{strengthWorkoutOptionsButtons}</Stack>
        </CardContentContainer>
      )}

      {workoutSetupIsComplete && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Begin this session:</Typography>
          <Button variant="outlined" onClick={handleStartWorkoutClick}>
            Start
          </Button>
        </CardContentContainer>
      )}
    </Stack>
  );
};

export default CreateWorkoutStartPage;
