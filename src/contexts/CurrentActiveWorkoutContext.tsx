import {
  RoutineOption,
  StrengthOption,
} from '@/pages/create/types/createTypes';
import { ProjectRoute } from '@/pages/projects/types/projectTypes';
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

  /** for tabs, separate from activeStepTimer */
  const [activeWorkoutStep, setActiveWorkoutStep] =
    useState<WorkoutStep>('start');
  const [workoutInProgress, setWorkoutInProgress] = useState<boolean>(false);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession>({
    workoutStepsCompleted: [],
    activeStepTimer: null,
  });
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
  const updateCompletedSteps = (step: WorkoutStep) => {
    setActiveWorkout(({ workoutStepsCompleted, ...rest }) => ({
      ...rest,
      workoutStepsCompleted: [...workoutStepsCompleted, step],
    }));
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
      }}
    >
      {children}
    </CurrentActiveWorkoutContext.Provider>
  );
};
