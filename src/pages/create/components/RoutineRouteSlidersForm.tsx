import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';

export const RoutineRouteSlidersForm = ({
  initialValues,
}: {
  initialValues: { [key: string]: number };
}) => {
  const { savedRoutineInterval, setSavedRoutineInterval } =
    useCurrentActiveWorkout();
  const customDifficultySliders = useMemo(() => {
    return Object.entries(initialValues).map(([key, val]) => {
      function valueText(value: number) {
        return value === 10 ? `V${value}+` : `V${value}`;
      }

      return (
        <SliderFormField
          key={key}
          label={key}
          aria-label={key}
          name={key}
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
    });
  }, [initialValues]);

  return (
    <Formik<{ [key: string]: number }>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        if (savedRoutineInterval) {
          setSavedRoutineInterval({
            ...savedRoutineInterval,
            routineRoutes: values,
          });
        }
      }}
    >
      {() => (
        <Form>
          <Stack>{customDifficultySliders}</Stack>
        </Form>
      )}
    </Formik>
  );
};
