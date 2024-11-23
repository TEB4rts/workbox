import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fonts = [
  { name: "Inter", url: "https://fonts.google.com/specimen/Inter" },
  { name: "Roboto", url: "https://fonts.google.com/specimen/Roboto" },
  { name: "Open Sans", url: "https://fonts.google.com/specimen/Open+Sans" },
  { name: "Lato", url: "https://fonts.google.com/specimen/Lato" },
  { name: "Montserrat", url: "https://fonts.google.com/specimen/Montserrat" },
  { name: "Poppins", url: "https://fonts.google.com/specimen/Poppins" },
  { name: "Source Sans Pro", url: "https://fonts.google.com/specimen/Source+Sans+Pro" },
  { name: "Raleway", url: "https://fonts.google.com/specimen/Raleway" },
  { name: "Ubuntu", url: "https://fonts.google.com/specimen/Ubuntu" },
  { name: "Playfair Display", url: "https://fonts.google.com/specimen/Playfair+Display" },
];

const FontTool = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog");

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Type className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Font Tool</h1>
              <p className="text-muted-foreground">Browse and preview fonts</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Font Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search fonts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Textarea
                placeholder="Enter preview text..."
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Fonts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-6">
                  {filteredFonts.map((font, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{font.name}</h3>
                        <Button
                          variant="outline"
                          onClick={() => window.open(font.url, '_blank')}
                        >
                          Download
                        </Button>
                      </div>
                      <p
                        style={{ fontFamily: font.name }}
                        className="text-lg border rounded-md p-4"
                      >
                        {previewText}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FontTool;