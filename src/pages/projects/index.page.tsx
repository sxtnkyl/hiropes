import TimerTitle from '@/SharedComponents/TimerTitle/TimerTitle';
import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { CreateProjectPage } from './CreateProjectPage';
import { ManageProjectsPage } from './ManageProjectsPage';

const projectsPageTabs: TabProps[] = [
  { label: 'create', value: 'create' },
  { label: 'manage', value: 'manage' },
];

type ProjectTabValues = 'create' | 'manage';

const ProjectsPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();
  const { pomoTimer, workoutInProgress } = useCurrentActiveWorkout();

  const [activeProjectTab, setActiveProjectTab] =
    useState<ProjectTabValues>('create');

  const projectsTabs = projectsPageTabs.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const handleTabChange = (
    event: SyntheticEvent,
    newValue: ProjectTabValues
  ) => {
    setActiveProjectTab(newValue);
  };

  return (
    <>
      <TitleBar
        leftActionItem={
          <IconButton
            aria-label="menu"
            onClick={() => setIsGlobalSideNavOpen(true)}
            color="inherit"
          >
            <MenuOpenIcon />
          </IconButton>
        }
        title={
          <TimerTitle
            title="Projects"
            pomoTimer={pomoTimer}
            workoutInProgress={workoutInProgress}
          />
        }
        rightActionItem={<RightActionHomeLink />}
      />

      <TopActionTabBar
        value={activeProjectTab}
        onChange={handleTabChange}
        centered
      >
        {projectsTabs}
      </TopActionTabBar>

      <main>
        {activeProjectTab === 'create' && <CreateProjectPage />}
        {activeProjectTab === 'manage' && <ManageProjectsPage />}
      </main>
    </>
  );
};

export default ProjectsPage;
