import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { SyntheticEvent, useMemo, useState } from 'react';
import CreateWorkoutStartPage from './CreateWorkoutStartPage';
import { RoutineOption, StrengthOption } from './types/createTypes';

export type NewWorkoutSetup = {
  routineOption?: RoutineOption;
  routineOptionWorkout?: NewWorkoutSetup['routineOption'];
  strengthOption?: StrengthOption;
};

const createActionTabs: TabProps[] = [
  { label: 'start', value: 'start' },
  { label: 'warmup', value: 'warmup' },
  { label: 'project', value: 'project' },
  { label: 'routine', value: 'routine' },
  { label: 'strength', value: 'strength' },
];

const CreateWorkoutPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

  const [activeTab, setActiveTab] = useState<string>('start');
  const [newWorkoutSetup, setNewWorkoutSetup] = useState<NewWorkoutSetup>({});

  const workoutSetupIsComplete = useMemo(() => {
    const setupValues = Object.values(newWorkoutSetup);
    return setupValues.length === 3 && setupValues.every((val) => Boolean(val));
  }, [newWorkoutSetup]);

  const createWorkoutTabs = createActionTabs.map((option, i) => (
    <Tab {...option} key={i} disabled={!workoutSetupIsComplete} />
  ));

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
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
        title={<Typography variant="h4">New Workout</Typography>}
        rightActionItem={<RightActionHomeLink />}
      />

      <TopActionTabBar
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
      >
        {createWorkoutTabs}
      </TopActionTabBar>

      <main>
        {activeTab === 'start' && (
          <CreateWorkoutStartPage
            newWorkoutSetup={newWorkoutSetup}
            setNewWorkoutSetup={setNewWorkoutSetup}
            setActiveTab={setActiveTab}
            workoutSetupIsComplete={workoutSetupIsComplete}
          />
        )}
      </main>
    </>
  );
};

export default CreateWorkoutPage;
