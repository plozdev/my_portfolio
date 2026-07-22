export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  context: string;
  teamSize?: string;
  responsibilities: string[];
  takeaways: string[];
  technologies: string[];
  logoUrl?: string;
}

export const experiences: Experience[] = [
  {
    id: "fpt-software",
    role: "Software Engineer Intern",
    company: "FPT Software",
    startDate: "May 2024", 
    endDate: "Present",
    context: "Working on a production Java legacy system for a Japanese client.",
    teamSize: "Approximately 10–20 developers, mostly senior engineers.",
    responsibilities: [
      "Navigate a large legacy codebase.",
      "Investigate and resolve assigned UI defects.",
      "Develop assigned features within an existing enterprise system.",
      "Work closely with testers during verification and regression testing."
    ],
    takeaways: [
      "Read and understand existing business logic before making changes.",
      "Learn software maintenance and enterprise development workflows."
    ],
    technologies: ["Java", "Apache Struts", "Apache Ant", "Oracle Database", "JSP", "HTML"],
    logoUrl: "/images/experience/fpt-software.png"
  }
];
