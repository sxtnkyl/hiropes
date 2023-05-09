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

export const useRoutineIntervalTimer = ({
  defaultReps,
  repInterval,
  repBreakInterval,
  defaultSets,
  setBreakInterval,
}: WorkoutDetail): RoutineInterval => {
  const [routineIsInProgress, setRoutineIsInProgress] =
    useState<boolean>(false);

  const [secondsLeft, setSecondsLeft] = useState<number>(repInterval);

  const [currentRep, setCurrentRep] = useState<number>(1);
  const [currentRepBreak, setCurrentRepBreak] = useState<number>(0);

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [currentSetBreak, setCurrentSetBreak] = useState<number>(0);

  const [activeInterval, setActiveInterval] = useState<IntervalType>('rep');

  useEffect(() => {
    if (routineIsInProgress) {
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
    secondsLeft,
    routineIsInProgress,
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
