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
import { CreateWorkoutStrengthPage } from './CreateWorkoutStrengthPage';
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
    savedRoutineInterval,
  } = useCurrentActiveWorkout();

  const titlebarTitle = useMemo(() => {
    return (
      <TimerTitle
        title="New Workout"
        pomoTimer={
          activeWorkoutStep === 'routine'
            ? savedRoutineInterval?.previousSeconds ?? 0
            : pomoTimer
        }
        workoutInProgress={workoutInProgress}
      />
    );
  }, [
    activeWorkoutStep,
    pomoTimer,
    savedRoutineInterval?.previousSeconds,
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
        {activeWorkoutStep === 'strength' && <CreateWorkoutStrengthPage />}
      </main>
    </>
  );
};

export default CreateWorkoutPage;
