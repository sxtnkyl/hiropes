import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import theme from '@/styles/theme';
import Refresh from '@mui/icons-material/Refresh';
import { IconButton, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h1">Not Found</Typography>
      <MuiNextLink
        href="/"
        sx={{
          padding: '0.5rem',
          background: theme.palette.secondary.main,
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <IconButton>
          <Refresh
            color="inherit"
            sx={{
              fontSize: '3rem',
            }}
          />
        </IconButton>
      </MuiNextLink>
      <Typography variant="h5">
        Uh oh. Could not find the requested resource. Click above to try again.
      </Typography>
    </CardContentContainer>
  );
}
