import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DeadlineCalculator = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const calculateDeadline = () => {
    if (!startDate || !duration || !projectName) {
      toast.error("Please fill in all fields");
      return;
    }

    const start = new Date(startDate);
    const days = parseInt(duration);
    
    if (isNaN(days)) {
      toast.error("Please enter a valid number of days");
      return;
    }

    const end = new Date(start);
    end.setDate(start.getDate() + days);
    
    setDeadline(end);
    toast.success("Deadline calculated successfully!");
  };

  const exportToCalendar = () => {
    if (!deadline || !projectName) return;

    const event = {
      title: projectName,
      start: new Date(startDate).toISOString(),
      end: deadline.toISOString(),
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${event.end.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title} Deadline
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${projectName}-deadline.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Calendar event exported successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/#tools')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Deadline Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Project Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="Enter number of days"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={calculateDeadline}
              disabled={!startDate || !duration || !projectName}
            >
              Calculate Deadline
            </Button>

            {deadline && (
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Project Deadline:</p>
                  <p className="text-2xl font-bold">
                    {deadline.toLocaleDateString()}
                  </p>
                </div>
                
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={exportToCalendar}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Export to Calendar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeadlineCalculator;