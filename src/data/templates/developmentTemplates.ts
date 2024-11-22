import { ContractTemplate } from '../types';

export const developmentTemplates: ContractTemplate[] = [
  {
    id: 401,
    name: "Software Development Agreement",
    description: "Professional contract for software development projects",
    categoryId: 3,
    details: [
      "Technical specifications",
      "Milestone deliverables",
      "Testing requirements",
      "Maintenance terms"
    ],
    popular: true,
    logoPlaceholder: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    content: `// ... keep existing code (contract content)`
  },
  {
    id: 402,
    name: "Web Development Contract",
    description: "Comprehensive agreement for web development services",
    categoryId: 3,
    details: [
      "Website specifications",
      "Hosting requirements",
      "SEO implementation",
      "Browser compatibility"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    content: `[Web Development Service Agreement]`
  },
  {
    id: 403,
    name: "Mobile App Development Contract",
    description: "Specialized agreement for mobile application development",
    categoryId: 3,
    details: [
      "App specifications",
      "Platform requirements",
      "API integration",
      "App store submission"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
    content: `[Mobile App Development Agreement]`
  }
];