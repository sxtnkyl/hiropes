import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

const profileActionTabs: TabProps[] = [
  { label: 'update', value: 'update' },
  { label: 'logout', value: 'logout' },
];

const ProfilePage = () => {
  const user = useActiveUser();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('update');

  const profileTabs = profileActionTabs.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const signoutHandler = () => {
    if (user?.signOut) {
      user?.signOut();
      router.push('/');
    }
  };

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
        title={<Typography variant="h3">Profile</Typography>}
        rightActionItem={
          <Link href={'/'}>
            <IconButton aria-label="home">
              <HomeIcon />
            </IconButton>
          </Link>
        }
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange}>
        {profileTabs}
      </TopActionTabBar>

      {activeTab === 'update' && <div>update form</div>}
      {activeTab === 'logout' && (
        <div>
          <button onClick={signoutHandler}>Sign Out</button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
