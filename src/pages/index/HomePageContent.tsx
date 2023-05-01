import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import HikingIcon from '@mui/icons-material/Hiking';
import { Typography } from '@mui/material';

const HomePageContent = () => {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h1">Hiropes Climbing</Typography>
      <HikingIcon sx={{ fontSize: '5rem' }} />
      <Typography variant="h1">Regimin Tool</Typography>
    </CardContentContainer>
  );
};
export default HomePageContent;
