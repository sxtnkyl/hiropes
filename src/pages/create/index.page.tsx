import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import {
  WorkoutStep,
  useCurrentActiveWorkout,
} from '@/contexts/CurrentActiveWorkoutContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import { timeConverters } from '@/utils/timeConverters';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Button,
  ButtonProps,
  IconButton,
  Tab,
  TabProps,
  Typography,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { CreateWorkoutProjectPage } from './CreateWorkoutProjectPage';
import CreateWorkoutStartPage from './CreateWorkoutStartPage';
import { CreateWorkoutWarmupPage } from './CreateWorkoutWarmupPage';

const createActionTabs: TabProps[] = [
  { label: 'start', value: 'start' },
  { label: 'warmup', value: 'warmup' },
  { label: 'project', value: 'project' },
  { label: 'routine', value: 'routine' },
  { label: 'strength', value: 'strength' },
];

const TimerTitle = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{ width: '50%' }}
      {...props}
    />
  );
};

const CreateWorkoutPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();
  const {
    pomoTimer,
    activeWorkoutStep,
    setActiveWorkoutStep,
    workoutInProgress,
  } = useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();
  const { minutes, seconds } = formattedSecondsToMinuteSeconds(pomoTimer);

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
        title={
          <Typography
            variant="h4"
            {...(workoutInProgress && { component: TimerTitle })}
          >
            {workoutInProgress ? `${minutes}m : ${seconds}s` : `New Workout`}
          </Typography>
        }
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
      </main>
    </>
  );
};

export default CreateWorkoutPage;
