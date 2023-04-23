import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import SelectFormField from '@/SharedComponents/FormFieldComponents/SelectFormField';
import TextFormField from '@/SharedComponents/FormFieldComponents/TextFormField';
import { Button, MenuItem, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ProjectRoute } from '../create/types/createTypes';

type CreateNewProject = Omit<ProjectRoute, 'id'>;
const initialCreateNewProjectValues: CreateNewProject = {
  name: '',
  section: undefined,
  color: undefined,
  grade: undefined,
  sessionCount: undefined,
  imageUrl: undefined,
  description: undefined,
};

const gradeRanges = ['0-2', '2-4', '4-6', '6-8', '8-10', '10+'];
const wallSections = ['A', 'B', 'C', 'D', 'E', 'F', 'other'];
const routeColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'pink',
  'black',
  'orange',
  'purple',
  'other',
];

export const CreateNewProjectForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('a project name is required'),
    section: Yup.string().required('a project location is required'),
    color: Yup.string().required('a project color is required'),
    grade: Yup.string().required('a project grade range is required'),
    sessionCount: Yup.number()
      .integer('must be a number')
      .positive('must be greater than zero')
      .typeError('must be a number'),
    description: Yup.string().max(
      30,
      'the project description must be less than 30 characters'
    ),
  });

  const routeGradeSelectItems = gradeRanges.map((grade) => (
    <MenuItem key={grade} value={grade}>
      {grade}
    </MenuItem>
  ));
  const wallSectionSelectItems = wallSections.map((section) => (
    <MenuItem key={section} value={section}>
      {section}
    </MenuItem>
  ));
  const routeColorSelectItems = routeColors.map((color) => (
    <MenuItem key={color} value={color}>
      {color}
    </MenuItem>
  ));

  return (
    <CardContentContainer stackProps={{ spacing: 2 }}>
      <Typography variant="h2">New Project</Typography>
      <Formik<CreateNewProject>
        initialValues={initialCreateNewProjectValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={() => {
          return;
        }}
      >
        {({ isValid, touched }) => (
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
              <Button
                type="submit"
                variant="contained"
                disabled={Boolean(touched) || !isValid}
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </CardContentContainer>
  );
};
