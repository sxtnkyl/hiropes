import SideDrawer from '@/SharedComponents/SideDrawer/SideDrawer';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ReactNode } from 'react';

const StListItemIcon = styled(ListItemIcon)`
  align-items: center;
`;
const StListItemText = styled(ListItemText)`
  padding-left: 1rem;
  text-transform: uppercase;
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { isGlobalSideNavOpen, setIsGlobalSideNavOpen } = useGlobalSideNav();

  return (
    <>
      <SideDrawer
        open={isGlobalSideNavOpen}
        onClose={() => setIsGlobalSideNavOpen(false)}
        PaperProps={{ sx: { width: '80%' } }}
      >
        <List>
          <ListItem key="new workout" divider>
            <ListItemButton>
              <StListItemIcon>
                <FitnessCenterIcon />
                <StListItemText primary="new workout" />
              </StListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key="calendar" divider>
            <ListItemButton>
              <StListItemIcon>
                <CalendarTodayIcon />
                <StListItemText primary="calendar" />
              </StListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key="tracking" divider>
            <ListItemButton>
              <StListItemIcon>
                <InsightsIcon />
                <StListItemText primary="tracking" />
              </StListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key="settings" divider>
            <ListItemButton>
              <StListItemIcon>
                <ManageAccountsIcon />
                <StListItemText primary="settings" />
              </StListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </SideDrawer>
      {children}
    </>
  );
};
export default Layout;
