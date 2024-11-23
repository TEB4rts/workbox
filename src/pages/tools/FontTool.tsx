import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const fonts = [
  { name: "Inter", url: "https://fonts.google.com/specimen/Inter", style: "'Inter', sans-serif" },
  { name: "Roboto", url: "https://fonts.google.com/specimen/Roboto", style: "'Roboto', sans-serif" },
  { name: "Open Sans", url: "https://fonts.google.com/specimen/Open+Sans", style: "'Open Sans', sans-serif" },
  { name: "Lato", url: "https://fonts.google.com/specimen/Lato", style: "'Lato', sans-serif" },
  { name: "Montserrat", url: "https://fonts.google.com/specimen/Montserrat", style: "'Montserrat', sans-serif" },
  { name: "Poppins", url: "https://fonts.google.com/specimen/Poppins", style: "'Poppins', sans-serif" },
  { name: "Source Sans Pro", url: "https://fonts.google.com/specimen/Source+Sans+Pro", style: "'Source Sans Pro', sans-serif" },
  { name: "Raleway", url: "https://fonts.google.com/specimen/Raleway", style: "'Raleway', sans-serif" },
  { name: "Ubuntu", url: "https://fonts.google.com/specimen/Ubuntu", style: "'Ubuntu', sans-serif" },
  { name: "Playfair Display", url: "https://fonts.google.com/specimen/Playfair+Display", style: "'Playfair Display', serif" },
  { name: "Merriweather", url: "https://fonts.google.com/specimen/Merriweather", style: "'Merriweather', serif" },
  { name: "Nunito", url: "https://fonts.google.com/specimen/Nunito", style: "'Nunito', sans-serif" },
  { name: "Quicksand", url: "https://fonts.google.com/specimen/Quicksand", style: "'Quicksand', sans-serif" },
  { name: "Josefin Sans", url: "https://fonts.google.com/specimen/Josefin+Sans", style: "'Josefin Sans', sans-serif" },
  { name: "Work Sans", url: "https://fonts.google.com/specimen/Work+Sans", style: "'Work Sans', sans-serif" }
];

const FontTool = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog");
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <BreadcrumbPage>Font Tool</BreadcrumbPage>
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
                style={{ fontFamily: selectedFont.style }}
                className="min-h-[100px] text-lg"
              />
              <div className="text-sm text-muted-foreground">
                Currently previewing: {selectedFont.name}
              </div>
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
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedFont(font)}
                          >
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => window.open(font.url, '_blank')}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <p
                        style={{ fontFamily: font.style }}
                        className="text-lg border rounded-md p-4 cursor-pointer hover:bg-accent/10 transition-colors"
                        onClick={() => setSelectedFont(font)}
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