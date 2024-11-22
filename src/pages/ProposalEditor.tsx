import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { proposalTemplates } from "@/data/proposalTemplates";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Mail, Save } from "lucide-react";
import { toast } from "sonner";

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
          <p className="text-gray-600 mt-2">
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
    // Create a formatted string of the proposal content
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
    // This is a placeholder for email functionality
    toast.success("Email feature coming soon!");
  };

  const updateDeliverable = (index: number, value: string) => {
    const newDeliverables = [...editedTemplate.sections.deliverables];
    newDeliverables[index] = value;
    setEditedTemplate({
      ...editedTemplate,
      sections: {
        ...editedTemplate.sections,
        deliverables: newDeliverables
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Input
            value={editedTemplate.name}
            onChange={(e) => setEditedTemplate({
              ...editedTemplate,
              name: e.target.value
            })}
            className="text-2xl font-bold w-2/3"
          />
          <div className="space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleSendEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
            <Textarea
              value={editedTemplate.sections.projectOverview}
              onChange={(e) => setEditedTemplate({
                ...editedTemplate,
                sections: {
                  ...editedTemplate.sections,
                  projectOverview: e.target.value
                }
              })}
              className="min-h-[100px]"
            />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Scope of Work</h2>
            <Textarea
              value={editedTemplate.sections.scopeOfWork}
              onChange={(e) => setEditedTemplate({
                ...editedTemplate,
                sections: {
                  ...editedTemplate.sections,
                  scopeOfWork: e.target.value
                }
              })}
              className="min-h-[100px]"
            />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Deliverables</h2>
            <div className="space-y-2">
              {editedTemplate.sections.deliverables.map((deliverable, index) => (
                <Input
                  key={index}
                  value={deliverable}
                  onChange={(e) => updateDeliverable(index, e.target.value)}
                />
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Pricing</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Type:</span>
                <select
                  value={editedTemplate.sections.pricing.type}
                  onChange={(e) => setEditedTemplate({
                    ...editedTemplate,
                    sections: {
                      ...editedTemplate.sections,
                      pricing: {
                        ...editedTemplate.sections.pricing,
                        type: e.target.value as "fixed" | "hourly"
                      }
                    }
                  })}
                  className="border rounded p-1"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>
              <Input
                type="number"
                value={editedTemplate.sections.pricing.type === "fixed" 
                  ? editedTemplate.sections.pricing.fixedAmount 
                  : editedTemplate.sections.pricing.rate}
                onChange={(e) => setEditedTemplate({
                  ...editedTemplate,
                  sections: {
                    ...editedTemplate.sections,
                    pricing: {
                      ...editedTemplate.sections.pricing,
                      [editedTemplate.sections.pricing.type === "fixed" ? "fixedAmount" : "rate"]: Number(e.target.value)
                    }
                  }
                })}
                placeholder={editedTemplate.sections.pricing.type === "fixed" ? "Fixed Amount" : "Hourly Rate"}
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Payment Terms</h2>
            <Textarea
              value={editedTemplate.sections.paymentTerms}
              onChange={(e) => setEditedTemplate({
                ...editedTemplate,
                sections: {
                  ...editedTemplate.sections,
                  paymentTerms: e.target.value
                }
              })}
              className="min-h-[100px]"
            />
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ProposalEditor;