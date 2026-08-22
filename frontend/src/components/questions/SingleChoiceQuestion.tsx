import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SingleChoiceQuestion } from "@/types/interview";
import type { QuestionComponentProps } from "./types";

export function SingleChoiceQuestion({
  label,
  description,
  data,
  value,
  onChange,
}: QuestionComponentProps<SingleChoiceQuestion["data"]>) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{label}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <RadioGroup
        value={typeof value === "string" ? value : undefined}
        onValueChange={onChange}
        className="grid gap-3 mt-2"
      >
        {data.options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-3 rounded-md border border-input p-3 hover:bg-accent/50 cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <Label
              htmlFor={option.value}
              className="cursor-pointer flex-1 font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
