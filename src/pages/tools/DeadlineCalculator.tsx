import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const DeadlineCalculator = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [deadline, setDeadline] = useState<string | null>(null);

  const calculateDeadline = () => {
    if (!startDate || !duration) {
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
    
    setDeadline(end.toLocaleDateString());
    toast.success("Deadline calculated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#tools">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Deadline Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate('/#tools')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Deadline Calculator</CardTitle>
                <CardDescription>Calculate project deadlines and delivery dates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
              disabled={!startDate || !duration}
            >
              Calculate Deadline
            </Button>

            {deadline && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-gray-600">Project Deadline:</p>
                <p className="text-2xl font-bold text-primary">{deadline}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeadlineCalculator;