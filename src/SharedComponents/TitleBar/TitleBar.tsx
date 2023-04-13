import theme from '@/styles/theme';
import { Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';

const titleBarSx: SxProps = {
  width: '100%',
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
  boxShadow: theme.shadows[5],
};

interface TitleBarProps {
  leftActionItem: ReactNode;
  title: ReactNode;
  rightActionItem: ReactNode;
}

const TitleBar = ({
  leftActionItem,
  title,
  rightActionItem,
}: TitleBarProps) => {
  return (
    <Box id="title-bar" sx={titleBarSx}>
      {leftActionItem}
      {title}
      {rightActionItem}
    </Box>
  );
};

export default TitleBar;
