import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { IconButton, Typography } from '@mui/material';

const HomeTrackingContent = () => {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h1">Progression Tracking</Typography>
      <MuiNextLink href={'/tracking'}>
        <IconButton>
          <QueryStatsIcon color="inherit" sx={{ fontSize: '3rem' }} />
        </IconButton>
      </MuiNextLink>
      <Typography variant="h5">
        Analyze and visualize your workout entries to track incremental progress
      </Typography>
    </CardContentContainer>
  );
};
export default HomeTrackingContent;
