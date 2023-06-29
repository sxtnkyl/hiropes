import {
  ListWorkoutsQuery,
  OnDeleteWorkoutSubscription,
  OnUpdateWorkoutSubscription,
  Workout,
} from '@/API';
import TitleBar from '@/SharedComponents/TitleBar/TitleBar';
import RightActionHomeLink from '@/SharedComponents/TopActionTabBar/RightActionHomeLink';
import TopActionTabBar from '@/SharedComponents/TopActionTabBar/TopActionTabBar';
import { useGlobalSideNav } from '@/contexts/GlobalSideNavContext';
import { listWorkouts } from '@/graphql/queries';
import { onDeleteWorkout, onUpdateWorkout } from '@/graphql/subscriptions';
import { GraphQLSubscription } from '@aws-amplify/api';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Tab, TabProps, Typography } from '@mui/material';
import { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import { SyntheticEvent, useEffect, useState } from 'react';
import { TrackingWorkoutsPage } from './TrackingWorkoutsPage';

const trackingActionTabs: TabProps[] = [
  { label: 'workouts', value: 'workouts' },
  { label: 'climbing', value: 'climbing' },
  { label: 'strength', value: 'strength' },
];

const TrackingPage = ({ workouts }: { workouts: Workout[] }) => {
  const { setIsGlobalSideNavOpen } = useGlobalSideNav();

  const [activeTab, setActiveTab] = useState<string | false>('workouts');
  const [subscribedWorkouts, setSubscribedWorkouts] =
    useState<Workout[]>(workouts);

  const trackingTabs = trackingActionTabs.map((option, i) => (
    <Tab {...option} key={i} />
  ));

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  /**
   * For checking sub status
   * https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js/#subscription-connection-status-updates
   */
  // Hub.listen('api', (data: any) => {
  //   const { payload } = data;
  //   if (payload.event === CONNECTION_STATE_CHANGE) {
  //     const connectionState = payload.data.connectionState as ConnectionState;
  //     console.log(connectionState);
  //   }
  // });

  useEffect(() => {
    const removeDeletedWorkout = (dataId: string) => {
      setSubscribedWorkouts((prev) =>
        prev.filter((workout) => workout.id !== dataId)
      );
    };

    const deleteSubscription = API.graphql<
      GraphQLSubscription<OnDeleteWorkoutSubscription>
    >(graphqlOperation(onDeleteWorkout)).subscribe({
      next: (data) => {
        removeDeletedWorkout(data.value.data?.onDeleteWorkout?.id ?? '');
      },
    });

    return () => {
      deleteSubscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const replaceUpdatedWorkout = (
      newWorkout: OnUpdateWorkoutSubscription['onUpdateWorkout']
    ) => {
      const updatedWorkout = subscribedWorkouts.findIndex(
        (workout) => workout.id === newWorkout?.id
      );
      if (newWorkout && updatedWorkout !== -1) {
        setSubscribedWorkouts((prev) => {
          const updatedWorkoutsList = [...prev];
          updatedWorkoutsList.splice(updatedWorkout, 1, newWorkout);
          return updatedWorkoutsList;
        });
      }
    };

    const updateSubscription = API.graphql<
      GraphQLSubscription<OnUpdateWorkoutSubscription>
    >(graphqlOperation(onUpdateWorkout)).subscribe({
      next: (data) => {
        replaceUpdatedWorkout(data.value.data?.onUpdateWorkout);
      },
    });

    return () => {
      updateSubscription.unsubscribe();
    };
  }, [subscribedWorkouts]);

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
          <TrackingWorkoutsPage workouts={subscribedWorkouts} />
        )}
        {activeTab === 'climbing' && <>climbing</>}
        {activeTab === 'strength' && <>strength</>}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const SSR = withSSRContext({ req });
    await SSR.Auth.currentAuthenticatedUser();

    const response = (await SSR.API.graphql({
      query: listWorkouts,
    })) as { data: ListWorkoutsQuery };

    return {
      props: {
        workouts: response.data.listWorkouts?.items ?? [],
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default TrackingPage;
