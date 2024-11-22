import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface PortfolioFormProps {
  portfolioData: any;
  setPortfolioData: (data: any) => void;
}

const PortfolioForm = ({ portfolioData, setPortfolioData }: PortfolioFormProps) => {
  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...portfolioData.projects,
        {
          title: "",
          description: "",
          category: "",
          images: [],
          testimonial: "",
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = portfolioData.projects.filter((_: any, i: number) => i !== index);
    setPortfolioData({ ...portfolioData, projects: newProjects });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...portfolioData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setPortfolioData({ ...portfolioData, projects: newProjects });
  };

  const handleSave = () => {
    localStorage.setItem("portfolio-draft", JSON.stringify(portfolioData));
    toast.success("Portfolio saved as draft");
  };

  const handleImageUpload = (index: number, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => URL.createObjectURL(file));
    const newProjects = [...portfolioData.projects];
    newProjects[index] = {
      ...newProjects[index],
      images: [...(newProjects[index].images || []), ...newFiles],
    };
    setPortfolioData({ ...portfolioData, projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={portfolioData.personalInfo.name}
              onChange={(e) =>
                setPortfolioData({
                  ...portfolioData,
                  personalInfo: { ...portfolioData.personalInfo, name: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={portfolioData.personalInfo.title}
              onChange={(e) =>
                setPortfolioData({
                  ...portfolioData,
                  personalInfo: { ...portfolioData.personalInfo, title: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={portfolioData.personalInfo.bio}
              onChange={(e) =>
                setPortfolioData({
                  ...portfolioData,
                  personalInfo: { ...portfolioData.personalInfo, bio: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact Information</Label>
            <Textarea
              id="contact"
              value={portfolioData.personalInfo.contact}
              onChange={(e) =>
                setPortfolioData({
                  ...portfolioData,
                  personalInfo: { ...portfolioData.personalInfo, contact: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Button onClick={addProject} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        
        {portfolioData.projects.map((project: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div>
              <Label>Project Title</Label>
              <Input
                value={project.title}
                onChange={(e) => updateProject(index, "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={project.category}
                onChange={(e) => updateProject(index, "category", e.target.value)}
              />
            </div>
            <div>
              <Label>Images</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files)}
                />
              </div>
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {project.images.map((image: string, imgIndex: number) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Project ${index + 1} image ${imgIndex + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <Label>Client Testimonial</Label>
              <Textarea
                value={project.testimonial}
                onChange={(e) => updateProject(index, "testimonial", e.target.value)}
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Project
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={portfolioData.isPublic}
            onCheckedChange={(checked) =>
              setPortfolioData({ ...portfolioData, isPublic: checked })
            }
          />
          <Label>Make Portfolio Public</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave}>Save Portfolio</Button>
      </div>
    </div>
  );
};

export default PortfolioForm;