import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { routineDetails, strengthWorkouts } from '@/utils/workoutDetails';
import { Button, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { NewWorkoutSetup } from './index.page';
import { RoutineOption, StrengthOption } from './types/createTypes';

const CreateWorkoutStartPage = ({
  newWorkoutSetup,
  setNewWorkoutSetup,
  setActiveTab,
  workoutSetupIsComplete,
}: {
  newWorkoutSetup: NewWorkoutSetup;
  setNewWorkoutSetup: Dispatch<SetStateAction<NewWorkoutSetup>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  workoutSetupIsComplete: boolean;
}) => {
  const handleRoutineOptionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineOption = event.currentTarget.value as RoutineOption;
      setNewWorkoutSetup(({ strengthOption }) => ({
        strengthOption,
        routineOption,
      }));
    },
    [setNewWorkoutSetup]
  );

  const handleRoutineOptionWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const routineOptionWorkout = event.currentTarget
        .value as NewWorkoutSetup['routineOption'];
      setNewWorkoutSetup((prevSesh) => ({
        ...prevSesh,
        routineOptionWorkout,
      }));
    },
    [setNewWorkoutSetup]
  );

  const handleStrengthWorkoutClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const strengthOption = event.currentTarget.value as StrengthOption;
      setNewWorkoutSetup((prevSesh) => ({
        ...prevSesh,
        strengthOption,
      }));
    },
    [setNewWorkoutSetup]
  );

  const routineTypeOptionsButtons = useMemo(() => {
    return Object.keys(routineDetails).map((routine) => (
      <Button
        key={routine}
        value={routine}
        onClick={handleRoutineOptionClick}
        variant={
          routine === newWorkoutSetup.routineOption ? 'contained' : 'outlined'
        }
      >
        {routine}
      </Button>
    ));
  }, [handleRoutineOptionClick, newWorkoutSetup.routineOption]);

  const routineOptionWorkoutsButtons = useMemo(() => {
    if (newWorkoutSetup.routineOption) {
      const selectedRoutineWorkouts = Object.entries(
        routineDetails[newWorkoutSetup.routineOption]
      );
      return selectedRoutineWorkouts.map(([workoutName, workoutDetails]) => (
        <Button
          key={workoutName}
          value={workoutName}
          onClick={handleRoutineOptionWorkoutClick}
          variant={
            workoutName === newWorkoutSetup.routineOptionWorkout
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
    newWorkoutSetup.routineOption,
    newWorkoutSetup.routineOptionWorkout,
  ]);

  const strengthWorkoutOptionsButtons = useMemo(() => {
    if (newWorkoutSetup.routineOptionWorkout) {
      return Object.entries(strengthWorkouts).map(
        ([workout, workoutDetails]) => (
          <Button
            key={workout}
            value={workout}
            onClick={handleStrengthWorkoutClick}
            variant={
              workout === newWorkoutSetup.strengthOption
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
    newWorkoutSetup.routineOptionWorkout,
    newWorkoutSetup.strengthOption,
  ]);

  return (
    <Stack spacing={2}>
      <CardContentContainer sx={{ height: 'auto' }} stackProps={{ spacing: 2 }}>
        <Typography variant="h4">Select a routine type:</Typography>
        <Stack spacing={1}>{routineTypeOptionsButtons}</Stack>
      </CardContentContainer>

      {newWorkoutSetup.routineOption && (
        <CardContentContainer
          sx={{ height: 'auto' }}
          stackProps={{ spacing: 2 }}
        >
          <Typography variant="h4">Select a routine option:</Typography>
          <Stack spacing={1}>{routineOptionWorkoutsButtons}</Stack>
        </CardContentContainer>
      )}

      {newWorkoutSetup.routineOptionWorkout && (
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
          <Button
            variant="outlined"
            onClick={() => {
              setActiveTab('warmup');
            }}
          >
            Start
          </Button>
        </CardContentContainer>
      )}
    </Stack>
  );
};

export default CreateWorkoutStartPage;
