import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { Box, Stack, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import {
  BenchAndSquatSlidersFormValues,
  BenchAndSquatWorkoutNames,
  StrengthWorkoutDetail,
} from '../types/createTypes';

export const BenchAndSquatSliderCard = ({
  workoutKey,
  workoutDetails,
}: {
  workoutKey: BenchAndSquatWorkoutNames;
  workoutDetails: StrengthWorkoutDetail;
}) => {
  const { setSavedStrengthSliders } = useCurrentActiveWorkout();
  const { values } = useFormikContext<BenchAndSquatSlidersFormValues>();
  useEffect(() => {
    setSavedStrengthSliders(values);
  }, [setSavedStrengthSliders, values]);

  return (
    <CardContentContainer>
      <Stack spacing={4} width="100%">
        <Typography variant="h3" fontWeight="bold">
          {workoutDetails.name}
        </Typography>
        {[0, 1, 2].map((set) => {
          const repId = `${workoutKey}-rep-${set}`;
          const repValue = values[workoutKey].defaultReps[set];
          const weightValue = values[workoutKey].weight[set];

          return (
            <Stack
              key={`${workoutKey}-${set}`}
              spacing={0}
              sx={{ width: '100%' }}
            >
              <Typography variant="h6" fontWeight="bold">
                Set {set + 1}
              </Typography>
              <SliderFormField
                sx={{ padding: '0.75rem 0 !important' }}
                label={
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Reps</Typography>
                    <Typography>{repValue}</Typography>
                  </Box>
                }
                aria-label={repId}
                name={`${workoutKey}.defaultReps[${set}]`}
                defaultValue={workoutDetails.defaultReps[set]}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={15}
              />
              <SliderFormField
                sx={{ padding: '0.75rem 0 !important' }}
                label={
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Weight</Typography>
                    <Typography>{weightValue}</Typography>
                  </Box>
                }
                aria-label={repId}
                name={`${workoutKey}.weight[${set}]`}
                defaultValue={workoutDetails.weight[set]}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={200}
              />
            </Stack>
          );
        })}
      </Stack>
    </CardContentContainer>
  );
};
