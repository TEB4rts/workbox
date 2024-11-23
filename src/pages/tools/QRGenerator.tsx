import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, ArrowLeft, Upload, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QRCode from "qrcode";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const QRGenerator = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState<string>("");
  const [scanResult, setScanResult] = useState("");
  
  const generateQR = async () => {
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    try {
      const url = await QRCode.toDataURL(text);
      setQrCode(url);
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

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    scanner.render(success, error);

    function success(result: string) {
      scanner.clear();
      setScanResult(result);
      toast.success("QR Code scanned successfully!");
    }

    function error(err: any) {
      console.warn(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#tools">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>QR Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate('/#tools')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>QR Code Tool</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate QR Code</TabsTrigger>
                <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter text or URL..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button onClick={generateQR} className="w-full">
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </Button>
                </div>

                {qrCode && (
                  <div className="space-y-4">
                    <div className="flex justify-center p-6 bg-white rounded-lg shadow-sm">
                      <img src={qrCode} alt="Generated QR Code" className="max-w-[200px]" />
                    </div>
                    <Button onClick={downloadQR} variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="scan" className="space-y-4">
                <div className="space-y-4">
                  <Button onClick={startScanner} className="w-full">
                    <Scan className="mr-2 h-4 w-4" />
                    Start Scanner
                  </Button>
                  
                  <div id="reader" className="w-full"></div>
                  
                  {scanResult && (
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="font-semibold mb-2">Scan Result:</h3>
                      <p className="break-all">{scanResult}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;