import MuiNextLink from '@/SharedComponents/MuiNext/MuiNextLink';

import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HardwareIcon from '@mui/icons-material/Hardware';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { ReactNode, useCallback } from 'react';

const DynamicSideDrawer = dynamic(
  () => import('../SharedComponents/SideDrawer/SideDrawer'),
  {
    loading: () => <LoadingOverlay loading={true} />,
  }
);

const StListItemIcon = styled(ListItemIcon)`
  align-items: center;
`;
const StListItemText = styled(ListItemText)`
  padding-left: 1rem;
  text-transform: uppercase;
`;
const StSubListItemText = styled(ListItemText)`
  padding-left: 0.5rem;
  text-transform: capitalize;
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { workoutInProgress, resetActiveWorkout } = useCurrentActiveWorkout();
  const { isGlobalSideNavOpen, setIsGlobalSideNavOpen } = useGlobalSideNav();

  const closeSideNav = useCallback(() => {
    setIsGlobalSideNavOpen(false);
  }, [setIsGlobalSideNavOpen]);

  const onResetWorkoutClick = useCallback(() => {
    resetActiveWorkout();
    closeSideNav();
  }, [closeSideNav, resetActiveWorkout]);

  return (
    <>
      <DynamicSideDrawer
        open={isGlobalSideNavOpen}
        onClose={closeSideNav}
        PaperProps={{ sx: { width: '80%' } }}
      >
        <List>
          <ListItem
            key="new workout"
            divider
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <MuiNextLink
              href="/create"
              onClick={closeSideNav}
              sx={{ width: '100%', textDecoration: 'none' }}
            >
              <ListItemButton>
                <StListItemIcon>
                  <FitnessCenterIcon />
                  <StListItemText
                    primary={
                      workoutInProgress ? 'active workout' : 'new workout'
                    }
                  />
                </StListItemIcon>
              </ListItemButton>
            </MuiNextLink>
            {workoutInProgress && (
              <ListItemButton onClick={onResetWorkoutClick}>
                <StListItemIcon>
                  <RestartAltIcon />
                  <StSubListItemText primary="reset workout" />
                </StListItemIcon>
              </ListItemButton>
            )}
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
      </DynamicSideDrawer>
      {children}
    </>
  );
};
export default Layout;
