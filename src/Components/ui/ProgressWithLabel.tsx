import { Field, FieldLabel } from "@/Components/ui/field"
import { Progress } from "@/Components/ui/progress"

export function ProgressWithLabel() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Tasks progress</span>
        <span className="ml-auto">50%</span>
      </FieldLabel>
      <Progress value={5} id="progress-upload" />
    </Field>
  )
}
