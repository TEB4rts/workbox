import type { ProposalTemplate } from "./types";

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: 1,
    name: "Content Writing Proposal",
    description: "Professional proposal template for content writing projects",
    type: "content",
    sections: {
      projectOverview: "Content writing services for website and marketing materials",
      scopeOfWork: "Creation of SEO-optimized blog posts, website copy, and marketing materials",
      deliverables: [
        "4 blog posts per month",
        "Website copy for 5 pages",
        "2 email newsletters"
      ],
      pricing: {
        type: "fixed",
        fixedAmount: 2000
      },
      timeline: {
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        milestones: [
          {
            description: "Blog posts delivery",
            date: "2024-03-15"
          },
          {
            description: "Website copy completion",
            date: "2024-03-25"
          }
        ]
      },
      paymentTerms: "50% upfront, 50% upon completion"
    },
    customization: {
      color: "#9b87f5",
      font: "Inter"
    }
  },
  {
    id: 2,
    name: "Web Development Proposal",
    description: "Comprehensive proposal template for web development projects",
    type: "development",
    sections: {
      projectOverview: "Full-stack web application development",
      scopeOfWork: "Design and development of a responsive web application",
      deliverables: [
        "Frontend development",
        "Backend API",
        "Database setup",
        "Deployment"
      ],
      pricing: {
        type: "hourly",
        rate: 85
      },
      timeline: {
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        milestones: [
          {
            description: "Frontend prototype",
            date: "2024-04-30"
          },
          {
            description: "Backend completion",
            date: "2024-05-31"
          }
        ]
      },
      paymentTerms: "Monthly billing based on hours worked"
    },
    customization: {
      color: "#6E59A5",
      font: "Inter"
    }
  }
];