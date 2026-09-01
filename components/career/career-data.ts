/**
 * Open roles, mirrored from arqqa.net/career.
 *
 * Titles, categories, locations and body copy are taken from the live careers
 * board and its individual postings. Each role has its own page at
 * /career/<slug>; `sourceHref` keeps a link back to the original posting so
 * applications can still be submitted through the existing flow.
 */

export type JobCategory = "Marketing" | "Sales" | "Graphic Designer";
export type JobType = "Full Time";
export type JobLocation = "Cairo" | "Heliopolis-Cairo";

export type JobSection = {
  heading: string;
  items: string[];
};

export type Job = {
  slug: string;
  title: string;
  category: JobCategory;
  type: JobType;
  location: JobLocation;
  /** e.g. "3 Months (Paid Internship)" — shown as a pill when present */
  duration?: string;
  /** Opening paragraph on the detail page */
  intro: string;
  sections: JobSection[];
  /** Practical footnote — schedule, eligibility, how to apply */
  note?: string;
  /** The original posting on arqqa.net */
  sourceHref: string;
};

export const JOBS: Job[] = [
  {
    slug: "digital-content-designer",
    title: "Digital Content Designer",
    category: "Marketing",
    type: "Full Time",
    location: "Cairo",
    intro:
      "We're looking for a creative professional to join our marketing team, creating social-first content for fintech platforms. The role focuses on producing engaging short-form video content and visual materials that convert attention into performance.",
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Produce short-form video content for TikTok, Reels, and YouTube Shorts",
          "Design social media visuals and motion-based content",
          "Transform fintech concepts into clear, engaging, and relatable content",
          "Apply storytelling techniques including hooks, pacing, and visual flow",
          "Utilize AI tools for ideation and content scaling",
          "Monitor trends and develop high-performing content",
          "Collaborate with the marketing team on brand alignment",
        ],
      },
      {
        heading: "Required Qualifications",
        items: [
          "Proven social-first, short-form content creation experience",
          "Understanding of TikTok, Instagram Reels, and YouTube Shorts formats",
          "Proficiency in Premiere Pro, After Effects, CapCut, Figma, and Adobe Suite",
          "Experience with AI creative tools",
          "Strong visual storytelling and editing skills",
          "Ability to work independently and proactively",
          "Obsessed with capturing attention within the first few seconds",
          "Portfolio/showreel required",
        ],
      },
    ],
    sourceHref: "https://arqqa.net/career/digital-content-designer/",
  },
  {
    slug: "sales-manager",
    title: "Sales Manager",
    category: "Sales",
    type: "Full Time",
    location: "Cairo",
    intro:
      "ARQQA seeks a driven Sales Manager to lead client acquisition strategy, selling high-ticket retainers and advanced tech infrastructure to enterprise clients in Banking, Fintech, Real Estate, and Retail sectors.",
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Close enterprise-level contracts for The Catalyst System™ (Retainer) and Tech Sovereignty (Custom App/Web Development)",
          "Engage C-level executives (CMOs, CTOs, Founders, CFOs) in Fintech and Banking sectors across Egypt and the GCC",
          "Conduct Growth Audits diagnosing prospect bottlenecks and positioning ARQQA solutions",
          "Maintain a data-driven CRM pipeline with accurate weekly forecasting",
          "Identify upsell opportunities and introduce clients to B.O.T and Staff Augmentation models",
        ],
      },
      {
        heading: "Requirements",
        items: [
          "4+ years B2B sales experience in digital agencies, tech consultancy, SaaS, or performance marketing",
          "Understanding of performance marketing metrics and tech development stacks",
          "Proactive prospecting abilities targeting Tier-A accounts",
          "Fluent English and Arabic communication with executive presence",
          "Comfort with structured operational environments and ClickUp workflows",
        ],
      },
      {
        heading: "Why Join ARQQA",
        items: [
          "Sell differentiated products with a proven track record (20M+ installs)",
          "Competitive base salary with uncapped commission structure",
          "Work-life balance and friction-free operations culture",
          "Regional expansion involvement into GCC markets",
        ],
      },
    ],
    sourceHref: "https://arqqa.net/career/sales-manager/",
  },
  {
    slug: "motion-designer-video-editor",
    title: "Motion Designer & Video Editor",
    category: "Graphic Designer",
    type: "Full Time",
    location: "Cairo",
    intro:
      "ARQQA Digital seeks a creative Motion Designer & Video Editor to produce high-impact motion graphics and performance-driven video content for digital campaigns, social media, and paid advertising.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          "Develop motion graphics, animations, and video edits for digital initiatives and social platforms",
          "Produce performance-optimized video content for Meta, TikTok, and YouTube",
          "Transform creative briefs into engaging visual narratives",
          "Partner with creative, content, and performance marketing departments",
          "Maintain visual content alignment with brand standards and campaign goals",
          "Utilize AI-powered tools to enhance creativity and streamline workflows",
          "Juggle multiple concurrent projects while upholding creative excellence",
        ],
      },
      {
        heading: "Required Qualifications",
        items: [
          "3+ years professional experience in motion design and video editing",
          "Strong portfolio demonstrating motion graphics, video editing, and animation capabilities",
          "Expert-level skills in After Effects, Premiere Pro, and Adobe Creative Suite",
          "Background creating social media content and performance advertisements",
          "Knowledge of AI tools for video and creative production",
          "Solid grasp of animation principles, visual storytelling, and current digital trends",
          "Agency experience preferred",
        ],
      },
    ],
    sourceHref: "https://arqqa.net/career/motion-graphic/",
  },
  {
    slug: "marketing-intern",
    title: "Marketing Intern",
    category: "Marketing",
    type: "Full Time",
    location: "Cairo",
    intro:
      "ARQQA is looking for a Marketing Intern to join our Marketing Team, supporting the planning and execution of the company's annual marketing strategy. The role emphasizes brand development, content creation, creative marketing, and B2B marketing beyond paid advertising.",
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Support execution of annual marketing plans and initiatives",
          "Assist with content planning and creation for social media, websites, and marketing materials",
          "Coordinate with designers and creative teams on marketing assets and campaigns",
          "Support B2B marketing activities including presentations, proposals, and materials",
          "Conduct market research and competitor analysis",
          "Assist in campaign tracking, reporting, and performance analysis",
          "Support event marketing, partnerships, and internal marketing initiatives",
        ],
      },
      {
        heading: "Requirements",
        items: [
          "Bachelor's degree in marketing, media, or a related field (mandatory)",
          "Strong interest in strategic marketing, branding, and content marketing",
          "Basic understanding of marketing fundamentals and digital channels",
          "Creative mindset with attention to detail",
          "Strong communication and organizational skills",
          "Good English proficiency",
        ],
      },
      {
        heading: "What We Offer",
        items: [
          "Hands-on strategic and brand-focused marketing experience",
          "Exposure to B2B marketing and agency operations",
          "Learning and mentorship from senior marketers",
          "Opportunity for full-time employment based on performance",
        ],
      },
    ],
    sourceHref: "https://arqqa.net/career/marketing-intern/",
  },
  {
    slug: "motion-graphics-intern",
    title: "Motion Graphics – Intern",
    category: "Graphic Designer",
    type: "Full Time",
    location: "Cairo",
    duration: "3 Months (Paid Internship)",
    intro:
      "ARQQA seeks a talented motion graphics professional to join our dynamic team and contribute to cutting-edge digital marketing campaigns. This role targets recent graduates only.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          "Design and animate motion graphics across social media, websites, and video advertisements",
          "Partner with the marketing department to comprehend project briefs and execute creative solutions",
          "Produce motion graphics that strengthen client brand presence and marketing communications",
          "Research and implement current motion graphics methodologies",
        ],
      },
      {
        heading: "What You'll Learn",
        items: [
          "Practical experience creating motion graphics for diverse marketing initiatives",
          "Proficiency with Adobe Creative Suite and animation software",
          "Understanding of converting marketing goals into visual narratives",
          "Collaborative experience within creative teams",
          "Exposure to industry standards and emerging techniques",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "Competitive financial compensation throughout the internship",
          "Official credential upon completion",
          "Professional portfolio development opportunities",
          "Professional guidance from experienced motion graphics specialists",
          "Dynamic, supportive creative workspace",
        ],
      },
    ],
    note: "Open to recent graduates only.",
    sourceHref: "https://arqqa.net/career/motion-graphics-intern/",
  },
  {
    slug: "senior-content-creator",
    title: "Senior Content Creator",
    category: "Marketing",
    type: "Full Time",
    location: "Heliopolis-Cairo",
    intro:
      "ARQQA Digital seeks a strategic creative professional to develop performance-driven content that generates measurable business outcomes while telling compelling brand stories.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          "Develop and execute content strategies aligned with marketing and campaign objectives",
          "Create high-performing content for digital campaigns, social media, landing pages, and websites",
          "Produce performance marketing content optimized for paid campaigns on Meta, Google, and TikTok",
          "Apply SEO best practices including keyword research, on-page optimization, and content structure",
          "Write content for B2B and eCommerce brands, focusing on conversion and engagement",
          "Adapt content to target GCC audiences and markets when needed",
          "Collaborate closely with designers, media buyers, and account managers to align content with campaign strategies",
          "Use AI tools to accelerate research, ideation, and content production while maintaining high quality",
          "Analyze content performance and continuously optimize messaging and strategy",
        ],
      },
      {
        heading: "Requirements",
        items: [
          "3+ years of experience as a Content Creator in a digital marketing agency",
          "Strong experience creating performance-driven content for digital campaigns",
          "Solid understanding of SEO, content strategy, and digital marketing funnels",
          "Experience working with B2B and eCommerce brands",
          "Familiarity with GCC markets and audiences is a strong plus",
          "Strong storytelling, writing, and editing skills in English (Arabic is a plus)",
          "Ability to use AI tools to enhance productivity and streamline workflows",
        ],
      },
    ],
    sourceHref: "https://arqqa.net/career/content-writer/",
  },
  {
    slug: "business-development-specialist",
    title: "Business Development Specialist",
    category: "Sales",
    type: "Full Time",
    location: "Cairo",
    intro:
      "ARQQA is a leading digital marketing agency dedicated to helping businesses achieve their online marketing goals. We're seeking a driven specialist to join the team.",
    sections: [
      {
        heading: "Key Responsibilities",
        items: [
          "Identify and develop new business opportunities",
          "Conduct market research on target audiences and industry trends",
          "Develop and implement lead generation strategies",
          "Qualify leads and convert them into paying clients through effective communication",
          "Build client and partner relationships",
          "Collaborate with marketing and sales teams on campaigns",
          "Track and analyze sales metrics",
        ],
      },
      {
        heading: "Required Qualifications",
        items: [
          "1–2 years in business development or a related field",
          "Proven track record of exceeding sales targets",
          "Strong communication and interpersonal abilities",
          "Digital marketing knowledge",
          "Market research and data analysis skills",
          "Presentation expertise",
          "Proficient in CRM software and Microsoft Office Suite",
        ],
      },
      {
        heading: "Preferred Qualifications",
        items: [
          "Digital marketing industry experience",
          "Established business community network",
          "Lead generation tool expertise",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "Work with high-potential-growth startups and bright entrepreneurs",
          "Startup community engagement",
          "Creative, productivity-focused environment",
          "Technology equipment provided",
          "Medical and social insurance",
        ],
      },
    ],
    note: "Based in Heliopolis, Cairo. Schedule: Sunday–Thursday, 10:00 AM – 6:00 PM.",
    sourceHref: "https://arqqa.net/career/business-development-specialist/",
  },
  {
    slug: "business-development-intern",
    title: "Business Development Intern",
    category: "Marketing",
    type: "Full Time",
    location: "Cairo",
    duration: "3 Months (Paid Internship)",
    intro:
      "ARQQA seeks a driven graduate passionate about business to join the team as a Business Development Intern, contributing to our success in digital marketing.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          "Lead Generation — research and identify potential clients in various industries who could benefit from ARQQA's digital marketing services",
          "Market Research — analyze industry trends, competitor activities, and market opportunities",
          "Outreach and Communication — connect with prospects via email, phone, and social media",
          "Proposal Development — assist in creating compelling proposals and presentations",
          "Relationship Building — nurture client relationships and support onboarding efforts",
        ],
      },
      {
        heading: "What You'll Learn",
        items: [
          "Sales and marketing fundamentals",
          "The complete business development lifecycle",
          "Communication and negotiation skills",
          "Market analysis and data interpretation",
          "Digital marketing industry insights for the MENA region",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "Paid internship with competitive stipend",
          "Certificate of Completion",
          "Mentorship from experienced professionals",
          "Networking opportunities with industry leaders",
          "Career launch potential in business development",
        ],
      },
    ],
    note: "Open to graduates only.",
    sourceHref: "https://arqqa.net/career/business-development-intern/",
  },
  {
    slug: "account-manager-intern",
    title: "Account Manager – Intern",
    category: "Marketing",
    type: "Full Time",
    location: "Cairo",
    duration: "3 Months (Paid Internship)",
    intro:
      "Launch your career in the exciting world of digital marketing with a paid internship at ARQQA. The role positions interns as key supporters of client relationships within a digital marketing agency.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          "Serve as a primary point of contact for assigned clients, responding to inquiries, scheduling meetings, and providing timely updates",
          "Assist with the planning, execution, and monitoring of digital marketing campaigns",
          "Support Account Managers in developing and implementing marketing strategies",
          "Analyze campaign data and generate reports to measure effectiveness",
          "Handle administrative tasks such as preparing presentations, scheduling meetings, and maintaining client records",
        ],
      },
      {
        heading: "What You'll Learn",
        items: [
          "Client relationship management and communication skills",
          "A comprehensive understanding of core digital marketing disciplines",
          "Project timeline and resource management",
          "The ability to interpret data, identify trends, and draw actionable insights",
          "Agency operations experience",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "Paid compensation during the internship period",
          "Official recognition of your skills and knowledge in account management",
          "Mentorship from experienced professionals",
          "Industry networking opportunities",
          "Professional skill development",
        ],
      },
    ],
    note: "Open to graduates only.",
    sourceHref: "https://arqqa.net/career/account-manager-intern/",
  },
  {
    slug: "media-buying-intern",
    title: "Media Buying Intern",
    category: "Marketing",
    type: "Full Time",
    location: "Cairo",
    duration: "Paid Internship",
    intro:
      "ARQQA Digital's internship program welcomes graduates to develop expertise in digital marketing and media buying.",
    sections: [
      {
        heading: "What You'll Learn",
        items: [
          "Develop communication skills and account management capabilities",
          "Create captivating and innovative designs",
          "Produce engaging content that resonates with audiences",
          "Master search engine ranking principles",
          "Learn performance marketing strategy fundamentals",
        ],
      },
      {
        heading: "Benefits",
        items: ["Paid position", "Certificate upon completion"],
      },
    ],
    note: "Open to graduates only.",
    sourceHref: "https://arqqa.net/career/media-buying-intern/",
  },
];

export const JOB_CATEGORIES: JobCategory[] = ["Graphic Designer", "Marketing", "Sales"];
export const JOB_TYPES: JobType[] = ["Full Time"];
export const JOB_LOCATIONS: JobLocation[] = ["Cairo", "Heliopolis-Cairo"];

export function getJob(slug: string) {
  return JOBS.find((j) => j.slug === slug);
}
