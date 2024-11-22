import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, SpellCheck } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface Template {
  id: number;
  name: string;
  content: string;
  fields: Record<string, string>;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Web Development Proposal",
    content: "Dear [client],\n\nI am writing to propose my services for [project]...",
    fields: {
      client: "",
      project: "",
      timeline: "",
      budget: ""
    }
  },
  {
    id: 2,
    name: "Content Writing Proposal",
    content: "Dear [client],\n\nI specialize in creating [content_type] content...",
    fields: {
      client: "",
      content_type: "",
      delivery_date: "",
      rate: ""
    }
  }
];

const ProposalCustomizer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [customizedContent, setCustomizedContent] = useState(templates[0].content);
  const [fields, setFields] = useState(templates[0].fields);
  const [preventAiDetection, setPreventAiDetection] = useState(false);
  const [grammarSuggestions, setGrammarSuggestions] = useState<Array<{ error: string, suggestion: string }>>([]);

  const updateField = (key: string, value: string) => {
    setFields({ ...fields, [key]: value });
    let newContent = customizedContent;
    newContent = newContent.replace(`[${key}]`, value);
    setCustomizedContent(newContent);
  };

  const checkGrammar = async () => {
    // Mock implementation - in real app, call API
    const mockSuggestions = [
      { error: "their", suggestion: "they're" },
      { error: "your", suggestion: "you're" }
    ];
    setGrammarSuggestions(mockSuggestions);
    toast.success("Grammar check completed");
  };

  const applySuggestion = (error: string, suggestion: string) => {
    setCustomizedContent(customizedContent.replace(error, suggestion));
    toast.success("Suggestion applied");
  };

  const handleTemplateChange = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setCustomizedContent(template.content);
      setFields(template.fields);
      setGrammarSuggestions([]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Proposal Template Customizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              checked={preventAiDetection}
              onCheckedChange={setPreventAiDetection}
            />
            <span>Prevent AI Detection</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Template</label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => handleTemplateChange(Number(e.target.value))}
              value={selectedTemplate.id}
            >
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Customize Fields</h3>
            {Object.entries(fields).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {key.replace('_', ' ')}
                </label>
                <Input
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={`Enter ${key.replace('_', ' ')}...`}
                />
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Preview</h3>
              <Button onClick={checkGrammar} variant="outline">
                <SpellCheck className="h-4 w-4 mr-2" />
                Check Grammar
              </Button>
            </div>
            <Textarea
              value={customizedContent}
              onChange={(e) => setCustomizedContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          {grammarSuggestions.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Grammar Suggestions:</h3>
              {grammarSuggestions.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="text-red-500">{item.error}</span>
                  <span>→</span>
                  <span className="text-green-500">{item.suggestion}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(item.error, item.suggestion)}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                // Save logic here
                toast.success("Proposal saved successfully");
              }}
            >
              Save Proposal
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Download logic here
                toast.success("Proposal downloaded");
              }}
            >
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalCustomizer;