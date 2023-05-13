import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';

export const RoutineRouteSlidersForm = ({
  initialValues,
}: {
  initialValues: { [key: string]: number };
}) => {
  const { savedRoutineInterval, setSavedRoutineInterval } =
    useCurrentActiveWorkout();
  const updateSavedRoutineRouteDifficulty = useCallback(
    (values: { [key: string]: number }) => {
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
    <Formik<{ [key: string]: number }>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => updateSavedRoutineRouteDifficulty(values)}
    >
      {({ values }) => (
        <Form>
          <Stack>
            {Object.entries(initialValues).map(([key, val]) => {
              function valueText(value: number) {
                return value === 10 ? `V${value}+` : `V${value}`;
              }

              return (
                <SliderFormField
                  key={key}
                  label={key}
                  aria-label={key}
                  name={key}
                  onChange={() => updateSavedRoutineRouteDifficulty(values)}
                  defaultValue={val}
                  getAriaValueText={valueText}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueText}
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              );
            })}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
