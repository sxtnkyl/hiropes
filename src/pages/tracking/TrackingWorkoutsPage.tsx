import { Workout } from '@/API';
import { Stack } from '@mui/material';
import ViewEditWorkoutCard from './components/ViewEditWorkoutCard';

export const TrackingWorkoutsPage = ({ workouts }: { workouts: Workout[] }) => {
  return (
    <Stack spacing={1}>
      {workouts.map((workout) => (
        <ViewEditWorkoutCard key={workout.id} workout={workout} />
      ))}
    </Stack>
  );
};
