import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ProposalContentProps {
  content: {
    projectOverview: string;
    scopeOfWork: string;
    deliverables: string[];
    pricing: {
      type: "fixed" | "hourly";
      fixedAmount?: number;
      rate?: number;
    };
    paymentTerms: string;
  };
  onContentChange: (field: string, value: any) => void;
  onDeliverableChange: (index: number, value: string) => void;
}

const ProposalContent = ({
  content,
  onContentChange,
  onDeliverableChange,
}: ProposalContentProps) => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Project Overview</h2>
        <Textarea
          value={content.projectOverview}
          onChange={(e) => onContentChange("projectOverview", e.target.value)}
          className="min-h-[100px]"
        />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Scope of Work</h2>
        <Textarea
          value={content.scopeOfWork}
          onChange={(e) => onContentChange("scopeOfWork", e.target.value)}
          className="min-h-[100px]"
        />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Deliverables</h2>
        <div className="space-y-2">
          {content.deliverables.map((deliverable, index) => (
            <Input
              key={index}
              value={deliverable}
              onChange={(e) => onDeliverableChange(index, e.target.value)}
              className="dark:text-gray-100"
            />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Pricing</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-300">Type:</span>
            <select
              value={content.pricing.type}
              onChange={(e) => onContentChange("pricing.type", e.target.value)}
              className="border rounded p-1 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
            </select>
          </div>
          <Input
            type="number"
            value={content.pricing.type === "fixed" ? content.pricing.fixedAmount : content.pricing.rate}
            onChange={(e) => onContentChange(
              content.pricing.type === "fixed" ? "pricing.fixedAmount" : "pricing.rate",
              Number(e.target.value)
            )}
            placeholder={content.pricing.type === "fixed" ? "Fixed Amount" : "Hourly Rate"}
            className="dark:text-gray-100"
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Payment Terms</h2>
        <Textarea
          value={content.paymentTerms}
          onChange={(e) => onContentChange("paymentTerms", e.target.value)}
          className="min-h-[100px]"
        />
      </section>
    </div>
  );
};

export default ProposalContent;