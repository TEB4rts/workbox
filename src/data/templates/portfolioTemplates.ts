export interface PortfolioTemplate {
  id: number;
  name: string;
  type: string;
  description: string;
  personalInfo: {
    title: string;
    bio: string;
    skills: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    testimonial?: string;
  }>;
}

const generatePortfolioTemplates = (baseTemplate: PortfolioTemplate, count: number): PortfolioTemplate[] => {
  return Array.from({ length: count }, (_, i) => ({
    ...baseTemplate,
    id: baseTemplate.id + i,
    name: `${baseTemplate.name} ${i + 1}`,
  }));
};

const writingPortfolioTemplates = generatePortfolioTemplates({
  id: 1,
  name: "Content Writer Portfolio",
  type: "writing",
  description: "Showcase your writing projects and expertise",
  personalInfo: {
    title: "Professional Content Writer",
    bio: "Experienced content writer specializing in SEO-optimized content and engaging storytelling",
    skills: ["SEO Writing", "Blog Posts", "Technical Writing", "Copywriting"]
  },
  projects: [
    {
      title: "Tech Blog Series",
      description: "A series of in-depth technical articles about web development",
      category: "Technical Writing",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      testimonial: "The articles were informative and engaging, perfect for our target audience."
    }
  ]
}, 35);

const designPortfolioTemplates = generatePortfolioTemplates({
  id: 101,
  name: "Designer Portfolio",
  type: "design",
  description: "Showcase your design projects and creative work",
  personalInfo: {
    title: "UI/UX Designer",
    bio: "Creative designer with a passion for creating beautiful and functional user interfaces",
    skills: ["UI Design", "UX Design", "Branding", "Prototyping"]
  },
  projects: [
    {
      title: "E-commerce App Redesign",
      description: "Complete redesign of a mobile e-commerce application",
      category: "UI/UX Design",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
      testimonial: "The new design increased our conversion rate by 40%."
    }
  ]
}, 35);

const developmentPortfolioTemplates = generatePortfolioTemplates({
  id: 201,
  name: "Developer Portfolio",
  type: "development",
  description: "Showcase your development projects and technical skills",
  personalInfo: {
    title: "Full Stack Developer",
    bio: "Experienced developer specializing in modern web technologies",
    skills: ["React", "Node.js", "TypeScript", "AWS"]
  },
  projects: [
    {
      title: "E-learning Platform",
      description: "Full-stack web application for online education",
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      testimonial: "The platform has helped us reach thousands of students globally."
    }
  ]
}, 30);

export const portfolioTemplates = [
  ...writingPortfolioTemplates,
  ...designPortfolioTemplates,
  ...developmentPortfolioTemplates
];