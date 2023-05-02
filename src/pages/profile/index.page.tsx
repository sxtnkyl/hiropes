import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

const profileActionTabs: TabProps[] = [
  { label: 'update', value: 'update' },
  { label: 'settings', value: 'settings' },
  { label: 'logout', value: 'logout' },
];

const ProfilePage = () => {
  const router = useRouter();
  const { signedInUser } = useActiveUser();
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

  const [activeTab, setActiveTab] = useState<string>('update');

  const profileTabs = profileActionTabs.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const signoutHandler = () => {
    if (signedInUser?.signOut) {
      signedInUser?.signOut();
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
          <IconButton
            aria-label="menu"
            onClick={() => setIsGlobalSideNavOpen(true)}
            color="inherit"
          >
            <MenuOpenIcon />
          </IconButton>
        }
        title={<Typography variant="h3">Profile</Typography>}
        rightActionItem={<RightActionHomeLink />}
      />

      <TopActionTabBar value={activeTab} onChange={handleTabChange} centered>
        {profileTabs}
      </TopActionTabBar>

      <main>
        {activeTab === 'update' && (
          <div>update user: {signedInUser?.username}</div>
        )}
        {activeTab === 'settings' && <div>update settings</div>}
        {activeTab === 'logout' && (
          <div>
            <button onClick={signoutHandler}>Sign Out</button>
          </div>
        )}
      </main>
    </>
  );
};

export default ProfilePage;
