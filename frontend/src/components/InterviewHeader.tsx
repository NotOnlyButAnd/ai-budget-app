import { Wallet } from "lucide-react";

interface InterviewHeaderProps {
  progress?: number;
}

export function InterviewHeader({ progress = 0 }: InterviewHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Wallet className="size-5" />
        <span className="font-medium">AI Budget</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Прогресс</span>
        <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      </div>
    </header>
  );
}
