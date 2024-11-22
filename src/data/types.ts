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