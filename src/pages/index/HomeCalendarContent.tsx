import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton, Typography } from '@mui/material';

const HomeCalendarContent = () => {
  return (
    <CardContentContainer>
      <Typography variant="h1">Workout Calendar</Typography>
      <MuiNextLink href={'/calendar'} sx={{ margin: '2rem 0' }}>
        <IconButton>
          <EditCalendarIcon color="inherit" sx={{ fontSize: '3rem' }} />
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
