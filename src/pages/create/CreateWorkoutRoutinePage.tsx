import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import { PauseResumeButton } from '@/SharedComponents/PauseResumeButton/PauseResumeButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { timeConverters } from '@/utils/timeConverters';
import { routineDetails } from '@/utils/workoutDetails';
import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { GradeRange } from '../projects/types/projectTypes';
import { routeGradeSelectItems } from '../projects/utils/projectValues';

export const CreateWorkoutRoutinePage = () => {
  const { activeWorkout, pauseTimer, resumeTimer, timerIsPaused } =
    useCurrentActiveWorkout();
  const { routineFocus = 'endurance', routineFocusWorkout = 'pyramidLong' } =
    activeWorkout;
  const { formattedSecondsToMinuteSeconds, minutesToSeconds } =
    timeConverters();

  const focusWorkoutDetails = useMemo(() => {
    return routineDetails[routineFocus][routineFocusWorkout];
  }, [routineFocus, routineFocusWorkout]);
  const {
    name,
    description,
    defaultReps,
    repInterval,
    defaultSets,
    repBreakInterval,
    setBreakInterval,
    bottomRange,
    topRange,
  } = focusWorkoutDetails;

  const [bottomGradeRangeValue, setBottomGradeRangeValue] =
    useState<GradeRange>(bottomRange);
  const [topGradeRangeValue, setTopGradeRangeValue] =
    useState<GradeRange>(topRange);

  const estimatedCompletionTimeSeconds = minutesToSeconds(
    repInterval * defaultReps +
      defaultReps * repBreakInterval +
      defaultSets * setBreakInterval
  );
  const { minutes: completionMinutes, seconds: completionSeconds } =
    formattedSecondsToMinuteSeconds(estimatedCompletionTimeSeconds);

  return (
    <Stack spacing={2}>
      <CardContentContainer stackProps={{ spacing: 2 }}>
        <Typography variant="h2">{name}</Typography>
        <Typography variant="h6">{description}</Typography>

        <PauseResumeButton
          paused={timerIsPaused}
          resumeAction={resumeTimer}
          resumeText="Start Workout"
          pauseAction={pauseTimer}
          pauseText="Pause Workout"
        />
      </CardContentContainer>

      <CardContentContainer>
        <Typography variant="h5">Estimated Completion Time:</Typography>
        <Typography variant="h3">
          {completionMinutes} M: {completionSeconds} S
        </Typography>
      </CardContentContainer>

      <CardContentContainer stackProps={{ spacing: 2 }}>
        <Typography variant="h2">Difficulty Ranges</Typography>
        <FormControl fullWidth>
          <InputLabel>Lower Difficulty Range</InputLabel>
          <Select
            fullWidth
            value={bottomGradeRangeValue}
            onChange={(e) =>
              setBottomGradeRangeValue(e.target.value as GradeRange)
            }
            label="Lower Difficulty Range"
          >
            {routeGradeSelectItems}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Upper Difficulty Range</InputLabel>
          <Select
            fullWidth
            value={topGradeRangeValue}
            onChange={(e) =>
              setTopGradeRangeValue(e.target.value as GradeRange)
            }
            label="Upper Difficulty Range"
          >
            {routeGradeSelectItems}
          </Select>
        </FormControl>
      </CardContentContainer>
    </Stack>
  );
};
