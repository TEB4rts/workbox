import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Palette, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ColorPicker = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#6D28D9");
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [showPalette, setShowPalette] = useState(false);

  const predefinedColors = [
    "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899",
    "#6EE7B7", "#93C5FD", "#C084FC", "#F472B6", "#FCD34D", "#6B7280"
  ];

  const generateColorPalette = (baseColor: string) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return [
      hslToHex(hsl.h, hsl.s, 90), // Lightest
      hslToHex(hsl.h, hsl.s, 70),
      hslToHex(hsl.h, hsl.s, 50), // Base
      hslToHex(hsl.h, hsl.s, 30),
      hslToHex(hsl.h, hsl.s, 10), // Darkest
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Color code copied to clipboard!");
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const updateHSL = () => {
    const newColor = hslToHex(hue, saturation, lightness);
    setColor(newColor);
  };

  const colorPalette = generateColorPalette(color);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
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
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Color Picker</CardTitle>
                <CardDescription>Pick and convert color formats</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div 
                className="w-full h-32 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
                style={{ backgroundColor: color }}
                onClick={() => setShowPalette(!showPalette)}
              />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Hue</Label>
                  <Slider
                    value={[hue]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value) => {
                      setHue(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Saturation</Label>
                  <Slider
                    value={[saturation]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setSaturation(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Lightness</Label>
                  <Slider
                    value={[lightness]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setLightness(value[0]);
                      updateHSL();
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {colorPalette.map((c, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>

              {showPalette && (
                <div className="grid grid-cols-6 gap-2 p-4 bg-white rounded-lg shadow-lg border animate-fade-in">
                  {predefinedColors.map((c) => (
                    <div
                      key={c}
                      className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>HEX</Label>
                <div className="flex gap-2">
                  <Input value={color.toUpperCase()} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(color.toUpperCase())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>HSL</Label>
                <div className="flex gap-2">
                  <Input value={`hsl(${hue}, ${saturation}%, ${lightness}%)`} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`hsl(${hue}, ${saturation}%, ${lightness}%)`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPicker;