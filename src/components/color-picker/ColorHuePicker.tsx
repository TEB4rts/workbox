import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
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

export const ColorHuePicker = ({
  color,
  hue,
  saturation,
  lightness,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
}: ColorHuePickerProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Color code copied to clipboard!");
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div
          className="w-full h-32 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
          style={{ backgroundColor: color }}
        />
        
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