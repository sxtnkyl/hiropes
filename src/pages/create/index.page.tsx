import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import TimerTitle from '@/SharedComponents/TimerTitle/TimerTitle';
import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps } from '@mui/material';
import dynamic from 'next/dynamic';
import { SyntheticEvent, useMemo } from 'react';
import CreateWorkoutStartPage from './CreateWorkoutStartPage';
import { WorkoutStep } from './types/createTypes';

const DynamicCreateWorkoutWarmupPage = dynamic(
  () =>
    import('./CreateWorkoutWarmupPage').then(
      (res) => res.CreateWorkoutWarmupPage
    ),
  {
    loading: () => <LoadingOverlay loading={true} />,
  }
);
const DynamicCreateWorkoutProjectPage = dynamic(
  () =>
    import('./CreateWorkoutProjectPage').then(
      (res) => res.CreateWorkoutProjectPage
    ),
  {
    loading: () => <LoadingOverlay loading={true} />,
  }
);
const DynamicCreateWorkoutRoutinePage = dynamic(
  () =>
    import('./CreateWorkoutRoutinePage').then(
      (res) => res.CreateWorkoutRoutinePage
    ),
  {
    loading: () => <LoadingOverlay loading={true} />,
  }
);
const DynamicCreateWorkoutStrengthPage = dynamic(
  () =>
    import('./CreateWorkoutStrengthPage').then(
      (res) => res.CreateWorkoutStrengthPage
    ),
  {
    loading: () => <LoadingOverlay loading={true} />,
  }
);

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
        {activeWorkoutStep === 'warmup' && <DynamicCreateWorkoutWarmupPage />}
        {activeWorkoutStep === 'project' && <DynamicCreateWorkoutProjectPage />}
        {activeWorkoutStep === 'routine' && <DynamicCreateWorkoutRoutinePage />}
        {activeWorkoutStep === 'strength' && (
          <DynamicCreateWorkoutStrengthPage />
        )}
      </main>
    </>
  );
};

export default CreateWorkoutPage;
