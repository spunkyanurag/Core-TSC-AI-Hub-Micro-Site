export const kpis = {
  totalCompetencies: 0,
  accelerators: 0,
  reusableAssets: 0,
  pocs: 0,
  automationSolutions: 0,
  integrationFrameworks: 0,
};

export const platformCoverage = [
  { platform: "Guidewire", coverage: 0 },
  { platform: "Earnix", coverage: 0 },
  { platform: "Duck Creek", coverage: 0 },
  { platform: "OneShield", coverage: 0 },
  { platform: "CCM", coverage: 0 },
];

export const competencies = [
  {
    id: "guidewire",
    name: "Guidewire",
    overview: "Comprehensive suite of services for Guidewire InsuranceSuite implementation and upgrades.",
    expertise: "PolicyCenter, BillingCenter, ClaimCenter",
  },
  {
    id: "earnix",
    name: "Earnix",
    overview: "Advanced rating, pricing, and product personalization.",
    expertise: "Price-It, Personalize-It",
  },
  {
    id: "duck-creek",
    name: "Duck Creek",
    overview: "SaaS core systems for P&C insurance.",
    expertise: "Policy, Billing, Claims",
  },
  {
    id: "oneshield",
    name: "OneShield",
    overview: "Core systems for P&C and MGA markets.",
    expertise: "Enterprise, Market Solutions",
  },
  {
    id: "ccm",
    name: "CCM",
    overview: "Customer Communications Management solutions.",
    expertise: "Quadient, Smart Communications",
  }
];

export const assets = [
  { id: "1", name: "GW Cloud Migration Accelerator", description: "Speeds up Guidewire on-prem to cloud migration.", businessValue: "40% Faster Delivery", platform: "Guidewire", category: "Accelerators", effortSavings: 40, reusabilityScore: 9 },
  { id: "2", name: "Automated Testing Framework", description: "E2E testing for core systems.", businessValue: "30% Reduced Risk", platform: "Multi", category: "Frameworks", effortSavings: 50, reusabilityScore: 10 },
  { id: "3", name: "Data Extraction Tool", description: "Extracts legacy data for migration.", businessValue: "60% Automation", platform: "Duck Creek", category: "Utilities", effortSavings: 60, reusabilityScore: 8 },
  { id: "4", name: "Rating Engine Integration", description: "Seamless Earnix integration.", businessValue: "85% Modernization", platform: "Earnix", category: "Integration", effortSavings: 35, reusabilityScore: 7 },
  { id: "5", name: "Digital Claims Portal", description: "Self-service claims portal.", businessValue: "70% Digital Transformation", platform: "Guidewire", category: "Accelerators", effortSavings: 45, reusabilityScore: 9 },
  { id: "6", name: "Policy Admin Dashboard", description: "Enhanced policy management view.", businessValue: "55% Operational Efficiency", platform: "OneShield", category: "POCs", effortSavings: 20, reusabilityScore: 6 },
];

export const pocs = [
  { id: "1", name: "GenAI Underwriting Assistant", status: "Active", platform: "Guidewire", impact: "High" },
  { id: "2", name: "Automated Quote Generation", status: "Completed", platform: "Duck Creek", impact: "Medium" },
  { id: "3", name: "Dynamic Pricing Model", status: "In Progress", platform: "Earnix", impact: "High" },
  { id: "4", name: "Smart Claims Triage", status: "Planned", platform: "Guidewire", impact: "Medium" },
  { id: "5", name: "Omnichannel Communications", status: "Active", platform: "CCM", impact: "High" },
  { id: "6", name: "Legacy Data Migration", status: "Completed", platform: "OneShield", impact: "High" },
];

export const successStories = [
  { id: "1", customer: "Tier 1 Carrier", industry: "P&C", platform: "Guidewire", metrics: "30% cost reduction" },
  { id: "2", customer: "Regional MGA", industry: "Specialty", platform: "OneShield", metrics: "50% faster time to market" },
  { id: "3", customer: "Global Insurer", industry: "Commercial", platform: "Duck Creek", metrics: "2x quote volume" },
  { id: "4", customer: "Auto Insurer", industry: "Personal", platform: "Earnix", metrics: "15% increase in conversion" },
];

export const innovations = [
  { id: "1", title: "AI-Driven Code Generation", description: "Using LLMs to generate boilerplate configuration." },
  { id: "2", title: "Predictive Claims Analytics", description: "Machine learning models for claims severity prediction." },
  { id: "3", title: "Automated Regression Suite", description: "Self-healing test scripts." },
  { id: "4", title: "IoT Data Integration", description: "Telematics integration framework." },
  { id: "5", title: "Blockchain Smart Contracts", description: "Parametric insurance proof of concept." },
];

export const activities = [
  { id: "1", action: "Published new accelerator", target: "GW Cloud Migration", time: "2 hours ago" },
  { id: "2", action: "Completed POC", target: "GenAI Under underwriting", time: "5 hours ago" },
  { id: "3", action: "Updated framework", target: "Automated Testing", time: "1 day ago" },
  { id: "4", action: "Added success story", target: "Tier 1 Carrier Migration", time: "2 days ago" },
  { id: "5", action: "Started innovation initiative", target: "Predictive Claims Analytics", time: "3 days ago" },
];

// Dashboard announcements are kept here so the carousel can be updated
// independently of its presentation.
export const latestUpdates = [
  {
    id: "genai-underwriting",
    eyebrow: "POC Spotlight",
    date: "05 Jun 2026",
    title: "GenAI underwriting assistant moves into active validation",
    description:
      "The new proof of concept brings contextual risk summaries and guided decision support directly into the underwriting workflow.",
    cta: "See the POC",
    href: "/poc-showcase",
    accent: "#3FD534",
    secondaryAccent: "#FABD00",
  },
  {
    id: "earnix-demo-library",
    eyebrow: "New Resource",
    date: "28 May 2026",
    title: "Earnix demo library is now open to the Core TSC",
    description:
      "Explore focused product walkthroughs, implementation patterns, and reusable material for your next pricing transformation conversation.",
    cta: "Browse demos",
    href: "/earnix-demos",
    accent: "#FABD00",
    secondaryAccent: "#3FD534",
  },
  {
    id: "cloud-accelerator",
    eyebrow: "Asset Release",
    date: "20 May 2026",
    title: "Cloud migration accelerator added to the asset catalog",
    description:
      "A practical toolkit for discovery, migration planning, and delivery governance is now ready for teams working on Guidewire cloud programs.",
    cta: "View assets",
    href: "/assets",
    accent: "#60A5FA",
    secondaryAccent: "#FABD00",
  },
];

export const chartData = {
  coverageTrend: [
    { month: "Jan", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Feb", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Mar", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Apr", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "May", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Jun", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Jul", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Aug", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Sep", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Oct", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Nov", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
    { month: "Dec", Guidewire: 0, Earnix: 0, DuckCreek: 0, OneShield: 0, CCM: 0 },
  ],
  assetCategories: [
    { name: "Accelerators", value: 0 },
    { name: "Frameworks", value: 0 },
    { name: "Utilities", value: 0 },
    { name: "Integration", value: 0 },
    { name: "POCs", value: 0 },
  ]
};
