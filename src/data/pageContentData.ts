export interface PageContentData {
  home: {
    manifestoTitle: string;
    manifestoSubtitle: string;
    manifestoDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    methodologyTitle: string;
    methodologyDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButtonText: string;
  };
  portfolio: {
    heroTitle: string;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButtonText: string;
  };
  howWeWork: {
    heroTitle: string;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButtonText: string;
  };
  ourTeam: {
    heroTitle: string;
    heroDesc: string;
    sectionTitle: string;
    sectionDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButtonText: string;
  };
  contact: {
    heroTitle: string;
    heroDesc: string;
    studioTitle: string;
    studioDesc: string;
  };
}

export const DEFAULT_PAGE_CONTENT: PageContentData = {
  home: {
    manifestoTitle: "We Build Brands That Stand Out",
    manifestoSubtitle:
      "Turning ideas into distinctive brands, meaningful connections and measurable growth",
    manifestoDesc:
      "Through new ways of reaching your audience, and by being an integral part of the process all the way from concept to consumer, we help transform your brand presence. We are a full-service marketing and branding agency helping brands and organizations break barriers, pushing your identity forward into the future.",
    servicesTitle: "Integrated Capabilities for Brand Dominance",
    servicesDesc:
      "From zero-to-one brand building to nationwide performance campaigns, we deploy focused multidisciplinary squads that transform brands.",
    methodologyTitle: "A Process Built on Rigor, Creativity & Speed",
    methodologyDesc:
      "We follow a 4-stage systematic methodology that guarantees predictable impact, strategic clarity, and flawless execution.",
    ctaTitle: "Ready to bring your brand vision to life?",
    ctaDesc:
      "Let’s discuss your upcoming brand launch, campaign, or packaging brief over coffee at our Kolabagan studio.",
    ctaButtonText: "Start Your Brief",
  },
  portfolio: {
    heroTitle: "Work crafted with intent, proven by numbers.",
    heroDesc:
      "A selection of recent brand identity, packaging, content, and growth marketing retainers executed for clients in food, beverage, agri-commerce, and lifestyle retail.",
    ctaTitle: "Ready to bring your brand vision to life?",
    ctaDesc:
      "Let’s discuss your upcoming brand launch, campaign, or packaging brief over coffee at our Kolabagan studio.",
    ctaButtonText: "Start Your Brief",
  },
  howWeWork: {
    heroTitle:
      "Small enough to stay close, structured enough to deliver end-to-end.",
    heroDesc:
      "Great marketing is not born out of guess-work. Our 4-stage process bridges commercial insight with bold creative craft to build brands that earn a lasting place in people’s minds.",
    ctaTitle: "Have a brief you'd like to discuss?",
    ctaDesc:
      "Tell us about your brand challenge. We will review your goals and walk you through a tailored roadmap.",
    ctaButtonText: "Schedule a Discovery Call",
  },
  ourTeam: {
    heroTitle:
      "A small, senior team that stays on your account from start to finish.",
    heroDesc:
      "We are built as a specialized studio rather than a bloated agency. You get direct access to creative thinkers, strategists, and executors who care about your brand as much as you do.",
    sectionTitle: "Studio Leadership & Function Leads",
    sectionDesc:
      "Every core service is spearheaded by a dedicated practice lead.",
    ctaTitle: "Ready to bring your brand vision to life?",
    ctaDesc:
      "Let’s discuss your upcoming brand launch, campaign, or packaging brief over coffee at our Kolabagan studio.",
    ctaButtonText: "Start Your Brief",
  },
  contact: {
    heroTitle: "Let’s build something your customers will remember.",
    heroDesc:
      "Tell us about your brand goals. Whether launching an FMCG product, refreshing your brand identity, or scaling your paid social performance, we are ready to assist.",
    studioTitle: "Dhaka Creative Studio",
    studioDesc:
      "Centrally situated in Kolabagan, easily accessible from Dhanmondi, Panthapath, and Farmgate.",
  },
};
