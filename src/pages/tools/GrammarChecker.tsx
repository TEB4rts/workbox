import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SpellCheck } from "lucide-react";
import { toast } from "sonner";

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ error: string, suggestion: string }>>([]);

  const checkGrammar = async () => {
    try {
      // This is a mock implementation. In a real app, you'd call an API
      const mockSuggestions = [
        { error: "their", suggestion: "they're" },
        { error: "your", suggestion: "you're" },
      ];
      setSuggestions(mockSuggestions);
      toast.success("Grammar check completed");
    } catch (error) {
      toast.error("Failed to check grammar");
    }
  };

  const applySuggestion = (error: string, suggestion: string) => {
    setText(text.replace(error, suggestion));
    toast.success("Suggestion applied");
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SpellCheck className="h-6 w-6" />
            Grammar & Spell Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[200px]"
          />
          <Button onClick={checkGrammar}>Check Grammar</Button>
          {suggestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Suggestions:</h3>
              {suggestions.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="text-red-500">{item.error}</span>
                  <span>→</span>
                  <span className="text-green-500">{item.suggestion}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(item.error, item.suggestion)}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrammarChecker;