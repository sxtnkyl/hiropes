import { UpdateProjectInput } from '@/API';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useState } from 'react';
import * as mutations from '../../../graphql/mutations';
import { ProjectRoute } from '../types/projectTypes';

interface UseEditProjectProps {
  onSubmit: (values: ProjectRoute) => Promise<void>;
  loading: boolean;
}

const useEditProject = (): UseEditProjectProps => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (values: ProjectRoute) => {
    try {
      setLoading(true);
      await API.graphql<GraphQLQuery<UpdateProjectInput>>({
        query: mutations.updateProject,
        variables: { input: values },
      });
      setLoading(false);
    } catch (err: unknown) {
      return;
    }
  }, []);
  return { onSubmit, loading };
};

export default useEditProject;
