import theme from '@/styles/theme';
import { Tabs, TabsProps } from '@mui/material';

const TopActionTabBar = ({ sx, children, ...rest }: TabsProps) => {
  return (
    <Tabs
      id="top-action-tab-bar"
      variant="fullWidth"
      textColor="secondary"
      sx={{ borderBottom: `1px solid ${theme.palette.primary.light}`, ...sx }}
      {...rest}
    >
      {children}
    </Tabs>
  );
};

export default TopActionTabBar;
