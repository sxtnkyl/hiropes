import { UpdateWorkoutInput } from '@/API';
import { SubmissionStatus } from '@/SharedComponents/SubmitButton/SubmitButton';
import { updateWorkout } from '@/graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { ViewEditWorkoutCardFormValues } from '../types/trackingTypes';
import { mapViewEditWorkoutCardFormValuesToPayload } from '../utils/mapViewEditWorkoutCardFormValuesToPayload';

interface UserEditWorkout {
  onSubmit: (values: ViewEditWorkoutCardFormValues) => Promise<void>;
  loading: SubmissionStatus;
}

export const useEditWorkout = (): UserEditWorkout => {
  const [loading, setLoading] = useState<SubmissionStatus>('inactive');
  useEffect(() => {
    if (loading === 'success' || loading === 'error') {
      setTimeout(() => {
        setLoading('inactive');
      }, 3000);
    }
  }, [loading]);

  const onSubmit = useCallback(
    async (values: ViewEditWorkoutCardFormValues) => {
      const payload = mapViewEditWorkoutCardFormValuesToPayload(values);
      try {
        setLoading('pending');
        const response = await API.graphql<GraphQLQuery<UpdateWorkoutInput>>({
          query: updateWorkout,
          variables: { input: payload },
        });
        if (Boolean(response?.errors?.length)) {
          setLoading('error');
        } else {
          setLoading('success');
        }
      } catch (err: unknown) {
        setLoading('error');
      }
    },
    []
  );
  return { onSubmit, loading };
};
