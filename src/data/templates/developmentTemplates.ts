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
    content: `[Your Logo Here]

SOFTWARE DEVELOPMENT AGREEMENT

THIS AGREEMENT is made on [Date] between:

[Developer Name/Company]
[Business Address]
[Registration Details]
(hereinafter referred to as the "Developer")

AND

[Client Name]
[Client Address]
(hereinafter referred to as the "Client")

1. PROJECT SPECIFICATIONS
The Developer agrees to develop:
[Detailed project description]

2. TECHNICAL REQUIREMENTS
- Platform: [Specify]
- Programming Languages: [List]
- Frameworks: [List]

3. DELIVERABLES & MILESTONES
[Detailed timeline and deliverables]

[Continue with standard terms...]`
  },
  // ... 200+ more development templates
];