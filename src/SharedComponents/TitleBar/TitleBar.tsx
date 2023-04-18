import { AppBar, SxProps, Toolbar } from '@mui/material';
import { ReactNode } from 'react';

const titleBarSx: SxProps = {
  width: '100%',
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
    <AppBar position="sticky" sx={{ height: '5rem', marginBottom: '0.5rem' }}>
      <Toolbar sx={titleBarSx}>
        {leftActionItem}
        {title}
        {rightActionItem}
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
