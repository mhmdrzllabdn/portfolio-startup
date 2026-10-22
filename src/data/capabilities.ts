import { CapabilityItem } from "@/types";

export const capabilitiesData: CapabilityItem[] = [
  {
    number: "01",
    title: "FRONTEND DEVELOPMENT",
    description: "Building responsive interfaces, reusable components, and accessible user experiences.",
    skills: ["Next.js, React", "TypeScript", "Tailwind CSS", "Semantic HTML & A11y", "Core Web Vitals"],
  },
  {
    number: "02",
    title: "BACKEND ENGINEERING",
    description: "Developing server-side logic, application services, and structured business rules.",
    skills: ["Node.js, Express", "REST & GraphQL", "Microservices", "Event-Driven Queues", "Clean Architecture"],
  },
  {
    number: "03",
    title: "DATABASE & API",
    description: "Designing data models, database queries, and API integrations.",
    skills: ["PostgreSQL & MySQL", "Prisma ORM", "Redis Caching", "Schema Migrations", "ACID Transactions"],
  },
  {
    number: "04",
    title: "TESTING & SECURITY",
    description: "Validating functionality, handling errors, and applying appropriate security practices.",
    skills: ["Jest & Playwright", "OWASP Security", "JWT & OAuth2", "Input Sanitization", "Rate Limiting"],
  },
  {
    number: "05",
    title: "DEPLOYMENT & PERFORMANCE",
    description: "Preparing production builds, monitoring reliability, and improving application performance.",
    skills: ["Docker Containers", "CI-CD Pipelines", "Vercel & Cloudflare", "Linux Environments", "SSR & CDN Caching"],
  },
];
