import {
  ProjectRoute,
  RoutineOption,
  StrengthOption,
} from '@/pages/create/types/createTypes';
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

export type WorkoutStep =
  | 'start'
  | 'warmup'
  | 'project'
  | 'routine'
  | 'strength';

export interface WorkoutSession {
  routineOption?: RoutineOption;
  routineOptionWorkout?: WorkoutSession['routineOption'];
  strengthOption?: StrengthOption;
  project?: ProjectRoute;
  workoutStepsCompleted: WorkoutStep[];
  activeStepTimer: WorkoutStep | null;
}

export interface CurrentActiveWorkoutContextProps {
  activeWorkoutStep: WorkoutStep;
  setActiveWorkoutStep: Dispatch<SetStateAction<WorkoutStep>>;
  workoutInProgress: boolean;
  setWorkoutInProgress: Dispatch<SetStateAction<boolean>>;
  activeWorkout: WorkoutSession;
  setActiveWorkout: Dispatch<SetStateAction<WorkoutSession>>;
  updateCompletedSteps: (step: WorkoutStep) => void;
  pomoTimer: number;
  setPomoTimer: Dispatch<SetStateAction<number>>;
  workoutSetupIsComplete: boolean;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetAndStartTimer: (time: number) => void;
  startWorkoutStep: (step: WorkoutStep) => void;
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
  const [activeWorkoutStep, setActiveWorkoutStep] =
    useState<WorkoutStep>('start');
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession>({
    workoutStepsCompleted: [],
    activeStepTimer: null,
  });

  // pomoTime = seconds
  const [pomoTimer, setPomoTimer] = useState(60);
  const [timerIsPaused, setTimerIsPaused] = useState(true);

  const updateCompletedSteps = (step: WorkoutStep) => {
    setActiveWorkout(({ workoutStepsCompleted, ...rest }) => ({
      ...rest,
      workoutStepsCompleted: [...workoutStepsCompleted, step],
    }));
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (!timerIsPaused) {
      if (pomoTimer === 0) {
        pauseTimer();
      }
      interval = setInterval(() => {
        setPomoTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [pomoTimer, timerIsPaused]);

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
  const startWorkoutStep = (step: WorkoutStep) => {
    setActiveWorkout({ ...activeWorkout, activeStepTimer: step });
    setWorkoutInProgress(true);
    setActiveWorkoutStep('warmup');
    resumeTimer();
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
        updateCompletedSteps,
        pomoTimer,
        setPomoTimer,
        workoutSetupIsComplete,
        pauseTimer,
        resumeTimer,
        resetAndStartTimer,
        startWorkoutStep,
      }}
    >
      {children}
    </CurrentActiveWorkoutContext.Provider>
  );
};