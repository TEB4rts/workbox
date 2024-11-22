import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ContractTemplate } from "@/data/types";  // Updated import to use types.ts
import { contractTemplates } from "@/data/contractTemplates";  // Keep this import

interface ContractSearchProps {
  onSearch: (searchTerm: string) => void;
}

const ContractSearch = ({ onSearch }: ContractSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-xl mx-auto mb-8">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search contracts by name or description..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  );
};

export default ContractSearch;