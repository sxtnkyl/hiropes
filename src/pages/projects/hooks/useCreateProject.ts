import { CreateProjectInput } from '@/API';
import { SubmissionStatus } from '@/SharedComponents/SubmitButton/SubmitButton';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import * as mutations from '../../../graphql/mutations';
import { CreateNewProjectFormValues } from '../components/CreateProjectForm';

interface UseCreateProjectProps {
  onSubmit: (values: CreateNewProjectFormValues) => Promise<void>;
  loading: SubmissionStatus;
}

const useCreateProject = (): UseCreateProjectProps => {
  const { fetchAndUpdateProjects } = useActiveUser();

  const [loading, setLoading] = useState<SubmissionStatus>('inactive');

  useEffect(() => {
    if (loading === 'success' || loading === 'error') {
      setTimeout(() => {
        setLoading('inactive');
      }, 3000);
    }
  }, [loading]);

  const onSubmit = useCallback(
    async (values: CreateNewProjectFormValues) => {
      try {
        setLoading('pending');
        const response = await API.graphql<GraphQLQuery<CreateProjectInput>>({
          query: mutations.createProject,
          variables: { input: values },
        });
        if (Boolean(response?.errors?.length)) {
          setLoading('error');
        } else {
          await fetchAndUpdateProjects();
          setLoading('success');
        }
      } catch (err: unknown) {
        setLoading('error');
      }
    },
    [fetchAndUpdateProjects]
  );
  return { onSubmit, loading };
};

export default useCreateProject;
