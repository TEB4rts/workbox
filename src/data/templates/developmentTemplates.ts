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
    content: `SOFTWARE DEVELOPMENT AGREEMENT

1. PROJECT SPECIFICATIONS

Technical Requirements:
- Platform: [Platform]
- Programming Languages: [Languages]
- Frameworks: [Frameworks]
- APIs: [APIs]

2. DEVELOPMENT PHASES

- Planning and Analysis
- Development
- Testing
- Deployment
- Maintenance

3. DELIVERABLES

[Detailed deliverables list]

4. TESTING AND ACCEPTANCE

[Testing requirements and acceptance criteria]

[Remaining sections follow similar structure to main template]`
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
    content: `WEB DEVELOPMENT SERVICE AGREEMENT

1. WEBSITE SPECIFICATIONS

- Pages/Features
- Responsive Design
- Browser Compatibility
- Performance Requirements

2. HOSTING AND DEPLOYMENT

[Hosting specifications]

3. SEO REQUIREMENTS

[SEO implementation details]

[Remaining sections follow similar structure to main template]`
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
    content: `MOBILE APP DEVELOPMENT AGREEMENT

1. APP SPECIFICATIONS

- Platforms (iOS/Android)
- Features and Functionality
- UI/UX Requirements
- Performance Requirements

2. DEVELOPMENT MILESTONES

[Development timeline and milestones]

3. APP STORE SUBMISSION

[Submission requirements and process]

[Remaining sections follow similar structure to main template]`
  }
];