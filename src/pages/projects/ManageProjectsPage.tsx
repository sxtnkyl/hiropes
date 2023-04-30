import { Project } from '@/API';
import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import UpdateIcon from '@mui/icons-material/Update';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { EditProjectForm } from './components/EditProjectForm';
import { createProjectFormValuesFromProject } from './utils/createProjectFormValuesFromProject';

export const ManageProjectsPage = () => {
  const { projects } = useActiveUser();

  const [selectedProject, setSelectedProject] = useState<Project>();

  const handleSelectChange = (event: SelectChangeEvent) => {
    const proj = projects?.find((proj) => proj?.id === event.target.value);
    proj && setSelectedProject(proj);
  };

  return (
    <Stack spacing={2}>
      <CardContentContainer sx={{ height: 'auto' }} stackProps={{ spacing: 4 }}>
        <Typography variant="h2">Manage Projects</Typography>
        <UpdateIcon sx={{ fontSize: '4rem' }} />
        <Typography variant="h5">
          Update a route from your project collection
        </Typography>
        {projects ? (
          <Select
            fullWidth
            value={selectedProject?.id ?? ''}
            onChange={handleSelectChange}
          >
            {projects.map((proj) => (
              <MenuItem key={proj.id} value={proj.id}>
                {proj.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="h5">you have no projects</Typography>
        )}
      </CardContentContainer>
      {selectedProject && (
        <EditProjectForm
          initialValues={createProjectFormValuesFromProject(selectedProject)}
        />
      )}
    </Stack>
  );
};
