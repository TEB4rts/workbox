import { useParams } from "react-router-dom";
import DocumentEditor from "@/components/DocumentEditor";

const Editor = () => {
  const { templateId } = useParams();

  if (!templateId) {
    return <div>Template not found</div>;
  }

  return <DocumentEditor templateId={templateId} />;
};

export default Editor;