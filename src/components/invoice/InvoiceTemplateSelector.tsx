import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const templates: InvoiceTemplate[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and modern business invoice",
    preview: "/templates/invoice-professional.png"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stylish design for creative professionals",
    preview: "/templates/invoice-creative.png"
  }
];

export const InvoiceTemplateSelector = ({
  onSelect,
  onLogoUpload
}: {
  onSelect: (template: InvoiceTemplate) => void;
  onLogoUpload: (file: File) => void;
}) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Logo file size must be less than 5MB");
        return;
      }
      onLogoUpload(file);
      toast.success("Logo uploaded successfully");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="logo">Company Logo</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="dark:bg-gray-800 dark:text-gray-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            onClick={() => onSelect(template)}
          >
            <CardHeader>
              <CardTitle className="text-lg dark:text-gray-200">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};