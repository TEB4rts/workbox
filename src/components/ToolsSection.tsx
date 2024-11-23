import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Calendar, Clock, FileText, PenTool, Timer, FileImage, Edit, FileSpreadsheet, QrCode, Languages, Palette, ListTodo, SpellCheck, Copy, Shield, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ToolsSection = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Rate Calculator",
      description: "Calculate your hourly or project rates",
      path: "/tools/rate-calculator"
    },
    {
      icon: <Timer className="h-6 w-6" />,
      title: "Time Tracker",
      description: "Track time spent on projects",
      path: "/tools/time-tracker"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Project Timeline",
      description: "Create project timelines and milestones",
      path: "/tools/timeline"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Deadline Calculator",
      description: "Calculate project deadlines and delivery dates",
      path: "/tools/deadline-calculator"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Agreement Generator",
      description: "Generate custom agreements and NDAs",
      path: "/tools/agreement-generator"
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Scope Builder",
      description: "Create detailed project scope documents",
      path: "/tools/scope-builder"
    },
    {
      icon: <FileImage className="h-6 w-6" />,
      title: "File Converter",
      description: "Convert files between different formats",
      path: "/tools/file-converter"
    },
    {
      icon: <Edit className="h-6 w-6" />,
      title: "Image Editor",
      description: "Edit and resize images online",
      path: "/tools/image-editor"
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6" />,
      title: "Word Counter",
      description: "Count words and characters in your text",
      path: "/tools/word-counter"
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "QR Generator",
      description: "Generate QR codes for any content",
      path: "/tools/qr-generator"
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Unit Converter",
      description: "Convert between different units",
      path: "/tools/unit-converter"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Color Picker",
      description: "Pick and convert color formats",
      path: "/tools/color-picker"
    },
    {
      icon: <ListTodo className="h-6 w-6" />,
      title: "Todo List Builder",
      description: "Create and manage project tasks",
      path: "/tools/todo-list"
    },
    {
      icon: <SpellCheck className="h-6 w-6" />,
      title: "Grammar Checker",
      description: "Check spelling and grammar",
      path: "/tools/grammar-checker"
    },
    {
      icon: <Copy className="h-6 w-6" />,
      title: "Plagiarism Checker",
      description: "Check content originality",
      path: "/tools/plagiarism-checker"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Proposal Customizer",
      description: "Customize proposal templates",
      path: "/tools/proposal-customizer"
    },
    {
      icon: <Type className="h-6 w-6" />,
      title: "Font Tool",
      description: "Browse and download fonts",
      path: "/tools/font-tool"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <Card key={index} className="card-hover">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg text-white">
                {tool.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full gradient-primary gradient-hover"
              onClick={() => navigate(tool.path)}
            >
              Open Tool
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ToolsSection;
