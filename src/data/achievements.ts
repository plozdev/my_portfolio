export interface Achievement {
  id: string;
  title: string;
  category: "Competitive Programming" | "Academic" | "Hackathon" | "Leadership";
  description: string;
  organization: string;
  date: string;
  learned?: string[];
  image?: string;
  certificate?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: "icpc-regional",
    title: "ICPC Asia HCMC Regional Contest 2025",
    category: "Competitive Programming",
    description: "Top 59 out of hundreds of teams.",
    organization: "ICPC",
    date: "2025",
    learned: [
      "Dynamic Programming, Graph Theory, and Advanced Data Structures",
      "Team collaboration and problem solving under intense time constraints"
    ]
  },
  {
    id: "icpc-national",
    title: "ICPC Vietnam National Contest 2025",
    category: "Competitive Programming",
    description: "Top 171 nationally.",
    organization: "ICPC",
    date: "2025",
    learned: [
      "Rigorous algorithm analysis and Big-O complexity"
    ]
  },
  {
    id: "icpc-provincial",
    title: "ICPC Southern Provincial Contest 2025",
    category: "Competitive Programming",
    description: "Top 18 regionally.",
    organization: "ICPC",
    date: "2025",
  },
  {
    id: "fpt-scholarship",
    title: "FPT University Talent Scholarship",
    category: "Academic",
    description: "Awarded 70% talent scholarship.",
    organization: "FPT University",
    date: "2023",
  },
  {
    id: "ai-hackathon",
    title: "AI Innovation Hackathon FPTU 2025",
    category: "Hackathon",
    description: "Top 3 Finalist.",
    organization: "FPT University",
    date: "2025",
    learned: [
      "Rapid prototyping and iterative development",
      "Integrating AI APIs into full-stack applications"
    ]
  }
];
