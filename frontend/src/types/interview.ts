export interface BaseQuestion {
  id: string;
  component: string;
  label: string;
  description?: string;
  required: boolean;
}

export interface CurrencyQuestion extends BaseQuestion {
  component: "currency";
  data: {
    currency: string;
    min?: number;
    max?: number;
    placeholder?: string;
  };
}

export interface SingleChoiceQuestion extends BaseQuestion {
  component: "single_choice";
  data: {
    options: Array<{ value: string; label: string }>;
  };
}

export interface NumberQuestion extends BaseQuestion {
  component: "number";
  data: {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  };
}

export interface YesNoQuestion extends BaseQuestion {
  component: "yes_no";
  data: {
    true_label?: string;
    false_label?: string;
  };
}

export type Question =
  | CurrencyQuestion
  | SingleChoiceQuestion
  | NumberQuestion
  | YesNoQuestion;

export type AnswerValue = string | number | boolean;

export interface Answer {
  question_id: string;
  value: AnswerValue;
}

export interface InterviewSession {
  session_id: string;
  question: Question;
}

export interface SubmitAnswerResponse {
  question: Question | null;
  completed: boolean;
}

export type QuestionComponentType = Question["component"];
