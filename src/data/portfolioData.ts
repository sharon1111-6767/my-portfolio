export interface SkillEntry {
  name: string;
  focus: string;
  context: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  summary: string;
  items: SkillEntry[];
}

export interface ProjectItem {
  id: string;
  slotNumber: string;
  status: 'placeholder' | 'published';
  title: string;
  description: string;
  technologies: string[];
  image: string | null;
  imageAlt?: string;
  githubUrl: string | null;
  liveUrl: string | null;
  focusArea: string;
  layoutSpan: 'featured' | 'compact' | 'wide';
}

export interface InterestArea {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  explorations: string[];
  image: string | null;
  visualType: 'electronics' | 'ai' | 'iot' | 'web';
}

export type AchievementCategory =
  | 'certification'
  | 'competition'
  | 'hackathon'
  | 'workshop'
  | 'academic';

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
}

export const SITE_META = {
  brand: 'SHARANYA.',
  name: 'Sharanya',
  descriptor: 'ECE Student · Technology Enthusiast · Lifelong Learner',
  degree: 'Electronics and Communication Engineering',
  institution: 'Bangalore Institute of Technology, Bengaluru',
  availabilityLabel: 'Open to Collaborate',
  availabilityDetail: 'Available for learning collaborations, student research & engineering discussions.',
  closingPhrase: 'Built with curiosity.',
  resumePath: '/resume.pdf',
  heroImage: '/src/assets/images/hero_obsidian_circuit_1794994216791.jpg',
  aboutImage: '/src/assets/images/about_workbench_editorial_1794994217686.jpg',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

/**
 * CONTACT_CONFIG
 * Update these fields with real links and an optional form endpoint
 * (such as Formspree, Web3Forms, or a custom /api/contact route).
 * Leave as null when unconfigured so the interface displays honest placeholders.
 */
export const CONTACT_CONFIG: {
  email: string | null;
  githubUrl: string | null;
  githubHandle: string | null;
  linkedinUrl: string | null;
  linkedinHandle: string | null;
  formEndpoint: string | null;
} = {
  email: null,
  githubUrl: null,
  githubHandle: null,
  linkedinUrl: null,
  linkedinHandle: null,
  formEndpoint: null,
};

export const ABOUT_PROFILE = {
  heading: 'A little about my world.',
  paragraphs: [
    "I'm Sharanya, an Electronics and Communication Engineering student at Bangalore Institute of Technology, Bengaluru, driven by a deep curiosity for how systems work beneath the surface.",
    'My academic path sits at a compelling crossroads—where physical electronics and signal logic meet artificial intelligence, connected Internet of Things architectures, and expressive web software.',
    'Working across C, Python, HTML, CSS, JavaScript, and React, I enjoy translating foundational engineering concepts into tangible experiments and learning how distinct disciplines inform one another.',
  ],
  facts: [
    { label: 'Discipline', value: 'Electronics & Communication Engineering' },
    { label: 'Institution', value: 'Bangalore Institute of Technology, Bengaluru' },
    { label: 'Core Languages', value: 'C, Python, JavaScript' },
    { label: 'Web Foundations', value: 'HTML, CSS, React' },
  ],
} as const;

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    summary: 'Foundational languages for systems thinking, problem solving, and application logic.',
    items: [
      {
        name: 'C',
        focus: 'Low-Level Foundations',
        context: 'Exploring memory models, structured logic, and hardware-adjacent fundamentals in ECE coursework.',
      },
      {
        name: 'Python',
        focus: 'Computational Thinking',
        context: 'Practicing algorithmic problem solving, scripting, and foundational concepts in artificial intelligence.',
      },
      {
        name: 'JavaScript',
        focus: 'Interactive Logic',
        context: 'Building dynamic client-side behavior, DOM interactions, and asynchronous browser workflows.',
      },
    ],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    summary: 'Crafting accessible, structured, and responsive interfaces for the modern web.',
    items: [
      {
        name: 'HTML',
        focus: 'Semantic Structure',
        context: 'Writing clean, accessible document hierarchies with proper landmarks and screen-reader clarity.',
      },
      {
        name: 'CSS',
        focus: 'Layout & Visual Craft',
        context: 'Designing responsive grids, typographic rhythm, and restrained motion systems across viewports.',
      },
      {
        name: 'React',
        focus: 'Component Architecture',
        context: 'Structuring reusable stateful components and predictable UI flows with modern React patterns.',
      },
    ],
  },
  {
    id: 'technology-interests',
    label: 'Technology Interests',
    summary: 'Interdisciplinary domains shaping my academic exploration and future engineering work.',
    items: [
      {
        name: 'Electronics',
        focus: 'Hardware & Signals',
        context: 'Studying circuit behavior, digital logic, and communication principles at Bangalore Institute of Technology.',
      },
      {
        name: 'Artificial Intelligence',
        focus: 'Intelligent Systems',
        context: 'Learning how machine learning and computational models augment perception and decision-making.',
      },
      {
        name: 'Internet of Things',
        focus: 'Connected Environments',
        context: 'Investigating how embedded sensors, microcontrollers, and network protocols bridge physical and digital worlds.',
      },
      {
        name: 'Web Development',
        focus: 'Digital Interfaces',
        context: 'Designing clear, human-centered web tools that turn complex engineering ideas into intuitive experiences.',
      },
    ],
  },
];

/**
 * PROJECTS_DATA
 * Central project registry. To publish a real project:
 * 1. Change status from 'placeholder' to 'published'
 * 2. Fill in title, description, technologies, image path, githubUrl, and liveUrl.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'slot-01',
    slotNumber: '01',
    status: 'placeholder',
    title: 'Project Slot 01 — Awaiting Entry',
    description:
      'Reserved slot for an upcoming engineering build or software exploration. Configured to display full case context, stack details, and repository links once documented.',
    technologies: ['Pending Stack', 'Schema Ready'],
    image: null,
    githubUrl: null,
    liveUrl: null,
    focusArea: 'Hardware / Embedded / AI Exploration',
    layoutSpan: 'featured',
  },
  {
    id: 'slot-02',
    slotNumber: '02',
    status: 'placeholder',
    title: 'Project Slot 02 — Awaiting Entry',
    description:
      'Reserved slot for a connected IoT prototype or computational study. Supports high-resolution preview imagery, live demo URL, and source repository.',
    technologies: ['Pending Stack', 'Schema Ready'],
    image: null,
    githubUrl: null,
    liveUrl: null,
    focusArea: 'Internet of Things / Signals',
    layoutSpan: 'compact',
  },
  {
    id: 'slot-03',
    slotNumber: '03',
    status: 'placeholder',
    title: 'Project Slot 03 — Awaiting Entry',
    description:
      'Reserved slot for a web interface or interdisciplinary research artifact. Expandable directly from the central portfolio registry.',
    technologies: ['Pending Stack', 'Schema Ready'],
    image: null,
    githubUrl: null,
    liveUrl: null,
    focusArea: 'Web Interface / Systems Design',
    layoutSpan: 'wide',
  },
];

export const AREAS_OF_INTEREST: InterestArea[] = [
  {
    index: '01',
    title: 'Electronics',
    subtitle: 'Circuit Logic, Signal Pathways & Physical Computing',
    description:
      'Exploring how voltage, timing, and silicon architecture form the physical bedrock of modern computation and communication systems.',
    explorations: ['Analog & Digital Circuits', 'Signal Processing Basics', 'Microcontroller Systems'],
    image: '/src/assets/images/interest_electronics_plate_1794994218251.jpg',
    visualType: 'electronics',
  },
  {
    index: '02',
    title: 'Artificial Intelligence',
    subtitle: 'Pattern Recognition, Computational Models & Applied Logic',
    description:
      'Investigating how statistical learning and Python-driven models interpret complex inputs and open new possibilities for intelligent engineering.',
    explorations: ['Python Foundations', 'Data Representation', 'Intelligent Automation'],
    image: '/src/assets/images/interest_ai_iot_plate_1794994219062.jpg',
    visualType: 'ai',
  },
  {
    index: '03',
    title: 'Internet of Things',
    subtitle: 'Sensor Networks, Edge Nodes & Physical-Digital Bridges',
    description:
      'Connecting physical sensing hardware with network protocols and readable interfaces to observe and respond to real-world environments.',
    explorations: ['Sensor Integration', 'Embedded Connectivity', 'Real-Time Telemetry'],
    image: '/src/assets/images/hero_obsidian_circuit_1794994216791.jpg',
    visualType: 'iot',
  },
  {
    index: '04',
    title: 'Web Development',
    subtitle: 'Interactive Systems, Editorial Interfaces & Component Craft',
    description:
      'Translating technical ideas into fast, accessible browser applications using semantic HTML, expressive CSS, JavaScript, and React.',
    explorations: ['React Architecture', 'Responsive Grid Systems', 'Accessible Interaction'],
    image: '/src/assets/images/about_workbench_editorial_1794994217686.jpg',
    visualType: 'web',
  },
];

/**
 * ACHIEVEMENTS_DATA
 * Add verified certifications, hackathons, competitions, workshops, or academic milestones here.
 */
export const ACHIEVEMENTS_DATA: AchievementItem[] = [];

export const ACHIEVEMENT_CATEGORIES: { id: 'all' | AchievementCategory; label: string }[] = [
  { id: 'all', label: 'All Entries' },
  { id: 'certification', label: 'Certifications' },
  { id: 'competition', label: 'Competitions' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'academic', label: 'Academic' },
];
