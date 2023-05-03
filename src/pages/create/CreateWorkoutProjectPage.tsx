import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import AddIcon from '@mui/icons-material/Add';
import HardwareIcon from '@mui/icons-material/Hardware';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
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
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { EditProjectForm } from '../projects/components/EditProjectForm';
import { createProjectFormValuesFromProject } from '../projects/utils/createProjectFormValuesFromProject';

export const CreateWorkoutProjectPage = () => {
  const router = useRouter();
  const { projects } = useActiveUser();
  const { activeWorkout, setActiveWorkout, pauseTimer, resumeTimer } =
    useCurrentActiveWorkout();

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

  const handleCreateNewProjectClick = () => {
    router.push('/projects');
  };
  const handleDeleteProjectClick = () => {
    pauseTimer();
    setActiveWorkout((prev) => ({ ...prev, project: undefined }));
  };
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
          <Button
            variant="outlined"
            onClick={resumeTimer}
            endIcon={<PlayCircleOutlineIcon />}
            fullWidth
          >
            Begin Project Session
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={handleCreateNewProjectClick}
          endIcon={<AddIcon />}
          fullWidth
        >
          Create New Project
        </Button>
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
