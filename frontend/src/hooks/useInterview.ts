import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { Answer, Question } from "@/types/interview";

const SESSION_STORAGE_KEY = "ai-budget-interview-session-id";

export function getStoredSessionId(): string | null {
  return localStorage.getItem(SESSION_STORAGE_KEY);
}

export function setStoredSessionId(sessionId: string | null): void {
  if (sessionId) {
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function useCurrentQuestion(sessionId: string | null, enabled: boolean) {
  return useQuery<{ question: Question }>({
    queryKey: ["interview", sessionId, "question"],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session ID is required");
      return api.getCurrentQuestion(sessionId);
    },
    enabled,
    staleTime: Infinity,
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createInterview,
    onSuccess: (data) => {
      setStoredSessionId(data.session_id);
      queryClient.setQueryData(
        ["interview", data.session_id, "question"],
        { question: data.question }
      );
    },
  });
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sessionId,
      answer,
    }: {
      sessionId: string;
      answer: Answer;
    }) => {
      return api.submitAnswer(sessionId, answer);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["interview", variables.sessionId, "question"],
        { question: data.question }
      );
    },
  });
}
