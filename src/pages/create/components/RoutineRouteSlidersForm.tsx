import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import theme from '@/styles/theme';
import { Stack, Typography } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { useMemo } from 'react';
import { RoutineInterval } from '../hooks/useRoutineIntervalTimer';
import { RepSetDataObject } from '../types/createTypes';

export const RoutineRouteSlidersForm = ({
  routineInterval,
}: {
  routineInterval: RoutineInterval;
}) => {
  const { savedRoutineInterval, setCustomRoutineRouteGrades } =
    useCurrentActiveWorkout();
  const { values } = useFormikContext<RepSetDataObject>();

  const intervalTimerValuesToFormKeyFormat = useMemo(() => {
    if (
      savedRoutineInterval?.previousRep &&
      savedRoutineInterval?.previousSet
    ) {
      return `${savedRoutineInterval.previousSet}-${savedRoutineInterval.previousRep}`;
    }
  }, [savedRoutineInterval?.previousRep, savedRoutineInterval?.previousSet]);

  const sliders = useMemo(() => {
    return Object.entries(values).map(([key, value]) => {
      const label = `Route ${key}`;
      const valueText = (value: number) =>
        value === 10 ? `V${value}+` : `V${value}`;

      return (
        <SliderFormField
          key={key}
          label={
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                ...(routineInterval.activeInterval === 'rep' &&
                  savedRoutineInterval?.previousRep &&
                  key === intervalTimerValuesToFormKeyFormat && {
                    color: `${theme.palette.secondary.main}`,
                  }),
              }}
            >
              <Typography>{label}</Typography>
              <Typography>{value}</Typography>
            </Stack>
          }
          aria-label={label}
          name={key}
          onChange={() => setCustomRoutineRouteGrades(values)}
          defaultValue={value}
          getAriaValueText={(value) => valueText(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => valueText(value)}
          step={1}
          marks
          min={0}
          max={10}
          componentsProps={{
            thumb: {
              style: {
                ...(routineInterval.activeInterval === 'rep' &&
                  savedRoutineInterval?.previousRep &&
                  key === intervalTimerValuesToFormKeyFormat && {
                    backgroundColor: `${theme.palette.secondary.main}`,
                  }),
              },
            },
          }}
        />
      );
    });
  }, [
    intervalTimerValuesToFormKeyFormat,
    routineInterval.activeInterval,
    savedRoutineInterval?.previousRep,
    setCustomRoutineRouteGrades,
    values,
  ]);

  return (
    <Form>
      <Stack>{sliders}</Stack>
    </Form>
  );
};
