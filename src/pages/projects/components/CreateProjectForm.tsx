import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import SelectFormField from '@/SharedComponents/FormFieldComponents/SelectFormField';
import TextFormField from '@/SharedComponents/FormFieldComponents/TextFormField';
import { LoadingOverlay } from '@/SharedComponents/LoadingOverlay/LoadingOverlay';
import { SubmitButton } from '@/SharedComponents/SubmitButton/SubmitButton';
import { Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCreateProject from '../hooks/useCreateProject';
import { ProjectRoute } from '../types/projectTypes';
import {
  routeColorSelectItems,
  routeGradeSelectItems,
  wallSectionSelectItems,
} from '../utils/projectValues';

/** unique id inserted on create */
export type CreateNewProjectFormValues = Omit<ProjectRoute, 'id'>;

export const initialCreateNewProjectValues: CreateNewProjectFormValues = {
  name: '',
  section: undefined,
  color: undefined,
  grade: undefined,
  sessionCount: undefined,
  imageUrl: undefined,
  description: undefined,
};

export const CreateNewProjectForm = () => {
  const { onSubmit, loading } = useCreateProject();

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
        Create Project
      </Typography>
      <Formik<CreateNewProjectFormValues>
        initialValues={initialCreateNewProjectValues}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
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
