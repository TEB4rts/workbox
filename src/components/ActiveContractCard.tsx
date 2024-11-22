import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ActiveContractCardProps {
  contract: {
    id: number;
    clientName: string;
    projectName: string;
    status: string;
    dueDate: string;
  };
}

const ActiveContractCard = ({ contract }: ActiveContractCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{contract.projectName}</h3>
          <p className="text-sm text-gray-600">{contract.clientName}</p>
        </div>
        <Badge
          variant="outline"
          className={
            contract.status === "active"
              ? "bg-success/10 text-success border-success"
              : "bg-warning/10 text-warning border-warning"
          }
        >
          {contract.status === "active" ? (
            <CheckCircle className="mr-1 h-3 w-3" />
          ) : (
            <AlertCircle className="mr-1 h-3 w-3" />
          )}
          {contract.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mt-2">Due: {contract.dueDate}</p>
    </div>
  );
};

export default ActiveContractCard;