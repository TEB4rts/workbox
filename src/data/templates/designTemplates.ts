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
    content: `GRAPHIC DESIGN SERVICE AGREEMENT

1. PROJECT SCOPE

Design Deliverables:
- [List of design items]
- File Formats: [Formats]
- Dimensions: [Specifications]

2. DESIGN PROCESS

- Initial Concepts: [Number]
- Revision Rounds: [Number]
- Final Deliverables: [List]

3. BRAND GUIDELINES

[Brand specifications]

4. USAGE RIGHTS AND LICENSING

[Detailed rights and licensing terms]

[Remaining sections follow similar structure to main template]`
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
    content: `UI/UX DESIGN SERVICE AGREEMENT

1. DESIGN DELIVERABLES

- Wireframes
- User Flows
- Interactive Prototypes
- Design Systems
- Asset Libraries

2. RESEARCH AND TESTING

User Research Requirements:
[Details]

Usability Testing:
[Requirements]

[Remaining sections follow similar structure to main template]`
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
    content: `BRAND IDENTITY DESIGN AGREEMENT

1. BRAND PACKAGE DELIVERABLES

- Logo Design (variants)
- Color Palette
- Typography
- Brand Guidelines
- Application Examples

2. USAGE AND RIGHTS

[Detailed usage terms]

[Remaining sections follow similar structure to main template]`
  }
];