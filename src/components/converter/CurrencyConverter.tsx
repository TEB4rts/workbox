import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

interface ExchangeRates {
  rates: Record<string, number>;
  base: string;
}

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { data: rates } = useQuery<ExchangeRates>({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const convertedAmount = rates && amount ? 
    (Number(amount) * rates.rates[toCurrency] / rates.rates[fromCurrency]).toFixed(2) 
    : "";

  return (
    <Card className="p-4 dark:bg-gray-800">
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-gray-200">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {rates && Object.keys(rates.rates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-gray-200">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {rates && Object.keys(rates.rates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {convertedAmount && (
          <div className="text-center p-4 bg-primary/10 rounded-lg dark:bg-gray-700">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Converted Amount:
            </p>
            <p className="text-2xl font-bold dark:text-gray-200">
              {convertedAmount} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};