import type {
  Answer,
  InterviewSession,
  Question,
  SubmitAnswerResponse,
} from "@/types/interview";
import type { InterviewClient } from "./client";

interface MockSession {
  session_id: string;
  currentQuestionIndex: number;
  answers: Record<string, Answer["value"]>;
}

const sessions = new Map<string, MockSession>();

const questions: Question[] = [
  {
    id: "monthly_income",
    component: "currency",
    label: "Какой ваш ежемесячный доход?",
    description: "Укажите сумму после вычета налогов",
    required: true,
    data: {
      currency: "RUB",
      min: 0,
      placeholder: "200 000 ₽",
    },
  },
  {
    id: "housing_type",
    component: "single_choice",
    label: "Какое у вас жильё?",
    description: "Выберите вариант, который вам подходит",
    required: true,
    data: {
      options: [
        { value: "rent", label: "Аренда" },
        { value: "mortgage", label: "Ипотека" },
        { value: "owned", label: "Собственное жильё" },
        { value: "parents", label: "Живу с родителями" },
      ],
    },
  },
  {
    id: "has_car",
    component: "yes_no",
    label: "Есть ли у вас машина?",
    required: true,
    data: {
      true_label: "Да",
      false_label: "Нет",
    },
  },
  {
    id: "family_size",
    component: "number",
    label: "Сколько человек в вашей семье?",
    description: "Включая вас",
    required: true,
    data: {
      min: 1,
      max: 20,
      step: 1,
      placeholder: "1",
    },
  },
  {
    id: "food_expenses",
    component: "currency",
    label: "Сколько вы тратите на еду в месяц?",
    required: true,
    data: {
      currency: "RUB",
      min: 0,
      placeholder: "30 000 ₽",
    },
  },
];

function generateSessionId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const mockClient: InterviewClient = {
  createInterview: async (): Promise<InterviewSession> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const session: MockSession = {
      session_id: generateSessionId(),
      currentQuestionIndex: 0,
      answers: {},
    };
    sessions.set(session.session_id, session);

    return {
      session_id: session.session_id,
      question: questions[0],
    };
  },

  getCurrentQuestion: async (
    sessionId: string
  ): Promise<{ question: Question }> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    const question = questions[session.currentQuestionIndex];
    if (!question) {
      throw new Error("No current question available");
    }

    return { question };
  },

  submitAnswer: async (
    sessionId: string,
    answer: Answer
  ): Promise<SubmitAnswerResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    const currentQuestion = questions[session.currentQuestionIndex];
    if (!currentQuestion || currentQuestion.id !== answer.question_id) {
      throw new Error("Invalid question_id");
    }

    session.answers[answer.question_id] = answer.value;
    session.currentQuestionIndex += 1;

    const nextQuestion = questions[session.currentQuestionIndex] ?? null;
    const completed = nextQuestion === null;

    return {
      question: nextQuestion,
      completed,
    };
  },
};
