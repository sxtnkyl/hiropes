import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import theme from '@/styles/theme';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';

const HomeCreateContent = () => {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h1">New Workout</Typography>
      <MuiNextLink
        href="/create"
        sx={{
          padding: '0.5rem',
          background: theme.palette.secondary.main,
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
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
