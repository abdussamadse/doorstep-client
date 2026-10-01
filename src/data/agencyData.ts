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

export type PortfolioCategory =
  | "STATIC"
  | "REELS"
  | "MOTION"
  | "COMMERCIAL"
  | "PACKAGING & PRINT DESIGN";

export interface PortfolioCategoryMeta {
  key: string;
  name: string;
  subtitle: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategoryMeta[] = [
  {
    key: "All",
    name: "All",
    subtitle: "Complete creative showcase across all formats and production disciplines",
  },
  {
    key: "STATIC",
    name: "Static",
    subtitle: "Social media posts, carousel, promotional creatives",
  },
  {
    key: "REELS",
    name: "Reels",
    subtitle: "Short form vertical videos, food reels, promotional reels",
  },
  {
    key: "MOTION",
    name: "Motion",
    subtitle: "Motion graphics, animated posts, typography animation, logo animation",
  },
  {
    key: "COMMERCIAL",
    name: "Commercial",
    subtitle: "16:9 landscape video, TV screen content, brand promotional video, food commercial",
  },
  {
    key: "PACKAGING & PRINT DESIGN",
    name: "Packaging & Print Design",
    subtitle: "Food packaging, takeaway box, cup, bag, label, menu, flyer, poster, Signage",
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  category: PortfolioCategory;
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  results: string[];
  year: string;
  color: string;
  mediaType: "video" | "image" | "carousel";
  aspectRatio: "9:16" | "16:9" | "1:1" | "4:3" | "4:5";
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
  slidesCount?: number;
  formatBadge?: string;
  printSpecs?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  initials?: string;
  dept?: string;
  specialty?: string;
  bio?: string;
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
  // -------------------------------------------------------------
  // REELS (Short form vertical videos, food reels, promotional reels)
  // -------------------------------------------------------------
  {
    id: "caffeine-coffee-reel",
    title: "Caffeine Coffee — Signature Pour & Café Vibes",
    category: "REELS",
    clientType: "Beverage · Food & Beverage Reel",
    summary: "Sensory close-up espresso pulls, milk texture art, and cozy café ambience crafted for maximum viral engagement on Instagram and Facebook.",
    challenge: "In a saturated café market, Caffeine Coffee needed vertical short-form reels with ASMR coffee pulls and youth lifestyle appeal to drive weekend footfall.",
    solution: "Shot high-contrast 9:16 macro footage of single-origin espresso extraction, latte art pours, and youthful conversation snippets paired with trending acoustic sound design.",
    tags: ["Short Form Vertical Video", "Food Reel", "Promotional Reel"],
    results: ["+280% Reel Views", "38.5k Viral Shares", "Top Trending Dhaka Café Reel"],
    year: "2024",
    color: "#78350F",
    mediaType: "video",
    aspectRatio: "9:16",
    duration: "0:28",
    thumbnail: "/img/services/creative-content.jpg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "9:16 Vertical Reel",
  },
  {
    id: "chefs-canvas-sizzle-reel",
    title: "Chefs Canvas — Flame Wok Sizzle & Street Action",
    category: "REELS",
    clientType: "Food Court · Food Court Reel",
    summary: "High-paced kitchen action reel highlighting flame cooking, gourmet plating, and crowd energy at Faridpur's premier dining hub.",
    challenge: "Showcasing the multi-cuisine excitement and energetic live-kitchen experience of 6 kitchen stalls in a single 30-second vertical video.",
    solution: "Utilized dynamic camera sweeps, match-cuts between sizzling pans, and snappy typography callouts to create a mouth-watering short video.",
    tags: ["Food Reel", "Short Form Vertical Video", "Promotional Reel"],
    results: ["+190% Engagement", "45k+ Organic Views", "Full Capacity Weekend Crowds"],
    year: "2024",
    color: "#0F766E",
    mediaType: "video",
    aspectRatio: "9:16",
    duration: "0:32",
    thumbnail: "/img/chefs-canvas.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "9:16 Vertical Reel",
  },
  {
    id: "taste-of-adana-kebab-reel",
    title: "Taste of Adana — Charcoal Grill Charcoal Master Reel",
    category: "REELS",
    clientType: "Dining · Food Commercial Reel",
    summary: "Authentic Turkish skewers sizzling over open embers with fast-cut pacing and ambient ASMR audio design.",
    challenge: "Capture the tactile smoky essence and artisanal Turkish grilling technique in a format engineered for Instagram Explore.",
    solution: "Produced high-frame-rate vertical clips with slow-motion dripping marinade, skewer slicing, and customer reactions.",
    tags: ["Food Reel", "Promotional Reel", "Short Form Vertical Video"],
    results: ["3.4x Reach vs Static Posts", "22k Saves & Shares", "Direct Reservation Inflow"],
    year: "2024",
    color: "#B91C1C",
    mediaType: "video",
    aspectRatio: "9:16",
    duration: "0:25",
    thumbnail: "/img/taste-of-adana.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "9:16 Vertical Reel",
  },
  {
    id: "crepe-e-waffle-dessert-reel",
    title: "Crepe e Waffle — Belgian Chocolate Drizzle Reel",
    category: "REELS",
    clientType: "Dessert Bar · Viral Promo Reel",
    summary: "Decadent warm chocolate cascades over golden crisp waffles captured in 120fps vertical slow motion.",
    challenge: "Drive late-night delivery and café visits among university youth through irresistible dessert food appeal.",
    solution: "Engineered high-saturation vertical reels focusing on chocolate drizzles, strawberry toppings, and crispy waffle crunch audio.",
    tags: ["Short Form Vertical Video", "Food Reel", "Promotional Reel"],
    results: ["52k Organic Views", "+85% Instagram Profile Visits", "Best Performing Promo Campaign"],
    year: "2024",
    color: "#D97706",
    mediaType: "video",
    aspectRatio: "9:16",
    duration: "0:22",
    thumbnail: "/img/crepe-e-waffle.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "9:16 Vertical Reel",
  },

  // -------------------------------------------------------------
  // STATIC (Social media posts, carousel, promotional creatives)
  // -------------------------------------------------------------
  {
    id: "chefs-canvas-static",
    title: "Chefs Canvas — Grand Launch Carousel Campaign",
    category: "STATIC",
    clientType: "Food Court · Social Media Post & Carousel",
    summary: "Multi-slide storytelling carousel breaking down cuisine zones, chef profiles, and weekend launch discount announcements.",
    challenge: "A premium modern food court entering Faridpur needed crisp, high-aesthetic static posters and social creatives that build instant credibility.",
    solution: "Crafted bold, high-fidelity static social designs, multi-slide educational carousels, and promotional banner systems with strong typographic hierarchy.",
    tags: ["Social Media Posts", "Carousel", "Promotional Creatives"],
    results: ["100% Launch Weekend Capacity", "Unified Visual System across 6 outlets", "Top-rated local dining destination"],
    year: "2024",
    color: "#0F766E",
    mediaType: "carousel",
    aspectRatio: "1:1",
    slidesCount: 6,
    thumbnail: "/img/services/brand-identity.jpg",
    formatBadge: "Carousel (6 Slides)",
  },
  {
    id: "caffeine-coffee-static",
    title: "Caffeine Coffee — Origin Story & Bean Matrix Feed",
    category: "STATIC",
    clientType: "Beverage · Social Media Posts & Educational Carousel",
    summary: "Clean typographic and photo-driven static feed series educating coffee lovers on roast profiles, altitude, and flavor notes.",
    challenge: "Differentiate premium specialty beans from commercial coffee through educational and visually striking static posts.",
    solution: "Designed a minimalist editorial layout with micro-infographics, origin maps, and palette flavor notes for daily social publishing.",
    tags: ["Social Media Posts", "Carousel", "Promotional Creatives"],
    results: ["+140% Social Engagement", "3.8x Return on Ad Spend (ROAS)", "28k+ New Local Followers"],
    year: "2024",
    color: "#78350F",
    mediaType: "image",
    aspectRatio: "1:1",
    slidesCount: 4,
    thumbnail: "/img/services/digital-marketing.jpg",
    formatBadge: "Static Feed Creative",
  },
  {
    id: "somboon-promotional-static",
    title: "Somboon Seafood — Weekend Crab Feast Promotional Banner",
    category: "STATIC",
    clientType: "Restaurant · Promotional Creative",
    summary: "High-contrast promotional visual with bold pricing callouts, succulent food photography, and direct reservation triggers.",
    challenge: "Drive weekend table pre-bookings with a single static ad visual that breaks through busy social feeds.",
    solution: "Integrated mouth-watering seafood photography, contrasting brand color overlays, and clear time-sensitive call-to-actions.",
    tags: ["Promotional Creatives", "Social Media Posts", "Static Design"],
    results: ["+65% Weekend Pre-bookings", "4.2x ROAS on Meta Ads", "Highest Converting Single Ad Visual"],
    year: "2024",
    color: "#C2410C",
    mediaType: "image",
    aspectRatio: "1:1",
    slidesCount: 1,
    thumbnail: "/img/somboon.jpeg",
    formatBadge: "Promotional Creative",
  },
  {
    id: "eat-and-play-static",
    title: "Eat & Play — Family Weekend Festival Announcement",
    category: "STATIC",
    clientType: "Entertainment · Carousel & Promotional Creative",
    summary: "Vibrant visual identity combining gaming aesthetics and gourmet food photography for family entertainment social reach.",
    challenge: "Position the space as both a gaming lounge and a quality family dining spot without visual confusion.",
    solution: "Structured a 4-part visual carousel showcasing gaming arenas, kids zones, cafe menu, and family combo offers.",
    tags: ["Social Media Posts", "Carousel", "Promotional Creatives"],
    results: ["15k Event RSVPs", "Viral Parent-Group Sharing", "45% Growth in Social Followers"],
    year: "2023",
    color: "#4338CA",
    mediaType: "carousel",
    aspectRatio: "1:1",
    slidesCount: 4,
    thumbnail: "/img/eat-and-play.jpeg",
    formatBadge: "Carousel (4 Slides)",
  },

  // -------------------------------------------------------------
  // MOTION (Motion graphics, animated posts, typography animation, logo animation)
  // -------------------------------------------------------------
  {
    id: "dining-hub-motion",
    title: "Dining Hub — 4K Kinetic Digital Menu Board System",
    category: "MOTION",
    clientType: "Food Destination · Motion Graphics & Animated Posts",
    summary: "Dynamic digital signage motion loops, animated menu displays, and kinetic typography for a multi-cuisine food destination.",
    challenge: "Creating eye-catching digital displays for food court screens that capture pedestrian attention and guide visitors between zones.",
    solution: "Designed kinetic typography, synchronized 4K motion graphics for digital menu boards, and animated promotional screen reels.",
    tags: ["Motion Graphics", "Typography Animation", "Animated Posts"],
    results: ["Over 25 Tenants Onboarded Seamlessly", "Award-Winning Spatial Motion Displays", "Consistent Brand Perception"],
    year: "2023",
    color: "#C2410C",
    mediaType: "video",
    aspectRatio: "16:9",
    duration: "0:20",
    thumbnail: "/img/services/creative-content.jpg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "Motion Graphics Loop",
  },
  {
    id: "doorstep-kinetic-stinger",
    title: "Doorstep Limited — Brand Identity Kinetic Stinger",
    category: "MOTION",
    clientType: "Agency Creative Identity · Logo Animation",
    summary: "High-precision geometric vector animation unfolding the brand mark with custom audio branding and kinetic sound effects.",
    challenge: "Create a memorable 8-second brand intro suitable for YouTube prerolls, client presentations, and video closers.",
    solution: "Engineered physics-based easing, kinetic shapes morphing into the signature monogram, and tactile sound design.",
    tags: ["Logo Animation", "Motion Graphics", "Typography Animation"],
    results: ["Adopted Across All Agency Video Outputs", "100% Brand Recall in Client Reviews"],
    year: "2024",
    color: "#1E42D0",
    mediaType: "video",
    aspectRatio: "16:9",
    duration: "0:10",
    thumbnail: "/img/services/marketing-solutions.jpg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "Logo Animation",
  },
  {
    id: "pan-pacific-motion-greeting",
    title: "Pan Pacific Sonargaon — Festive Celebration Motion Post",
    category: "MOTION",
    clientType: "Hospitality · Animated Posts & Typography Animation",
    summary: "Delicate golden foil motifs, kinetic calligraphy, and subtle sparkle physics designed for premium festival greetings.",
    challenge: "Elevate annual corporate holiday posts above static greeting cards to match five-star luxury standards.",
    solution: "Rendered custom particle simulations, 3D golden metallic text reveals, and gentle atmospheric motion transitions.",
    tags: ["Animated Posts", "Motion Graphics", "Typography Animation"],
    results: ["+210% Organic Shares", "Commended by Group Leadership", "Set New Benchmark for Seasonal Posts"],
    year: "2024",
    color: "#B45309",
    mediaType: "video",
    aspectRatio: "1:1",
    duration: "0:15",
    thumbnail: "/img/pan-pacific.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "Animated Social Post",
  },

  // -------------------------------------------------------------
  // COMMERCIAL (16:9 landscape video, TV screen content, brand promotional video, food commercial)
  // -------------------------------------------------------------
  {
    id: "bose-agro-commercial",
    title: "Bose Agro — The Roots of Supply Chain Excellence",
    category: "COMMERCIAL",
    clientType: "Agri-commerce · 16:9 Landscape Video & Brand Promotional Video",
    summary: "A cinematic corporate journey traversing farm gate logistics, modern sorting hubs, and institutional B2B delivery across Bangladesh.",
    challenge: "Traditional agricultural trading firms often suffer from informal presentation, making institutional B2B buyers hesitant to commit to large contracts.",
    solution: "Produced an authoritative 16:9 landscape brand film highlighting cold-chain infrastructure, farmer partnerships, and laboratory-tested produce quality.",
    tags: ["16:9 Landscape Video", "Brand Promotional Video", "TV Screen Content"],
    results: ["Secured 4 Tier-1 Wholesale Partnerships", "Corporate-Grade Rebranding", "Streamlined B2B Order Flow"],
    year: "2023",
    color: "#15803D",
    mediaType: "video",
    aspectRatio: "16:9",
    duration: "1:45",
    thumbnail: "/img/services/marketing-solutions.jpg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "16:9 Brand Film",
  },
  {
    id: "intercontinental-luxury-commercial",
    title: "InterContinental Dhaka — Curated Culinary Evenings",
    category: "COMMERCIAL",
    clientType: "Hospitality · Food Commercial & Brand Promotional Video",
    summary: "Atmospheric 16:9 narrative commercial celebrating bespoke fine dining, international hospitality standards, and celebratory gatherings.",
    challenge: "Promote fine dining venues to diplomatic, corporate, and luxury clientele with cinematic sophistication.",
    solution: "Captured rich low-light cinematography, tableside flambé craft, and warm ambient interactions framed in 2.39:1 widescreen cinema format.",
    tags: ["Food Commercial", "Brand Promotional Video", "TV Screen Content"],
    results: ["Broadcasted on In-Room TV Screens", "Over 120k YouTube Views", "35% Increase in Banquet Inquiries"],
    year: "2024",
    color: "#0369A1",
    mediaType: "video",
    aspectRatio: "16:9",
    duration: "1:15",
    thumbnail: "/img/intercontinental.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "16:9 Commercial Video",
  },
  {
    id: "mughal-mahal-commercial",
    title: "Mughal Mahal — Regal Heritage Feast Campaign",
    category: "COMMERCIAL",
    clientType: "Dining · Food Commercial & TV Screen Content",
    summary: "Lavish biryani steam, slow-roasted spices, and courtly banquet aesthetics produced for television broadcast and YouTube campaigns.",
    challenge: "Reposition an established restaurant brand as Dhaka’s ultimate grand celebration destination for wedding and family dining.",
    solution: "Constructed a grand commercial with period-inspired lighting, slow-motion brass pot uncoverings, and traditional musical scoring.",
    tags: ["Food Commercial", "16:9 Landscape Video", "TV Screen Content"],
    results: ["Aired on Major Cable Networks", "+50% Wedding Catering Bookings", "Recognized as Heritage Brand Icon"],
    year: "2024",
    color: "#831843",
    mediaType: "video",
    aspectRatio: "16:9",
    duration: "1:05",
    thumbnail: "/img/mughal-mahal.jpeg",
    videoUrl: "/videos/hero.mp4",
    formatBadge: "TV & Digital Commercial",
  },

  // -------------------------------------------------------------
  // PACKAGING & PRINT DESIGN (Food packaging, takeaway box, cup, bag, label, menu, flyer, poster, Signage)
  // -------------------------------------------------------------
  {
    id: "indian-masala-packaging",
    title: "Indian Masala — Royal Motif Food Packaging & Takeaway Boxes",
    category: "PACKAGING & PRINT DESIGN",
    clientType: "Dining & Quick Service · Food Packaging, Takeaway Box, Cup, Bag",
    summary: "Heritage spice styling meets modern food-court efficiency: menu design, takeaway packaging, cups, bags, and promotional print materials.",
    challenge: "Standing out among international quick-service options while honoring rich, traditional subcontinent culinary heritage in print and packaging.",
    solution: "Created bespoke food-grade packaging using earth tones, royal architectural motifs, and eco-friendly print finishes across boxes, cups, and paper carriers.",
    tags: ["Food Packaging", "Takeaway Box", "Cup", "Bag", "Label"],
    results: ["+45% Takeaway Order Volume", "Zero-Plastic Recyclable Boxes", "Instant Brand Recognition"],
    year: "2024",
    color: "#B91C1C",
    mediaType: "image",
    aspectRatio: "4:3",
    thumbnail: "/img/services/packaging-print.jpg",
    printSpecs: "Food-safe UV Print · Biodegradable Kraft Board · Spot Foil",
    formatBadge: "Packaging & Print Suite",
  },
  {
    id: "caffeine-coffee-packaging",
    title: "Caffeine Coffee — Roasted Bean Pouches, Cups & Label Suite",
    category: "PACKAGING & PRINT DESIGN",
    clientType: "Beverage · Bag, Cup, Label, Menu",
    summary: "Matte black one-way degassing valve coffee pouches with metallic copper typography, double-walled embossed hot cups, and batch labels.",
    challenge: "Ensure bean freshness while elevating the packaging aesthetic to compete with imported specialty coffee brands.",
    solution: "Engineered foil-lined barrier pouches with resealable zip seals, stamped batch labels for roast date transparency, and custom cup sleeves.",
    tags: ["Food Packaging", "Cup", "Bag", "Label", "Menu"],
    results: ["Featured in Design Portfolios", "Retails in 12 Gourmet Grocery Stores", "+110% Bagged Bean Sales"],
    year: "2024",
    color: "#78350F",
    mediaType: "image",
    aspectRatio: "4:3",
    thumbnail: "/img/services/brand-identity.jpg",
    printSpecs: "Matte Soft-Touch Finish · Hot Foil Stamping · Custom Die-Cut",
    formatBadge: "Pouch, Cup & Label Design",
  },
  {
    id: "chefs-canvas-signage-print",
    title: "Chefs Canvas — Architectural Signage, Menus & Posters",
    category: "PACKAGING & PRINT DESIGN",
    clientType: "Food Court · Menu, Flyer, Poster, Signage",
    summary: "Illuminated 3D acrylic tenant signage, heavy textured wipe-clean laminated food menus, promotional counter flyers, and entrance posters.",
    challenge: "Unify 6 diverse food stalls with cohesive environmental signage and printed menus while maintaining distinctive stall personalities.",
    solution: "Developed unified tenant signage guidelines, color-coded cuisine zone posters, durable laminated dine-in menus, and grand opening flyers.",
    tags: ["Signage", "Menu", "Flyer", "Poster"],
    results: ["Flawless Spatial Wayfinding", "Zero Tenant Confusion", "Award-Winning District Food Court Signage"],
    year: "2024",
    color: "#0F766E",
    mediaType: "image",
    aspectRatio: "4:3",
    thumbnail: "/img/chefs-canvas.jpeg",
    printSpecs: "3D Acrylic Signage · 350gsm Silk Laminated Menus · Vinyl Wall Graphics",
    formatBadge: "Signage & Print Collateral",
  },
  {
    id: "taste-of-adana-packaging-menu",
    title: "Taste of Adana — Takeaway Wraps, Rigid Boxes & Menu Suite",
    category: "PACKAGING & PRINT DESIGN",
    clientType: "Dining · Food Packaging, Takeaway Box, Label, Menu",
    summary: "Grease-resistant kebab wraps printed with vegetable oil inks, rigid kebab takeaway carriers, and luxury gold-embossed table menus.",
    challenge: "Preserve charcoal heat and meat juices in takeaway orders without compromising box structural integrity or presentation.",
    solution: "Designed ventilated thermal takeaway boxes with moisture vents, custom patterned food wrap paper, and gold foil hardbound menus.",
    tags: ["Food Packaging", "Takeaway Box", "Label", "Menu", "Flyer"],
    results: ["Zero Soggy Delivery Complaints", "98% Positive Packaging Feedback", "+60% Takeaway Growth"],
    year: "2024",
    color: "#B91C1C",
    mediaType: "image",
    aspectRatio: "4:3",
    thumbnail: "/img/taste-of-adana.jpeg",
    printSpecs: "Ventilated Food Board · Vegetable Inks · Gold Foil Debossing",
    formatBadge: "Packaging & Menu Suite",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "hasan",
    name: "Mohammad Mahamudul Hasan",
    role: "Head of Operations",
    image: "/img/team/mohammad-mahamudul-hasan.png",
    linkedin: "https://linkedin.com",
    dept: "Operations Leadership",
    specialty: "Studio & Project Operations",
    bio: "Leading day-to-day agency operations, process excellence, and cross-functional project delivery with utmost discipline.",
  },
  {
    id: "souvik",
    name: "Souvik Bose",
    role: "Senior Account Manager",
    image: "/img/team/souvik-bose.png",
    linkedin: "https://linkedin.com",
    dept: "Client Strategy & Accounts",
    specialty: "Key Account Management",
    bio: "Managing major brand partnerships, commercial growth roadmaps, and seamless client communication across all campaigns.",
  },
  {
    id: "sheejon",
    name: "Sheejon Anam",
    role: "Creative Director",
    image: "/img/team/sheejon-anam.png",
    linkedin: "https://linkedin.com",
    dept: "Creative Direction & Design",
    specialty: "Brand Identity & Art Direction",
    bio: "Spearheading creative visual direction, conceptual brand identities, and high-impact digital storytelling for leading brands.",
  },
  {
    id: "ariful",
    name: "Ariful Islam",
    role: "Client Service Executive",
    image: "/img/team/ariful-islam.png",
    linkedin: "https://linkedin.com",
    dept: "Client Servicing",
    specialty: "Campaign Execution & Coordination",
    bio: "Ensuring smooth brief turnaround, day-to-day client engagement, and coordinated delivery between clients and creative teams.",
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
