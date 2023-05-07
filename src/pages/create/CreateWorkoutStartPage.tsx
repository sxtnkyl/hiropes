import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { routineDetails, strengthWorkouts } from '@/utils/workoutDetails';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { RoutineFocus, StrengthWorkout } from './types/createTypes';

const CreateWorkoutStartPage = () => {
  const {
    activeWorkout,
    workoutSetupIsComplete,
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
    setPomoTimer(hoursToSeconds(0.004));
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
      const strengthWorkout = event.currentTarget.value as StrengthWorkout;
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
        {routine}
      </Button>
    ));
  }, [handleRoutineFocusClick, activeWorkout.routineFocus]);

  const routineFocusWorkoutsButtons = useMemo(() => {
    if (activeWorkout.routineFocus) {
      const selectedRoutineWorkouts = Object.entries(
        routineDetails[activeWorkout.routineFocus]
      );
      return selectedRoutineWorkouts.map(([workoutName, workoutDetails]) => (
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
          {workoutDetails.name}
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
      return Object.entries(strengthWorkouts).map(
        ([workout, workoutDetails]) => (
          <Button
            key={workout}
            value={workout}
            onClick={handleStrengthWorkoutClick}
            variant={
              workout === activeWorkout.strengthWorkout
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
    activeWorkout.routineFocusWorkout,
    activeWorkout.strengthWorkout,
  ]);

  return (
    <Stack spacing={2}>
      <CardContentContainer sx={{ height: 'auto' }} stackProps={{ spacing: 2 }}>
        <Typography variant="h4">Select a routine type:</Typography>
        <Stack spacing={1}>{routineFocusButtons}</Stack>
      </CardContentContainer>

      {activeWorkout.routineFocus && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a routine option:</Typography>
          <Stack spacing={1}>{routineFocusWorkoutsButtons}</Stack>
        </CardContentContainer>
      )}

      {activeWorkout.routineFocusWorkout && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a strength type:</Typography>
          <Stack spacing={1}>{strengthWorkoutButtons}</Stack>
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
