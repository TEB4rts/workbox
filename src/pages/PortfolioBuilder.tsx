import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: "",
      title: "",
      bio: "",
      contact: "",
    },
    projects: [],
    categories: [],
    isPublic: true,
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold">Portfolio Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <PortfolioForm
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
          />
        </Card>
        <Card className="p-6">
          <PortfolioPreview portfolioData={portfolioData} />
        </Card>
      </div>
    </div>
  );
};

export default PortfolioBuilder;