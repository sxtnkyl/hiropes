import TimerTitle from '@/SharedComponents/TimerTitle/TimerTitle';
import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps } from '@mui/material';
import { SyntheticEvent, useMemo } from 'react';
import { CreateWorkoutProjectPage } from './CreateWorkoutProjectPage';
import { CreateWorkoutRoutinePage } from './CreateWorkoutRoutinePage';
import CreateWorkoutStartPage from './CreateWorkoutStartPage';
import { CreateWorkoutWarmupPage } from './CreateWorkoutWarmupPage';
import { WorkoutStep } from './types/createTypes';

const createActionTabs: TabProps[] = [
  { label: 'start', value: 'start' },
  { label: 'warmup', value: 'warmup' },
  { label: 'project', value: 'project' },
  { label: 'routine', value: 'routine' },
  { label: 'strength', value: 'strength' },
];

const CreateWorkoutPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();
  const {
    pomoTimer,
    activeWorkoutStep,
    setActiveWorkoutStep,
    workoutInProgress,
    focusWorkoutDetails,
  } = useCurrentActiveWorkout();

  const titlebarTitle = useMemo(() => {
    return activeWorkoutStep === 'routine' ? (
      focusWorkoutDetails?.name ?? ''
    ) : (
      <TimerTitle
        title="New Workout"
        pomoTimer={pomoTimer}
        workoutInProgress={workoutInProgress}
      />
    );
  }, [
    activeWorkoutStep,
    focusWorkoutDetails?.name,
    pomoTimer,
    workoutInProgress,
  ]);

  const createWorkoutTabs = createActionTabs.map((option, i) => (
    <Tab
      {...option}
      key={i}
      disabled={!workoutInProgress || option.value !== activeWorkoutStep}
    />
  ));

  const handleTabChange = (event: SyntheticEvent, newValue: WorkoutStep) => {
    setActiveWorkoutStep(newValue);
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
        title={titlebarTitle}
        rightActionItem={<RightActionHomeLink />}
      />

      <TopActionTabBar
        value={activeWorkoutStep}
        onChange={handleTabChange}
        variant="scrollable"
      >
        {createWorkoutTabs}
      </TopActionTabBar>

      <main>
        {activeWorkoutStep === 'start' && <CreateWorkoutStartPage />}
        {activeWorkoutStep === 'warmup' && <CreateWorkoutWarmupPage />}
        {activeWorkoutStep === 'project' && <CreateWorkoutProjectPage />}
        {activeWorkoutStep === 'routine' && <CreateWorkoutRoutinePage />}
      </main>
    </>
  );
};

export default CreateWorkoutPage;
