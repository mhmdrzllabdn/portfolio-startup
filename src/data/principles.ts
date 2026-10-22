import { PrincipleItem } from "@/types";

export const principlesData: PrincipleItem[] = [
  {
    title: "MAINTAINABLE CODE",
    quote: "Writing structured code that can be understood, tested, and improved over time.",
    description: "Prioritizing modular component architecture, strict type safety with TypeScript, and descriptive abstractions that reduce cognitive overhead for the entire team.",
  },
  {
    title: "RELIABLE SYSTEMS",
    quote: "Considering error handling, validation, data integrity, and predictable application behavior.",
    description: "Designing end-to-end resilience through server-side input sanitization, ACID relational schemas, graceful error boundaries, and idempotent API transactions.",
  },
  {
    title: "CONTINUOUS LEARNING",
    quote: "Improving technical understanding through experimentation, testing, documentation, and project iteration.",
    description: "Actively benchmarking novel web platform APIs, reviewing engineering RFCs, and building working prototypes to validate architectural decisions.",
  },
];
