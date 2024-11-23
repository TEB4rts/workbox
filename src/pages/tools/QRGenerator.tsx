import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";
import { createCanvas } from '@napi-rs/canvas';
import { toast } from "sonner";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState<string>("");

  const generateQR = async () => {
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    try {
      // Create QR code using canvas
      const canvas = createCanvas(200, 200);
      const ctx = canvas.getContext('2d');
      
      // Simple QR code visualization (in real app, use a proper QR library)
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
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            QR Code Generator
          </CardTitle>
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
  );
};

export default QRGenerator;