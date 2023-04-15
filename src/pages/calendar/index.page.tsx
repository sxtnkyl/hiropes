import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const calendarActionTabs: TabProps[] = [
  { label: 'week', value: 'week' },
  { label: 'month', value: 'month' },
  { label: '3month', value: '3month' },
];

const CalendarPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

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
          <IconButton
            aria-label="menu"
            onClick={() => setIsGlobalSideNavOpen(true)}
            color="inherit"
          >
            <MenuOpenIcon />
          </IconButton>
        }
        title={<Typography variant="h4">Calendar</Typography>}
        rightActionItem={<RightActionHomeLink />}
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
