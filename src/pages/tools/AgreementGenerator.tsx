import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AgreementGenerator = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [parties, setParties] = useState("");
  const [terms, setTerms] = useState("");

  const handleGenerate = () => {
    if (!title || !parties || !terms) {
      toast.error("Please fill in all fields");
      return;
    }

    const agreement = `
AGREEMENT

${title.toUpperCase()}

This agreement is made between:
${parties}

TERMS AND CONDITIONS:
${terms}

Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([agreement], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-agreement.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Agreement generated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
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
                <CardTitle>Agreement Generator</CardTitle>
                <CardDescription>Generate custom agreements and NDAs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Agreement Title</Label>
              <Input
                id="title"
                placeholder="e.g., Non-Disclosure Agreement"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parties">Parties Involved</Label>
              <Textarea
                id="parties"
                placeholder="Enter the names and details of all parties involved"
                value={parties}
                onChange={(e) => setParties(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Terms and Conditions</Label>
              <Textarea
                id="terms"
                placeholder="Enter the terms and conditions of the agreement"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleGenerate}
              disabled={!title || !parties || !terms}
            >
              Generate Agreement
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgreementGenerator;