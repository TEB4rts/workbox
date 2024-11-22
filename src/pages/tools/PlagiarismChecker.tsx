import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Shield } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const PlagiarismChecker = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    plagiarismScore: number;
    highlightedText: string;
    rewrittenVersion: string;
  } | null>(null);
  const [preventAiDetection, setPreventAiDetection] = useState(false);

  const checkPlagiarism = async () => {
    try {
      // Mock implementation - in real app, call API
      const mockResult = {
        plagiarismScore: 25,
        highlightedText: text.replace(
          "copied content",
          '<span class="bg-yellow-200">copied content</span>'
        ),
        rewrittenVersion: "This is a unique, plagiarism-free version of the text."
      };
      setResult(mockResult);
      toast.success("Plagiarism check completed");
    } catch (error) {
      toast.error("Failed to check plagiarism");
    }
  };

  const useRewrittenVersion = () => {
    setText(result?.rewrittenVersion || "");
    toast.success("Using rewritten version");
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
          <Button onClick={checkPlagiarism}>Check Plagiarism</Button>
          
          {result && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">
                  Plagiarism Score: {result.plagiarismScore}%
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Highlighted Content:</h3>
                <div
                  className="p-4 border rounded"
                  dangerouslySetInnerHTML={{ __html: result.highlightedText }}
                />
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Rewritten Version:</h3>
                <div className="p-4 border rounded">
                  {result.rewrittenVersion}
                  <Button
                    className="mt-2"
                    variant="outline"
                    onClick={useRewrittenVersion}
                  >
                    Use This Version
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;