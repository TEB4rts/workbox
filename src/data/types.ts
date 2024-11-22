export interface ContractTemplate {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  details: string[];
  content: string;
  popular?: boolean;
  logoPlaceholder?: string;
}