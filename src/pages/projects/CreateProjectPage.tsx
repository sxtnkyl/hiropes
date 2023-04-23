import CardContentContainer from '@/SharedComponents/CardContentContainer.tsx/CardContentContainer';
import AddIcon from '@mui/icons-material/Add';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CreateNewProjectForm } from './CreateNewProjectForm';

export const CreateProjectPage = () => {
  const [hasCreateNewProjectSection, setHasCreateNewProjectSection] =
    useState<boolean>(false);

  return (
    <Stack spacing={2}>
      <CardContentContainer stackProps={{ spacing: 4 }}>
        <Typography variant="h2">Create Project</Typography>
        <DesignServicesIcon sx={{ fontSize: '4rem' }} />
        <Typography variant="h5">
          A project is a boulder which requires maximum effort and multiple
          focused sessions to successfully complete individual moves or
          sequences.
        </Typography>
        {!hasCreateNewProjectSection && (
          <Button
            variant="outlined"
            onClick={() => setHasCreateNewProjectSection(true)}
            endIcon={<AddIcon />}
          >
            create new project
          </Button>
        )}
      </CardContentContainer>
      {hasCreateNewProjectSection && <CreateNewProjectForm />}
    </Stack>
  );
};
