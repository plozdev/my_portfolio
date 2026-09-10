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
  skillTabs?: {
    frontendLabel?: string;
    backendLabel?: string;
  };
  overview: string;
  keySolutions: { title: string; desc: string; icon?: string }[];
  github?: string;
  githubBackend?: string;
  githubFrontend?: string;
  live?: string;
  download?: string;
  isMobile?: boolean;
}

export const PROJECT_CATEGORIES = [
  { id: 'all', label: '// ALL_PROJECTS' },
  { id: 'mobile', label: '// MOBILE_APPS' },
  { id: 'backend', label: '// BACKEND_SYSTEMS' },
  { id: 'web', label: '// WEB_&_TOOLS' },
];

export const SKILL_MAP: Record<string, SkillItem> = {
  // Mobile UI & Compose
  Kotlin: { title: 'Kotlin', iconSrc: '/logos/kotlin.svg' },
  'Compose Multiplatform': { title: 'Compose Multiplatform', iconSrc: '/logos/compose.svg' },
  'Jetpack Compose': { title: 'Jetpack Compose', iconSrc: '/logos/compose.svg' },
  'Material 3': { title: 'Material 3', iconSrc: '/logos/material3.svg' },
  Coil: { title: 'Coil', shortText: 'Coil' },

  // Architecture & Platform
  'Kotlin Multiplatform': { title: 'Kotlin Multiplatform', iconSrc: '/logos/kmp.svg' },
  'Android SDK': { title: 'Android SDK', iconSrc: '/logos/android.svg' },
  'Coroutines & Flow': { title: 'Coroutines & Flow', iconSrc: '/logos/kotlin.svg' },
  'Haptic Feedback': { title: 'Haptic Engine', shortText: 'Haptic' },

  // Web Frontend
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
    id: 'swipe-gallery',
    category: 'mobile',
    title: 'SwipeGallery',
    status: 'STABLE V1.0',
    isMobile: true,
    src: '/images/projects/swipegallery-triage.webp',
    screenshots: [
      {
        src: '/images/projects/swipegallery-triage.webp',
        label: 'Tinder-style Gesture & Card Triage (60fps)',
      },
      {
        src: '/images/projects/swipegallery-pending.webp',
        label: 'Safe Staging Review & Dual Action Batch Deletion',
      },
      {
        src: '/images/projects/swipegallery-settings.webp',
        label: 'Privacy Settings, Storage Metrics & Native Sharing',
      },
    ],
    skills: {
      frontend: ['Kotlin', 'Compose Multiplatform', 'Jetpack Compose', 'Material 3', 'Coil'],
      backend: ['Kotlin Multiplatform', 'Coroutines & Flow', 'Android SDK', 'Haptic Feedback', 'GitHub'],
    },
    skillTabs: {
      frontendLabel: 'UI & Compose',
      backendLabel: 'Architecture & Platform',
    },
    overview:
      'A modern, Tinder-style photo triage & gallery management mobile app built with Compose Multiplatform, delivering 60fps gesture-driven photo cleanup with physics-based undo animations, safe staging queues, and hardware haptic feedback.',
    keySolutions: [
      {
        title: 'Tinder-style Card Triage & Physics Undo',
        desc: 'Implemented high-performance 60fps card drag gestures with directional tilt rotation and spring-physics fly-in undo animation to restore photos without screen flicker.',
        icon: 'rotate-cw',
      },
      {
        title: 'Safe Staging Review Queue',
        desc: 'Staged deleted photos into a protected review batch with dual-action bars (Restore / Permanent Delete) and confirmation dialogs to prevent accidental photo loss.',
        icon: 'shield',
      },
      {
        title: 'Hardware Haptic Feedback Engine',
        desc: 'Integrated cross-platform vibration engines binding to Android Vibrator and iOS UIImpactFeedbackGenerator on swipe triggers and toggle actions.',
        icon: 'smartphone',
      },
      {
        title: 'Privacy-First & 100% Offline Architecture',
        desc: 'Zero network permissions required. Direct read & sync with native device photo libraries via Android MediaStore API and iOS Photos Framework.',
        icon: 'database',
      },
    ],
    github: 'https://github.com/plozdev/SwipeGallery',
    download: 'https://github.com/plozdev/SwipeGallery/releases/latest',
  },
  {
    id: 'developer-portfolio',
    category: 'web',
    title: 'Developer Portfolio',
    status: 'COMPLETED',
    isMobile: false,
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
