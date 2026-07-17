import { CONTENT_ACCESS_ROLE, getContentAccessRoleForPlatform } from "@/lib/content-access";
import competencyHierarchyData from "@/mock-data/competency-hierarchy.json";
import tscAllStarAwardsData from "@/mock-data/tsc-all-star-awards.json";
export { guidewireInnovationSolutions } from "@/mock-data/guidewire-innovation";

export const competencyCategories = competencyHierarchyData.categories
  .filter((category) => category.isPublished)
  .sort((a, b) => a.displayOrder - b.displayOrder);

const competencyCategoryOrder = new Map(
  competencyCategories.map((category) => [category.categoryId, category.displayOrder])
);

export const competencyPlatforms = competencyHierarchyData.platforms
  .filter((platform) => platform.isPublished)
  .sort((a, b) => {
    if (a.categoryId === b.categoryId) {
      return a.displayOrder - b.displayOrder;
    }

    return (
      (competencyCategoryOrder.get(a.categoryId) || 0) -
      (competencyCategoryOrder.get(b.categoryId) || 0)
    );
  });

export const competencyMigrationMap = competencyHierarchyData.migrationMap;

export const kpis = {
  totalCompetencies: competencyPlatforms.length,
  accelerators: 0,
  reusableAssets: 0,
  pocs: 0,
  automationSolutions: 0,
  integrationFrameworks: 0,
};

export const platformCoverage = competencyPlatforms.map((platform) => ({
  platform: platform.platformName,
  coverage: 0,
  contentAccessRole: platform.contentAccessRole,
}));

export const competencies = competencyPlatforms.map((platform) => ({
  id: platform.platformId,
  name: platform.platformName,
  overview: platform.description,
  expertise: platform.expertise,
  contentAccessRole: platform.contentAccessRole,
  categoryId: platform.categoryId,
  categoryName: platform.categoryName,
  categorySlug: platform.categorySlug,
  platformSlug: platform.platformSlug,
  displayOrder: platform.displayOrder,
  icon: platform.icon,
  status: platform.status,
  isPublished: platform.isPublished,
}));

export const assets = [
  { id: "1", name: "GW Cloud Migration Accelerator", description: "Speeds up Guidewire on-prem to cloud migration.", businessValue: "40% Faster Delivery", platform: "Guidewire", category: "Accelerators", effortSavings: 40, reusabilityScore: 9, contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "2", name: "Automated Testing Framework", description: "E2E testing for core systems.", businessValue: "30% Reduced Risk", platform: "Multi", category: "Frameworks", effortSavings: 50, reusabilityScore: 10, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { id: "3", name: "Data Extraction Tool", description: "Extracts legacy data for migration.", businessValue: "60% Automation", platform: "Duck Creek", category: "Utilities", effortSavings: 60, reusabilityScore: 8, contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
  { id: "4", name: "Rating Engine Integration", description: "Seamless Earnix integration.", businessValue: "85% Modernization", platform: "Earnix", category: "Integration", effortSavings: 35, reusabilityScore: 7, contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { id: "5", name: "Digital Claims Portal", description: "Self-service claims portal.", businessValue: "70% Digital Transformation", platform: "Guidewire", category: "Accelerators", effortSavings: 45, reusabilityScore: 9, contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "6", name: "Policy Admin Dashboard", description: "Enhanced policy management view.", businessValue: "55% Operational Efficiency", platform: "OneShield", category: "POCs", effortSavings: 20, reusabilityScore: 6, contentAccessRole: getContentAccessRoleForPlatform("OneShield") },
];

export const pocs = [
  { id: "1", name: "GenAI Underwriting Assistant", status: "Active", platform: "Guidewire", impact: "High", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "2", name: "Automated Quote Generation", status: "Completed", platform: "Duck Creek", impact: "Medium", contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
  { id: "3", name: "Dynamic Pricing Model", status: "In Progress", platform: "Earnix", impact: "High", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { id: "4", name: "Smart Claims Triage", status: "Planned", platform: "Guidewire", impact: "Medium", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "5", name: "Omnichannel Communications", status: "Active", platform: "SmartCOMM", impact: "High", contentAccessRole: getContentAccessRoleForPlatform("SmartCOMM") },
  { id: "6", name: "Legacy Data Migration", status: "Completed", platform: "OneShield", impact: "High", contentAccessRole: getContentAccessRoleForPlatform("OneShield") },
];

export const successStories = [
  { id: "1", customer: "Tier 1 Carrier", industry: "P&C", platform: "Guidewire", metrics: "30% cost reduction", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "2", customer: "Regional MGA", industry: "Specialty", platform: "OneShield", metrics: "50% faster time to market", contentAccessRole: getContentAccessRoleForPlatform("OneShield") },
  { id: "3", customer: "Global Insurer", industry: "Commercial", platform: "Duck Creek", metrics: "2x quote volume", contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
  { id: "4", customer: "Auto Insurer", industry: "Personal", platform: "Earnix", metrics: "15% increase in conversion", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
];

export const innovations = [
  { id: "1", title: "AI-Driven Code Generation", description: "Using LLMs to generate boilerplate configuration.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { id: "2", title: "Predictive Claims Analytics", description: "Machine learning models for claims severity prediction.", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "3", title: "Automated Regression Suite", description: "Self-healing test scripts.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { id: "4", title: "IoT Data Integration", description: "Telematics integration framework.", contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
  { id: "5", title: "Blockchain Smart Contracts", description: "Parametric insurance proof of concept.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export const activities = [
  { id: "1", action: "Published new accelerator", target: "GW Cloud Migration", time: "2 hours ago", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "2", action: "Completed POC", target: "GenAI Under underwriting", time: "5 hours ago", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "3", action: "Updated framework", target: "Automated Testing", time: "1 day ago", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { id: "4", action: "Added success story", target: "Tier 1 Carrier Migration", time: "2 days ago", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { id: "5", action: "Started innovation initiative", target: "Predictive Claims Analytics", time: "3 days ago", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
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
    contentAccessRole: getContentAccessRoleForPlatform("Guidewire"),
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
    contentAccessRole: getContentAccessRoleForPlatform("Earnix"),
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
    contentAccessRole: getContentAccessRoleForPlatform("Guidewire"),
  },
];

export const tscAllStarAwardsMeta = {
  title: tscAllStarAwardsData.title,
  quarter: tscAllStarAwardsData.quarter,
  emptyState: tscAllStarAwardsData.emptyState,
};

export const tscAllStarAwards = tscAllStarAwardsData.awards;

export const chartData = {
  coverageTrend: [
    { month: "Jan", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Feb", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Mar", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Apr", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "May", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Jun", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Jul", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Aug", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Sep", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Oct", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Nov", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
    { month: "Dec", Guidewire: 0, DuckCreek: 0, OneShield: 0, SmartCOMM: 0, OpenText: 0, GhostDraft: 0, Earnix: 0, HyperExponential: 0 },
  ],
  assetCategories: [
    { name: "Accelerators", value: 0, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
    { name: "Frameworks", value: 0, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
    { name: "Utilities", value: 0, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
    { name: "Integration", value: 0, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
    { name: "POCs", value: 0, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  ]
};
