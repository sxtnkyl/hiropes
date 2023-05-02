import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import SelectFormField from '@/SharedComponents/FormFieldComponents/SelectFormField';
import TextFormField from '@/SharedComponents/FormFieldComponents/TextFormField';
import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import { SubmitButton } from '@/SharedComponents/SubmitButton/SubmitButton';
import { Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useEditProject from '../hooks/useEditProject';
import { ProjectRoute } from '../types/projectTypes';
import {
  routeColorSelectItems,
  routeGradeSelectItems,
  wallSectionSelectItems,
} from '../utils/projectValues';

export const EditProjectForm = ({
  initialValues,
}: {
  initialValues: ProjectRoute;
}) => {
  const { onSubmit, loading } = useEditProject();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('a project name is required'),
    section: Yup.string(),
    color: Yup.string(),
    grade: Yup.string(),
    sessionCount: Yup.number()
      .integer('must be a number')
      .positive('must be greater than zero')
      .typeError('must be a number'),
    description: Yup.string().max(
      30,
      'the project description must be less than 30 characters'
    ),
  });

  return (
    <CardContentContainer stackProps={{ spacing: 2 }}>
      <LoadingOverlay loading={loading === 'pending'} />
      <Typography variant="h2" marginBottom="1rem">
        Update Project
      </Typography>
      <Formik<ProjectRoute>
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form>
            <Stack spacing={3}>
              <TextFormField name="name" label="Project Name" />
              <SelectFormField name="section" label="Wall Section">
                {wallSectionSelectItems}
              </SelectFormField>
              <SelectFormField name="color" label="Route Color">
                {routeColorSelectItems}
              </SelectFormField>
              <SelectFormField name="grade" label="Route Grade">
                {routeGradeSelectItems}
              </SelectFormField>
              <TextFormField
                name="sessionCount"
                label="Previous Session Count"
              />
              <TextFormField name="description" label="Project Description" />
              <SubmitButton
                status={loading}
                buttonProps={{
                  variant: 'contained',
                  type: 'submit',
                  disabled: !dirty || !isValid || loading !== 'inactive',
                }}
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </CardContentContainer>
  );
};
