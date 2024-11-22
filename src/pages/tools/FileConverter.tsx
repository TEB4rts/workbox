import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileImage } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FileConverter = () => {
  const navigate = useNavigate();

  const handleFileUpload = () => {
    toast.info("File conversion feature coming soon!");
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

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileImage className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>File Converter</CardTitle>
                <CardDescription>Convert files between different formats</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">Drag and drop files here or click to upload</p>
              <Button onClick={handleFileUpload}>Upload File</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileConverter;