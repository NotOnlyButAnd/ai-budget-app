import { Button } from "@/components/ui/button";
import type { YesNoQuestion } from "@/types/interview";
import type { QuestionComponentProps } from "./types";

export function YesNoQuestion({
  label,
  description,
  data,
  value,
  onChange,
}: QuestionComponentProps<YesNoQuestion["data"]>) {
  const trueLabel = data.true_label ?? "Да";
  const falseLabel = data.false_label ?? "Нет";

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{label}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <div className="flex gap-3 mt-2">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="flex-1 h-12 text-base"
          onClick={() => onChange(true)}
        >
          {trueLabel}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="flex-1 h-12 text-base"
          onClick={() => onChange(false)}
        >
          {falseLabel}
        </Button>
      </div>
    </div>
  );
}
