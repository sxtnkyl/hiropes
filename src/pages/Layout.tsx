import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';
import SideDrawer from '@/SharedComponents/SideDrawer/SideDrawer';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HardwareIcon from '@mui/icons-material/Hardware';
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

  const closeSideNav = () => {
    setIsGlobalSideNavOpen(false);
  };

  return (
    <>
      <SideDrawer
        open={isGlobalSideNavOpen}
        onClose={closeSideNav}
        PaperProps={{ sx: { width: '80%' } }}
      >
        <List>
          <ListItem key="new workout" divider>
            <MuiNextLink
              href="/create"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <FitnessCenterIcon />
                  <StListItemText primary="new workout" />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
          </ListItem>
          <ListItem key="calendar" divider>
            <MuiNextLink
              href="/calendar"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <CalendarTodayIcon />
                  <StListItemText primary="calendar" />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
          </ListItem>
          <ListItem key="tracking" divider>
            <MuiNextLink
              href="/tracking"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <InsightsIcon />
                  <StListItemText primary="tracking" />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
          </ListItem>
          <ListItem key="projects" divider>
            <MuiNextLink
              href="/projects"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <HardwareIcon />
                  <StListItemText primary="projects" />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
          </ListItem>
          <ListItem key="profile" divider>
            <MuiNextLink
              href="/profile"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <ManageAccountsIcon />
                  <StListItemText primary="profile" />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
          </ListItem>
        </List>
      </SideDrawer>
      {children}
    </>
  );
};
export default Layout;
