import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PenTool, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Deliverable {
  title: string;
  description: string;
}

const ScopeBuilder = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);

  const addDeliverable = () => {
    setDeliverables([...deliverables, { title: "", description: "" }]);
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const updateDeliverable = (index: number, field: keyof Deliverable, value: string) => {
    const updated = deliverables.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setDeliverables(updated);
  };

  const generateScope = () => {
    if (!projectTitle || !overview || deliverables.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const scope = `
PROJECT SCOPE DOCUMENT

Project Title: ${projectTitle}

Project Overview:
${overview}

Deliverables:
${deliverables.map((d, i) => `
${i + 1}. ${d.title}
   ${d.description}
`).join("\n")}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([scope], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectTitle.toLowerCase().replace(/\s+/g, "-")}-scope.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Scope document generated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <PenTool className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Scope Builder</CardTitle>
                <CardDescription>Create detailed project scope documents</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Project Overview</Label>
              <Textarea
                id="overview"
                placeholder="Describe the project overview and objectives"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Deliverables</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addDeliverable}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Deliverable
                </Button>
              </div>

              {deliverables.map((deliverable, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Deliverable title"
                          value={deliverable.title}
                          onChange={(e) => updateDeliverable(index, "title", e.target.value)}
                        />
                        <Textarea
                          placeholder="Deliverable description"
                          value={deliverable.description}
                          onChange={(e) => updateDeliverable(index, "description", e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => removeDeliverable(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              className="w-full"
              onClick={generateScope}
              disabled={!projectTitle || !overview || deliverables.length === 0}
            >
              Generate Scope Document
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScopeBuilder;