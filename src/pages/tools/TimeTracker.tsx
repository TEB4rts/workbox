import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TimeTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
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
          <CardContent>
            <p>Time tracking functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeTracker;