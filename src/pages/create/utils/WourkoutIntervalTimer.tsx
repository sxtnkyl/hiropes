import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { WorkoutDetail } from '../types/createTypes';

export interface WorkoutIntervalTimerProps extends Partial<WorkoutDetail> {
  timerIsPaused?: boolean;
}
export type IntervalType = 'rep' | 'repBreak' | 'set' | 'setBreak';

export const WorkoutIntervalTimer = ({
  defaultReps = 3,
  repInterval = 4,
  repBreakInterval = 2,
  defaultSets = 2,
  setBreakInterval = 4,
  timerIsPaused = false,
}: WorkoutIntervalTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(repInterval);

  const [currentRep, setCurrentRep] = useState(1);
  const [currentRepBreak, setCurrentRepBreak] = useState(0);

  const [currentSet, setCurrentSet] = useState(1);
  const [currentSetBreak, setCurrentSetBreak] = useState(0);

  const [activeInterval, setActiveInterval] = useState<IntervalType>('rep');

  useEffect(() => {
    if (!timerIsPaused) {
      const intervalId = setInterval(() => {
        if (secondsLeft > 0) {
          setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }

        // sets remaining
        else if (currentSet < defaultSets) {
          if (currentSetBreak === currentSet) {
            setCurrentSet((prev) => prev + 1);
            setActiveInterval('rep');
            setSecondsLeft(repInterval);
          }
          // if sets remaining, complete rep cycle
          // if reps remaining countdown rep
          else if (currentRepBreak === currentRep) {
            setCurrentRep((prev) => prev + 1);
            setActiveInterval('rep');
            setSecondsLeft(repInterval);
          } else if (currentRep < defaultReps) {
            setCurrentRepBreak((prev) => prev + 1);
            setActiveInterval('repBreak');
            setSecondsLeft(repBreakInterval);
          }
          // reps and breaks completed, reset
          else {
            setCurrentSet((prev) => prev + 1);
            setCurrentRep(0);
            setCurrentRepBreak(0);
            setCurrentSetBreak((prev) => prev + 1);
            setActiveInterval('setBreak');
            setSecondsLeft(setBreakInterval);
          }
        }
        // done
        else {
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [
    currentRep,
    currentSet,
    defaultReps,
    setBreakInterval,
    defaultSets,
    currentRepBreak,
    repBreakInterval,
    repInterval,
    currentSetBreak,
    timerIsPaused,
    secondsLeft,
  ]);

  return (
    <CardContentContainer stackProps={{ spacing: 2 }}>
      <Typography variant="h2">Active Interval</Typography>

      <Typography variant="h5">{activeInterval.toLocaleUpperCase()}</Typography>

      <Typography variant="h5">Rep #: {currentRep}</Typography>
      <Typography variant="h5">Rep Break #: {currentRepBreak}</Typography>
      <Typography variant="h5">Set #: {currentSet}</Typography>
      <Typography variant="h5">Set Break #: {currentSetBreak}</Typography>

      <Box>
        <Typography variant="h5">
          Sec left: {Math.floor(secondsLeft)}
        </Typography>
      </Box>
    </CardContentContainer>
  );
};
