import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Mail, Save } from "lucide-react";

interface ProposalHeaderProps {
  title: string;
  onTitleChange: (value: string) => void;
  onSave: () => void;
  onSendEmail: () => void;
  onDownload: () => void;
}

const ProposalHeader = ({
  title,
  onTitleChange,
  onSave,
  onSendEmail,
  onDownload,
}: ProposalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-2xl font-bold w-2/3 dark:text-gray-100"
      />
      <div className="space-x-2">
        <Button variant="outline" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onSendEmail}>
          <Mail className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button onClick={onDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ProposalHeader;