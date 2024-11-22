import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, QrCode, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QRGenerator = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleGenerate = () => {
    if (!content) {
      toast.error("Please enter content for the QR code");
      return;
    }
    toast.info("QR code generation feature coming soon!");
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
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>QR Code Generator</CardTitle>
                <CardDescription>Generate QR codes for any content</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Content for QR Code</Label>
              <Input
                id="content"
                placeholder="Enter URL, text, or any content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={handleGenerate}
                disabled={!content}
              >
                Generate QR Code
              </Button>
              <Button 
                variant="outline"
                disabled={!content}
                onClick={() => toast.info("Download feature coming soon!")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;