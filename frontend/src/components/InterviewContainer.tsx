import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getStoredSessionId,
  setStoredSessionId,
  useCreateInterview,
  useCurrentQuestion,
  useSubmitAnswer,
} from "@/hooks/useInterview";
import type { AnswerValue, Question } from "@/types/interview";
import { InterviewHeader } from "./InterviewHeader";
import { QuestionRenderer } from "./QuestionRenderer";

const TOTAL_QUESTIONS = 5;

export function InterviewContainer() {
  const [sessionId, setSessionId] = useState<string | null>(getStoredSessionId);
  const [currentValue, setCurrentValue] = useState<AnswerValue | undefined>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInterview = useCreateInterview();
  const submitAnswer = useSubmitAnswer();

  const hasStoredSession = Boolean(sessionId);
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    error: questionError,
    isError: isQuestionError,
  } = useCurrentQuestion(sessionId, hasStoredSession);

  useEffect(() => {
    if (!sessionId && !createInterview.isPending) {
      createInterview.mutate(undefined, {
        onSuccess: (data) => {
          setSessionId(data.session_id);
          setCurrentValue(undefined);
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Не удалось начать интервью");
        },
      });
    }
  }, [sessionId, createInterview]);

  useEffect(() => {
    if (isQuestionError && questionError instanceof Error) {
      if (questionError.message === "Session not found") {
        setStoredSessionId(null);
        setSessionId(null);
      } else {
        setError(questionError.message);
      }
    }
  }, [isQuestionError, questionError]);

  const currentQuestion: Question | undefined = questionData?.question;

  const progress = currentQuestion
    ? Math.round(
        ((getQuestionIndex(currentQuestion.id) + 1) / TOTAL_QUESTIONS) * 100
      )
    : 0;

  const handleSubmit = () => {
    if (!sessionId || !currentQuestion) return;

    setError(null);
    submitAnswer.mutate(
      {
        sessionId,
        answer: {
          question_id: currentQuestion.id,
          value: currentValue ?? "",
        },
      },
      {
        onSuccess: (data) => {
          setCurrentValue(undefined);
          if (data.completed) {
            setIsCompleted(true);
            setStoredSessionId(null);
          }
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Не удалось сохранить ответ");
        },
      }
    );
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <InterviewHeader progress={100} />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-xl">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">Интервью завершено</h2>
              <p className="text-muted-foreground">
                Спасибо за ответы. В следующей версии здесь появится ваш
                финансовый профиль и персональный бюджет.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const isLoading =
    createInterview.isPending ||
    isQuestionLoading ||
    (!sessionId && !currentQuestion);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <InterviewHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <InterviewHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <p className="text-muted-foreground">
            Не удалось загрузить вопрос. Попробуйте обновить страницу.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <InterviewHeader progress={progress} />
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-xl">
          <CardContent className="pt-6">
            <QuestionRenderer
              question={currentQuestion}
              value={currentValue}
              onChange={setCurrentValue}
              onSubmit={handleSubmit}
              isSubmitting={submitAnswer.isPending}
            />
            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function getQuestionIndex(questionId: string): number {
  const indexMap: Record<string, number> = {
    monthly_income: 0,
    housing_type: 1,
    has_car: 2,
    family_size: 3,
    food_expenses: 4,
  };
  return indexMap[questionId] ?? 0;
}
