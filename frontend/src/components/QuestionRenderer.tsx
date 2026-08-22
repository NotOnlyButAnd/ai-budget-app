import {
  CurrencyQuestion,
  NumberQuestion,
  SingleChoiceQuestion,
  YesNoQuestion,
} from "@/components/questions";
import { Button } from "@/components/ui/button";
import type { AnswerValue, Question } from "@/types/interview";

interface QuestionRendererProps {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  onSubmit,
  isSubmitting,
}: QuestionRendererProps) {
  const commonProps = {
    label: question.label,
    description: question.description,
    required: question.required,
    value,
    onChange,
  };

  return (
    <div className="flex flex-col gap-6">
      {question.component === "currency" && (
        <CurrencyQuestion {...commonProps} data={question.data} />
      )}
      {question.component === "single_choice" && (
        <SingleChoiceQuestion {...commonProps} data={question.data} />
      )}
      {question.component === "number" && (
        <NumberQuestion {...commonProps} data={question.data} />
      )}
      {question.component === "yes_no" && (
        <YesNoQuestion {...commonProps} data={question.data} />
      )}

      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full h-12 text-base"
      >
        {isSubmitting ? "Сохранение..." : "Далее"}
      </Button>
    </div>
  );
}
