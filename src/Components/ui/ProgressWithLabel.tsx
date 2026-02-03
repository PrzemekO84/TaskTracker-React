import { Field, FieldLabel } from "@/Components/ui/field"
import { Progress } from "@/Components/ui/progress"
import { useListTaskContext } from "@/context/ListTaskContext";

export function ProgressWithLabel() {
  const max = 5;

  const { dailyCount } = useListTaskContext();

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Tasks progress {dailyCount}/{max}</span>
        <span className="ml-auto">{Math.min(Math.max((dailyCount / max) * 100, 0), 100)} %</span>
      </FieldLabel>
      <Progress value={dailyCount} id="progress-upload" />
    </Field>
  )
}
