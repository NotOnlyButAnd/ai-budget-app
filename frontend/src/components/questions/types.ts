import type { AnswerValue } from "@/types/interview";

export interface QuestionComponentProps<TData> {
  label: string;
  description?: string;
  required: boolean;
  data: TData;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
}
