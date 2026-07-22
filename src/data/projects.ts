export interface Project {
  id: string;
  name: string;
  status: string;
  progress?: string;
  featured?: boolean;
  shortDescription: string;
  overview?: string;
  problemStatement?: string[];
  architecture?: string;
  technicalChallenges?: string[];
  technologies: { category: string; items: string[] }[];
  architectureImage?: string;
  gallery?: string[];
  designDocument?: string;
  github?: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    id: "tekcitym",
    name: "TekcitYm",
    status: "Building",
    progress: "15–20% (Sprint 1: 80% complete)",
    featured: true,
    shortDescription: "High-concurrency event ticketing platform designed to eliminate overselling and improve booking performance during flash sales.",
    overview: "High-concurrency event ticketing platform designed to eliminate overselling and improve booking performance during flash sales.",
    problemStatement: [
      "Prevent seat overselling using Redisson distributed locks.",
      "Automatically release abandoned seats using Redis TTL.",
      "Process QR generation and confirmation emails asynchronously using Kafka.",
      "Reduce database pressure through Redis caching."
    ],
    architecture: "Modular Monolith",
    technologies: [
      { category: "Backend", items: ["Java 21", "Spring Boot", "Spring Security", "Spring Data JPA", "Redis", "Redisson", "Apache Kafka", "WebSocket (STOMP)"] },
      { category: "Frontend", items: ["React", "Tailwind", "Android Kotlin"] },
      { category: "Database", items: ["PostgreSQL", "Redis"] },
      { category: "Deployment", items: ["Render", "Railway", "Cloudinary", "AWS S3"] }
    ],
    architectureImage: "",
    gallery: ["", ""],
    designDocument: "",
    github: "",
    liveDemo: ""
  },
  {
    id: "distromonitor",
    name: "DistroMonitor",
    status: "Building",
    featured: false,
    shortDescription: "Real-time distributed system health dashboard with predictive alerting mechanisms.",
    technologies: [
      { category: "Languages", items: ["Rust", "WebAssembly"] }
    ]
  },
  {
    id: "authshield",
    name: "AuthShield Core",
    status: "Building",
    featured: false,
    shortDescription: "Lightweight OAuth2 provider implementation focused on low-latency IoT authentication.",
    technologies: [
      { category: "Backend", items: ["Java 21", "Redis"] }
    ]
  },
  {
    id: "private-project",
    name: "Private Project",
    status: "Planning",
    featured: false,
    shortDescription: "Currently under development. Details will be published soon.",
    technologies: []
  }
];
