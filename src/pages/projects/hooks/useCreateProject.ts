import { CreateProjectInput } from '@/API';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useState } from 'react';
import * as mutations from '../../../graphql/mutations';
import { CreateNewProjectFormValues } from '../components/CreateProjectForm';

interface UseCreateProjectProps {
  onSubmit: (values: CreateNewProjectFormValues) => Promise<void>;
  loading: boolean;
}

const useCreateProject = (): UseCreateProjectProps => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (values: CreateNewProjectFormValues) => {
    try {
      setLoading(true);
      API.graphql<GraphQLQuery<CreateProjectInput>>({
        query: mutations.createProject,
        variables: { input: values },
      });
      setLoading(false);
    } catch (err: unknown) {
      return;
    }
  }, []);
  return { onSubmit, loading };
};

export default useCreateProject;
