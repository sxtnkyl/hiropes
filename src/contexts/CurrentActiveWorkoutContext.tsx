import { WorkoutSession, WorkoutStep } from '@/pages/create/types/createTypes';
import { timeConverters } from '@/utils/timeConverters';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface CurrentActiveWorkoutContextProps {
  activeWorkoutStep: WorkoutStep;
  setActiveWorkoutStep: Dispatch<SetStateAction<WorkoutStep>>;
  workoutInProgress: boolean;
  setWorkoutInProgress: Dispatch<SetStateAction<boolean>>;
  activeWorkout: WorkoutSession;
  setActiveWorkout: Dispatch<SetStateAction<WorkoutSession>>;
  workoutStepsCompleted: WorkoutStep[];
  setWorkoutStepsCompleted: Dispatch<SetStateAction<WorkoutStep[]>>;
  activeStepTimer: WorkoutStep;
  setActiveStepTimer: Dispatch<SetStateAction<WorkoutStep>>;
  pomoTimer: number;
  setPomoTimer: Dispatch<SetStateAction<number>>;
  timerIsPaused: boolean;
  workoutSetupIsComplete: boolean;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetAndStartTimer: (time: number) => void;
}

const CurrentActiveWorkoutContext =
  createContext<CurrentActiveWorkoutContextProps>(
    {} as CurrentActiveWorkoutContextProps
  );

export const useCurrentActiveWorkout = () =>
  useContext(CurrentActiveWorkoutContext);

export const CurrentActiveWorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { formattedSeconds } = timeConverters();

  /** for which /create tab is selected */
  const [activeWorkoutStep, setActiveWorkoutStep] =
    useState<WorkoutStep>('start');
  /** if a workout currently being conducted */
  const [workoutInProgress, setWorkoutInProgress] = useState<boolean>(false);

  /** Workout Session Variables */
  const [workoutStepsCompleted, setWorkoutStepsCompleted] = useState<
    WorkoutStep[]
  >([]);
  /** which step the timer is tracking */
  const [activeStepTimer, setActiveStepTimer] = useState<WorkoutStep>('start');
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession>({});

  /** pomoTime = seconds */
  const [pomoTimer, setPomoTimer] = useState<number>(60);
  const [timerIsPaused, setTimerIsPaused] = useState<boolean>(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (!timerIsPaused) {
      if (pomoTimer < 1) {
        pauseTimer();
      }
      interval = setInterval(() => {
        setPomoTimer((prevTimer) => formattedSeconds(prevTimer - 1));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [formattedSeconds, pomoTimer, timerIsPaused]);

  const workoutSetupIsComplete = useMemo(() => {
    const setupValues = [
      activeWorkout.routineOption,
      activeWorkout.routineOptionWorkout,
      activeWorkout.strengthOption,
    ];
    return setupValues.every((val) => Boolean(val));
  }, [
    activeWorkout.routineOption,
    activeWorkout.routineOptionWorkout,
    activeWorkout.strengthOption,
  ]);

  const pauseTimer = () => setTimerIsPaused(true);
  const resumeTimer = () => setTimerIsPaused(false);
  const resetAndStartTimer = (time: number) => {
    setTimeout(() => {
      setPomoTimer(time);
      resumeTimer();
    }, 1000);
  };

  return (
    <CurrentActiveWorkoutContext.Provider
      value={{
        activeWorkoutStep,
        setActiveWorkoutStep,
        workoutInProgress,
        setWorkoutInProgress,
        activeWorkout,
        setActiveWorkout,
        workoutStepsCompleted,
        setWorkoutStepsCompleted,
        activeStepTimer,
        setActiveStepTimer,
        pomoTimer,
        setPomoTimer,
        timerIsPaused,
        workoutSetupIsComplete,
        pauseTimer,
        resumeTimer,
        resetAndStartTimer,
      }}
    >
      {children}
    </CurrentActiveWorkoutContext.Provider>
  );
};
