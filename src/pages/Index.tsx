import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

const contractTemplates = [
  { id: 1, name: "Web Development", description: "For software and web development projects" },
  { id: 2, name: "Content Writing", description: "For content creation and copywriting" },
  { id: 3, name: "Graphic Design", description: "For design and visual content projects" },
];

const activeContracts = [
  {
    id: 1,
    clientName: "Acme Corp",
    projectName: "Website Redesign",
    status: "active",
    dueDate: "2024-03-15",
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    projectName: "Mobile App Development",
    status: "pending",
    dueDate: "2024-04-01",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contract Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your freelance contracts efficiently</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> New Contract
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Active Contracts
              </CardTitle>
              <CardDescription>Your ongoing projects and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
                  >
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
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Contract Templates
              </CardTitle>
              <CardDescription>Start from pre-made professional templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;