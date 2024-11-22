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
    content: `[Your Logo Here]

FREELANCE WRITING AGREEMENT

THIS AGREEMENT is made on [Date] between:

[Freelancer Name]
[Freelancer Address]
[Business Registration/License Number]
(hereinafter referred to as the "Writer")

AND

[Client Name]
[Client Address]
(hereinafter referred to as the "Client")

1. SCOPE OF WORK
The Writer agrees to provide the following writing services:
[Detailed description of writing services]

2. PAYMENT TERMS
- Project Fee: [Amount]
- Payment Schedule: [Details]
- Late Payment Terms: [Specify]

3. DELIVERY SCHEDULE
- First Draft Due: [Date]
- Revision Period: [Duration]
- Final Delivery: [Date]

4. INTELLECTUAL PROPERTY RIGHTS
Upon receipt of full payment, all rights to the delivered content will transfer to the Client.

5. CONFIDENTIALITY
The Writer agrees to maintain strict confidentiality regarding...

[Continue with standard terms...]`
  },
  // ... 200+ more writing templates
];