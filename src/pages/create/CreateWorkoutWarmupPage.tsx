import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

export const CreateWorkoutWarmupPage = () => {
  const {
    setActiveWorkout,
    pauseTimer,
    setActiveWorkoutStep,
    updateCompletedSteps,
    pomoTimer,
    setPomoTimer,
  } = useCurrentActiveWorkout();
  const { hoursToSeconds } = timeConverters();

  const endWarmupStep = useCallback(() => {
    updateCompletedSteps('warmup');
    setActiveWorkoutStep('project');
    setActiveWorkout((prevSesh) => ({
      ...prevSesh,
      activeStepTimer: 'project',
    }));
    setPomoTimer(hoursToSeconds(0.025));
  }, [
    hoursToSeconds,
    setActiveWorkout,
    setActiveWorkoutStep,
    setPomoTimer,
    updateCompletedSteps,
  ]);

  const handleSkipWarmupClick = () => {
    pauseTimer();
    endWarmupStep();
  };

  const warmupEndingIn10Seconds = pomoTimer < 11;

  useEffect(() => {
    if (pomoTimer === 0) {
      endWarmupStep();
    }
  }, [endWarmupStep, pomoTimer]);

  return (
    <CardContentContainer stackProps={{ spacing: 4 }}>
      <Typography variant="h2">Warmup Interval</Typography>
      <FireplaceIcon sx={{ fontSize: '4rem' }} />
      <Typography variant="h5">
        Stretch and complete easy climbs to help ready for projecting session.
      </Typography>
      {warmupEndingIn10Seconds ? (
        <>
          <Typography variant="h6">
            Projecting session will begin in:
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {pomoTimer} seconds
          </Typography>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={pauseTimer}
            endIcon={<PauseIcon />}
          >
            pause warmup
          </Button>
          <Button
            variant="outlined"
            onClick={handleSkipWarmupClick}
            endIcon={<SkipNextIcon />}
          >
            skip warmup
          </Button>
        </>
      )}
    </CardContentContainer>
  );
};
