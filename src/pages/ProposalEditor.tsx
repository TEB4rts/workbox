import { useParams } from "react-router-dom";
import { proposalTemplates } from "@/data/proposalTemplates";
import { Card } from "@/components/ui/card";

const ProposalEditor = () => {
  const { templateId } = useParams();
  const template = proposalTemplates.find(
    (t) => t.id === Number(templateId)
  );

  if (!template) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{template.name}</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
            <p className="text-gray-600">{template.sections.projectOverview}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Scope of Work</h2>
            <p className="text-gray-600">{template.sections.scopeOfWork}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Deliverables</h2>
            <ul className="list-disc list-inside space-y-1">
              {template.sections.deliverables.map((deliverable, index) => (
                <li key={index} className="text-gray-600">{deliverable}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Pricing</h2>
            <p className="text-gray-600">
              {template.sections.pricing.type === "fixed" 
                ? `Fixed Price: $${template.sections.pricing.fixedAmount}`
                : `Hourly Rate: $${template.sections.pricing.rate}/hour`}
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">Payment Terms</h2>
            <p className="text-gray-600">{template.sections.paymentTerms}</p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ProposalEditor;