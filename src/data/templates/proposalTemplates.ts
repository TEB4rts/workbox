import type { ProposalTemplate } from "../types";

// Helper function to generate templates for different job types
const generateTemplates = (baseTemplate: ProposalTemplate, count: number): ProposalTemplate[] => {
  return Array.from({ length: count }, (_, i) => ({
    ...baseTemplate,
    id: baseTemplate.id + i,
    name: `${baseTemplate.name} ${i + 1}`,
  }));
};

// Base templates for different job types
const writingTemplates = generateTemplates({
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
}, 35);

const designTemplates = generateTemplates({
  id: 101,
  name: "UI/UX Design Proposal",
  description: "Professional proposal template for design projects",
  type: "design",
  sections: {
    projectOverview: "Complete UI/UX design for web application",
    scopeOfWork: "User research, wireframing, prototyping, and final design implementation",
    deliverables: [
      "User research report",
      "Wireframes for all pages",
      "Interactive prototype",
      "Final design files"
    ],
    pricing: {
      type: "fixed",
      fixedAmount: 5000
    },
    timeline: {
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      milestones: [
        {
          description: "Research completion",
          date: "2024-03-15"
        },
        {
          description: "Design system delivery",
          date: "2024-04-15"
        }
      ]
    },
    paymentTerms: "30% upfront, 40% at midpoint, 30% upon completion"
  },
  customization: {
    color: "#6E59A5",
    font: "Inter"
  }
}, 35);

const developmentTemplates = generateTemplates({
  id: 201,
  name: "Web Development Proposal",
  description: "Professional proposal template for development projects",
  type: "development",
  sections: {
    projectOverview: "Full-stack web application development",
    scopeOfWork: "Development of a responsive web application with backend API",
    deliverables: [
      "Frontend application",
      "Backend API",
      "Database setup",
      "Deployment configuration"
    ],
    pricing: {
      type: "hourly",
      rate: 100
    },
    timeline: {
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      milestones: [
        {
          description: "Backend API completion",
          date: "2024-04-30"
        },
        {
          description: "Frontend completion",
          date: "2024-06-15"
        }
      ]
    },
    paymentTerms: "Monthly billing based on hours worked"
  },
  customization: {
    color: "#4A3B8C",
    font: "Inter"
  }
}, 30);

export const proposalTemplates: ProposalTemplate[] = [
  ...writingTemplates,
  ...designTemplates,
  ...developmentTemplates
];