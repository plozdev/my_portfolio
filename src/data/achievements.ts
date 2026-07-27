/**
 * achievements.ts
 *
 * Source of truth for achievement metadata used by SEO / structured data.
 * The Achievements.tsx section component contains its own richer inline
 * data (descriptions, images) for rendering — this file is the canonical
 * lightweight reference used by other parts of the app (e.g. SEO tags).
 */

export interface Achievement {
  id: string;
  title: string;
  category: 'Competitive Programming' | 'Academic' | 'Hackathon' | 'Leadership';
  result: string;           // e.g. "Top 59", "Top 3", "Scholarship recipient"
  organization: string;
  date: string;
  team?: string;
  description?: string;
  learned?: string[];
  image?: string;
  certificate?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'icpc-asia-hcmc-2025',
    title: 'ICPC Asia Ho Chi Minh City Regional Contest 2025',
    category: 'Competitive Programming',
    result: 'Top 59',
    organization: 'ICPC',
    date: 'December 2025',
    team: 'FPTU HCM – Dolphin',
  },
  {
    id: 'icpc-national-2025',
    title: 'ICPC Vietnam National Programming Contest 2025',
    category: 'Competitive Programming',
    result: 'Top 171',
    organization: 'ICPC Vietnam',
    date: 'November 2025',
    team: 'FPTU HCM – Dolphin',
  },
  {
    id: 'icpc-southern-2025',
    title: 'ICPC Vietnam Southern Provincial Contest 2025',
    category: 'Competitive Programming',
    result: 'Top 18',
    organization: 'ICPC Vietnam',
    date: 'October 2025',
    team: 'FPTU HCM – Dolphin',
  },
  {
    id: 'ai-hackathon-fptu-2025',
    title: 'AI Innovation Hackathon 2025',
    category: 'Hackathon',
    result: 'Top 3 · Team Leader',
    organization: 'FPT University',
    date: '2025',
  },
  {
    id: 'fpt-scholarship',
    title: 'FPT University Scholarship',
    category: 'Academic',
    result: 'Merit-based scholarship recipient',
    organization: 'FPT University',
    date: '2021 – Present',
  },
];
