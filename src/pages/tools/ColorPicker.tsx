import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ColorHuePicker } from "@/components/color-picker/ColorHuePicker";
import { ColorPalettes } from "@/components/color-picker/ColorPalettes";

const ColorPicker = () => {
  const navigate = useNavigate();
  const [hue, setHue] = useState(262);
  const [saturation, setSaturation] = useState(83);
  const [lightness, setLightness] = useState(58);

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

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

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Palette className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Color Picker</h1>
              <p className="text-muted-foreground">Pick and convert color formats</p>
            </div>
          </div>

          <ColorHuePicker
            color={color}
            hue={hue}
            saturation={saturation}
            lightness={lightness}
            onHueChange={setHue}
            onSaturationChange={setSaturation}
            onLightnessChange={setLightness}
          />

          <ColorPalettes />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;