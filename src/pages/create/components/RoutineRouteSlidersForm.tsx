import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import theme from '@/styles/theme';
import { Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { RoutineInterval } from '../hooks/useRoutineIntervalTimer';
import { RepSetDataObject } from '../types/createTypes';

export const RoutineRouteSlidersForm = ({
  initialValues,
  routineInterval,
}: {
  initialValues: RepSetDataObject;
  routineInterval: RoutineInterval;
}) => {
  const { savedRoutineInterval, setCustomRoutineRouteGrades } =
    useCurrentActiveWorkout();

  const intervalTimerValuesToFormKeyFormat = useMemo(() => {
    if (
      savedRoutineInterval?.previousRep &&
      savedRoutineInterval?.previousSet
    ) {
      return `${savedRoutineInterval.previousSet}-${savedRoutineInterval.previousRep}`;
    }
  }, [savedRoutineInterval?.previousRep, savedRoutineInterval?.previousSet]);

  const sliders = useCallback(
    (values: RepSetDataObject) => {
      return Object.entries(initialValues).map(([key, value]) => {
        const label = `Route ${key}`;
        const valueText = (value: number) =>
          value === 10 ? `V${value}+` : `V${value}`;

        return (
          <SliderFormField
            key={key}
            label={
              <Typography
                sx={{
                  ...(routineInterval.activeInterval === 'rep' &&
                    savedRoutineInterval?.previousRep &&
                    key === intervalTimerValuesToFormKeyFormat && {
                      color: `${theme.palette.secondary.main}`,
                    }),
                }}
              >
                {label}
              </Typography>
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
    },
    [
      initialValues,
      intervalTimerValuesToFormKeyFormat,
      routineInterval.activeInterval,
      savedRoutineInterval?.previousRep,
      setCustomRoutineRouteGrades,
    ]
  );
  return (
    <Formik<RepSetDataObject>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => setCustomRoutineRouteGrades(values)}
    >
      {({ values }) => (
        <Form>
          <Stack>{sliders(values)}</Stack>
        </Form>
      )}
    </Formik>
  );
};
