import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnitConverter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("km");
  const [toUnit, setToUnit] = useState("mi");
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) return;

    let converted: number;
    if (fromUnit === "km" && toUnit === "mi") {
      converted = inputValue * 0.621371;
    } else if (fromUnit === "mi" && toUnit === "km") {
      converted = inputValue * 1.60934;
    } else {
      converted = inputValue;
    }
    setResult(converted);
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
                <Languages className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Unit Converter</CardTitle>
                <CardDescription>Convert between different units</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers</SelectItem>
                    <SelectItem value="mi">Miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers</SelectItem>
                    <SelectItem value="mi">Miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value to convert"
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleConvert}
              disabled={!value}
            >
              Convert
            </Button>
            {result !== null && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-gray-600">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {result.toFixed(2)} {toUnit}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitConverter;