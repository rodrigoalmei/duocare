import { useCallback, useState } from 'react';

import { repositories } from '@/repositories';
import type { FeedbackPayload } from '@/types';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useFeedback() {
  const loader = useCallback(() => repositories.feedback.getOptions(), []);
  const query = useRepositoryQuery(loader);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = useCallback(async (payload: FeedbackPayload) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);
    try {
      await repositories.feedback.submitFeedback(payload);
      setSubmitted(true);
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : 'Não foi possível enviar o feedback.');
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { ...query, submitting, submitError, submitted, submit };
}
