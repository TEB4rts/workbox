import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { proposalTemplates } from "@/data/proposalTemplates";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ProposalHeader from "@/components/proposal/ProposalHeader";
import ProposalContent from "@/components/proposal/ProposalContent";

const ProposalEditor = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(proposalTemplates.find(
    (t) => t.id === Number(templateId)
  ));
  const [editedTemplate, setEditedTemplate] = useState(template);

  useEffect(() => {
    if (template) {
      setEditedTemplate(template);
    }
  }, [template]);

  if (!template || !editedTemplate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-red-600">Template Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            The proposal template you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    setTemplate(editedTemplate);
    toast.success("Proposal saved successfully!");
  };

  const handleDownload = () => {
    const content = `
${editedTemplate.name}

Project Overview:
${editedTemplate.sections.projectOverview}

Scope of Work:
${editedTemplate.sections.scopeOfWork}

Deliverables:
${editedTemplate.sections.deliverables.join('\n')}

Pricing:
${editedTemplate.sections.pricing.type === "fixed" 
  ? `Fixed Price: $${editedTemplate.sections.pricing.fixedAmount}`
  : `Hourly Rate: $${editedTemplate.sections.pricing.rate}/hour`}

Payment Terms:
${editedTemplate.sections.paymentTerms}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editedTemplate.name.toLowerCase().replace(/\s+/g, '-')}-proposal.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Proposal downloaded successfully!");
  };

  const handleSendEmail = () => {
    toast.success("Email feature coming soon!");
  };

  const handleContentChange = (field: string, value: any) => {
    setEditedTemplate((prev) => ({
      ...prev!,
      sections: {
        ...prev!.sections,
        [field]: value
      }
    }));
  };

  const handleDeliverableChange = (index: number, value: string) => {
    const newDeliverables = [...editedTemplate.sections.deliverables];
    newDeliverables[index] = value;
    handleContentChange("deliverables", newDeliverables);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <ProposalHeader
          title={editedTemplate.name}
          onTitleChange={(value) => setEditedTemplate({ ...editedTemplate, name: value })}
          onSave={handleSave}
          onSendEmail={handleSendEmail}
          onDownload={handleDownload}
        />
        <ProposalContent
          content={editedTemplate.sections}
          onContentChange={handleContentChange}
          onDeliverableChange={handleDeliverableChange}
        />
      </Card>
    </div>
  );
};

export default ProposalEditor;