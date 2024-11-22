import { ContractTemplate } from '../types';

export const writingTemplates: ContractTemplate[] = [
  {
    id: 1,
    name: "Freelance Writing Agreement",
    description: "Professional agreement for freelance writing services",
    categoryId: 1,
    details: [
      "Project scope and deliverables",
      "Payment terms and schedule",
      "Revision policy",
      "Copyright transfer"
    ],
    popular: true,
    logoPlaceholder: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    content: `// ... keep existing code (contract content)`
  },
  {
    id: 2,
    name: "Content Creation Contract",
    description: "Comprehensive agreement for content creation services",
    categoryId: 1,
    details: [
      "Content specifications",
      "SEO requirements",
      "Publishing rights",
      "Content ownership"
    ],
    popular: false,
    logoPlaceholder: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    content: `[Professional Content Creation Agreement]`
  },
  {
    id: 3,
    name: "Technical Writing Contract",
    description: "Specialized agreement for technical documentation",
    categoryId: 1,
    details: [
      "Documentation scope",
      "Technical requirements",
      "Review process",
      "Delivery format"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    content: `[Technical Writing Service Agreement]`
  }
];