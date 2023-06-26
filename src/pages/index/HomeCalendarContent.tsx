import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import theme from '@/styles/theme';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton, Typography } from '@mui/material';

const HomeCalendarContent = () => {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h1">Workout Calendar</Typography>
      <MuiNextLink
        href="/calendar"
        sx={{
          padding: '0.5rem',
          background: theme.palette.secondary.main,
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <IconButton>
          <EditCalendarIcon
            color="inherit"
            sx={{
              fontSize: '3rem',
            }}
          />
        </IconButton>
      </MuiNextLink>
      <Typography variant="h5">
        Check your workout progress through a calendar view, to track workout
        frequency
      </Typography>
    </CardContentContainer>
  );
};
export default HomeCalendarContent;
