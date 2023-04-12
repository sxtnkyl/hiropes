import theme from '@/styles/theme';
import { Tab, TabProps, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const homeTabOptions: TabProps[] = [
  { label: 'create' },
  { label: 'calendar' },
  { label: 'tracking' },
];

const TopActionTabBar = () => {
  const [activeTab, setActiveTab] = useState('');

  const homeTabs = homeTabOptions.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      centered
      variant="fullWidth"
      id="top-action-tab-bar"
      sx={{ margin: '1rem 0', boxShadow: theme.shadows[1] }}
    >
      {homeTabs}
    </Tabs>
  );
};

export default TopActionTabBar;
