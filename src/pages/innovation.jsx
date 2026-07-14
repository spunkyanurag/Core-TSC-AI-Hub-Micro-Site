import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { innovations } from "@/mock-data";
import { PERMISSIONS, useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser } from "@/lib/content-access";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  BrainCircuit,
  Car,
  CheckCircle2,
  Database,
  FileText,
  Gauge,
  Lightbulb,
  Quote,
  Rocket,
  ShieldAlert,
  Workflow,
} from "lucide-react";

const focusAreas = [
  { title: "Generative AI", desc: "LLMs for underwriting and claims", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "Predictive Analytics", desc: "ML models for risk assessment", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "IoT & Telematics", desc: "Real-time data streaming", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "Cloud Native Architecture", desc: "Serverless and microservices", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const guidewireSolutions = [
  {
    id: "robo-riders-industry-challenges",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Autonomous Vehicles (Robo Riders) - Industry Challenges",
    label: "Industry Challenges",
    icon: Car,
    quote: [
      "AV market reaching ~$400 billion by 2034",
      "Swiss Re / Waymo studies estimate an 88% reduction in property damage claims and 92% reduction in bodily injury claims.",
    ],
    headline:
      "Traditional auto insurance is built around human driver error, negligence, and behavioral risk scoring (e.g. age, driving history).",
    columns: [
      {
        title: "Challenge",
        items: [
          "Shift in Liability and Risk Attribution",
          "Rising Severity & Specialized Costs",
          "Data Complexity & Trust / Auditability",
          "Business Model Disruption",
        ],
      },
      {
        title: "Solution",
        items: [
          "Connected Car and Vehicle Sensor Coverage and Ingestion",
          "Causation & Liability Attribution Module",
          "Immutable Evidence Storage",
          "Claims Handling & Automated Adjudication",
        ],
      },
      {
        title: "Benefits",
        items: [
          "Survival & Relevance in AV Era",
          "Claim Cost Savings & Efficiency",
          "Reduced Fraud / Dispute Costs",
          "Better Risk Pricing & Differentiation",
        ],
      },
    ],
  },
  {
    id: "robo-riders-solution",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Autonomous Vehicles (Robo Riders) - Solution",
    label: "Solution Workflow",
    icon: BrainCircuit,
    description:
      "Connected vehicle underwriting and claims flow using Jutro, PolicyCenter, ClaimCenter, Integration Gateway, APD, and AI.",
    stages: [
      { label: "End Users", detail: "Agent / Customer", icon: FileText },
      { label: "Jutro", detail: "New Submission & FNOL", icon: Workflow },
      { label: "Autopilot Workflow", detail: "Minimal details trigger", icon: Gauge },
      { label: "PolicyCenter / ClaimCenter", detail: "Underwriting and adjudication", icon: ShieldAlert },
      { label: "Integration Gateway", detail: "Connected car details", icon: Database },
      { label: "AI", detail: "Incident narrative and causal factors", icon: BrainCircuit },
    ],
    aiInsight:
      "AI generates a detailed incident narrative and causal factor support by analyzing sensor data and logs, restructuring timelines, and correlating inputs to root causes such as sensor malfunctions, software errors, external hazards, or driver intervention.",
    steps: [
      "Customer/Agent creates new Submission using Jutro portal",
      "PolicyCenter fetches Connected Car Details using Integration Gateway",
      "Connected Car details fetched via IA App to PolicyCenter during underwriting process",
      "Agent/Customer initiates FNOL from Jutro Portal",
      "Autopilot workflow is triggered via Jutro Portal with minimal details",
      "ClaimCenter uses AI and Integration Gateway sensor logs during adjudication and vehicle inspection",
    ],
  },
  {
    id: "flood-in-a-box",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Flood-In-A-Box",
    label: "Private Flood Product",
    icon: ShieldAlert,
    quote: [
      "The NFIP, while offering basic bank-required coverage, struggles with outdated risk models and limited coverage options.",
      "Private insurers can bridge this gap by offering higher limits, flexible policies, and competitive rates.",
    ],
    headline:
      "ValueMomentum's Flood-in-a-box solution makes the most of GW Cloud capabilities to help insurers kick-start and expedite their product implementation and rollout.",
    columns: [
      {
        title: "Challenge",
        items: [
          "Insufficient Coverage",
          "Outdated Risk Models",
          "Tedious Claims Processing",
        ],
      },
      {
        title: "Solution",
        items: [
          "ValueMomentum's Flood-in-a-box is a pre-packaged solution configured with APD",
          "Gen AI driven coverage recommendation and Risk Narrative system",
          "With Autopilot workflow, Claims processing is automated based on defined threshold",
        ],
      },
      {
        title: "Benefits",
        items: [
          "Improved speed-to-market and reduction in Total Cost of Ownership (TCO) by 30%",
          "Accurate risk assessment by integrating with UW Analytics such as Predict, HazardHub, etc.",
          "Autopilot workflow reduces Adjustors' involvement for processing claims",
        ],
      },
    ],
  },
  {
    id: "flood-in-a-box-architecture",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Flood-In-A-Box Solution Architecture",
    label: "Solution Architecture",
    icon: Workflow,
    solutionSummary: [
      "ValueMomentum's Flood in a box is a comprehensive private flood insurance solution powered by key Guidewire platform capabilities like Advanced Product Designer, Autopilot Workflow Services, Integration Gateway apps, and Jutro Digital Platform.",
      "The solution includes product model design, LOB user interface, agent portal, test suites, claims coverage mapping, FNOL screens, exposures, financials, and an autopilot workflow.",
    ],
    architectureNodes: [
      "AI-Generated Flood Risk Assessment",
      "Jutro Digital Platform - Flood Sub & Buy screens",
      "PolicyCenter",
      "BillingCenter",
      "ClaimCenter",
      "Guidewire Cloud Platform",
      "Advanced Product Designer (APD)",
      "Autopilot Workflows",
      "External Data Providers",
      "Reporting & Analytics",
    ],
  },
  {
    id: "parametric-insurance",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Parametric Insurance",
    label: "Crop Insurance",
    icon: Gauge,
    quote: [
      "Given the unpredictable nature of weather events, claim processing for parametric related products require rapid, automated claim handling to ensure timely and accurate payouts.",
    ],
    headline:
      "ValueMomentum's Autopilot for Parametric Crop Insurance solution based on Rainfall Index streamlines the claims lifecycle through automated adjudication and payments, enabling fast and accurate decisions.",
    columns: [
      {
        title: "Challenge",
        items: [
          "Complex perils are often not fully captured in standard policies",
          "Lack of transparency impacts customer trust and retention",
          "Traditional claims processing requires field visits, photos, and yield reports",
          "Delays and hassles for farmers",
        ],
      },
      {
        title: "Solution",
        items: [
          "Automating the entire claims process from trigger to payout using real-time rainfall data",
          "Rainfall coverage with various thresholds to cover excess, deficit or both rainfalls using location grid mapped to NOAA",
          "Realtime Claim Status Notification and Claim Summary",
        ],
      },
      {
        title: "Benefits",
        items: [
          "Predefined coverage based on measurable events, eliminating ambiguity in policy terms",
          "Potential for 50% faster claim settlements and a 30-50% reduction in resource usage compared to traditional manual process",
          "It is fast, scalable, and built to deliver exactly when farmers need it most",
        ],
      },
    ],
  },
  {
    id: "parametric-insurance-architecture",
    category: "Guidewire",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    title: "Parametric Insurance Solution Architecture",
    label: "Solution Architecture",
    icon: Database,
    solutionSummary: [
      "In ClaimCenter, the Rainfall Check Batch process executes quarterly and retrieves weather data from NOAA, checks it against set thresholds, and fetches eligible policies from PolicyCenter.",
      "It triggers the ClaimCenter Autopilot workflow to create FNOLs, allocate reserves based on policy details, process pre-agreed fixed payout as per policy, and close claims automatically.",
    ],
    architectureNodes: [
      "Rainfall Check Batch",
      "NOAA Service through Integration Gateway",
      "Parametric Product in PolicyCenter",
      "Parametric Claim Automation in ClaimCenter",
      "Autopilot FNOL creation, coverage, reserve, digital payment, and claim closure",
      "Claim Summary Information",
      "Jutro customer notifications",
      "Generative claim narrative and summary explanation",
    ],
  },
];

function SolutionColumns({ columns = [] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <div key={column.title} className="rounded-lg bg-muted/45 p-4">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#056BFC]">
            {column.title}
          </h4>
          <ul className="space-y-3">
            {column.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#18772A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function WorkflowStages({ stages = [] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
      {stages.map((stage, index) => {
        const Icon = stage.icon;

        return (
          <div key={stage.label} className="relative rounded-lg border bg-background p-4 shadow-sm">
            {index < stages.length - 1 && (
              <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#056BFC] xl:block" />
            )}
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
              <Icon className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold">{stage.label}</h4>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{stage.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

function WorkflowSteps({ steps = [] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {steps.map((step, index) => (
        <div key={step} className="flex gap-3 rounded-lg border bg-background p-4">
          <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-full bg-[#57B947] text-sm font-bold text-white">
            {(index + 1).toFixed(1)}
          </div>
          <p className="text-sm leading-6 text-[#303030] dark:text-white">{step}</p>
        </div>
      ))}
    </div>
  );
}

function ArchitectureSummary({ solution }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="rounded-xl bg-[#57B947]/10 p-5">
        <h4 className="mb-3 text-sm font-bold text-[#18772A]">
          Solution: {solution.title.replace(" Solution Architecture", "")}
        </h4>
        <ul className="space-y-3">
          {solution.solutionSummary.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#18772A]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border bg-background p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#056BFC]">
          Architecture Components
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {solution.architectureNodes.map((node) => (
            <div key={node} className="flex items-center gap-3 rounded-lg border border-[#056BFC]/15 bg-[#056BFC]/5 p-3">
              <Database className="h-4 w-4 shrink-0 text-[#056BFC]" />
              <span className="text-sm font-medium">{node}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuidewireSolutionCard({ solution }) {
  const Icon = solution.icon;

  return (
    <Card className="overflow-hidden border-[#056BFC]/20 shadow-sm">
      <CardHeader className="border-b bg-white dark:bg-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge variant="outline" className="mb-3 border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]">
              {solution.label}
            </Badge>
            <CardTitle className="text-2xl font-bold leading-tight text-[#055FE0] sm:text-3xl">
              {solution.title}
            </CardTitle>
            {solution.description && (
              <CardDescription className="mt-2 text-base">
                {solution.description}
              </CardDescription>
            )}
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
            <Icon className="h-7 w-7" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-5 lg:p-7">
        {solution.quote && (
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-lg bg-muted/45 p-5">
              <Quote className="mb-3 h-12 w-12 text-[#3FD534]" />
              <div className="space-y-4 text-base font-medium leading-snug text-[#303030] dark:text-white">
                {solution.quote.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </aside>
            <div className="space-y-5">
              <div className="rounded-lg border-2 border-[#056BFC] bg-white p-4 text-base font-semibold leading-relaxed shadow-sm dark:bg-card">
                {solution.headline}
              </div>
              <SolutionColumns columns={solution.columns} />
            </div>
          </div>
        )}

        {solution.stages && <WorkflowStages stages={solution.stages} />}

        {solution.aiInsight && (
          <div className="rounded-lg border border-[#056BFC]/20 bg-[#056BFC]/5 p-4">
            <div className="flex items-start gap-3">
              <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-[#056BFC]" />
              <p className="text-sm leading-6 text-muted-foreground">{solution.aiInsight}</p>
            </div>
          </div>
        )}

        {solution.steps && <WorkflowSteps steps={solution.steps} />}

        {solution.solutionSummary && <ArchitectureSummary solution={solution} />}
      </CardContent>
    </Card>
  );
}

export default function Innovation() {
  const { hasPermissions, user } = useAuth();
  const visibleInnovations = filterContentForUser(innovations, user);
  const visibleFocusAreas = filterContentForUser(focusAreas, user);
  const visibleGuidewireSolutions = filterContentForUser(guidewireSolutions, user);
  const canManageContent = hasPermissions([PERMISSIONS.MANAGE_CONTENT]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Innovation Lab</h1>
          <p className="text-muted-foreground mt-2">Next-generation R&D initiatives and emerging technology experiments.</p>
        </div>
        {canManageContent && (
          <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
            <Lightbulb className="w-4 h-4 mr-2" /> Submit Idea
          </Button>
        )}
      </div>

      <section className="space-y-5">
        <Card className="border-[#056BFC]/20 bg-[#056BFC]/5 shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="outline" className="mb-3 border-[#056BFC]/25 bg-white text-[#055FE0] dark:bg-card">
                  Category: Guidewire
                </Badge>
                <CardTitle className="text-2xl font-bold text-[#303030] dark:text-white sm:text-3xl">
                  Guidewire Innovation Solutions
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  Solutions for autonomous vehicle insurance, private flood insurance,
                  and parametric crop insurance using Guidewire Cloud, Jutro,
                  PolicyCenter, ClaimCenter, Integration Gateway, APD, and Autopilot.
                </CardDescription>
              </div>
              <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#055FE0] shadow-sm dark:bg-card">
                {visibleGuidewireSolutions.length} solutions
              </div>
            </div>
          </CardHeader>
        </Card>

        {visibleGuidewireSolutions.map((solution) => (
          <GuidewireSolutionCard key={solution.id} solution={solution} />
        ))}

        {visibleGuidewireSolutions.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="p-8 text-center text-muted-foreground">
              No Guidewire innovation solutions are available for your account.
            </CardContent>
          </Card>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          {visibleInnovations.map((innovation, i) => (
            <motion.div
              key={innovation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="hover-elevate border-border/50 transition-all overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FABD00]" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2 text-[#FABD00] border-[#FABD00]/20 bg-[#FABD00]/5">Active R&D</Badge>
                      <CardTitle className="text-xl">{innovation.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <CardDescription className="text-base">{innovation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Beaker className="w-4 h-4 text-[#056BFC]" /> Experiment Phase
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Rocket className="w-4 h-4 text-[#3FD534]" /> Target: Q3 2024
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {visibleInnovations.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center text-muted-foreground">
                No innovation items are available for your account.
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-4 space-y-6">
          <Card className="border-border/50 bg-[#F8F8FB] dark:bg-muted/20">
            <CardHeader>
              <CardTitle>Focus Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleFocusAreas.map((area) => (
                <div key={area.title} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="p-2 bg-[#056BFC]/10 rounded-md text-[#056BFC] mt-1">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{area.title}</h4>
                    <p className="text-xs text-muted-foreground">{area.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
