import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const trackingActionTabs: TabProps[] = [
  { label: 'frequency', value: 'frequency' },
  { label: 'climbing', value: 'climbing' },
  { label: 'strength', value: 'strength' },
];

const TrackingPage = () => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

  const [activeTab, setActiveTab] = useState<string | false>(false);

  const trackingTabs = trackingActionTabs.map((option, i) => (
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
        title={<Typography variant="h4">Tracking</Typography>}
        rightActionItem={<RightActionHomeLink />}
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange}>
        {trackingTabs}
      </TopActionTabBar>

      <main>
        {!activeTab && <>tracking descrip</>}
        {activeTab === 'frequency' && <>frequency</>}
        {activeTab === 'climbing' && <>climbing</>}
        {activeTab === 'strength' && <>strength</>}
      </main>
    </>
  );
};

export default TrackingPage;
