import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface PortfolioPreviewProps {
  portfolioData: any;
}

const PortfolioPreview = ({ portfolioData }: PortfolioPreviewProps) => {
  const handleDownload = () => {
    const content = `
PORTFOLIO

Personal Information:
${portfolioData.personalInfo.name}
${portfolioData.personalInfo.title}

Bio:
${portfolioData.personalInfo.bio}

Contact Information:
${portfolioData.personalInfo.contact}

Projects:
${portfolioData.projects
  .map(
    (project: any) =>
      `
Title: ${project.title}
Category: ${project.category}
Description: ${project.description}
Testimonial: ${project.testimonial}
`
  )
  .join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Portfolio downloaded successfully!");
  };

  const handleShare = () => {
    // This would typically generate a shareable link
    toast.success("Share feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">Portfolio Preview</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleShare}>
            <LinkIcon className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{portfolioData.personalInfo.name}</h1>
          <p className="text-lg text-gray-600">{portfolioData.personalInfo.title}</p>
        </div>

        {portfolioData.personalInfo.bio && (
          <div>
            <h3 className="font-semibold mb-2">About Me</h3>
            <p className="text-gray-600">{portfolioData.personalInfo.bio}</p>
          </div>
        )}

        {portfolioData.projects.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Projects</h3>
            <div className="space-y-6">
              {portfolioData.projects.map((project: any, index: number) => (
                <Card key={index} className="p-4">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {project.images && project.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {project.images.map((image: string, imgIndex: number) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Project ${index + 1} image ${imgIndex + 1}`}
                          className="w-full h-48 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  {project.testimonial && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="italic text-gray-600">{project.testimonial}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {portfolioData.personalInfo.contact && (
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p className="whitespace-pre-line text-gray-600">
              {portfolioData.personalInfo.contact}
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500">
          {portfolioData.isPublic ? "Public Portfolio" : "Private Portfolio"}
        </div>
      </Card>
    </div>
  );
};

export default PortfolioPreview;