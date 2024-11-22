import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RateCalculator = () => {
  const navigate = useNavigate();
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [rate, setRate] = useState<number | null>(null);

  const calculateRate = () => {
    const annualExpenses = parseFloat(monthlyExpenses) * 12;
    const totalRequired = annualExpenses + parseFloat(desiredSalary);
    const weeklyHours = parseFloat(hoursPerWeek);
    const annualHours = weeklyHours * 50; // Assuming 2 weeks vacation
    
    const hourlyRate = totalRequired / annualHours;
    setRate(Math.ceil(hourlyRate));
    toast.success("Rate calculated successfully!");
  };

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
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Rate Calculator</CardTitle>
                <CardDescription>Calculate your ideal hourly rate based on your expenses and income goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses ($)</Label>
              <Input
                id="expenses"
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                placeholder="3000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Desired Annual Salary ($)</Label>
              <Input
                id="salary"
                type="number"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
                placeholder="60000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours per Week</Label>
              <Input
                id="hours"
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                placeholder="40"
              />
            </div>

            <Button 
              className="w-full"
              onClick={calculateRate}
              disabled={!monthlyExpenses || !desiredSalary || !hoursPerWeek}
            >
              Calculate Rate
            </Button>

            {rate !== null && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-gray-600">Your recommended hourly rate:</p>
                <p className="text-3xl font-bold text-primary">${rate}/hour</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RateCalculator;