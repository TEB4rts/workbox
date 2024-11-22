export interface ContractTemplate {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  details: string[];
  content: string;
  popular?: boolean;
  logoPlaceholder?: string;
  fields?: {
    client?: string;
    freelancer?: string;
    contentType?: string;
    startDate?: string;
    endDate?: string;
    paymentAmount?: string;
    revisions?: number;
  };
}

export interface ProposalTemplate {
  id: number;
  name: string;
  description: string;
  type: 'content' | 'design' | 'development';
  sections: {
    projectOverview: string;
    scopeOfWork: string;
    deliverables: string[];
    pricing: {
      type: 'hourly' | 'fixed';
      rate?: number;
      fixedAmount?: number;
    };
    timeline: {
      startDate?: string;
      endDate?: string;
      milestones: Array<{
        description: string;
        date: string;
      }>;
    };
    paymentTerms: string;
  };
  customization: {
    color?: string;
    font?: string;
    logo?: string;
  };
}