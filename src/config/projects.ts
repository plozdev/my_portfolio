export interface SkillItem {
  title: string;
  iconSrc?: string;
  shortText?: string;
  bgClass?: string;
}

export interface ScreenshotItem {
  src: string;
  label: string;
  format?: 'mobile' | 'web';
}

export interface ProjectData {
  id: string;
  category: string;
  title: string;
  status: string;
  src: string;
  screenshots: ScreenshotItem[];
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
  youtube?: string;
  youtubeId?: string;
  showcase?: boolean;
  platformLabel?: string;
  previewLayout?: 'banner' | 'mobile';
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

  // AI & Systems
  'Gemini API': { title: 'Gemini API', iconSrc: '/logos/gemini.svg' },
  'C++/NDK': { title: 'C++/NDK', iconSrc: '/logos/cpp.svg' },
  WorkManager: { title: 'WorkManager', shortText: 'Work' },
  Room: { title: 'Room DB', shortText: 'Room' },
  Retrofit: { title: 'Retrofit', shortText: 'API' },
  'Text-to-Speech': { title: 'Text-to-Speech', shortText: 'TTS' },
  'Server-Sent Events': { title: 'Server-Sent Events', shortText: 'SSE' },

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
  'Spring Security': { title: 'Spring Security', iconSrc: '/logos/spring.svg' },
  'Java 21': { title: 'Java 21', iconSrc: '/logos/java.svg' },
  'Kotlin (Android)': { title: 'Kotlin', iconSrc: '/logos/kotlin.svg' },
  Redis: { title: 'Redis', iconSrc: '/logos/redis.svg' },
  Redisson: { title: 'Redis', iconSrc: '/logos/redis.svg' },
  'Apache Kafka': { title: 'Apache Kafka', iconSrc: '/logos/kafka.svg' },
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
    id: 'cyberpass',
    category: 'backend',
    title: 'CyberPass',
    status: 'PROTOTYPE',
    showcase: true,
    platformLabel: 'WEB + ANDROID',
    previewLayout: 'banner',
    src: '/images/projects/cyberpass/preview.png',
    youtube: 'https://www.youtube.com/watch?v=FQS_ODJHf4s',
    youtubeId: 'FQS_ODJHf4s',
    screenshots: [
      { src: '/images/projects/cyberpass/marketplace.png', label: 'Event Discovery & Marketplace', format: 'web' },
      { src: '/images/projects/cyberpass/booking.png', label: 'Ticket Booking & Seat Selection', format: 'web' },
      { src: '/images/projects/cyberpass/mobile-qr.png', label: 'Rotating QR Ticket on Android (30s Refresh)', format: 'mobile' },
      { src: '/images/projects/cyberpass/gate-checkin.png', label: 'Real-time Gate Check-in Simulator', format: 'web' },
      { src: '/images/projects/cyberpass/gate-checkin-mobile.png', label: 'Mobile Check-in Status Sync (SSE)', format: 'mobile' },
      { src: '/images/projects/cyberpass/admin-dashboard.png', label: 'Admin Gate Operations & Analytics', format: 'web' },
    ],
    skills: {
      frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Kotlin', 'Jetpack Compose'],
      backend: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Server-Sent Events', 'C++/NDK'],
    },
    skillTabs: {
      frontendLabel: 'Web & Android UI',
      backendLabel: 'Backend & Security',
    },
    overview:
      'An end-to-end anti-counterfeit event ticketing system featuring a React booking portal, native Android ticket wallet with 30s rotating dynamic QR codes (TOTP/NDK), and a high-throughput Spring Boot check-in verification engine with real-time SSE synchronization.',
    keySolutions: [
      {
        title: 'Dynamic Rotating QR Codes (TOTP/NDK)',
        desc: 'Android ticket wallet generates rolling QR codes refreshed every 30s using native C++/NDK cryptographic routines with HMAC fallback to prevent screenshot sharing.',
        icon: 'rotate-cw',
      },
      {
        title: 'Replay Protection & Instant Invalidation',
        desc: 'Spring Boot backend verifies current time-window tokens and immediately invalidates tickets upon successful gate scan, rejecting replayed or intercepted codes.',
        icon: 'shield',
      },
      {
        title: 'Real-Time State Sync via Server-Sent Events',
        desc: 'Pushes instantaneous ticket check-in confirmations from the gate scanner to the user\'s mobile wallet via lightweight SSE connections.',
        icon: 'zap',
      },
      {
        title: 'Event Operations & Gate Simulation Dashboard',
        desc: 'React web portal covers event discovery, quota-controlled ticket purchasing, live attendee tracking, and a gate verification console.',
        icon: 'database',
      },
    ],
    github: 'https://github.com/plozdev/dynamic-qr-ticketing',
  },
  {
    id: 'antam-ai',
    category: 'mobile',
    title: 'AnTâm.AI',
    status: 'TOP 500 • AI RISER',
    isMobile: true,
    previewLayout: 'banner',
    platformLabel: 'ANDROID • GEMINI AI',
    src: '/images/projects/antam-ai/preview.jpg',
    youtube: 'https://youtu.be/AnYKgnJpMAI',
    youtubeId: 'AnYKgnJpMAI',
    screenshots: [
      {
        src: '/images/projects/antam-ai/demo.gif',
        label: 'Senior-Friendly Scam Detection & TTS Guidance',
        format: 'mobile',
      },
    ],
    skills: {
      frontend: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Android SDK', 'Text-to-Speech'],
      backend: ['Gemini API', 'WorkManager', 'Room', 'Retrofit', 'Coroutines & Flow'],
    },
    skillTabs: {
      frontendLabel: 'Android UI & A11y',
      backendLabel: 'AI & Background Services',
    },
    overview:
      'An intelligent Android security assistant built for the AI Riser Vietnam 2026 competition (Top 500 Silver Tier nationwide — Anti-Scam & Inclusive Access tracks). It empowers users—especially senior citizens—to detect and avoid digital scams through Multimodal AI analysis (Google Gemini API), heuristic SMS background screening, and accessible Vietnamese Text-to-Speech guidance.',
    keySolutions: [
      {
        title: 'Top 500 AI Riser Vietnam 2026 Award',
        desc: 'Selected in Top 500 (Silver Tier) nationwide in the AI Riser Vietnam 2026 Innovation Challenge organized by Google Developer Groups, recognized in Anti-Scam and Inclusive Access tracks.',
        icon: 'shield',
      },
      {
        title: 'Multimodal AI Scam Detection',
        desc: 'Leverages Google Gemini API to analyze suspicious message texts, phishing links, and fake bank transfer screenshots, breaking down warning signs into accessible advice.',
        icon: 'zap',
      },
      {
        title: 'Two-Stage SMS Heuristic Screening',
        desc: 'Runs battery-efficient local heuristic screening via WorkManager to inspect incoming SMS, escalating suspicious messages for cloud AI verification only when necessary.',
        icon: 'shield',
      },
      {
        title: 'Senior-Friendly Accessibility & TTS',
        desc: 'High-contrast typography, large touch targets with Material 3, and integrated native Vietnamese Text-to-Speech allow elderly users to listen to security diagnoses clearly.',
        icon: 'smartphone',
      },
      {
        title: 'Fraudulent Receipt Verification',
        desc: 'Extracts critical transaction indicators from payment confirmation photos, actively guiding users to double-check their bank account balances before trusting screenshots.',
        icon: 'lock',
      },
    ],
    github: 'https://github.com/plozdev/AnTamAI',
  },
  {
    id: 'swipe-gallery',
    category: 'mobile',
    title: 'SwipeGallery',
    status: 'STABLE V1.0',
    isMobile: true,
    src: '/images/projects/swipegallery/demo-triage.webp',
    screenshots: [
      {
        src: '/images/projects/swipegallery/demo-triage.webp',
        label: 'Tinder-style Gesture & Card Triage (60fps)',
        format: 'mobile',
      },
      {
        src: '/images/projects/swipegallery/demo-pending.webp',
        label: 'Safe Staging Review & Dual Action Batch Deletion',
        format: 'mobile',
      },
      {
        src: '/images/projects/swipegallery/demo-settings.webp',
        label: 'Privacy Settings, Storage Metrics & Native Sharing',
        format: 'mobile',
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
    previewLayout: 'banner',
    src: '/images/projects/portfolio/preview.png',
    screenshots: [
      {
        src: '/images/projects/portfolio/preview.png',
        label: 'Dark Cyber-Terminal Portfolio & Interactive Showcase',
        format: 'web',
      },
    ],
    skills: {
      frontend: ['React', 'Tailwind CSS', 'TypeScript', 'Vite', 'Framer Motion'],
      backend: ['GitHub'],
    },
    overview:
      'A premium, fast, and responsive cyber-themed developer portfolio showcasing multiplatform applications, full-stack systems architecture, and engineering experiments.',
    keySolutions: [
      {
        title: 'Dynamic Aspect-Ratio Showcase',
        desc: 'Developed responsive preview containers that adapt dynamically between mobile device viewports and browser terminal windows.',
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
