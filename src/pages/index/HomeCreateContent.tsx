import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';

const HomeCreateContent = () => {
  return (
    <CardContentContainer>
      <Typography variant="h1">Create New Workout</Typography>
      <MuiNextLink href={'/create'} sx={{ margin: '2rem 0' }}>
        <IconButton>
          <AddIcon color="inherit" sx={{ fontSize: '3rem' }} />
        </IconButton>
      </MuiNextLink>
      <Typography variant="h5">
        Choose an endurance, power, or finger strength focused workout session,
        structured around a 2-hour interval
      </Typography>
    </CardContentContainer>
  );
};
export default HomeCreateContent;
