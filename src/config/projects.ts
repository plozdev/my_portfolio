export interface SkillItem {
  title: string;
  iconSrc?: string;
  shortText?: string;
  bgClass?: string;
}

export interface ProjectData {
  id: string;
  category: string;
  title: string;
  status: string;
  src: string;
  screenshots: { src: string; label: string }[];
  skills: {
    frontend: string[];
    backend: string[];
  };
  overview: string;
  keySolutions: { title: string; desc: string; icon?: string }[];
  github?: string;
  githubBackend?: string;
  githubFrontend?: string;
  live?: string;
}

export const PROJECT_CATEGORIES = [
  { id: 'all', label: '// ALL_PROJECTS' },
  { id: 'backend', label: '// BACKEND_SYSTEMS' },
  { id: 'web', label: '// WEB_&_TOOLS' },
];

export const SKILL_MAP: Record<string, SkillItem> = {
  // Frontend
  React: { title: 'React', iconSrc: '/logos/react.svg' },
  'Tailwind CSS': { title: 'Tailwind CSS', iconSrc: '/logos/tailwind.svg' },
  TypeScript: { title: 'TypeScript', iconSrc: '/logos/typescript.svg' },
  JavaScript: { title: 'JavaScript', iconSrc: '/logos/javascript.svg' },
  'Next.js': { title: 'Next.js', iconSrc: '/logos/nextjs.svg', bgClass: 'bg-white hover:bg-white/90 border border-white/80' },
  'Vue.js': { title: 'Vue.js', iconSrc: '/logos/vuejs.svg' },
  Vite: { title: 'Vite', iconSrc: '/logos/vite.svg' },
  'Framer Motion': { title: 'Framer Motion', iconSrc: '/logos/framer-motion.svg' },

  // Backend / Database / DevOps
  'Spring Boot': { title: 'Spring Boot', iconSrc: '/logos/spring.svg' },
  'Java 21': { title: 'Java 21', iconSrc: '/logos/java.svg' },
  'Kotlin (Android)': { title: 'Kotlin', iconSrc: '/logos/kotlin.svg' },
  Redis: { title: 'Redis', iconSrc: '/logos/redis.svg' },
  Redisson: { title: 'Redis', iconSrc: '/logos/redis.svg' },
  'Apache Kafka': { title: 'Apache Kafka', shortText: 'Kafka' },
  PostgreSQL: { title: 'PostgreSQL', iconSrc: '/logos/postgresql.svg' },
  Docker: { title: 'Docker', iconSrc: '/logos/docker.svg' },
  'Node.js': { title: 'Node.js', iconSrc: '/logos/nodejs.svg' },
  tRPC: { title: 'tRPC', iconSrc: '/logos/trpc.svg' },
  Cloudflare: { title: 'Cloudflare', iconSrc: '/logos/cloudflare.svg' },
  Python: { title: 'Python', iconSrc: '/logos/python.svg' },
  Git: { title: 'Git', iconSrc: '/logos/git.svg', bgClass: 'bg-white hover:bg-white/90 border border-white/80' },
  GitHub: { title: 'GitHub', iconSrc: '/logos/git.svg', bgClass: 'bg-white hover:bg-white/90 border border-white/80' },
};

export const getSkillItem = (name: string): SkillItem => {
  if (SKILL_MAP[name]) return SKILL_MAP[name];
  const shortText = name.split(' ')[0];
  return { title: name, shortText };
};

export const PROJECTS_LIST: ProjectData[] = [
  {
    id: 'tekcitym',
    category: 'backend',
    title: 'TekcitYm',
    status: 'ACTIVE BUILD',
    src: '/images/projects/tekcitym-banner.png',
    screenshots: [
      { src: '/images/projects/tekcitym-architecture.png', label: 'High-Concurrency System Architecture' },
      { src: '/images/projects/tekcitym-redis-lock.png', label: 'Redisson Distributed Locking Sequence' },
      { src: '/images/projects/tekcitym-benchmarks.png', label: 'JMeter Load Testing & Performance Metrics' },
    ],
    skills: {
      frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Java 21', 'Spring Boot', 'Redis', 'Redisson', 'PostgreSQL', 'Docker'],
    },
    overview:
      'High-concurrency ticket booking platform built with Spring Boot 4 / Java 21 backend and React 19 / Vite frontend, solving double-booking with Redisson distributed locking and JWT authentication.',
    keySolutions: [
      {
        title: 'Distributed Locking with Redisson',
        desc: 'Implemented fair locking mechanisms using Redisson over Redis to guarantee single-winner seat reservation during massive surge sales.',
        icon: 'lock',
      },
      {
        title: 'Stateless Security & JWT Auth',
        desc: 'Secured API endpoints with Spring Security and JJWT stateless authentication tokens, paired with OAuth2 client flows.',
        icon: 'zap',
      },
      {
        title: 'Reactive & Caching Architecture',
        desc: 'Leveraged Spring WebFlux & Spring Data JPA over PostgreSQL with Redis cache layers for high-throughput inventory reads.',
        icon: 'database',
      },
      {
        title: 'Modern SPA Frontend Architecture',
        desc: 'Built with React 19, TypeScript, TanStack Query, and Zustand for seamless real-time state management and fast UI renders.',
        icon: 'box',
      },
    ],
    githubBackend: 'https://github.com/plozdev/TekcitYm_backend',
    githubFrontend: 'https://github.com/plozdev/TekcitYm_frontend',
  },
  {
    id: 'developer-portfolio',
    category: 'web',
    title: 'Developer Portfolio',
    status: 'COMPLETED',
    src: '/images/projects/portfolio-project.png',
    screenshots: [
      { src: '/images/projects/portfolio-hero.png', label: 'Dark Cyber-Terminal Hero Section' },
      { src: '/images/projects/portfolio-projects.png', label: 'Interactive Project Showcase & Modals' },
      { src: '/images/projects/portfolio-[#6DB33F].png', label: 'Terminal IDE Playground & Shaders' },
    ],
    skills: {
      frontend: ['React', 'Tailwind CSS', 'TypeScript', 'Vite', 'Framer Motion'],
      backend: ['GitHub'],
    },
    overview:
      'A premium, fast, and responsive portfolio designed to showcase software engineering skills, professional experiences, and systems architectures.',
    keySolutions: [
      {
        title: 'Dynamic Scrolling Previews',
        desc: 'Developed an aspect-ratio calculation utility that dynamically determines image height vs. viewport dimensions to trigger Framer Motion scrolling.',
        icon: 'rotate-cw',
      },
      {
        title: 'Optimized Asset Delivery',
        desc: 'Leveraged Vite to bundle assets efficiently, compiling TypeScript and minifying CSS/JS into compact chunks with pre-rendered HTML components.',
        icon: 'zap',
      },
      {
        title: 'Cohesive Design System',
        desc: 'Created a terminal-inspired dark theme using glassmorphism, glowing borders, and neon green tokens for a unified visual identity.',
        icon: 'palette',
      },
      {
        title: 'Responsive Layout',
        desc: 'Crafted custom mobile layouts using Tailwind utility classes, ensuring fluid readability across screen sizes from 320px to 4K displays.',
        icon: 'smartphone',
      },
    ],
    github: 'https://github.com/plozdev/my_portfolio',
    live: 'https://plozdev.github.io/my_portfolio/',
  },
];
