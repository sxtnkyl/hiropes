import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import theme from '@/styles/theme';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';

export type RoutineRouteSliders = {
  [key: string]: number;
};
export const RoutineRouteSlidersForm = ({
  initialValues,
}: {
  initialValues: RoutineRouteSliders;
}) => {
  const { savedRoutineInterval, setSavedRoutineInterval } =
    useCurrentActiveWorkout();
  const updateSavedRoutineRouteDifficulty = useCallback(
    (values: RoutineRouteSliders) => {
      if (savedRoutineInterval) {
        setSavedRoutineInterval({
          ...savedRoutineInterval,
          routineRoutes: values,
        });
      }
    },
    [savedRoutineInterval, setSavedRoutineInterval]
  );

  return (
    <Formik<RoutineRouteSliders>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => updateSavedRoutineRouteDifficulty(values)}
    >
      {({ values }) => (
        <Form>
          <Stack>
            {Object.entries(initialValues).map(([key, value], idx) => {
              const label = `Route ${idx + 1}`;
              const valueText = () =>
                value === 10 ? `V${value}+` : `V${value}`;

              return (
                <SliderFormField
                  key={key}
                  label={label}
                  aria-label={label}
                  name={key}
                  onChange={() => updateSavedRoutineRouteDifficulty(values)}
                  defaultValue={value}
                  getAriaValueText={valueText}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueText}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  componentsProps={{
                    thumb: {
                      style: {
                        ...(savedRoutineInterval?.previousRep &&
                          key ===
                            (
                              savedRoutineInterval?.previousRep - 1
                            ).toString() && {
                            backgroundColor: `${theme.palette.secondary.main}`,
                          }),
                      },
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
