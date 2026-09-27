import {
  Binary,
  Code2,
  Database,
  GitBranch,
  Globe2,
  GraduationCap,
  Hand,
  Layers3,
  Network,
  ShieldCheck,
  Terminal,
  Wheat
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  name: string;
  description: string;
  visual: string;
  technologies: string[];
  status:
    | "En cours"
    | "Terminé"
    | "In progress"
    | "Completed"
    | "En curso"
    | "Completado"
    | "قيد التطوير"
    | "مكتمل";
  problem: string;
  solution: string;
  difficulties: string[];
  learning: string;
  innovation: string;
  link?: {
    label: string;
    href: string;
  };
};

export type TimelineEvent = {
  year: string;
  title: string;
  tone: string;
  icon: LucideIcon;
};

export type SkillItem = {
  name: string;
  description: string;
  projects: string[];
  icon: LucideIcon;
};

export type SkillCategory = {
  title: string;
  items: SkillItem[];
};

export const timeline: TimelineEvent[] = [
  {
    year: "2016",
    title: "Premiers intérêts pour la technologie",
    tone: "Curiosité",
    icon: Globe2
  },
  {
    year: "2019",
    title: "Découverte de l'informatique",
    tone: "Découverte",
    icon: Terminal
  },
  {
    year: "2024",
    title: "Premiers pas en programmation",
    tone: "Apprentissage",
    icon: Code2
  },
  {
    year: "2025",
    title: "Premier projet",
    tone: "Création",
    icon: GitBranch
  },
  {
    year: "2026",
    title: "Cybersécurité et nouveaux projets",
    tone: "Ambition",
    icon: ShieldCheck
  }
];

export const projects: Project[] = [
  {
    slug: "handcontrol",
    name: "HandControl",
    description:
      "Logiciel PC permettant de contrôler le curseur de la souris avec la main.",
    visual: "/project-handcontrol.svg",
    technologies: ["Python", "OpenCV", "MediaPipe"],
    status: "En cours",
    problem:
      "Rendre le contrôle du curseur plus naturel sans imposer le contact avec une souris traditionnelle.",
    solution:
      "Exploiter la vision par ordinateur pour interpréter les mouvements de la main et les traduire en actions de souris.",
    difficulties: [
      "Problème d'environnement Python",
      "Indisponibilité de l'API MediaPipe",
      "Absence de dépendances"
    ],
    learning:
      "Ce projet m'a appris à relier un besoin concret à des bibliothèques spécialisées, à mieux gérer les environnements Python et à comprendre l'importance des dépendances dans un projet de vision par ordinateur.",
    innovation:
      "Permettre de contrôler le curseur sans toucher à la souris afin d'améliorer l'aisance d'utilisation et de proposer une alternative au contrôle traditionnel."
  },
  {
    slug: "pythonlearning",
    name: "PythonLearning",
    description:
      "Site web destiné à apprendre et maîtriser le langage de programmation Python.",
    visual: "/project-pythonlearning.png",
    technologies: ["Django", "Python", "Bootstrap", "Firebase"],
    status: "Terminé",
    problem:
      "Structurer un parcours web clair pour accompagner l'apprentissage de Python.",
    solution:
      "Créer un site pédagogique avec Django et une interface accessible pour consulter les contenus.",
    difficulties: ["Mauvaise configuration/structure au départ"],
    learning:
      "J'ai appris à structurer une application Django, à organiser les pages d'un site pédagogique et à mieux anticiper la configuration nécessaire avant la mise en ligne.",
    innovation:
      "Rendre l'apprentissage de Python plus accessible à travers un espace web dédié.",
    link: {
      label: "Voir PythonLearning",
      href: "https://aricbj.pythonanywhere.com"
    }
  },
  {
    slug: "agrihub225",
    name: "AgriHub225",
    description:
      "Plateforme de gestion agricole pour parcelles, plantations, stocks et suivi.",
    visual: "/project-agrihub225.svg",
    technologies: ["Django", "PostgreSQL", "React + Vite", "Power BI"],
    status: "En cours",
    problem:
      "Centraliser le suivi agricole et clarifier la gestion des données de production.",
    solution:
      "Développer une plateforme combinant backend Django, base PostgreSQL, frontend React et visualisation Power BI.",
    difficulties: ["MCD incomplet au départ"],
    learning:
      "Ce projet me fait progresser sur la conception d'un modèle de données, la séparation entre backend et frontend, et la transformation des données en informations utiles pour le suivi agricole.",
    innovation: "Faciliter le travail des agriculteurs grâce au digital."
  }
];

export const skills: SkillCategory[] = [
  {
    title: "LANGAGES",
    items: [
      {
        name: "C",
        description:
          "Base bas niveau utile pour comprendre la mémoire, les systèmes et les fondations de la sécurité.",
        projects: ["À relier à un projet futur"],
        icon: Binary
      },
      {
        name: "Python",
        description:
          "Langage central pour les scripts, Django et les prototypes orientés vision ou automatisation.",
        projects: ["HandControl", "PythonLearning"],
        icon: Code2
      },
      {
        name: "JavaScript",
        description:
          "Langage web pour construire des interfaces interactives et connecter le frontend aux services.",
        projects: ["AgriHub225"],
        icon: Layers3
      },
      {
        name: "HTML/CSS",
        description:
          "Fondation de l'interface web, de la structure sémantique et de l'expérience responsive.",
        projects: ["PythonLearning", "AgriHub225"],
        icon: Globe2
      }
    ]
  },
  {
    title: "SYSTÈMES",
    items: [
      {
        name: "Linux",
        description:
          "Environnement incontournable pour le développement, les réseaux et l'apprentissage cybersécurité.",
        projects: ["À préciser"],
        icon: Terminal
      },
      {
        name: "Windows",
        description:
          "Système utilisé pour les outils PC et les expérimentations applicatives.",
        projects: ["HandControl"],
        icon: Database
      }
    ]
  },
  {
    title: "RÉSEAUX",
    items: [
      {
        name: "TCP/IP",
        description:
          "Socle de compréhension des échanges réseau, utile en développement et sécurité.",
        projects: ["À préciser"],
        icon: Network
      },
      {
        name: "VLAN",
        description:
          "Segmentation réseau et logique d'isolation pour mieux structurer les environnements.",
        projects: ["À préciser"],
        icon: Layers3
      },
      {
        name: "Cisco",
        description:
          "Écosystème réseau pour pratiquer la configuration et les concepts d'infrastructure.",
        projects: ["À préciser"],
        icon: GitBranch
      }
    ]
  },
  {
    title: "SÉCURITÉ",
    items: [
      {
        name: "CTF",
        description:
          "Pratique progressive des défis de sécurité pour apprendre par l'expérimentation.",
        projects: ["À relier à un projet futur"],
        icon: ShieldCheck
      },
      {
        name: "Web Security",
        description:
          "Compréhension des risques web et des réflexes nécessaires pour bâtir des interfaces plus sûres.",
        projects: ["PythonLearning", "AgriHub225"],
        icon: Globe2
      },
      {
        name: "Cryptographie",
        description:
          "Étude des mécanismes qui protègent les échanges et les données.",
        projects: ["À préciser"],
        icon: GraduationCap
      }
    ]
  }
];

export const contactLinks = {
  phone: "+225 0718894685",
  phoneHref: "tel:+2250718894685",
  githubLabel: "arielcampbelljuniorbessou-ship-it (ariel)",
  githubHref: "https://github.com/arielcampbelljuniorbessou-ship-it",
  linkedInHref:
    "https://www.linkedin.com/in/ariel-campbell-junior-bessou-0560463b5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  email: "arielcampbelljuniorbessou@gmail.com",
  emailHref: "mailto:arielcampbelljuniorbessou@gmail.com"
};

export const floatingObjects = [
  { label: "Code", icon: Code2, className: "left-[5%] top-[26%]" },
  { label: "Terminal", icon: Terminal, className: "right-[10%] top-[18%]" },
  { label: "Réseau", icon: Network, className: "right-[18%] bottom-[22%]" },
  { label: "Sécurité", icon: ShieldCheck, className: "left-[15%] bottom-[16%]" },
  { label: "Interface", icon: Hand, className: "left-[46%] top-[14%]" },
  { label: "Données", icon: Database, className: "right-[40%] bottom-[12%]" },
  { label: "Agriculture", icon: Wheat, className: "left-[34%] bottom-[28%]" }
];
