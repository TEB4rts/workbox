import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface PlagiarismResult {
  score: number;
  matches: Array<{
    text: string;
    similarity: number;
    source: string;
  }>;
  rewrittenVersion: string;
}

const PlagiarismChecker = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [preventAiDetection, setPreventAiDetection] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkPlagiarism = async () => {
    setIsChecking(true);
    try {
      // Simulate plagiarism detection with local analysis
      const words = text.split(/\s+/);
      const commonPhrases = [
        "in order to",
        "due to the fact that",
        "for the purpose of",
        "in light of",
      ];

      const matches = commonPhrases
        .filter(phrase => text.toLowerCase().includes(phrase))
        .map(phrase => ({
          text: phrase,
          similarity: Math.random() * 30 + 70, // Random similarity between 70-100%
          source: "Common Academic Phrases Database",
        }));

      const score = matches.length > 0 
        ? matches.reduce((acc, match) => acc + match.similarity, 0) / matches.length
        : 0;

      // Generate a simple rewritten version
      let rewrittenVersion = text;
      matches.forEach(match => {
        const alternatives: Record<string, string> = {
          "in order to": "to",
          "due to the fact that": "because",
          "for the purpose of": "to",
          "in light of": "considering",
        };
        rewrittenVersion = rewrittenVersion.replace(
          new RegExp(match.text, 'gi'),
          alternatives[match.text] || match.text
        );
      });

      setResult({
        score,
        matches,
        rewrittenVersion,
      });

      if (score === 0) {
        toast.success("No plagiarism detected!");
      } else {
        toast.warning(`Potential plagiarism detected: ${score.toFixed(1)}% similarity`);
      }
    } catch (error) {
      toast.error("Failed to check plagiarism");
    } finally {
      setIsChecking(false);
    }
  };

  const useRewrittenVersion = () => {
    if (result?.rewrittenVersion) {
      setText(result.rewrittenVersion);
      setResult(null);
      toast.success("Using rewritten version");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Copy className="h-6 w-6" />
            Plagiarism Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              checked={preventAiDetection}
              onCheckedChange={setPreventAiDetection}
            />
            <span>Prevent AI Detection</span>
          </div>
          
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[200px]"
          />
          <Button onClick={checkPlagiarism} disabled={isChecking}>
            {isChecking ? "Checking..." : "Check Plagiarism"}
          </Button>
          
          {result && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                {result.score > 30 ? (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                ) : (
                  <Shield className="h-5 w-5 text-success" />
                )}
                <span className="font-semibold">
                  Similarity Score: {result.score.toFixed(1)}%
                </span>
              </div>
              
              {result.matches.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Detected Matches:</h3>
                  <div className="space-y-2">
                    {result.matches.map((match, index) => (
                      <div key={index} className="p-4 border rounded bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                          Matched phrase: "{match.text}"
                        </p>
                        <p className="text-sm">
                          Similarity: {match.similarity.toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Source: {match.source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {result.rewrittenVersion !== text && (
                <div>
                  <h3 className="font-semibold mb-2">Suggested Rewrite:</h3>
                  <div className="p-4 border rounded">
                    <p className="mb-2">{result.rewrittenVersion}</p>
                    <Button
                      variant="outline"
                      onClick={useRewrittenVersion}
                    >
                      Use This Version
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;