import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ContractTemplateCardProps {
  template: {
    id: number;
    name: string;
    description: string;
    details: string[];
  };
}

const ContractTemplateCard = ({ template }: ContractTemplateCardProps) => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    toast.success("Preparing PDF download...");
  };

  const handleSelect = () => {
    navigate(`/editor/${template.id}`);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{template.name}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleSelect}
          >
            Select
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
      <ul className="text-sm text-gray-500 list-disc list-inside">
        {template.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContractTemplateCard;