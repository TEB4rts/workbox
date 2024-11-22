import { ContractTemplate } from '../types';

export const writingTemplates: ContractTemplate[] = [
  {
    id: 1,
    name: "Content Creation Agreement",
    description: "Professional agreement for content creation services with customizable fields",
    categoryId: 1,
    details: [
      "Comprehensive scope of work definition",
      "Clear payment terms and schedules",
      "Intellectual property rights",
      "Revision policy and deadlines"
    ],
    popular: true,
    logoPlaceholder: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    content: `CONTENT CREATION AGREEMENT

1. PARTIES

Client Name: [Client Name]
Address: [Client Address]

Freelancer Name: [Freelancer Name]
Address: [Freelancer Address]

2. PROJECT DETAILS

Content Type: [Content Type]
Project Description: [Project Description]
Start Date: [Start Date]
End Date: [End Date]

3. SCOPE OF WORK

The Freelancer agrees to create the following content:
[Detailed description of deliverables]

Specifications:
- Content Length: [Specify word count/duration]
- Format: [Specify format requirements]
- SEO Requirements: [Detail keyword and optimization requirements]

4. PAYMENT TERMS

Total Payment Amount: [Amount]
Payment Schedule: [Schedule details]
Payment Method: [Method]

Late Payment Terms:
A late fee of 5% will be applied to payments received more than 15 days after the due date.

5. INTELLECTUAL PROPERTY

Upon receipt of full payment, all rights to the content will transfer to the Client. The Freelancer retains the right to include the work in their portfolio.

6. REVISIONS AND APPROVAL

- The Freelancer will provide up to [number] rounds of revisions
- Additional revisions will be charged at [rate] per hour
- Content will be considered approved if no feedback is received within 5 business days

7. DEADLINES AND DELIVERY

Completion Date: [Date]
Late Delivery Penalty: A 10% discount will apply if deadlines are missed without prior agreement.

8. CONFIDENTIALITY

The Freelancer agrees to maintain strict confidentiality regarding all Client information and business practices.

9. TERMINATION

Either party may terminate this agreement with 7 days written notice if the other party fails to meet the specified terms.

10. GOVERNING LAW

This agreement is governed by the laws of [State/Region].

Signatures:

Client: _________________ Date: _______
Freelancer: _____________ Date: _______`
  },
  {
    id: 2,
    name: "Blog Writing Contract",
    description: "Specialized agreement for blog content creation",
    categoryId: 1,
    details: [
      "Blog-specific deliverables",
      "SEO requirements",
      "Publishing rights",
      "Content ownership"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    content: `[Blog Writing Service Agreement]`
  },
  {
    id: 3,
    name: "Social Media Content Contract",
    description: "Agreement for social media content creation",
    categoryId: 1,
    details: [
      "Platform-specific content",
      "Posting schedule",
      "Engagement metrics",
      "Brand voice guidelines"
    ],
    logoPlaceholder: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    content: `[Social Media Content Agreement]`
  }
];