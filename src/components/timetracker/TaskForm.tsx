import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TaskFormProps {
  task: string;
  description: string;
  expectedOutcome: string;
  isRunning: boolean;
  onTaskChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onExpectedOutcomeChange: (value: string) => void;
}

export const TaskForm = ({
  task,
  description,
  expectedOutcome,
  isRunning,
  onTaskChange,
  onDescriptionChange,
  onExpectedOutcomeChange
}: TaskFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task">Task Title</Label>
        <Input
          id="task"
          placeholder="What are you working on?"
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
          disabled={isRunning}
          className="dark:bg-gray-800 dark:text-gray-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Task Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what you're doing..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={isRunning}
          className="dark:bg-gray-800 dark:text-gray-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectedOutcome">Expected Outcome</Label>
        <Textarea
          id="expectedOutcome"
          placeholder="What should be achieved?"
          value={expectedOutcome}
          onChange={(e) => onExpectedOutcomeChange(e.target.value)}
          disabled={isRunning}
          className="dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
    </div>
  );
};