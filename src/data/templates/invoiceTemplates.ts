export interface InvoiceTemplate {
  id: number;
  name: string;
  type: string;
  description: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
  terms: string;
  notes: string;
}

const generateInvoiceTemplates = (baseTemplate: InvoiceTemplate, count: number): InvoiceTemplate[] => {
  return Array.from({ length: count }, (_, i) => ({
    ...baseTemplate,
    id: baseTemplate.id + i,
    name: `${baseTemplate.name} ${i + 1}`,
  }));
};

const writingInvoiceTemplates = generateInvoiceTemplates({
  id: 1,
  name: "Content Writing Invoice",
  type: "writing",
  description: "Invoice template for content writing services",
  items: [
    { description: "Blog Post Writing (1500 words)", quantity: 4, rate: 150 },
    { description: "SEO Optimization", quantity: 4, rate: 50 },
    { description: "Content Strategy Session", quantity: 1, rate: 200 }
  ],
  terms: "Net 30",
  notes: "Thank you for your business!"
}, 35);

const designInvoiceTemplates = generateInvoiceTemplates({
  id: 101,
  name: "Design Services Invoice",
  type: "design",
  description: "Invoice template for design services",
  items: [
    { description: "UI Design (per screen)", quantity: 5, rate: 200 },
    { description: "Brand Style Guide", quantity: 1, rate: 500 },
    { description: "Design Consultation", quantity: 2, rate: 150 }
  ],
  terms: "50% upfront, 50% upon completion",
  notes: "All design files will be delivered upon final payment."
}, 35);

const developmentInvoiceTemplates = generateInvoiceTemplates({
  id: 201,
  name: "Development Services Invoice",
  type: "development",
  description: "Invoice template for development services",
  items: [
    { description: "Frontend Development (hours)", quantity: 40, rate: 100 },
    { description: "Backend Development (hours)", quantity: 30, rate: 120 },
    { description: "Testing & Deployment", quantity: 10, rate: 90 }
  ],
  terms: "Net 15",
  notes: "Hosting and maintenance fees not included."
}, 30);

export const invoiceTemplates = [
  ...writingInvoiceTemplates,
  ...designInvoiceTemplates,
  ...developmentInvoiceTemplates
];