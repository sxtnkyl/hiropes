import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { SkipButton } from '@/SharedComponents/SkipButton/SkipButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import FireplaceIcon from '@mui/icons-material/Fireplace';

import { Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

export const CreateWorkoutWarmupPage = () => {
  const {
    pauseTimer,
    resumeTimer,
    setActiveWorkoutStep,
    setActiveStepTimer,
    setWorkoutStepsCompleted,
    pomoTimer,
    setPomoTimer,
    timerIsPaused,
  } = useCurrentActiveWorkout();
  const { hoursToSeconds } = timeConverters();

  const endWarmupStep = useCallback(() => {
    setWorkoutStepsCompleted((prev) => [...prev, 'warmup']);
    setActiveWorkoutStep('project');
    setActiveStepTimer('project');
    setPomoTimer(hoursToSeconds(0.25));
  }, [
    hoursToSeconds,
    setActiveStepTimer,
    setActiveWorkoutStep,
    setPomoTimer,
    setWorkoutStepsCompleted,
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
          <PauseResumeButton
            paused={timerIsPaused}
            resumeAction={resumeTimer}
            resumeText="Resume Warmup"
            pauseAction={pauseTimer}
            pauseText="Pause Warmup"
          />
          <SkipButton
            onClick={handleSkipWarmupClick}
            buttonText="skip warmup"
          />
        </>
      )}
    </CardContentContainer>
  );
};
