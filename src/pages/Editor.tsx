import { useParams, useNavigate } from "react-router-dom";
import DocumentEditor from "@/components/DocumentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Editor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  if (!templateId) {
    return <div>Template not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <DocumentEditor templateId={templateId} />
    </div>
  );
};

export default Editor;