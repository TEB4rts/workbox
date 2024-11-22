import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WordCounter = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;

  const handleDownload = () => {
    const content = `Word Count Analysis
    
Total Words: ${wordCount}
Total Characters (with spaces): ${charCount}
Total Characters (without spaces): ${charNoSpaces}

Text Content:
${text}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-count-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Analysis downloaded successfully!");
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
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Word Counter</CardTitle>
                <CardDescription>Count words and characters in your text</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px]"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{wordCount}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{charCount}</div>
                <div className="text-sm text-gray-600">Characters (with spaces)</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{charNoSpaces}</div>
                <div className="text-sm text-gray-600">Characters (no spaces)</div>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={handleDownload}
              disabled={!text.trim()}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordCounter;