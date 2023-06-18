import { ListWorkoutsQuery, Workout } from '@/API';
import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import { listWorkouts } from '@/graphql/queries';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import { SyntheticEvent, useState } from 'react';
import { TrackingWorkoutsPage } from './TrackingWorkoutsPage';

const trackingActionTabs: TabProps[] = [
  { label: 'workouts', value: 'workouts' },
  { label: 'climbing', value: 'climbing' },
  { label: 'strength', value: 'strength' },
];

const TrackingPage = ({ workouts }: { workouts: Workout[] }) => {
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

      <TopActionTabBar value={activeTab} onChange={handleTabChange} centered>
        {trackingTabs}
      </TopActionTabBar>

      <main>
        {!activeTab && <>tracking descrip</>}
        {activeTab === 'workouts' && (
          <TrackingWorkoutsPage workouts={workouts} />
        )}
        {activeTab === 'climbing' && <>climbing</>}
        {activeTab === 'strength' && <>strength</>}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({
    query: listWorkouts,
  })) as { data: ListWorkoutsQuery };

  return {
    props: {
      workouts: response.data.listWorkouts?.items ?? [],
    },
  };
};

export default TrackingPage;
