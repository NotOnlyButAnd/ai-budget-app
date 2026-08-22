import type {
  Answer,
  InterviewSession,
  Question,
  SubmitAnswerResponse,
} from "@/types/interview";

export interface InterviewClient {
  createInterview(): Promise<InterviewSession>;
  getCurrentQuestion(sessionId: string): Promise<{ question: Question }>;
  submitAnswer(
    sessionId: string,
    answer: Answer
  ): Promise<SubmitAnswerResponse>;
}

// Placeholder for the real FastAPI backend.
// This object will be implemented once the backend is ready.
export const realClient: InterviewClient = {
  createInterview: async () => {
    throw new Error("Real backend client is not implemented yet.");
  },
  getCurrentQuestion: async () => {
    throw new Error("Real backend client is not implemented yet.");
  },
  submitAnswer: async () => {
    throw new Error("Real backend client is not implemented yet.");
  },
};
