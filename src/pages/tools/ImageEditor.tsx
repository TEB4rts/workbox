import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Edit, Download, RotateCw, Contrast, Sun, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ImageEditor = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const applyEffects = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx || !image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply rotation
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width/2, -canvas.height/2);

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(canvas, 0, 0);

      ctx.restore();
    };
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Image downloaded successfully!");
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
                <Edit className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Image Editor</CardTitle>
                <CardDescription>Edit and enhance your images</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Upload an image to start editing</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="max-w-sm mx-auto"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto mx-auto"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Sun className="h-4 w-4" /> Brightness
                    </Label>
                    <Slider
                      value={[brightness]}
                      onValueChange={(value) => {
                        setBrightness(value[0]);
                        applyEffects();
                      }}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Contrast className="h-4 w-4" /> Contrast
                    </Label>
                    <Slider
                      value={[contrast]}
                      onValueChange={(value) => {
                        setContrast(value[0]);
                        applyEffects();
                      }}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <RotateCw className="h-4 w-4" /> Rotation
                    </Label>
                    <Slider
                      value={[rotation]}
                      onValueChange={(value) => {
                        setRotation(value[0]);
                        applyEffects();
                      }}
                      min={0}
                      max={360}
                      step={90}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setImage(null)}>
                    Upload New Image
                  </Button>
                  <Button onClick={downloadImage}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageEditor;