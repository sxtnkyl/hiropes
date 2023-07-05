import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { routineDetails, strengthWorkouts } from '@/utils/workoutDetails';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import {
  RoutineFocus,
  RoutineFocusWorkoutKeys,
  StrengthWorkoutGroup,
  WorkoutAssertions,
} from './types/createTypes';

const CreateWorkoutStartPage = () => {
  const {
    activeWorkout,
    setActiveStepTimer,
    setWorkoutInProgress,
    setActiveWorkout,
    setActiveWorkoutStep,
    setWorkoutStepsCompleted,
    setPomoTimer,
    resumeTimer,
  } = useCurrentActiveWorkout();
  const { hoursToSeconds } = timeConverters();

  const handleStartWorkoutClick = () => {
    setWorkoutInProgress(true);
    setWorkoutStepsCompleted(['start']);
    setActiveStepTimer('warmup');
    setActiveWorkoutStep('warmup');
    setPomoTimer(hoursToSeconds(0.25));
    resumeTimer();
  };

  const handleRoutineFocusClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineFocus = event.currentTarget.value as RoutineFocus;
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        routineFocus,
        routineFocusWorkout: undefined,
      }));
    },
    [setActiveWorkout]
  );

  const handleRoutineFocusWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineFocusWorkout = event.currentTarget.value;
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        routineFocusWorkout,
      }));
    },
    [setActiveWorkout]
  );

  const handleStrengthWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const strengthWorkout = event.currentTarget.value as StrengthWorkoutGroup;
      setActiveWorkout((prevSesh) => ({
        ...prevSesh,
        strengthWorkout,
      }));
    },
    [setActiveWorkout]
  );

  const routineFocusButtons = useMemo(() => {
    return Object.keys(routineDetails).map((routine) => (
      <Button
        key={routine}
        value={routine}
        onClick={handleRoutineFocusClick}
        variant={
          routine === activeWorkout.routineFocus ? 'contained' : 'outlined'
        }
      >
        {WorkoutAssertions[routine as RoutineFocus]}
      </Button>
    ));
  }, [handleRoutineFocusClick, activeWorkout.routineFocus]);

  const routineFocusWorkoutsButtons = useMemo(() => {
    if (activeWorkout.routineFocus) {
      const selectedRoutineWorkouts = Object.keys(
        routineDetails[activeWorkout.routineFocus]
      );
      return selectedRoutineWorkouts.map((workoutName) => (
        <Button
          key={workoutName}
          value={workoutName}
          onClick={handleRoutineFocusWorkoutClick}
          variant={
            workoutName === activeWorkout.routineFocusWorkout
              ? 'contained'
              : 'outlined'
          }
        >
          {WorkoutAssertions[workoutName as RoutineFocusWorkoutKeys]}
        </Button>
      ));
    }
  }, [
    activeWorkout.routineFocus,
    activeWorkout.routineFocusWorkout,
    handleRoutineFocusWorkoutClick,
  ]);

  const strengthWorkoutButtons = useMemo(() => {
    if (activeWorkout.routineFocusWorkout) {
      return Object.keys(strengthWorkouts).map((workout) => (
        <Button
          key={workout}
          value={workout}
          onClick={handleStrengthWorkoutClick}
          variant={
            workout === activeWorkout.strengthWorkout ? 'contained' : 'outlined'
          }
        >
          {WorkoutAssertions[workout as StrengthWorkoutGroup]}
        </Button>
      ));
    }
  }, [
    handleStrengthWorkoutClick,
    activeWorkout.routineFocusWorkout,
    activeWorkout.strengthWorkout,
  ]);

  const workoutSetupIsComplete = useMemo(() => {
    const setupValues = [
      activeWorkout.routineFocus,
      activeWorkout.routineFocusWorkout,
      activeWorkout.strengthWorkout,
    ];
    return setupValues.every((val) => Boolean(val));
  }, [
    activeWorkout.routineFocus,
    activeWorkout.routineFocusWorkout,
    activeWorkout.strengthWorkout,
  ]);

  return (
    <Stack spacing={2}>
      {workoutSetupIsComplete && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Begin this session:</Typography>
          <Stack spacing={1} minWidth="75%">
            <Button
              variant="contained"
              onClick={handleStartWorkoutClick}
              color="secondary"
            >
              Start
            </Button>
          </Stack>
        </CardContentContainer>
      )}

      {activeWorkout.routineFocusWorkout && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a strength type:</Typography>
          <Stack spacing={1} minWidth="75%">
            {strengthWorkoutButtons}
          </Stack>
        </CardContentContainer>
      )}

      {activeWorkout.routineFocus && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a routine option:</Typography>
          <Stack spacing={1} minWidth="75%">
            {routineFocusWorkoutsButtons}
          </Stack>
        </CardContentContainer>
      )}

      <CardContentContainer sx={{ height: 'auto' }} stackProps={{ spacing: 2 }}>
        <Typography variant="h4">Select a routine type:</Typography>
        <Stack spacing={1} minWidth="75%">
          {routineFocusButtons}
        </Stack>
      </CardContentContainer>
    </Stack>
  );
};

export default CreateWorkoutStartPage;
