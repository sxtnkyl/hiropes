import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';

import RightActionProfileLink from '@/SharedComponents/TopActionTabBar/RightActionProfileLink';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import HomeCalendarContent from './index/HomeCalendarContent';
import HomeCreateContent from './index/HomeCreateContent';
import HomePageContent from './index/HomePageContent';
import HomeTrackingContent from './index/HomeTrackingContent';

const homeActionTabs: TabProps[] = [
  { label: 'create', value: 'create' },
  { label: 'calendar', value: 'calendar' },
  { label: 'tracking', value: 'tracking' },
];

const HomePage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

  const [activeTab, setActiveTab] = useState<string | false>(false);

  const homeTabs = homeActionTabs.map((option, i) => (
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
        title={<Typography variant="h3">Hiropes</Typography>}
        rightActionItem={<RightActionProfileLink />}
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange} centered>
        {homeTabs}
      </TopActionTabBar>

      <main>
        {!activeTab && <HomePageContent />}
        {activeTab === 'create' && <HomeCreateContent />}
        {activeTab === 'calendar' && <HomeCalendarContent />}
        {activeTab === 'tracking' && <HomeTrackingContent />}
      </main>
    </>
  );
};

export default HomePage;
