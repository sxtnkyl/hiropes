import SelectFormField from '@/SharedComponents/FormFieldComponents/SelectFormField';
import SliderFormField from '@/SharedComponents/FormFieldComponents/SliderFormField';
import TextFormField from '@/SharedComponents/FormFieldComponents/TextFormField';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import {
  RoutineFocus,
  RoutineFocusWorkoutKeys,
  StrengthWorkoutKeys,
  WorkoutAssertions,
} from '@/pages/create/types/createTypes';
import theme from '@/styles/theme';
import { routineDetails, strengthWorkouts } from '@/utils/workoutDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  Collapse,
  FormLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { ViewEditWorkoutCardFormValues } from '../types/trackingTypes';

export const WorkoutForm = () => {
  const { projects } = useActiveUser();
  const { values, setFieldValue, getFieldMeta, initialTouched } =
    useFormikContext<ViewEditWorkoutCardFormValues>();

  const [routineSlidersOpen, setRoutineSlidersOpen] = useState(false);
  const [strengthSlidersOpen, setStrengthSlidersOpen] = useState(false);

  const routineFocusDropdownOptions = Object.keys(routineDetails).map(
    (routineFocus) => (
      <MenuItem key={routineFocus} value={routineFocus}>
        {WorkoutAssertions[routineFocus as RoutineFocus]}
      </MenuItem>
    )
  );
  const routineFocusWorkoutDropdownOptions = useMemo(() => {
    const focusKey = (values?.routineFocus ?? 'endurance') as RoutineFocus;

    return Object.values(routineDetails)
      .flatMap((obj) => Object.keys(obj))
      .map((routineWorkout) => {
        const workoutIsInFocusGroup = Object.keys(
          routineDetails[focusKey]
        ).includes(routineWorkout);
        return (
          <MenuItem
            key={routineWorkout}
            value={routineWorkout}
            disabled={!workoutIsInFocusGroup}
          >
            {WorkoutAssertions[routineWorkout as RoutineFocusWorkoutKeys]}
          </MenuItem>
        );
      });
  }, [values?.routineFocus]);
  const projectDropdownOptions = useMemo(
    () =>
      projects?.map((project) => (
        <MenuItem key={project.id} value={project.id}>
          {project.name}
        </MenuItem>
      )) ?? [],
    [projects]
  );
  const strengthDropdownOptions = Object.keys(strengthWorkouts).map(
    (strengthWorkout) => (
      <MenuItem key={strengthWorkout} value={strengthWorkout}>
        {WorkoutAssertions[strengthWorkout as StrengthWorkoutKeys]}
      </MenuItem>
    )
  );

  const strengthWorkoutFieldHasChanged = useMemo(
    () =>
      values.strengthWorkout !== getFieldMeta('strengthWorkout').initialValue,
    [getFieldMeta, values.strengthWorkout]
  );
  const routineFocusWorkoutFieldHasChanged = useMemo(
    () =>
      values.routineFocusWorkout !==
      getFieldMeta('routineFocusWorkout').initialValue,
    [getFieldMeta, values.routineFocusWorkout]
  );
  const routineFocusFieldHasChanged = useMemo(
    () => values.routineFocus !== getFieldMeta('routineFocus').initialValue,
    [getFieldMeta, values.routineFocus]
  );
  useEffect(() => {
    if (routineFocusFieldHasChanged) {
      setFieldValue('routineFocusWorkout', '');
    }
    if (routineFocusWorkoutFieldHasChanged) {
      setFieldValue('routineWorkoutData', {});
    }
    if (strengthWorkoutFieldHasChanged) {
      setFieldValue('strengthWorkoutData', {});
    }
  }, [
    initialTouched.strengthWorkout,
    routineFocusFieldHasChanged,
    routineFocusWorkoutFieldHasChanged,
    setFieldValue,
    strengthWorkoutFieldHasChanged,
    values.routineFocusWorkout,
  ]);

  const routineSliders = useMemo(() => {
    return Object.entries(values.routineWorkoutData)
      .sort()
      .map(([key, value]) => {
        const label = `Route ${key}`;
        const valueText = (value: number) =>
          value === 10 ? `V${value}+` : `V${value}`;

        return (
          <SliderFormField
            key={key}
            label={<Typography variant="subtitle2">{label}</Typography>}
            aria-label={label}
            name={`routineWorkoutData.[${key}]`}
            defaultValue={value}
            getAriaValueText={(value) => valueText(value)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => valueText(value)}
            step={1}
            marks
            min={0}
            max={10}
          />
        );
      });
  }, [values.routineWorkoutData]);

  const strengthWorkoutSliders = useMemo(() => {
    return Object.entries(values.strengthWorkoutData)
      .sort()
      .map(([workoutName, { weight, defaultReps }]) => (
        <Stack spacing={1} width="100%" key={workoutName}>
          {defaultReps.map((rep: number, idx: number) => {
            const workoutNameRepLabel = `${
              WorkoutAssertions[workoutName as StrengthWorkoutKeys]
            }-${idx + 1}`;
            const repValue =
              values.strengthWorkoutData[workoutName].defaultReps[idx];
            const weightValue =
              values.strengthWorkoutData[workoutName].weight[idx];

            return (
              <Stack
                key={`${workoutName}-${idx}`}
                spacing={0}
                sx={{ width: '100%' }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {workoutNameRepLabel}
                </Typography>
                <SliderFormField
                  sx={{ padding: '0.75rem 0 !important' }}
                  label={
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Reps</Typography>
                      <Typography variant="body2">{repValue}</Typography>
                    </Box>
                  }
                  aria-label={workoutNameRepLabel}
                  name={`strengthWorkoutData.${workoutName}.defaultReps[${idx}]`}
                  defaultValue={rep}
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
                      <Typography variant="body2">Weight</Typography>
                      <Typography variant="body2">{weightValue}</Typography>
                    </Box>
                  }
                  aria-label={workoutNameRepLabel}
                  name={`strengthWorkoutData.${workoutName}.weight[${idx}]`}
                  defaultValue={weight[idx]}
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
      ));
  }, [values.strengthWorkoutData]);

  return (
    <Stack spacing={2}>
      <TextFormField name="id" label="Project Id" disabled />
      <SelectFormField name="routineFocus" label="Routine Focus">
        {routineFocusDropdownOptions}
      </SelectFormField>
      <SelectFormField name="routineFocusWorkout" label="Routine Workout">
        {routineFocusWorkoutDropdownOptions}
      </SelectFormField>
      <Stack
        padding="0.5rem"
        border={`1px solid ${theme.palette.action.disabled}`}
        borderRadius="4px"
        position="relative"
      >
        <FormLabel
          sx={{
            position: 'absolute',
            top: -12,
            left: 0,
            scale: '75%',
            background: theme.palette.background.paper,
            padding: '0 0.5rem',
          }}
        >
          Routine Workout Data
        </FormLabel>
        <Stack alignSelf="flex-end">
          {routineSlidersOpen ? (
            <ArrowDropUpIcon onClick={() => setRoutineSlidersOpen(false)} />
          ) : (
            <ArrowDropDownIcon onClick={() => setRoutineSlidersOpen(true)} />
          )}
        </Stack>
        <Collapse in={routineSlidersOpen}>
          <Stack padding="0 2rem">{routineSliders}</Stack>
        </Collapse>
      </Stack>
      {projectDropdownOptions.length > 0 && (
        <SelectFormField name="workoutProjectId" label="Project">
          {projectDropdownOptions}
        </SelectFormField>
      )}
      <SelectFormField name="strengthWorkout" label="Strength Workout">
        {strengthDropdownOptions}
      </SelectFormField>
      <Stack
        padding="0.5rem"
        border={`1px solid ${theme.palette.action.disabled}`}
        borderRadius="4px"
        position="relative"
      >
        <FormLabel
          sx={{
            position: 'absolute',
            top: -12,
            left: 0,
            scale: '75%',
            background: theme.palette.background.paper,
            padding: '0 0.5rem',
          }}
        >
          Strength Workout Data
        </FormLabel>
        <Stack alignSelf="flex-end">
          {strengthSlidersOpen ? (
            <ArrowDropUpIcon onClick={() => setStrengthSlidersOpen(false)} />
          ) : (
            <ArrowDropDownIcon onClick={() => setStrengthSlidersOpen(true)} />
          )}
        </Stack>
        <Collapse in={strengthSlidersOpen}>
          <Stack padding="0 2rem">{strengthWorkoutSliders}</Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
};
