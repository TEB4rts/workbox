import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SpellCheck } from "lucide-react";
import { toast } from "sonner";

interface GrammarError {
  error: string;
  suggestion: string;
  context: string;
  position: number;
}

const commonErrors = {
  "their": ["they're", "there"],
  "your": ["you're"],
  "its": ["it's"],
  "loose": ["lose"],
  "affect": ["effect"],
  "then": ["than"],
  "weather": ["whether"],
  "whose": ["who's"],
  "to": ["too", "two"],
  "accept": ["except"],
} as const;

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<GrammarError[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (text.length > 0) {
        checkGrammar();
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [text]);

  const checkGrammar = async () => {
    setIsChecking(true);
    try {
      // Simulate API call with local grammar checking
      const words = text.split(/\s+/);
      const errors: GrammarError[] = [];

      words.forEach((word, index) => {
        const lowerWord = word.toLowerCase().replace(/[.,!?]$/, '');
        if (commonErrors[lowerWord as keyof typeof commonErrors]) {
          errors.push({
            error: word,
            suggestion: commonErrors[lowerWord as keyof typeof commonErrors][0],
            context: words.slice(Math.max(0, index - 2), index + 3).join(" "),
            position: index,
          });
        }
      });

      setSuggestions(errors);
      if (errors.length === 0) {
        toast.success("No grammar errors found!");
      }
    } catch (error) {
      toast.error("Failed to check grammar");
    } finally {
      setIsChecking(false);
    }
  };

  const applySuggestion = (error: GrammarError) => {
    const words = text.split(/\s+/);
    words[error.position] = error.suggestion;
    setText(words.join(" "));
    setSuggestions(suggestions.filter(s => s.position !== error.position));
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
          <Button onClick={checkGrammar} disabled={isChecking}>
            {isChecking ? "Checking..." : "Check Grammar"}
          </Button>
          {suggestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Suggestions:</h3>
              {suggestions.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 p-4 border rounded bg-muted/50">
                  <p className="text-sm text-muted-foreground">Context: "{item.context}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">{item.error}</span>
                    <span>→</span>
                    <span className="text-green-500">{item.suggestion}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applySuggestion(item)}
                    >
                      Apply
                    </Button>
                  </div>
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