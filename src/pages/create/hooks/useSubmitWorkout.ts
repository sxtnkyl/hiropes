import { CreateWorkoutInput } from '@/API';
import { SubmissionStatus } from '@/SharedComponents/SubmitButton/SubmitButton';
import { useCurrentActiveWorkout } from '@/contexts/CurrentActiveWorkoutContext';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import * as mutations from '../../../graphql/mutations';

interface UseSubmitWorkout {
  onSubmit: () => Promise<void>;
  loading: SubmissionStatus;
}

export const useSubmitWorkout = (): UseSubmitWorkout => {
  const router = useRouter();
  const {
    activeWorkout,
    customRoutineRouteGrades,
    savedStrengthSliders,
    resetActiveWorkout,
  } = useCurrentActiveWorkout();

  const [loading, setLoading] = useState<SubmissionStatus>('inactive');

  useEffect(() => {
    if (loading === 'success' || loading === 'error') {
      setTimeout(() => {
        setLoading('inactive');
      }, 3000);
    }
  }, [loading]);

  const onSubmit = useCallback(async (): Promise<void> => {
    const payload: CreateWorkoutInput = {
      routineFocus: activeWorkout?.routineFocus,
      routineFocusWorkout: activeWorkout?.routineFocusWorkout,
      routineWorkoutData: JSON.stringify(customRoutineRouteGrades),
      strengthWorkout: activeWorkout?.strengthWorkout,
      strengthWorkoutData: JSON.stringify(savedStrengthSliders),
      workoutProjectId: activeWorkout?.project?.id,
    };

    try {
      setLoading('pending');
      const response = await API.graphql<GraphQLQuery<CreateWorkoutInput>>({
        query: mutations.createWorkout,
        variables: { input: payload },
      });
      if (Boolean(response?.errors?.length)) {
        setLoading('error');
      } else {
        setLoading('success');
        router.push('/tracking');
        resetActiveWorkout();
      }
    } catch (err: unknown) {
      setLoading('error');
    }
  }, [
    activeWorkout?.project?.id,
    activeWorkout?.routineFocus,
    activeWorkout?.routineFocusWorkout,
    activeWorkout?.strengthWorkout,
    customRoutineRouteGrades,
    resetActiveWorkout,
    router,
    savedStrengthSliders,
  ]);

  return { onSubmit, loading };
};
