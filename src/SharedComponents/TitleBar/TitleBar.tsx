import theme from '@/styles/theme';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton, SxProps } from '@mui/material';
import Link from 'next/link';

const titleBarSx: SxProps = {
  width: '100%',
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
  boxShadow: theme.shadows[5],
};

const TitleBar = () => {
  return (
    <Box id="title-bar" sx={titleBarSx}>
      <IconButton aria-label="menu">
        <MenuOpenIcon />
      </IconButton>
      <span>TITLE</span>
      <Link href={'/profile'}>
        <IconButton aria-label="profile">
          <AccountBoxIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default TitleBar;
