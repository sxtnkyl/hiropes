import { UseRoutineIntervalProps } from '@/pages/create/hooks/useRoutineIntervalTimer';
import {
  RepSetDataObject,
  SavedStrengthSliders,
  WorkoutDetail,
  WorkoutSession,
  WorkoutStep,
} from '@/pages/create/types/createTypes';
import { timeConverters } from '@/utils/timeConverters';
import { routineDetails } from '@/utils/workoutDetails';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
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
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetAndStartTimer: (time: number) => void;
  focusWorkoutDetails: WorkoutDetail;
  savedRoutineInterval?: UseRoutineIntervalProps;
  setSavedRoutineInterval: Dispatch<
    SetStateAction<UseRoutineIntervalProps | undefined>
  >;
  customRoutineRouteGrades?: RepSetDataObject;
  setCustomRoutineRouteGrades: Dispatch<
    SetStateAction<RepSetDataObject | undefined>
  >;
  strengthWorkoutEstimatedCompletionTimeInSeconds?: number;
  setStrengthWorkoutEstimatedCompletionTimeInSeconds: Dispatch<
    SetStateAction<number | undefined>
  >;
  savedStrengthSliders?: SavedStrengthSliders;
  setSavedStrengthSliders: Dispatch<
    SetStateAction<SavedStrengthSliders | undefined>
  >;
  resetActiveWorkout: () => void;
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
      return () => clearInterval(interval);
    }
  }, [formattedSeconds, pomoTimer, timerIsPaused]);

  const pauseTimer = () => setTimerIsPaused(true);
  const resumeTimer = () => setTimerIsPaused(false);
  const resetAndStartTimer = (time: number) => {
    setTimeout(() => {
      setPomoTimer(time);
      resumeTimer();
    }, 1000);
  };

  /** Routine Variables */
  /** stores in-progress routine in case nav change */
  const [savedRoutineInterval, setSavedRoutineInterval] =
    useState<UseRoutineIntervalProps>();
  const [customRoutineRouteGrades, setCustomRoutineRouteGrades] =
    useState<RepSetDataObject>();
  const focusWorkoutDetails = useMemo(() => {
    const { routineFocus = 'endurance', routineFocusWorkout = 'sixBySix' } =
      activeWorkout;
    return routineDetails[routineFocus][routineFocusWorkout];
  }, [activeWorkout]);

  /** Strength Variables */
  const [
    strengthWorkoutEstimatedCompletionTimeInSeconds,
    setStrengthWorkoutEstimatedCompletionTimeInSeconds,
  ] = useState<number>();
  const [savedStrengthSliders, setSavedStrengthSliders] =
    useState<SavedStrengthSliders>();

  const resetActiveWorkout = useCallback(() => {
    setActiveWorkoutStep('start');
    setWorkoutInProgress(false);
    setWorkoutStepsCompleted([]);
    setActiveStepTimer('start');
    setActiveWorkout({});
    setSavedRoutineInterval(undefined);
    setCustomRoutineRouteGrades(undefined);
    setStrengthWorkoutEstimatedCompletionTimeInSeconds(undefined);
    setSavedStrengthSliders(undefined);
  }, []);

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
        pauseTimer,
        resumeTimer,
        resetAndStartTimer,
        focusWorkoutDetails,
        savedRoutineInterval,
        setSavedRoutineInterval,
        customRoutineRouteGrades,
        setCustomRoutineRouteGrades,
        strengthWorkoutEstimatedCompletionTimeInSeconds,
        setStrengthWorkoutEstimatedCompletionTimeInSeconds,
        savedStrengthSliders,
        setSavedStrengthSliders,
        resetActiveWorkout,
      }}
    >
      {children}
    </CurrentActiveWorkoutContext.Provider>
  );
};
