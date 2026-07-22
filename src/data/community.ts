export interface CommunityEvent {
  id: string;
  title: string;
  role: string;
  date: string;
  description: string;
  responsibilities: string[];
  participants?: string;
  coverImage?: string;
  gallery?: string[];
  speakerImages?: string[];
  links?: { label: string; url: string }[];
}

export const communityRole = "Chapter Lead — GDGoC FPTU HCMC";

export const communityEvents: CommunityEvent[] = [
  {
    id: "build-with-ai-2025",
    title: "Build With AI 2025",
    role: "Facilitator",
    date: "2025",
    description: "Google AI codelabs facilitation.",
    participants: "Approximately 50 participants.",
    responsibilities: [
      "Help participants complete Google AI codelabs."
    ],
    links: [
      { label: "Event Page", url: "#" }
    ]
  },
  {
    id: "build-with-ai-2026",
    title: "Build With AI 2026",
    role: "Host",
    date: "2026",
    description: "Online event hosting and moderation.",
    participants: "Approximately 30 attendees.",
    responsibilities: [
      "Run online event.",
      "Moderate sessions."
    ]
  },
  {
    id: "gdgoc-hackathon-vietnam",
    title: "GDGoC Hackathon Vietnam",
    role: "Southern Leader",
    date: "2025",
    description: "Nationwide hackathon operation.",
    responsibilities: [
      "Coordinate with organizers.",
      "Support southern chapters.",
      "Help operate nationwide hackathon."
    ]
  }
];
