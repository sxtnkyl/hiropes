import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
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
import { ProjectRoute } from '../projects/types/projectTypes';

const tempProjData: ProjectRoute[] = [
  { id: '1', name: 'proj1' },
  { id: '2', name: 'proj2' },
  { id: '3', name: 'proj3' },
];

export const CreateWorkoutProjectPage = () => {
  const router = useRouter();
  const { activeWorkout, setActiveWorkout } = useCurrentActiveWorkout();

  const handleSelectedProjectChange = (event: SelectChangeEvent) => {
    const project = tempProjData.find((proj) => event.target.value === proj.id);
    setActiveWorkout((prevSesh) => ({ ...prevSesh, project }));
  };

  const handleCreateNewProjectClick = () => {
    router.push('/projects');
  };
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h2">Project Interval</Typography>
      <HardwareIcon sx={{ fontSize: '4rem' }} />
      <Typography variant="h5">
        Select or add a boulder below to begin a focused session. Attemps should
        be maximum effort, or focused on dialing in crux moves.
      </Typography>
      <Select
        value={activeWorkout?.project?.id ?? ''}
        onChange={handleSelectedProjectChange}
        sx={{ minWidth: '75%' }}
      >
        {tempProjData.map((proj) => (
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
