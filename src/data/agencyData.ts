export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  tags: string[];
  deliverables: string[];
  icon: string;
  image?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: "Branding" | "Digital" | "Packaging" | "Strategy" | "All";
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  results: string[];
  year: string;
  color: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  role: string;
  name: string;
  dept: string;
  specialty: string;
  bio: string;
}

export interface WorkStep {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  bulletPoints: string[];
  iconColor: string;
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "digital",
    name: "Digital Marketing",
    shortDesc: "Social Media, Content",
    description: "Our strategic campaigns harness the power of data-driven insights and mad creativity to boost your online visibility and drive targeted traffic.",
    tags: ["Social Media", "Content", "Advertising", "Campaigns"],
    deliverables: ["Monthly Content Calendars", "Ad Copy & Creative Variations", "Audience Retargeting", "Performance Analytics"],
    icon: "TrendingUp",
    image: "/img/services/digital-marketing.jpg",
  },
  {
    id: "branding",
    name: "Brand Identity",
    shortDesc: "Logo, Visual Identity, Guidelines",
    description: "Our team builds and refines your brand's identity starting from a logo that grabs all the attentions to communication that lives in the audience's head rent free.",
    tags: ["Logo", "Visual Identity", "Guidelines", "Corporate Branding"],
    deliverables: ["Comprehensive Brand Book", "Vector Logo Systems", "Stationery & Collateral", "Tone of Voice Guide"],
    icon: "PenTool",
    image: "/img/services/brand-identity.jpg",
  },
  {
    id: "creative",
    name: "Creative & Content",
    shortDesc: "Design, Reels, Motion Graphics",
    description: "We create captivating, high-impact reels, motion graphics and creative visual stories that grab attention and make your brand memorable in a crowded digital space.",
    tags: ["Design", "Reels", "Motion Graphics", "Video Content"],
    deliverables: ["Social Reel Sequences", "Display Advertising", "Campaign Visual Direction", "Custom Motion Assets"],
    icon: "Share2",
    image: "/img/services/creative-content.jpg",
  },
  {
    id: "packaging",
    name: "Packaging & Print",
    shortDesc: "Packaging, Menus, Signage",
    description: "We design bold, shelf-ready packaging, restaurant menus, environmental signage, and print materials that capture attention and reinforce your presence in the physical world.",
    tags: ["Packaging", "Menus", "Signage", "Print Materials"],
    deliverables: ["Print-Ready Die-lines", "Retail Box & Label Design", "Environmental Signage", "Restaurant Menus"],
    icon: "Layout",
    image: "/img/services/packaging-print.jpg",
  },
  {
    id: "strategy",
    name: "Marketing Solutions",
    shortDesc: "Strategy, Campaigns",
    description: "Data-informed strategic roadmaps, high-converting activation campaigns, and executive consultancy ensuring creative investments align directly with business revenue.",
    tags: ["Strategy", "Campaigns", "Activation", "Consultancy"],
    deliverables: ["GTM Action Plans", "Competitor Matrix", "Target Audience Personas", "Annual Marketing Roadmaps"],
    icon: "Compass",
    image: "/img/services/marketing-solutions.jpg",
  },
];

export const WORK_STEPS: WorkStep[] = [
  {
    step: "01",
    title: "Understand",
    tagline: "Research first",
    desc: "We start with the brand, the category, the Bangladeshi consumer landscape, and the competitive environment — not a recycled template.",
    bulletPoints: [
      "In-depth stakeholder discovery sessions",
      "Audience profiling & consumer behavioral audit",
      "Category benchmarking across local & regional competitors",
    ],
    iconColor: "bg-[#2954F5]",
  },
  {
    step: "02",
    title: "Plan",
    tagline: "A roadmap you can",
    desc: "A concrete strategic plan and milestone calendar mapped out before a single pixel or line of copy is generated.",
    bulletPoints: [
      "Core value proposition & brand positioning angle",
      "Channel allocation & paid media budget modeling",
      "Clear KPIs, deliverables timeline, and approval milestones",
    ],
    iconColor: "bg-[#E51F25]",
  },
  {
    step: "03",
    title: "Create",
    tagline: "Crafted to guidelines",
    desc: "Design, copywriting, motion graphics, and print production strictly aligned with the brand aesthetic — never compromised.",
    bulletPoints: [
      "Iterative design rounds with active client involvement",
      "High-production visual assets (static, video, packaging)",
      "Rigorous quality control and brand consistency checks",
    ],
    iconColor: "bg-[#12151B]",
  },
  {
    step: "04",
    title: "Deliver & Report",
    tagline: "Numbers that matter",
    desc: "Work launches on schedule, and every monthly retainer or campaign closes with real performance metrics, not just vanity assets.",
    bulletPoints: [
      "Multi-channel scheduled deployment & launch tracking",
      "Weekly monitoring & real-time ad performance optimization",
      "Transparent monthly reporting and strategic review",
    ],
    iconColor: "bg-[#1B3BC9]",
  },
];

export const PORTFOLIO_ITEMS: CaseStudy[] = [
  {
    id: "caffeine-coffee",
    title: "Caffeine Coffee",
    category: "Digital",
    clientType: "Beverage · Monthly Retainer",
    summary: "Full media agency management, paid ad scaling, and consistent daily creative calendar for an emerging specialty coffee brand.",
    challenge: "The coffee market in Dhaka is saturated with legacy players. Caffeine Coffee needed an engaging visual identity and daily digital pull to attract urban coffee enthusiasts.",
    solution: "Developed an aesthetic, warm content direction highlighting bean origins, brewing craft, and youth café culture. Implemented targeted Meta ads targeting university and corporate hubs.",
    tags: ["Social Media", "Video Reels", "Paid Ads", "Content Strategy"],
    results: ["+140% Social Engagement", "3.8x Return on Ad Spend (ROAS)", "28k+ New Local Followers"],
    year: "2024",
    color: "#78350F",
  },
  {
    id: "chefs-canvas",
    title: "Chefs Canvas",
    category: "Branding",
    clientType: "Food Court · Full Identity & Retainer",
    summary: "Complete visual identity, food court signage, storefront branding, and monthly social media retainer in Faridpur.",
    challenge: "A premium modern food court entering an underserved district needed to establish instant trust, aesthetic distinction, and family appeal.",
    solution: "Designed an expressive identity system inspired by culinary craftsmanship. Developed unified tenant signage guidelines, uniform branding, and high-energy launch campaigns.",
    tags: ["Brand Identity", "Environmental Signage", "Social Media", "Menu Design"],
    results: ["100% Launch Weekend Capacity", "Unified Visual System across 6 outlets", "Top-rated local dining destination"],
    year: "2024",
    color: "#0F766E",
  },
  {
    id: "bose-agro",
    title: "Bose Agro",
    category: "Strategy",
    clientType: "Agri-commerce · Brand & Digital Tools",
    summary: "Marketing strategy, corporate positioning, packaging collateral, and client-facing digital tools for seasonal commodity trading.",
    challenge: "Traditional agricultural trading firms often suffer from informal presentation, making institutional B2B buyers hesitant to commit to large contracts.",
    solution: "Re-engineered Bose Agro's positioning into a modern, transparent supply-chain partner. Designed premium export packaging concepts and corporate presentation systems.",
    tags: ["Branding", "B2B Strategy", "Web Presence", "Corporate Materials"],
    results: ["Secured 4 Tier-1 Wholesale Partnerships", "Corporate-Grade Rebranding", "Streamlined B2B Order Flow"],
    year: "2023",
    color: "#15803D",
  },
  {
    id: "dining-hub",
    title: "Dining Hub Food Court",
    category: "Branding",
    clientType: "Food Court · Comprehensive Brand Guideline",
    summary: "Full marketing blueprint, brand guideline, cuisine zoning, and go-to-market positioning for a multi-cuisine food destination.",
    challenge: "Positioning a multi-vendor food court so that each food stall retained character while the overall hub projected clean hygiene and premium leisure.",
    solution: "Formulated a robust 60-page brand manual detailing typography, tenant fascia specifications, color-coded cuisine zones, and seasonal promo templates.",
    tags: ["Brand Guideline", "GTM Strategy", "Zoning Guidelines", "Creative Direction"],
    results: ["Over 25 Tenants Onboarded Seamlessly", "Award-Winning Spatial Signage", "Consistent Brand Perception"],
    year: "2023",
    color: "#C2410C",
  },
  {
    id: "indian-masala",
    title: "Indian Masala",
    category: "Packaging",
    clientType: "Dining & Quick Service · Identity & Print",
    summary: "Heritage spice styling meets modern food-court efficiency: menu design, takeaway packaging, and promotional campaign materials.",
    challenge: "Standing out among international quick-service options while honoring rich, traditional subcontinent culinary heritage.",
    solution: "Created bespoke packaging using food-safe earth tones, royal Indian architectural motifs, and easy-to-carry eco-friendly packaging.",
    tags: ["Packaging", "Menu Engineering", "Takeaway Boxes", "Print Design"],
    results: ["+45% Takeaway Order Volume", "Zero-Plastic Recyclable Boxes", "Instant Brand Recognition"],
    year: "2024",
    color: "#B91C1C",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "md",
    initials: "MD",
    role: "Managing Director",
    name: "Strategy & Accounts Lead",
    dept: "Executive Leadership",
    specialty: "Brand Positioning & Client Strategy",
    bio: "Guiding brand vision, strategic commercial growth, and key account partnerships from inception through nationwide execution.",
  },
  {
    id: "cd",
    initials: "CD",
    role: "Creative Director",
    name: "Art Direction & Brand Identity",
    dept: "Design & Creative",
    specialty: "Visual Systems & Typography",
    bio: "Obsessed with clean aesthetics, grid discipline, and conceptual typography that imbues every brand with soul.",
  },
  {
    id: "mm",
    initials: "MM",
    role: "Marketing Manager",
    name: "Growth & Performance Media",
    dept: "Performance Marketing",
    specialty: "Paid Ads & Data Optimization",
    bio: "Data-driven media buyer balancing creative hooks with programmatic audience targeting to maximize marketing ROI.",
  },
  {
    id: "cs",
    initials: "CS",
    role: "Content Strategist",
    name: "Editorial & Social Planning",
    dept: "Content & Copy",
    specialty: "Narrative Voice & Calendars",
    bio: "Crafting sticky copy, engaging hooks, and cultural storytelling that resonates across Dhaka and regional audiences.",
  },
  {
    id: "mg",
    initials: "MG",
    role: "Motion Designer",
    name: "Video & Dynamic Graphics",
    dept: "Multimedia",
    specialty: "Reels, Animation & Showreels",
    bio: "Bringing static layouts to life through kinetic typography, 3D product transitions, and punchy short-form video edits.",
  },
  {
    id: "am",
    initials: "AM",
    role: "Account Manager",
    name: "Client Success & Delivery",
    dept: "Operations",
    specialty: "Workflow & Project Delivery",
    bio: "The reliable bridge between client briefs and studio production, ensuring on-time delivery without friction.",
  },
];

export const CLIENT_LOGOS = [
  { name: "Caffeine Coffee", tag: "Specialty Beverage" },
  { name: "Chefs Canvas", tag: "Food & Hospitality" },
  { name: "Indian Masala", tag: "Dining & QSR" },
  { name: "Bose Agro", tag: "Agri-Commodities" },
  { name: "Dining Hub Food Court", tag: "Retail Food Court" },
];

export const AGENCY_STATS = [
  { value: "5", label: "Core Service Lines", desc: "Digital, Branding, Creative, Packaging, Strategy" },
  { value: "Dhaka", label: "Headquarters", desc: "Operating nationwide across Bangladesh" },
  { value: "100%", label: "Senior Attention", desc: "Direct partner leadership on every single account" },
  { value: "24h", label: "Inquiry Response", desc: "Prompt turnaround on briefs and client quotes" },
];

export const AGENCY_INFO = {
  name: "Doorstep Limited",
  tagline: "Marketing & Branding Agency · Dhaka",
  headline: "Brand and marketing work, delivered right to your doorstep.",
  blurb: "Doorstep Limited is a full-service marketing and branding agency in Dhaka. We build identities, run campaigns, and make the content that carries a brand from idea to shelf.",
  email: "doorstepltdofficial@gmail.com",
  phone: "+880 1785-031126",
  address: "House 60, Road Dolphin Goli, Kolabagan, Dhaka-1205",
  hours: "Saturday to Thursday · 10:00 AM – 7:00 PM",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};
