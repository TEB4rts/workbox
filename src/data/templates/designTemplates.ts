import { ContractTemplate } from '../types';

export const designTemplates: ContractTemplate[] = [
  {
    id: 201,
    name: "Professional Graphic Design Contract",
    description: "Comprehensive agreement for graphic design services",
    categoryId: 2,
    details: [
      "Project deliverables",
      "Usage rights",
      "Payment schedule",
      "Revision terms"
    ],
    popular: true,
    logoPlaceholder: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    content: `// ... keep existing code (contract content)`
  },
  {
    id: 202,
    name: "UI/UX Design Agreement",
    description: "Specialized contract for user interface design",
    categoryId: 2,
    details: [
      "Design specifications",
      "User research terms",
      "Prototype delivery",
      "Testing requirements"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
    content: `[UI/UX Design Service Agreement]`
  },
  {
    id: 203,
    name: "Brand Identity Design Contract",
    description: "Complete agreement for brand design services",
    categoryId: 2,
    details: [
      "Brand guidelines",
      "Logo specifications",
      "Color palette",
      "Typography selection"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa",
    content: `[Brand Identity Design Agreement]`
  }
];