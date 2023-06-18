import { Workout } from '@/API';
import { Stack } from '@mui/material';

export const TrackingWorkoutsPage = ({ workouts }: { workouts: Workout[] }) => {
  return (
    <Stack>
      {workouts.map((workout) => (
        <div key={workout.id}>{workout.id}</div>
      ))}
    </Stack>
  );
};
