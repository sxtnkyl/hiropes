import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import UpdateIcon from '@mui/icons-material/Update';
import { Typography } from '@mui/material';

export const ManageProjectsPage = () => {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h2">Create Project</Typography>
      <UpdateIcon sx={{ fontSize: '4rem' }} />
      <Typography variant="h5">
        Update a route from your project collection
      </Typography>
    </CardContentContainer>
  );
};
