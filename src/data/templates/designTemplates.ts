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
    content: `[Your Logo Here]

PROFESSIONAL GRAPHIC DESIGN AGREEMENT

THIS AGREEMENT is made on [Date] between:

[Designer Name/Studio]
[Business Address]
[Registration Number]
(hereinafter referred to as the "Designer")

AND

[Client Name]
[Client Address]
(hereinafter referred to as the "Client")

1. PROJECT SCOPE
The Designer agrees to provide the following design services:
[Detailed description of design work]

2. DELIVERABLES
- Initial Concepts: [Number]
- Revision Rounds: [Number]
- Final Files: [Formats]

3. PAYMENT TERMS
Total Project Fee: [Amount]
Payment Schedule:
- Deposit: [Amount] (Due upon signing)
- Milestone 1: [Amount]
- Final Payment: [Amount]

[Continue with standard terms...]`
  },
  // ... 200+ more design templates
];