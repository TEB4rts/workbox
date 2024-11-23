import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const colorPalettes = [
  {
    name: "Modern Neutrals",
    colors: ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA", "#ADB5BD", "#6C757D", "#495057", "#343A40", "#212529"],
  },
  {
    name: "Ocean Breeze",
    colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0"],
  },
  {
    name: "Forest Vibes",
    colors: ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C", "#2E7D32"],
  },
  {
    name: "Sunset Warmth",
    colors: ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726", "#FF9800", "#FB8C00", "#F57C00", "#EF6C00"],
  },
  {
    name: "Berry Tones",
    colors: ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63", "#D81B60", "#C2185B", "#AD1457"],
  }
];

export const ColorPalettes = () => {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard!`);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Color Palettes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {colorPalettes.map((palette, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium text-lg">{palette.name}</h3>
            <div className="grid grid-cols-9 gap-2">
              {palette.colors.map((color, colorIndex) => (
                <Button
                  key={colorIndex}
                  variant="outline"
                  className="w-full h-12 p-0 relative group"
                  onClick={() => copyToClipboard(color)}
                >
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{ backgroundColor: color }}
                  />
                  <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity absolute" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};