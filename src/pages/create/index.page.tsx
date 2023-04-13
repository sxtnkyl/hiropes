import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

const createActionTabs: TabProps[] = [
  { label: 'start', value: 'start' },
  { label: 'warmup', value: 'warmup' },
  { label: 'project', value: 'project' },
  { label: 'routine', value: 'routine' },
  { label: 'strngth', value: 'strngth' },
];

const CreateWorkoutPage = () => {
  const [activeTab, setActiveTab] = useState<string>('start');

  const createWorkoutTabs = createActionTabs.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <TitleBar
        leftActionItem={
          <IconButton aria-label="menu">
            <MenuOpenIcon />
          </IconButton>
        }
        title={<Typography variant="h4">New Workout</Typography>}
        rightActionItem={
          <Link href={'/'}>
            <IconButton aria-label="home">
              <HomeIcon />
            </IconButton>
          </Link>
        }
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange}>
        {createWorkoutTabs}
      </TopActionTabBar>

      <main>{activeTab === 'start' && <>start</>}</main>
    </>
  );
};

export default CreateWorkoutPage;
