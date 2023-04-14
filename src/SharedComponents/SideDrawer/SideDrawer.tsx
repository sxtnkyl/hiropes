import theme from '@/styles/theme';
import CloseIcon from '@mui/icons-material/Close';
import HikingIcon from '@mui/icons-material/Hiking';
import {
  Box,
  Drawer,
  DrawerProps,
  IconButton,
  Typography,
} from '@mui/material';

interface SideDrawerProps extends Omit<DrawerProps, 'onClose'> {
  id?: string;
  onClose: () => void;
}
const SideDrawer = ({
  id = 'side-drawer',
  onClose,
  children,
  ...rest
}: SideDrawerProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer anchor="left" onClose={handleClose} {...rest}>
      <Box
        id={id}
        sx={{
          padding: '1rem 0.5rem',
          boxShadow: theme.shadows[1],
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <HikingIcon />
          <Typography variant="h3">Hiropes</Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};

export default SideDrawer;
