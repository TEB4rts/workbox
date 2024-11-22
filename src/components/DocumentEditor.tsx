import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface DocumentEditorProps {
  templateId: string;
}

const DocumentEditor = ({ templateId }: DocumentEditorProps) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = () => {
    toast.success("Document saved successfully!");
  };

  const handleDownload = () => {
    toast.success("Preparing document for download...");
    // Implementation for document download would go here
  };

  const applyFormatting = (format: string) => {
    // Implementation for text formatting would go here
    toast.success(`Applied ${format} formatting`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <Input
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold"
          />
          
          <div className="flex gap-2 pb-4 border-b">
            <Button variant="outline" size="icon" onClick={() => applyFormatting("bold")}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => applyFormatting("italic")}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => applyFormatting("underline")}>
              <Underline className="h-4 w-4" />
            </Button>
            <div className="border-l mx-2" />
            <Button variant="outline" size="icon" onClick={() => applyFormatting("left")}>
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => applyFormatting("center")}>
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => applyFormatting("right")}>
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your document..."
            className="min-h-[500px] resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleSave}>
            Save Draft
          </Button>
          <Button onClick={handleDownload}>
            <FileDown className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DocumentEditor;