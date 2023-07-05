import { DeleteWorkoutInput } from '@/API';
import { SubmissionStatus } from '@/SharedComponents/SubmitButton/SubmitButton';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { deleteWorkout } from '../../../graphql/mutations';

interface UseDeleteWorkoutProps {
  onDelete: (workoutId: string) => Promise<void>;
  loading: SubmissionStatus;
}

const useDeleteWorkout = (): UseDeleteWorkoutProps => {
  const [loading, setLoading] = useState<SubmissionStatus>('inactive');

  useEffect(() => {
    if (loading === 'success' || loading === 'error') {
      setTimeout(() => {
        setLoading('inactive');
      }, 3000);
    }
  }, [loading]);

  const onDelete = useCallback(async (workoutId: string) => {
    try {
      setLoading('pending');
      const response = await API.graphql<GraphQLQuery<DeleteWorkoutInput>>({
        query: deleteWorkout,
        variables: { input: { id: workoutId } },
      });

      if (Boolean(response?.errors?.length)) {
        setLoading('error');
      } else {
        setLoading('success');
      }
    } catch (err: unknown) {
      setLoading('error');
    }
  }, []);
  return { onDelete, loading };
};

export default useDeleteWorkout;
