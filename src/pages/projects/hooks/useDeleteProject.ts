import { DeleteProjectInput } from '@/API';
import { SubmissionStatus } from '@/SharedComponents/SubmitButton/SubmitButton';
import { useActiveUser } from '@/contexts/ActiveUserContext';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import * as mutations from '../../../graphql/mutations';

interface UseDeleteProjectProps {
  onDelete: (projectId: string, successCallback?: () => void) => Promise<void>;
  loading: SubmissionStatus;
}

const useDeleteProject = (): UseDeleteProjectProps => {
  const { fetchAndUpdateProjects } = useActiveUser();

  const [loading, setLoading] = useState<SubmissionStatus>('inactive');

  useEffect(() => {
    if (loading === 'success' || loading === 'error') {
      setTimeout(() => {
        setLoading('inactive');
      }, 3000);
    }
  }, [loading]);

  const onDelete = useCallback(
    async (projectId: string, successCallback?: () => void) => {
      try {
        setLoading('pending');
        const response = await API.graphql<GraphQLQuery<DeleteProjectInput>>({
          query: mutations.deleteProject,
          variables: { input: { id: projectId } },
        });

        if (Boolean(response?.errors?.length)) {
          setLoading('error');
        } else {
          await fetchAndUpdateProjects();
          successCallback && successCallback();
          setLoading('success');
        }
      } catch (err: unknown) {
        setLoading('error');
      }
    },
    [fetchAndUpdateProjects]
  );
  return { onDelete, loading };
};

export default useDeleteProject;
