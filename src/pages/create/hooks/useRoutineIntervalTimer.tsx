import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { WorkoutDetail } from '../types/createTypes';

export type IntervalType = 'rep' | 'repBreak' | 'set' | 'setBreak';
export interface RoutineInterval {
  secondsLeft: number;
  currentRep: number;
  setCurrentRep: Dispatch<SetStateAction<number>>;
  currentRepBreak: number;
  setCurrentRepBreak: Dispatch<SetStateAction<number>>;
  currentSet: number;
  setCurrentSet: Dispatch<SetStateAction<number>>;
  currentSetBreak: number;
  setCurrentSetBreak: Dispatch<SetStateAction<number>>;
  activeInterval: IntervalType;
  setActiveInterval: Dispatch<SetStateAction<IntervalType>>;
  routineIsInProgress: boolean;
  setRoutineIsInProgress: Dispatch<SetStateAction<boolean>>;
}

export interface UseRoutineIntervalProps extends WorkoutDetail {
  previousSeconds?: number;
  previousRep?: number;
  previousRepBreak?: number;
  previousSet?: number;
  previousSetBreak?: number;
  previousInterval?: IntervalType;
}

export const useRoutineIntervalTimer = ({
  defaultReps,
  repInterval,
  repBreakInterval,
  defaultSets,
  setBreakInterval,
  previousSeconds,
  previousRep,
  previousRepBreak,
  previousSet,
  previousSetBreak,
  previousInterval,
}: UseRoutineIntervalProps): RoutineInterval => {
  const { focusWorkoutDetails, setSavedRoutineInterval } =
    useCurrentActiveWorkout();

  const [routineIsInProgress, setRoutineIsInProgress] =
    useState<boolean>(false);

  const [secondsLeft, setSecondsLeft] = useState<number>(
    previousSeconds || repInterval
  );

  const [currentRep, setCurrentRep] = useState<number>(previousRep || 1);
  const [currentRepBreak, setCurrentRepBreak] = useState<number>(
    previousRepBreak || 0
  );

  const [currentSet, setCurrentSet] = useState<number>(previousSet || 1);
  const [currentSetBreak, setCurrentSetBreak] = useState<number>(
    previousSetBreak || 0
  );

  const [activeInterval, setActiveInterval] = useState<IntervalType>(
    previousInterval || 'rep'
  );

  /** timer logic */
  useEffect(() => {
    if (routineIsInProgress) {
      const routineInterval = setInterval(() => {
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
          clearInterval(routineInterval);
        }
      }, 1000);
      return () => clearInterval(routineInterval);
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
    secondsLeft,
    routineIsInProgress,
  ]);

  /** track and store routine for nav purposes */
  useEffect(() => {
    if (routineIsInProgress) {
      setSavedRoutineInterval({
        ...focusWorkoutDetails,
        previousSeconds: secondsLeft,
        previousRep: currentRep,
        previousRepBreak: currentRepBreak,
        previousSet: currentSet,
        previousSetBreak: currentSetBreak,
        previousInterval: activeInterval,
      });
    }
  }, [
    focusWorkoutDetails,
    activeInterval,
    currentRep,
    currentRepBreak,
    currentSet,
    currentSetBreak,
    routineIsInProgress,
    secondsLeft,
    setSavedRoutineInterval,
  ]);

  return {
    routineIsInProgress,
    setRoutineIsInProgress,
    secondsLeft,
    currentRep,
    setCurrentRep,
    currentRepBreak,
    setCurrentRepBreak,
    currentSet,
    setCurrentSet,
    currentSetBreak,
    setCurrentSetBreak,
    activeInterval,
    setActiveInterval,
  };
};
