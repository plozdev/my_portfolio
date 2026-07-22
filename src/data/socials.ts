export interface SocialLink {
  platform: "GitHub" | "LinkedIn" | "Email";
  href: string;
}

export const socials: SocialLink[] = [
  { platform: "GitHub", href: "https://github.com/plozdev" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/in/hoangmai-it/" },
  { platform: "Email", href: "mailto:hoangmai.it.dev@gmail.com" }
];
