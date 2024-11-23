import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

type ConversionType = "length" | "currency" | "weight" | "temperature";

const UnitConverter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [conversionType, setConversionType] = useState<ConversionType>("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const { data: exchangeRates } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      return response.json();
    },
    enabled: conversionType === "currency"
  });

  const units = {
    length: ["km", "mi", "m", "ft"],
    currency: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"],
    weight: ["kg", "lb", "g", "oz"],
    temperature: ["°C", "°F", "K"]
  };

  const handleConvert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      toast.error("Please enter a valid number");
      return;
    }

    let converted: number;

    if (conversionType === "currency" && exchangeRates) {
      const fromRate = exchangeRates.rates[fromUnit];
      const toRate = exchangeRates.rates[toUnit];
      converted = (inputValue / fromRate) * toRate;
    } else {
      converted = inputValue;
    }

    setResult(converted);
    toast.success("Conversion completed!");
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
              <Languages className="h-6 w-6" />
              Unit Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Conversion Type</Label>
              <Select 
                value={conversionType} 
                onValueChange={(value) => setConversionType(value as ConversionType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Length</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units[conversionType].map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
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
                    {units[conversionType].map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value to convert"
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleConvert}
              disabled={!value || !fromUnit || !toUnit}
            >
              Convert
            </Button>

            {result !== null && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Result:</p>
                <p className="text-2xl font-bold">
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