import {
  Code,
  Database,
  Server,
  Layers,
  Mail,
  Phone,
  MapPin,
  User,
  Home,
  Briefcase,
  FileText,
  Sparkles,
  Wrench,
  Palette,
  Camera,
  Terminal,
  Globe
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Terminal },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: Code },
];

export const skillsData = [
  {
    category: "Languages",
    icon: <Code className="w-5 h-5" />,
    items: ["Java", "JavaScript", "TypeScript", "PHP", "SQL"],
  },
  {
    category: "Frameworks",
    icon: <Layers className="w-5 h-5" />,
    items: ["Spring Boot", "Node.js", "Express.js", "CodeIgniter"],
  },
  {
    category: "Data & Cloud",
    icon: <Database className="w-5 h-5" />,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS S3/EC2", "Docker"],
  },
  {
    category: "Architecture",
    icon: <Server className="w-5 h-5" />,
    items: ["Microservices", "Event-Driven", "High-Availability", "REST APIs"],
  },
];

export const experienceData = [
  {
    role: "Software Engineer",
    company: "BeyondSystems",
    location: "Lagos, Nigeria",
    period: "June 2024 – Present",
    points: [
      "Designed scalable backend systems using Java/Spring Boot and ActiveMQ.",
      "Implemented real-time data pipelines with WebSocket & ActiveMQ Artemis.",
      "Built secure authorization systems across distributed microservices.",
    ],
  },
  {
    role: "Software Developer",
    company: "Datanucleus Inc.",
    location: "Ibadan, Nigeria",
    period: "May 2023 – June 2024",
    points: [
      "Developed Falcon, a real-time transaction tracking system for high-volume data.",
      "Architected subscription management engine with multi-tenant architecture.",
      "Mentored junior developers on production-grade backend services.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Wirepick",
    location: "Ibadan, Nigeria",
    period: "April 2022 – Feb 2023",
    points: [
      "Built RESTful APIs using Java/Spring Boot supporting high concurrency.",
      "Optimized API performance and implemented reliable message delivery systems.",
      "Designed secure authentication flows using JWT and OAuth.",
    ],
  },
];

export const projectsData = [
  {
    title: "Quiika - Digital Rewards",
    tech: ["Spring Boot", "Redis", "WebSocket"],
    desc: "Real-time claiming engine with secure transaction processing and allocation algorithms.",
    link: "#",
  },
  {
    title: "AIG Pro - Enterprise Workflow",
    tech: ["Node.js", "AWS S3", "MongoDB"],
    desc: "Multi-tenant system with RBAC and automated approval workflows.",
    link: "#",
  },
];

export const contactInfo = [
  {
    icon: <Mail className="w-4 h-4" />,
    text: "alakerejenus@gmail.com",
    href: "mailto:alakerejenus@gmail.com",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    text: "+234 815 786 8666",
    href: "tel:+2348157868666",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    text: "Portharcourt, NG",
    href: "#",
  },
];