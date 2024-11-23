import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Play, Pause, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  task: string;
  description: string;
  expectedOutcome: string;
  duration: number;
  date: string;
  status: 'in-progress' | 'completed' | 'pending';
}

const TimeTracker = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (!task && !isRunning) {
      toast.error("Please enter task details");
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleSave = () => {
    if (time === 0) {
      toast.error("No time to save");
      return;
    }

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      task,
      description,
      expectedOutcome,
      duration: time,
      date: new Date().toLocaleDateString(),
      status: 'completed'
    };

    setEntries([...entries, newEntry]);
    setTime(0);
    setTask("");
    setDescription("");
    setExpectedOutcome("");
    setIsRunning(false);
    toast.success("Time entry saved successfully!");
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success("Entry deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/#tools")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-6 w-6" />
              Time Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task">Task Title</Label>
                <Input
                  id="task"
                  placeholder="What are you working on?"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're doing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedOutcome">Expected Outcome</Label>
                <Textarea
                  id="expectedOutcome"
                  placeholder="What should be achieved?"
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <p className="text-4xl font-mono font-bold">
                  {formatTime(time)}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  onClick={handleStartStop}
                  variant={isRunning ? "destructive" : "default"}
                >
                  {isRunning ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Start
                    </>
                  )}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={time === 0}
                  variant="outline"
                >
                  <Save className="mr-2 h-4 w-4" /> Save Entry
                </Button>
              </div>
            </div>

            {entries.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Recent Time Entries</h3>
                <div className="space-y-2">
                  {entries.map((entry) => (
                    <Card key={entry.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{entry.task}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.date} - {formatTime(entry.duration)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm">{entry.description}</p>
                        <p className="text-sm font-medium">Expected: {entry.expectedOutcome}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeTracker;