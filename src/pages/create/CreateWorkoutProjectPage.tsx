import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import AddIcon from '@mui/icons-material/Add';
import HardwareIcon from '@mui/icons-material/Hardware';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export const CreateWorkoutProjectPage = () => {
  const router = useRouter();
  const { activeWorkout, setActiveWorkout } = useCurrentActiveWorkout();
  const { projects } = useActiveUser();

  const handleSelectedProjectChange = (event: SelectChangeEvent) => {
    const project = projects?.find((proj) => event.target.value === proj.id);
    project && setActiveWorkout((prevSesh) => ({ ...prevSesh, project }));
  };

  const handleCreateNewProjectClick = () => {
    router.push('/projects');
  };
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h2">Project Interval</Typography>
      <HardwareIcon sx={{ fontSize: '4rem' }} />
      <Typography variant="h5">
        Select or add a boulder below to begin a focused session. Attempts
        should be maximum effort, or focused on dialing in crux moves.
      </Typography>
      <Select
        value={activeWorkout?.project?.id ?? ''}
        onChange={handleSelectedProjectChange}
        sx={{ minWidth: '75%' }}
      >
        {projects?.map((proj) => (
          <MenuItem key={proj.name} value={proj.id}>
            {proj.name}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="outlined"
        onClick={handleCreateNewProjectClick}
        endIcon={<AddIcon />}
      >
        Create New Project
      </Button>
    </CardContentContainer>
  );
};
