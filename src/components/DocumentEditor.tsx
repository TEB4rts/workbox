import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { contractTemplates } from "@/data/contractTemplates";

interface DocumentEditorProps {
  templateId: string;
}

const DocumentEditor = ({ templateId }: DocumentEditorProps) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  useEffect(() => {
    const template = contractTemplates.find(t => t.id === parseInt(templateId));
    if (template) {
      setTitle(template.name);
      setContent(template.content);
      setOriginalContent(template.content);
    }
  }, [templateId]);

  const handleSave = () => {
    // Save as draft in localStorage
    localStorage.setItem(`draft-${templateId}`, JSON.stringify({ title, content }));
    toast.success("Document saved as draft!");
  };

  const handleDownload = () => {
    // Create a Blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Document downloaded successfully!");
  };

  const handleReset = () => {
    setContent(originalContent);
    toast.success("Content reset to original template");
  };

  const applyFormatting = (format: string) => {
    // Basic text formatting implementation
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'underline':
        newText = `_${selectedText}_`;
        break;
      default:
        return;
    }

    setContent(
      content.substring(0, start) + newText + content.substring(end)
    );
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
            className="min-h-[500px] resize-none font-mono"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleReset}>
            Reset to Original
          </Button>
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