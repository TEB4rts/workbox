import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, FileText, FileSpreadsheet } from "lucide-react";
import ContractTemplateCard from "@/components/ContractTemplateCard";
import ContractSearch from "@/components/ContractSearch";
import CategoryFilter from "@/components/CategoryFilter";
import ActiveContractCard from "@/components/ActiveContractCard";
import ProposalTemplateCard from "@/components/ProposalTemplateCard";
import { contractTemplates } from "@/data/contractTemplates";
import { proposalTemplates } from "@/data/proposalTemplates";

const activeContracts = [
  {
    id: 1,
    clientName: "Acme Corp",
    projectName: "Website Redesign",
    status: "active",
    dueDate: "2024-03-15",
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    projectName: "Mobile App Development",
    status: "pending",
    dueDate: "2024-04-01",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'contracts' | 'proposals' | 'invoices' | 'portfolio'>('contracts');

  const filteredTemplates = contractTemplates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || template.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredProposals = proposalTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your contracts, proposals, invoices, and portfolio</p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant={activeTab === 'contracts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contracts')}
            >
              <FileText className="mr-2 h-4 w-4" /> Contracts
            </Button>
            <Button 
              variant={activeTab === 'proposals' ? 'default' : 'outline'}
              onClick={() => setActiveTab('proposals')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Proposals
            </Button>
            <Button 
              variant={activeTab === 'invoices' ? 'default' : 'outline'}
              onClick={() => setActiveTab('invoices')}
            >
              <FileText className="mr-2 h-4 w-4" /> Invoices
            </Button>
            <Button 
              variant={activeTab === 'portfolio' ? 'default' : 'outline'}
              onClick={() => setActiveTab('portfolio')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Portfolio
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Active Contracts
              </CardTitle>
              <CardDescription>Your ongoing projects and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeContracts.map((contract) => (
                  <ActiveContractCard key={contract.id} contract={contract} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                {activeTab === 'contracts' && (
                  <>
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Contract Templates
                  </>
                )}
                {activeTab === 'proposals' && (
                  <>
                    <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                    Proposal Templates
                  </>
                )}
                {activeTab === 'invoices' && (
                  <>
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Invoice Generator
                  </>
                )}
                {activeTab === 'portfolio' && (
                  <>
                    <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                    Portfolio Builder
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {activeTab === 'contracts' && "Start from pre-made professional templates"}
                {activeTab === 'proposals' && "Create compelling proposals for your clients"}
                {activeTab === 'invoices' && "Generate professional invoices"}
                {activeTab === 'portfolio' && "Build and showcase your work"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(activeTab === 'contracts' || activeTab === 'proposals') && (
                <ContractSearch onSearch={setSearchTerm} />
              )}
              {activeTab === 'contracts' && (
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              )}
              <div className="space-y-4">
                {activeTab === 'contracts' && 
                  filteredTemplates.map((template) => (
                    <ContractTemplateCard key={template.id} template={template} />
                  ))}
                {activeTab === 'proposals' && 
                  filteredProposals.map((template) => (
                    <ProposalTemplateCard key={template.id} template={template} />
                  ))}
                {activeTab === 'invoices' && (
                  <Button
                    className="w-full"
                    onClick={() => window.location.href = '/invoice'}
                  >
                    Create New Invoice
                  </Button>
                )}
                {activeTab === 'portfolio' && (
                  <Button
                    className="w-full"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    Build Your Portfolio
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;