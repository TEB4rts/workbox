import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Timer, Play, Pause, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  task: string;
  duration: number;
  date: string;
}

const TimeTracker = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [task, setTask] = useState("");
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
      toast.error("Please enter a task description");
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
      duration: time,
      date: new Date().toLocaleDateString(),
    };

    setEntries([...entries, newEntry]);
    setTime(0);
    setTask("");
    setIsRunning(false);
    toast.success("Time entry saved successfully!");
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success("Entry deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Timer className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Time Tracker</CardTitle>
                <CardDescription>Track time spent on your projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  placeholder="What are you working on?"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <p className="text-4xl font-mono font-bold text-primary">
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
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{entry.task}</p>
                          <p className="text-sm text-gray-500">
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