import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Info } from "lucide-react";
import { toast } from "sonner";

interface ColorHuePickerProps {
  color: string;
  hue: number;
  saturation: number;
  lightness: number;
  onHueChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onLightnessChange: (value: number) => void;
}

const getColorName = (hue: number, saturation: number, lightness: number) => {
  // Basic color name detection based on HSL values
  if (lightness < 20) return "Dark";
  if (lightness > 80) return "Light";
  
  if (saturation < 20) return "Gray";
  
  const hueNames: Record<number, string> = {
    0: "Red",
    30: "Orange",
    60: "Yellow",
    120: "Green",
    180: "Cyan",
    240: "Blue",
    300: "Purple",
    360: "Red"
  };
  
  const closestHue = Object.keys(hueNames).reduce((prev, curr) => {
    return Math.abs(hue - Number(curr)) < Math.abs(hue - Number(prev)) ? curr : prev;
  });
  
  return hueNames[Number(closestHue)];
};

export const ColorHuePicker = ({
  color,
  hue,
  saturation,
  lightness,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
}: ColorHuePickerProps) => {
  const colorName = getColorName(hue, saturation, lightness);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Color code copied to clipboard!");
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <div
            className="w-full h-32 rounded-lg border cursor-pointer transition-all hover:shadow-lg relative group"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-black/60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>{colorName}</span>
              </div>
              <div className="mt-2">HSL: {hue}°, {saturation}%, {lightness}%</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Hue</Label>
            <Slider
              value={[hue]}
              min={0}
              max={360}
              step={1}
              onValueChange={(value) => onHueChange(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Saturation</Label>
            <Slider
              value={[saturation]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onSaturationChange(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Lightness</Label>
            <Slider
              value={[lightness]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onLightnessChange(value[0])}
            />
          </div>
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
  );
};