import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import HardwareIcon from '@mui/icons-material/Hardware';

import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { SkipButton } from '@/SharedComponents/SkipButton/SkipButton';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { EditProjectForm } from '../projects/components/EditProjectForm';
import { createProjectFormValuesFromProject } from '../projects/utils/createProjectFormValuesFromProject';

export const CreateWorkoutProjectPage = () => {
  const { projects } = useActiveUser();
  const {
    activeWorkout,
    setActiveWorkout,
    setWorkoutStepsCompleted,
    setActiveWorkoutStep,
    setActiveStepTimer,
    pomoTimer,
    pauseTimer,
    resumeTimer,
    timerIsPaused,
  } = useCurrentActiveWorkout();

  const projectOptions = useMemo(() => {
    return projects?.map((proj) => (
      <MenuItem key={proj.id} value={proj.id}>
        {proj.name}
      </MenuItem>
    ));
  }, [projects]);

  const handleSelectedProjectChange = useCallback(
    (event: SelectChangeEvent) => {
      const project = projects?.find((proj) => event.target.value === proj.id);
      project && setActiveWorkout((prevSesh) => ({ ...prevSesh, project }));
    },
    [projects, setActiveWorkout]
  );

  const endProjectStep = useCallback(() => {
    setWorkoutStepsCompleted((prev) => [...prev, 'project']);
    setActiveWorkoutStep('routine');
    setActiveStepTimer('routine');
    // TODO: determine timer from selected routine
    // setPomoTimer(hoursToSeconds(0.025));
  }, [setActiveStepTimer, setActiveWorkoutStep, setWorkoutStepsCompleted]);

  const handleDeleteProjectClick = () => {
    pauseTimer();
    setActiveWorkout((prev) => ({ ...prev, project: undefined }));
  };

  useEffect(() => {
    if (pomoTimer === 0) {
      endProjectStep();
    }
  }, [endProjectStep, pomoTimer]);

  return (
    <Stack spacing={2}>
      <CardContentContainer stackProps={{ spacing: 4 }}>
        <Typography variant="h2">Project Interval</Typography>
        <HardwareIcon sx={{ fontSize: '4rem' }} />
        <Typography variant="h5">
          Select or add a boulder below to begin a focused session. Attempts
          should be maximum effort, or focused on dialing in crux moves.
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Select a project...</InputLabel>
          <Select
            fullWidth
            value={activeWorkout?.project?.id ?? ''}
            onChange={handleSelectedProjectChange}
            label="Select a project..."
          >
            {projectOptions}
          </Select>
        </FormControl>
        {activeWorkout.project && (
          <PauseResumeButton
            paused={timerIsPaused}
            resumeAction={resumeTimer}
            resumeText="Resume Project"
            pauseAction={pauseTimer}
            pauseText="Pause Project"
          />
        )}
        <SkipButton
          onClick={endProjectStep}
          buttonText="skip project"
          disabled={!activeWorkout.project}
        />
      </CardContentContainer>
      {activeWorkout.project && (
        <EditProjectForm
          initialValues={createProjectFormValuesFromProject(
            activeWorkout.project
          )}
          onDeleteCallback={handleDeleteProjectClick}
        />
      )}
    </Stack>
  );
};
