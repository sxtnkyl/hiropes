import { Workout } from '@/API';
import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import { SubmitButton } from '@/SharedComponents/SubmitButton/SubmitButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useMemo, useState } from 'react';
import useDeleteWorkout from '../hooks/useDeleteWorkout';
import { useEditWorkout } from '../hooks/useEditWorkout';
import { ViewEditWorkoutCardFormValues } from '../types/trackingTypes';
import { createWorkoutInitialValues } from '../utils/createWorkoutInitialValues';
import { WorkoutForm } from './WorkoutForm';

export const ViewEditWorkoutCard = ({ workout }: { workout: Workout }) => {
  const { onSubmit, loading: editLoading } = useEditWorkout();
  const { onDelete, loading: deleteLoading } = useDeleteWorkout();

  const [isExpanded, setIsExpanded] = useState(false);
  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
  };

  const formattedDateTitle = useMemo(() => {
    return dayjs(workout.createdAt).format('MM-DD-YYYY');
  }, [workout.createdAt]);

  const initialValues = useMemo(() => {
    return createWorkoutInitialValues(workout);
  }, [workout]);

  return (
    <Box position="relative">
      <LoadingOverlay
        loading={editLoading === 'pending' || deleteLoading === 'pending'}
      />
      <Accordion
        expanded={isExpanded}
        onChange={handleAccordionChange}
        sx={{ padding: `0 1rem` }}
      >
        <AccordionSummary
          sx={{
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
            },
          }}
        >
          <Typography variant="h6">{formattedDateTitle}</Typography>
          <ExpandMoreIcon
            sx={{
              ...(isExpanded && { transform: 'rotate(180deg)' }),
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Formik<ViewEditWorkoutCardFormValues>
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ dirty, resetForm }) => (
              <Form>
                <Stack spacing={2.5} marginBottom={1}>
                  <IconButton
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                  <WorkoutForm />
                  <SubmitButton
                    status={editLoading}
                    buttonProps={{
                      variant: 'contained',
                      type: 'submit',
                      disabled: !dirty || editLoading !== 'inactive',
                    }}
                  />
                  <SubmitButton
                    status={deleteLoading}
                    submitText="delete"
                    buttonProps={{
                      variant: 'contained',
                      type: 'button',
                      onClick: () => onDelete(workout.id),
                    }}
                  />
                </Stack>
              </Form>
            )}
          </Formik>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ViewEditWorkoutCard;
