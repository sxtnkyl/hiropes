import theme from '@/styles/theme';
import { Tabs, TabsProps } from '@mui/material';

const TopActionTabBar = ({ sx, children, ...rest }: TabsProps) => {
  return (
    <Tabs
      id="top-action-tab-bar"
      centered
      variant="fullWidth"
      sx={{ margin: '1rem 0', boxShadow: theme.shadows[1], ...sx }}
      {...rest}
    >
      {children}
    </Tabs>
  );
};

export default TopActionTabBar;
