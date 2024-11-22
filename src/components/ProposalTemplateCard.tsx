import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProposalTemplate } from "@/data/types";

interface ProposalTemplateCardProps {
  template: ProposalTemplate;
}

const ProposalTemplateCard = ({ template }: ProposalTemplateCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">{template.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
            <div className="flex flex-wrap gap-2">
              {template.sections.deliverables.slice(0, 2).map((deliverable, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {deliverable}
                </span>
              ))}
            </div>
          </div>
          <Button
            onClick={() => navigate(`/proposal/${template.id}`)}
            className="ml-4"
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalTemplateCard;