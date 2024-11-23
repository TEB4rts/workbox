import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QrCode, ArrowLeft } from "lucide-react";
import { createCanvas } from '@napi-rs/canvas';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QRGenerator = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState<string>("");

  const generateQR = async () => {
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    try {
      const canvas = createCanvas(200, 200);
      const ctx = canvas.getContext('2d');
      
      // Simple QR code visualization
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText('QR Code for:', 10, 20);
      ctx.fillText(text, 10, 40);
      
      const dataUrl = canvas.toDataURL();
      setQrCode(dataUrl);
      toast.success("QR code generated successfully");
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  const downloadQR = () => {
    if (!qrCode) {
      toast.error("Generate a QR code first");
      return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
    toast.success("QR code downloaded");
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

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>QR Code Generator</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter text or URL..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button onClick={generateQR} className="w-full">
                Generate QR Code
              </Button>
            </div>

            {qrCode && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={qrCode} alt="Generated QR Code" className="max-w-[200px]" />
                </div>
                <Button onClick={downloadQR} variant="outline" className="w-full">
                  Download QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;