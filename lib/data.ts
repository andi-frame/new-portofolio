import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export interface Profile {
  name: string;
  role: string;
  hook: string;
  about: string;
  email: string;
  education?: {
      institution: string;
      degree: string;
      year: string;
      description?: string;
  }[];
  licenses?: {
      name: string;
      issuer: string;
      date: string;
      link?: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  hasDetail?: boolean;
  images?: string[];
}

export interface Project {
  id: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  imageCount: number;
  thumbnailImage: number;
  headerImage: number;
  headerImageY?: string; // top, center, bottom, 30%, etc.
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  instagram: string;
  email: string;
  x?: string;
}

export const profile: Profile = {
  name: "Andi Farhan Hidayat",
  role: "Full Stack Developer",
  hook: "Turning ambitious visions into efficient, effective products that exceed expectations.",
  about: "I translate vision into reality. My expertise lies in taking a core problem or idea and engineering a finished product that not only solves the issue but does so with maximum efficiency and effectiveness. I don't just write code; I deliver solutions that meet and exceed expectations, handling everything from complex back-end architecture to seamless user experiences.",
  email: "andifarhan1094@gmail.com",
  education: [
    {
      institution: "Institut Teknologi Bandung (ITB)",
      degree: "Bachelor of Informatics",
      year: "2023 - 2027",
      description: "Informatics Engineering Student. Full scholarship awardee.",
    },
    {
      institution: "SMA Pradita Dirgantara",
      degree: "High School Diploma",
      year: "2020 - 2023",
      description: "Full scholarship awardee.",
    }
  ]
};

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Director General of Back-End",
    company: "Ministry of Information and Technology - Kabinet KM ITB",
    period: "Aug 2025 - Present",
    description: [
      "Leading back-end strategies and infrastructure.",
      "Ensuring robust system architecture for student government digital services.",
    ],
    skills: ["Leadership", "Back-End Architecture", "System Design"],
    hasDetail: false,
    images: ["merem_ui.png", "nobazir_home.png"],
  },
  {
    id: "2",
    role: "Staff Technology and Research",
    company: "HMIF ITB",
    period: "Jul 2025 - Present",
    description: [
      "Full Stack Web Developer for SPARTA HMIF ITB 2024 (May 2025 - Sep 2025).",
      "Created authentication and database implementation used by 300+ participants.",
      "Found and fixed a crucial bug that could have removed all data.",
      "Implemented leaderboard page.",
    ],
    skills: ["Auth", "Database", "Go", "Gin Gonic", "Vite", "Teamwork"],
  },
  {
    id: "3",
    role: "Deputy Head of Back-End Subdivision",
    company: "ARKAVIDIA",
    period: "Oct 2025 - Dec 2025",
    description: [
      "Managed back-end development tasks and team coordination.",
      "Ensured agile delivery of technical requirements.",
    ],
    skills: ["Back-End", "Agile", "Linear", "Fiber"],
  },
  {
    id: "4",
    role: "Head of Information Technology",
    company: "Parade Wisuda Oktober 2025",
    period: "Aug 2025 - Dec 2025",
    description: [
      "Led the IT Division for ITB's Graduation Parade.",
      "Managed a team of 28 members to deliver website creation, live recording, and tech support.",
      "Developed https://wisokto2025.wisudaitb.id.",
      "Coordinated live recording of the parade.",
    ],
    skills: ["Leadership", "Systems Design", "Full-Stack", "Web Design", "Camera Op"],
    hasDetail: false,
    images: ["kpu_vote.png"],
  },
  {
    id: "5",
    role: "Back-End Developer Information IT",
    company: "OSKM ITB 2025",
    period: "Jun 2025 - Aug 2025",
    description: [
      "Implemented a class selection system for thousands of participants using Redis, SSE, and pub/sub.",
      "Implemented leaderboard RESTful API calls for Pendidikan Terpusat ITB 2025.",
    ],
    skills: ["Hono", "Redis", "PostgreSQL", "REST APIs", "Back-End"],
  },
  {
    id: "6",
    role: "Back-End Developer",
    company: "Parade Wisuda Oktober ITB 2024",
    period: "Sep 2024 - Oct 2024",
    description: [
      "Created project functional requirements for task division.",
      "Implemented backend features for search and like with next-safe-action.",
      "Implemented cookie-based like feature without signup.",
    ],
    skills: ["Next Safe Action", "TypeScript", "Project Mgmt", "PostgreSQL", "Prisma"],
  },
  {
    id: "7",
    role: "Back End Developer Social IT",
    company: "OSKM ITB 2024",
    period: "Jul 2024 - Sep 2024",
    description: [
      "Developed a tokenized attendance system for ITB-X integration.",
      "Implemented router for efficient paginated booth data.",
      "Assisted Front-End development for the home page.",
    ],
    skills: ["tRPC", "TypeScript", "Drizzle", "PostgreSQL", "Next.js", "Supabase"],
  },
  {
    id: "8",
    role: "Robotics Software Control Dept",
    company: "Aksantara ITB",
    period: "Feb 2024 - Sep 2024",
    description: [
      "Team: Vertical Take-Off and Landing (VTOL).",
      "Worked on software control systems for robotics.",
    ],
    skills: ["ROS", "OpenCV", "OOP", "C++", "Teamwork"],
  },
  {
    id: "9",
    role: "Web Developer",
    company: "IMPACT ITB",
    period: "May 2024 - Jul 2024",
    description: [
      "Developed web solutions for IMPACT ITB.",
    ],
    skills: ["Vite", "TypeScript", "React.js", "Tailwind CSS", "GitHub"],
  },
  {
    id: "10",
    role: "Head of Front-End Sub Division",
    company: "Aksi Angkatan STEIK'23",
    period: "Sep 2023 - Oct 2023",
    description: [
      "Led Front-End development for STEI-K ITB 2023 events.",
    ],
    skills: ["Vite", "React.js", "Leadership", "Communication", "TypeScript"],
  },
];

export const projects: Project[] = [
  {
    id: "kpu-unpad-2024",
    slug: "kpu-unpad-2024",
    order: 1,
    title: "Web KPU Pharmacy UNPAD",
    description: "Voting website for BEM and BPM elections at Unpad Pharmacy Faculty. Features token-based voting, paginated candidate display, and real-time admin dashboard. Served 495 users with security safeguards.",
    techStack: ["T3 Stack", "Next.js", "tRPC", "Supabase", "Drizzle", "Zod", "Zustand"],
    link: "",
    imageCount: 16,
    thumbnailImage: 2,
    headerImage: 2,
    headerImageY: "top",
  },
  {
    id: "nobazir",
    slug: "nobazir",
    order: 2,
    title: "NoBazir",
    description: "A web app designed to reduce food waste by connecting merchants with customers for surplus food (LeftOver). Features include a marketplace, community platform, calorie tracker, and seller center.",
    techStack: ["T3 Stack", "Next.js", "Firebase", "Supabase", "React.js", "Tailwind"],
    link: "https://lnkd.in/g-HeJ6Bs",
    imageCount: 10,
    thumbnailImage: 1,
    headerImage: 1,
    headerImageY: "top",
  },
  {
    id: "maca",
    slug: "maca",
    order: 3,
    title: "MACA (AI Reading App)",
    description: "AI-powered tool that scans PDF books and transforms them into text and audio. Uses Tesseract for OCR and ElevenLabs for TTS. Allows users to ask AI questions about the book content.",
    techStack: ["MERN", "MongoDB", "Express", "React", "Node", "Firebase", "ElevenLabs", "Tesseract"],
    link: "https://github.com/andi-frame/Maca",
    imageCount: 15,
    thumbnailImage: 1,
    headerImage: 1,
    headerImageY: "top",
  },
  {
    id: "merem",
    slug: "merem",
    order: 4,
    title: "MereM (Car Rental App)",
    description: "A comprehensive application designed to streamline car rental business operations. Features include unit management, transaction recording, rental history, customer data, and notifications for returns/payments. Built using MVC pattern with Python (PyQt6) and SQLite.",
    techStack: ["Python", "PyQt6", "SQLite", "MVC", "QT Designer"],
    link: "https://github.com/andi-frame/IF2150-2024-K03-G05-MereM",
    imageCount: 15,
    thumbnailImage: 14,
    headerImage: 14,
    headerImageY: "12%",
  },
];

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Python", "C++", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Gin Gonic", "Hono", "Fiber", "tRPC", "Express", "Next Safe Action"],
  },
  {
    category: "Data & Cloud",
    items: ["PostgreSQL", "Redis", "Supabase", "Firebase", "Docker", "Linear"],
  },
];

export const socialLinks: SocialLinks = {
  linkedin: "https://linkedin.com/in/andi-farhan-hidayat",
  github: "https://github.com/andi-frame",
  instagram: "https://instagram.com/andfarhandyt",
  email: "mailto:andifarhan1094@gmail.com",
};
