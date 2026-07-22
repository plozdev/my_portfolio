export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Currently Using",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "React"]
  },
  {
    name: "Languages",
    skills: ["Java", "C++", "TypeScript", "JavaScript", "Kotlin"]
  },
  {
    name: "Frameworks",
    skills: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "React", "Android Jetpack Compose"]
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "Oracle", "Redis", "MySQL"]
  },
  {
    name: "Messaging",
    skills: ["Apache Kafka", "WebSocket"]
  },
  {
    name: "Cloud",
    skills: ["Google Cloud", "Firebase", "Cloudinary", "AWS S3"]
  },
  {
    name: "Developer Tools",
    skills: ["Git", "Docker", "GitHub Actions", "Postman", "IntelliJ IDEA", "VS Code"]
  }
];
