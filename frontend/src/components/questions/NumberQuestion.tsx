import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { NumberQuestion } from "@/types/interview";
import type { QuestionComponentProps } from "./types";

export function NumberQuestion({
  label,
  description,
  data,
  value,
  onChange,
}: QuestionComponentProps<NumberQuestion["data"]>) {
  const [rawValue, setRawValue] = useState<string>(
    typeof value === "number" ? value.toString() : ""
  );

  useEffect(() => {
    setRawValue(typeof value === "number" ? value.toString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setRawValue(input);

    const numericValue = input === "" ? NaN : Number(input);
    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{label}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <Input
        type="number"
        inputMode="numeric"
        value={rawValue}
        onChange={handleChange}
        placeholder={data.placeholder}
        min={data.min}
        max={data.max}
        step={data.step}
        className="text-lg mt-2"
      />
    </div>
  );
}
