import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { Typography } from '@mui/material';

export const WarmupPage = () => {
  const { pomoTimer, pauseTimer, resumeTimer } = useCurrentActiveWorkout();
  const { formattedSecondsToMinuteSeconds } = timeConverters();
  const { minutes, seconds } = formattedSecondsToMinuteSeconds(pomoTimer);

  return (
    <CardContentContainer>
      <Typography variant="h4">{minutes} Minutes</Typography>
      <Typography variant="h4">{seconds} Seconds</Typography>
      <button onClick={resumeTimer}>start</button>
      <button onClick={pauseTimer}>stop</button>
    </CardContentContainer>
  );
};
