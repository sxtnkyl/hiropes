import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { SkipButton } from '@/SharedComponents/SkipButton/SkipButton';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import AddIcon from '@mui/icons-material/Add';
import HardwareIcon from '@mui/icons-material/Hardware';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CreateNewProjectForm } from '../projects/components/CreateProjectForm';
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
    setPomoTimer,
    pauseTimer,
    resumeTimer,
    timerIsPaused,
  } = useCurrentActiveWorkout();

  const [hasCreateNewProjectSection, setHasCreateNewProjectSection] =
    useState<boolean>(false);

  const projectOptions = useMemo(() => {
    return projects?.map((proj) => (
      <MenuItem key={proj.id} value={proj.id}>
        {proj.name}
      </MenuItem>
    ));
  }, [projects]);

  const handleSelectedProjectChange = useCallback(
    (event: SelectChangeEvent) => {
      setHasCreateNewProjectSection(false);
      const project = projects?.find((proj) => event.target.value === proj.id);
      project && setActiveWorkout((prevSesh) => ({ ...prevSesh, project }));
    },
    [projects, setActiveWorkout]
  );

  const endProjectStep = useCallback(() => {
    setWorkoutStepsCompleted((prev) => [...prev, 'project']);
    setActiveWorkoutStep('routine');
    setActiveStepTimer('routine');
    setPomoTimer(0);
  }, [
    setActiveStepTimer,
    setActiveWorkoutStep,
    setPomoTimer,
    setWorkoutStepsCompleted,
  ]);

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
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setHasCreateNewProjectSection(true)}
          endIcon={<AddIcon />}
          disabled={hasCreateNewProjectSection}
        >
          create new project
        </Button>
      </CardContentContainer>
      {hasCreateNewProjectSection && <CreateNewProjectForm />}
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
