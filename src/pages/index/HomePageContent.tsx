import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import HikingIcon from '@mui/icons-material/Hiking';
import { Typography } from '@mui/material';

const HomePageContent = () => {
  return (
    <CardContentContainer>
      <Typography variant="h1">Hiropes Climbing</Typography>
      <HikingIcon sx={{ fontSize: '5rem', margin: '2rem 0' }} />
      <Typography variant="h1">Regimin Tool</Typography>
    </CardContentContainer>
  );
};
export default HomePageContent;
