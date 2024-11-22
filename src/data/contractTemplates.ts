export interface ContractTemplate {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  details: string[];
  popular?: boolean;
}

export const contractTemplates: ContractTemplate[] = [
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
    popular: true
  },
  {
    id: 2,
    name: "Content Creation Contract",
    description: "Comprehensive contract for content creation services",
    categoryId: 1,
    details: [
      "Content specifications",
      "Delivery timeline",
      "Usage rights",
      "Payment terms"
    ]
  },
  {
    id: 3,
    name: "Copywriting Agreement",
    description: "Agreement for professional copywriting services",
    categoryId: 1,
    details: [
      "Project requirements",
      "Revision terms",
      "Delivery schedule",
      "Rights and ownership"
    ]
  },
  {
    id: 4,
    name: "Graphic Design Contract",
    description: "Professional agreement for graphic design work",
    categoryId: 2,
    details: [
      "Design specifications",
      "Revision rounds",
      "File delivery format",
      "Usage rights"
    ],
    popular: true
  },
  {
    id: 5,
    name: "Web Design Agreement",
    description: "Contract for website design services",
    categoryId: 2,
    details: [
      "Design deliverables",
      "Timeline and milestones",
      "Technical requirements",
      "Maintenance terms"
    ]
  },
  {
    id: 6,
    name: "Software Development Contract",
    description: "Comprehensive agreement for software development",
    categoryId: 3,
    details: [
      "Project scope",
      "Technical specifications",
      "Delivery milestones",
      "Support terms"
    ],
    popular: true
  },
  {
    id: 7,
    name: "Mobile App Development",
    description: "Contract for mobile application development",
    categoryId: 3,
    details: [
      "App specifications",
      "Platform requirements",
      "Testing procedures",
      "Maintenance agreement"
    ]
  },
  {
    id: 8,
    name: "Non-Disclosure Agreement",
    description: "Standard NDA for business relationships",
    categoryId: 4,
    details: [
      "Confidentiality terms",
      "Duration of agreement",
      "Permitted uses",
      "Breach consequences"
    ],
    popular: true
  },
  {
    id: 9,
    name: "Business Consulting Agreement",
    description: "Contract for business consulting services",
    categoryId: 5,
    details: [
      "Consulting scope",
      "Service delivery",
      "Reporting requirements",
      "Fee structure"
    ]
  },
  {
    id: 10,
    name: "Marketing Consultant Contract",
    description: "Agreement for marketing consultation services",
    categoryId: 5,
    details: [
      "Service scope",
      "Deliverables",
      "Performance metrics",
      "Payment terms"
    ]
  },
  {
    id: 11,
    name: "Full-Time Employment Contract",
    description: "Standard employment agreement",
    categoryId: 6,
    details: [
      "Job responsibilities",
      "Compensation details",
      "Benefits package",
      "Work conditions"
    ]
  },
  {
    id: 12,
    name: "Social Media Marketing Agreement",
    description: "Contract for social media management",
    categoryId: 7,
    details: [
      "Platform management",
      "Content creation",
      "Posting schedule",
      "Analytics reporting"
    ],
    popular: true
  },
  {
    id: 13,
    name: "Photography Service Contract",
    description: "Agreement for professional photography services",
    categoryId: 8,
    details: [
      "Session details",
      "Deliverables",
      "Usage rights",
      "Payment terms"
    ]
  },
  {
    id: 14,
    name: "Virtual Assistant Agreement",
    description: "Contract for virtual assistance services",
    categoryId: 8,
    details: [
      "Service scope",
      "Working hours",
      "Communication terms",
      "Confidentiality"
    ]
  },
  {
    id: 15,
    name: "Event Planning Contract",
    description: "Agreement for event planning services",
    categoryId: 8,
    details: [
      "Event specifications",
      "Timeline and deadlines",
      "Budget management",
      "Cancellation policy"
    ]
  }
];