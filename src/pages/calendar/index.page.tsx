import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

const calendarActionTabs: TabProps[] = [
  { label: 'week', value: 'week' },
  { label: 'month', value: 'month' },
  { label: '3month', value: '3month' },
];

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState<string | false>(false);

  const calendarTabs = calendarActionTabs.map((option, i) => (
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
        title={<Typography variant="h4">Calendar</Typography>}
        rightActionItem={
          <Link href={'/'}>
            <IconButton aria-label="home">
              <HomeIcon />
            </IconButton>
          </Link>
        }
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange}>
        {calendarTabs}
      </TopActionTabBar>

      <main>
        {!activeTab && <>cal descrip</>}
        {activeTab === 'week' && <>week</>}
        {activeTab === 'month' && <>month</>}
        {activeTab === '3month' && <>3 month</>}
      </main>
    </>
  );
};

export default CalendarPage;
