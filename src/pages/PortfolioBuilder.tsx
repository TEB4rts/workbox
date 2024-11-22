import { useState } from "react";
import { Card } from "@/components/ui/card";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

const PortfolioBuilder = () => {
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