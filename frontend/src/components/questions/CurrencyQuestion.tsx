import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { CurrencyQuestion } from "@/types/interview";
import type { QuestionComponentProps } from "./types";

export function CurrencyQuestion({
  label,
  description,
  data,
  value,
  onChange,
}: QuestionComponentProps<CurrencyQuestion["data"]>) {
  const [rawValue, setRawValue] = useState<string>(
    typeof value === "number" ? value.toString() : ""
  );

  useEffect(() => {
    setRawValue(typeof value === "number" ? value.toString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d]/g, "");
    setRawValue(input);

    const numericValue = input === "" ? NaN : Number(input);
    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const displayValue = rawValue
    ? new Intl.NumberFormat("ru-RU").format(Number(rawValue))
    : "";

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{label}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <Input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        placeholder={data.placeholder}
        min={data.min}
        max={data.max}
        className="text-lg mt-2"
      />
    </div>
  );
}
