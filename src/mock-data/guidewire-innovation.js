import { CONTENT_ACCESS_ROLE } from "@/lib/content-access";

export const guidewireInnovationSolutions = [
  {
    id: "gw-av-robo-riders",
    slug: "autonomous-vehicles",
    title: "Autonomous Vehicles (Robo Riders)",
    subtitle: "Insurance innovation for autonomous mobility risk",
    category: "Guidewire",
    competency: "Guidewire",
    status: "Published",
    displayOrder: 1,
    isPublished: true,
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    tags: ["Autonomous Vehicles", "Claims", "Telematics", "AI", "Guidewire"],
    summary:
      "A Guidewire solution concept for underwriting and claims in an autonomous vehicle world, combining connected-car data, liability attribution, immutable evidence, and AI-assisted processing.",
    technologies: [
      "Jutro",
      "PolicyCenter",
      "ClaimCenter",
      "Integration Gateway",
      "APD",
      "AI",
      "Autopilot",
    ],
    views: [
      {
        id: "industry-challenges",
        label: "Industry Challenges",
        title: "Autonomous Vehicles (Robo Riders) - Industry Challenges",
        marketContext: [
          "Autonomous vehicle market projected to reach approximately $400 billion by 2034.",
          "Swiss Re and Waymo studies estimate significant reductions in property damage and bodily injury claims.",
        ],
        keyStatement:
          "Traditional auto insurance is built around human driver error, negligence, and behavioral risk scoring, such as age, driving history, and other driver-specific factors.",
        challenges: [
          "Shift in liability and risk attribution",
          "Rising severity and specialized costs",
          "Data complexity and trust or auditability",
          "Business model disruption",
        ],
        solutionPoints: [
          "Connected car and vehicle-sensor coverage and ingestion",
          "Causation and liability attribution module",
          "Immutable evidence storage",
          "Claims handling and automated adjudication",
        ],
        benefits: [
          "Survival and relevance in the autonomous vehicle era",
          "Claim-cost savings and efficiency",
          "Reduced fraud and dispute costs",
          "Improved risk pricing and differentiation",
        ],
      },
      {
        id: "solution-architecture",
        label: "Solution Architecture",
        title: "Autonomous Vehicles (Robo Riders) - Solution",
        keyStatement:
          "Connected vehicle underwriting and claims flow using Jutro, PolicyCenter, ClaimCenter, Integration Gateway, APD, and AI-assisted incident processing.",
        architectureNodes: [
          { id: "users", label: "End Users", detail: "Customer / Agent", group: "Experience" },
          { id: "jutro", label: "Jutro Portal", detail: "Submission and FNOL intake", group: "Experience" },
          { id: "policycenter", label: "PolicyCenter", detail: "Underwriting and policy transaction", group: "Core" },
          { id: "claimcenter", label: "ClaimCenter", detail: "Claim adjudication and validation", group: "Core" },
          { id: "gateway", label: "Integration Gateway", detail: "Connected-car details and sensor logs", group: "Integration" },
          { id: "apd", label: "APD", detail: "Digital documentation and product rules", group: "Configuration" },
          { id: "ai", label: "AI Processing", detail: "Incident narrative and causal factors", group: "Intelligence" },
        ],
        processSteps: [
          "Customer or agent creates a new submission through the Jutro portal.",
          "PolicyCenter retrieves connected-car details through the integration gateway.",
          "Connected-car information is fetched through APIs for underwriting.",
          "Customer or agent initiates FNOL from the Jutro portal.",
          "Autopilot workflow triggers with minimal required information.",
          "Claim data and connected-car information are combined for validation and processing.",
        ],
        outcomes: [
          "Faster underwriting decisions using connected-car evidence.",
          "Improved liability attribution with auditable sensor logs.",
          "Reduced claims handling effort through AI-assisted validation.",
        ],
      },
    ],
  },
  {
    id: "gw-flood-in-a-box",
    slug: "flood-in-a-box",
    title: "Flood-In-A-Box",
    subtitle: "Private flood insurance launch accelerator",
    category: "Guidewire",
    competency: "Guidewire",
    status: "Published",
    displayOrder: 2,
    isPublished: true,
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    tags: ["Flood", "APD", "Jutro", "PolicyCenter", "ClaimCenter"],
    summary:
      "A packaged private flood insurance solution that helps carriers accelerate product rollout using Guidewire Cloud, APD, Jutro, automation, and analytics.",
    technologies: [
      "Guidewire Cloud Platform",
      "Jutro",
      "APD",
      "PolicyCenter",
      "BillingCenter",
      "ClaimCenter",
      "Autopilot Workflow",
    ],
    views: [
      {
        id: "solution-overview",
        label: "Solution Overview",
        title: "Flood-In-A-Box",
        marketContext: [
          "The NFIP provides basic bank-required coverage but faces limitations such as outdated risk models and restricted coverage options.",
          "Private insurers can address this gap using flexible policies, higher limits, and competitive pricing.",
        ],
        keyStatement:
          "ValueMomentum's Flood-In-A-Box solution uses Guidewire Cloud capabilities to help insurers quickly launch and implement a private flood-insurance product.",
        challenges: [
          "Insufficient coverage",
          "Outdated risk models",
          "Tedious claims processing",
        ],
        solutionPoints: [
          "Pre-packaged flood-insurance solution configured with APD",
          "Risk Narrative system",
          "Autopilot workflow",
          "Automated processing based on predefined thresholds",
        ],
        benefits: [
          "Improved speed to market",
          "Reduced total cost of ownership",
          "Better risk assessment using underwriting analytics",
          "Reduced processing time through automated workflows",
        ],
      },
      {
        id: "solution-architecture",
        label: "Solution Architecture",
        title: "Flood-In-A-Box Solution Architecture",
        keyStatement:
          "A Guidewire Cloud architecture connecting digital quote-and-buy, core policy/billing/claims, APD product modeling, Autopilot workflows, external data, and analytics.",
        architectureNodes: [
          { id: "jutro", label: "Jutro Digital Platform", detail: "Quote and Buy", group: "Experience" },
          { id: "apd", label: "APD", detail: "Private flood product model", group: "Configuration" },
          { id: "policycenter", label: "PolicyCenter", detail: "Underwriting rules and policy issuance", group: "Core" },
          { id: "billingcenter", label: "BillingCenter", detail: "Billing and payment setup", group: "Core" },
          { id: "claimcenter", label: "ClaimCenter", detail: "FNOL, coverage, exposures, and financials", group: "Core" },
          { id: "cloud", label: "Guidewire Cloud Platform", detail: "Shared platform services", group: "Platform" },
          { id: "autopilot", label: "Autopilot Workflow", detail: "Automated claim workflow", group: "Automation" },
          { id: "data", label: "External Data Providers", detail: "Risk, rating, and property data", group: "Integration" },
          { id: "analytics", label: "Reporting and Analytics", detail: "Portfolio and operational insights", group: "Analytics" },
        ],
        processSteps: [
          "Customer or agent starts flood quote-and-buy in Jutro.",
          "APD product model, underwriting rules, and rating logic drive product behavior.",
          "PolicyCenter creates and manages the private flood policy transaction.",
          "BillingCenter handles billing setup and payment flow.",
          "ClaimCenter processes FNOL, coverage mapping, exposures, and financials.",
          "Autopilot and data integrations automate eligible claim handling and reporting.",
        ],
        outcomes: [
          "Faster product implementation and rollout.",
          "Reusable private flood product foundation.",
          "Improved underwriting and claims automation.",
        ],
      },
    ],
  },
  {
    id: "gw-parametric-insurance",
    slug: "parametric-insurance",
    title: "Parametric Insurance",
    subtitle: "Rainfall-index crop insurance automation",
    category: "Guidewire",
    competency: "Guidewire",
    status: "Published",
    displayOrder: 3,
    isPublished: true,
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    tags: ["Parametric", "Crop Insurance", "Rainfall Index", "NOAA", "Autopilot"],
    summary:
      "An Autopilot-based parametric crop insurance solution that automates claims using rainfall index triggers, threshold validation, payout rules, and customer notifications.",
    technologies: [
      "ClaimCenter",
      "PolicyCenter",
      "Autopilot",
      "Integration Gateway",
      "NOAA",
      "Jutro",
      "Notifications",
    ],
    views: [
      {
        id: "solution-overview",
        label: "Solution Overview",
        title: "Parametric Insurance",
        marketContext: [
          "Weather-related parametric products require fast, automated claim handling.",
          "Traditional claim processes involve field visits, inspections, photos, yield reports, and delayed analysis.",
        ],
        keyStatement:
          "ValueMomentum's Autopilot for Parametric Crop Insurance, based on rainfall index triggers, automates the entire claims lifecycle using real-time rainfall and payout-threshold data.",
        challenges: [
          "Complex weather-based parameters",
          "Limited transparency",
          "Traditional claims-processing requirements",
          "Delays and financial hardship for farmers",
        ],
        solutionPoints: [
          "Automate the claims lifecycle",
          "Use real-time rainfall data",
          "Compare rainfall thresholds against coverage terms",
          "Trigger automated claim initiation and processing",
          "Generate real-time claim status and summaries",
        ],
        benefits: [
          "Predefined and measurable coverage events",
          "Reduced ambiguity",
          "Faster settlement",
          "Potential material reduction in claim-processing costs",
          "Lower operational effort",
          "Faster and more transparent payouts",
        ],
      },
      {
        id: "solution-architecture",
        label: "Solution Architecture",
        title: "Parametric Insurance Solution Architecture",
        keyStatement:
          "A scheduled rainfall automation pattern where ClaimCenter, Autopilot, Integration Gateway, NOAA, PolicyCenter, Jutro, notifications, and claim summaries work together.",
        architectureNodes: [
          { id: "claimcenter", label: "ClaimCenter", detail: "Scheduled rainfall check batch", group: "Core" },
          { id: "weather", label: "NOAA Weather Service", detail: "Rainfall and weather data", group: "External" },
          { id: "gateway", label: "Integration Gateway", detail: "Weather service orchestration", group: "Integration" },
          { id: "policycenter", label: "PolicyCenter", detail: "Parametric product and policy terms", group: "Core" },
          { id: "autopilot", label: "Autopilot", detail: "FNOL creation, reserves, payout, closure", group: "Automation" },
          { id: "summary", label: "Claim Summary", detail: "Claim status and explanation", group: "Claims" },
          { id: "jutro", label: "Jutro", detail: "Customer notifications and communication", group: "Experience" },
        ],
        processSteps: [
          "ClaimCenter executes a scheduled batch process.",
          "Rainfall threshold data is retrieved from the weather service.",
          "Data is validated against configured thresholds.",
          "Autopilot triggers claim creation.",
          "Reserves and payouts are calculated based on policy terms.",
          "Claims are processed and closed automatically where criteria are met.",
          "Notifications and summaries are made available through Jutro.",
        ],
        outcomes: [
          "Faster, event-driven claim decisions.",
          "Reduced manual inspection and documentation effort.",
          "Clear, measurable triggers for transparent customer communication.",
        ],
      },
    ],
  },
];

export function getGuidewireSolutionBySlug(slug) {
  return guidewireInnovationSolutions.find((solution) => solution.slug === slug);
}
