import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ContractTemplateCardProps {
  template: {
    id: number;
    name: string;
    description: string;
    details: string[];
    content: string;
    logoPlaceholder?: string;
  };
}

const ContractTemplateCard = ({ template }: ContractTemplateCardProps) => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template downloaded successfully!");
  };

  const handleSelect = () => {
    navigate(`/editor/${template.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        {template.logoPlaceholder && (
          <div className="w-full h-32 bg-gray-100 rounded-t-lg overflow-hidden">
            <img
              src={template.logoPlaceholder}
              alt="Template preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="hover:bg-primary/10"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSelect}
              className="bg-primary hover:bg-primary/90"
            >
              Select
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
          {template.details.map((detail, index) => (
            <li key={index} className="text-gray-600">{detail}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ContractTemplateCard;