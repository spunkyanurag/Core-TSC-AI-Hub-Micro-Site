import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentAccessDenied } from "@/components/content-access-denied";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform, userCanViewContent } from "@/lib/content-access";
import {
  BotMessageSquare, Sparkles, Brain, Cpu, Zap, ArrowRight,
  FlaskConical, Layers, Shield, MessageSquare, ChevronRight,
  CheckCircle2, Clock, Rocket, GitBranch, Workflow, TestTube2,
  CloudCog, Code2, FileSearch, Network, ClipboardCheck, BarChart3,
  Gauge, Target, Library, MonitorCheck, Boxes, ArrowLeft,
} from "lucide-react";

/* ── counter ─────────────────────────────────────────────────── */
function Counter({ to, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const n = parseFloat(to);
    if (isNaN(n)) return;
    let cur = 0;
    const step = n / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= n) { setVal(n); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── variants ────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ── pulsing status dot ──────────────────────────────────────── */
const PulseDot = ({ color }) => (
  <span className="relative inline-flex h-2 w-2 mr-1.5">
    <motion.span
      className="absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
  </span>
);

/* ── data ────────────────────────────────────────────────────── */
const aiRoadmap = [
  {
    phase: "Phase 1", label: "Foundation & Exploration", timeline: "Q1–Q2 2025",
    status: "completed", color: "#056BFC",
    contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL,
    items: [
      "Identify high-impact AI use cases across platforms",
      "Pilot GenAI code generation for Guidewire config",
      "Establish AI governance and data privacy guidelines",
      "Deploy internal AI sandbox environment",
    ],
  },
  {
    phase: "Phase 2", label: "Build & Accelerate", timeline: "Q3–Q4 2025",
    status: "in-progress", color: "#FABD00",
    contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL,
    items: [
      "Launch AI-powered testing & regression suite",
      "Integrate LLMs into underwriting and claims workflows",
      "Release AI-assisted migration accelerator (GW Cloud)",
      "Train teams on prompt engineering and AI tooling",
    ],
  },
  {
    phase: "Phase 3", label: "Scale & Industrialize", timeline: "2026",
    status: "planned", color: "#3FD534",
    contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL,
    items: [
      "Embed AI natively across all 8 platform competencies",
      "Build reusable AI components for client engagements",
      "Launch marketplace AI accelerator catalog",
      "Establish AI centre of excellence within Core TSC",
    ],
  },
];

const aiOfferings = [
  { icon: Brain,        title: "GenAI Underwriting Assistant",  platform: "Guidewire",             status: "Demo Ready",  statusColor: "#3FD534", description: "LLM-powered assistant that drafts underwriting rules, risk summaries, and policy recommendations from plain-language prompts.", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { icon: Zap,          title: "Automated Test Generation",     platform: "Multi-Platform",         status: "Demo Ready",  statusColor: "#3FD534", description: "AI generates regression test scripts from user stories and change logs, reducing manual QA effort by up to 60%.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { icon: Cpu,          title: "Dynamic Pricing with Earnix AI",platform: "Earnix",                 status: "In Progress", statusColor: "#FABD00", description: "ML models integrated with Earnix Price-It to deliver real-time personalised pricing recommendations.", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { icon: MessageSquare,title: "AI-Powered Claims Triage",      platform: "Guidewire ClaimCenter",  status: "In Progress", statusColor: "#FABD00", description: "NLP-driven claims intake that auto-classifies severity, routes to adjusters, and flags fraud indicators.", contentAccessRole: getContentAccessRoleForPlatform("Guidewire ClaimCenter") },
  { icon: Layers,       title: "Migration Intelligence Tool",   platform: "Duck Creek / OneShield", status: "Planned",     statusColor: "#056BFC", description: "Analyses legacy codebase and generates migration runbooks, data mapping, and risk scores automatically.", contentAccessRole: getContentAccessRoleForPlatform("Duck Creek / OneShield") },
  { icon: Shield,       title: "Compliance & Audit Copilot",    platform: "SmartCOMM",              status: "Planned",     statusColor: "#056BFC", description: "Scans customer communications against regulatory requirements and suggests compliant alternatives in real time.", contentAccessRole: getContentAccessRoleForPlatform("SmartCOMM") },
];

const aiApproach = [
  { label: "Prompt-Driven Configuration",    desc: "Use natural language to generate platform-specific configs, reducing manual effort.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "AI-Augmented Code Review",       desc: "Automated PR analysis flags anti-patterns and suggests best practices before human review.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Intelligent Data Mapping",       desc: "ML models map legacy data schemas to target models, cutting migration discovery time.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Conversational Knowledge Base",  desc: "RAG-based chatbot over internal accelerator and asset library for instant lookup.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const guidewireAiRole = getContentAccessRoleForPlatform("Guidewire");

const guidewireProgression = [
  {
    status: "Current State",
    title: "AI Assisted & Generative AI",
    color: "#D90000",
    groups: [
      {
        title: "Requirement & Specs",
        items: [
          "AI converts workshop notes to user stories in minutes",
          "Auto-generates acceptance criteria and edge cases",
        ],
      },
      {
        title: "Config & Development (Gosu & APD)",
        items: [
          "Gosu classes and PCF screens from design artifacts",
          "Unit tests auto-generated and validated on save",
          "AI-assisted product model config and APD build",
          "Underwriting workflow generation and validation",
        ],
      },
      {
        title: "Integration & Cloud API",
        items: [
          "Java and deployment pipeline auto-generation",
          "Guidewire Cloud API setup and REST client generation",
          "Unit and deployment pipeline auto-generation",
        ],
      },
      {
        title: "Testing & Quality Assurance",
        items: [
          "Gosu unit tests auto-generated from specs",
          "Coverage gaps flagged automatically on every save",
        ],
      },
      {
        title: "Knowledge & Onboarding",
        items: ["Gosu patterns and domain glossary are shared AI context"],
      },
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    status: "Days (TBD)",
    title: "AI Agents",
    color: "#056BFC",
    groups: [
      {
        title: "AI Agents",
        items: [
          "Requirement Discovery Agent",
          "Gosu Development & APD Config Agent",
          "UI & Rule Configuration Agent",
          "Test Automation Agent (Existing - Assurance TSC)",
        ],
      },
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    status: "Agentic AI (Aspirational)",
    title: "Agentic AI (Multiagent Framework)",
    color: "#22B922",
    flow: [
      "Requirements",
      "Product Configuration Agent",
      "Gosu Development Agent",
      "Integration Development Agent",
      "Test Automation Agent",
      "Code Review Agent",
      "Human Approval",
      "Deployment",
    ],
    contentAccessRole: guidewireAiRole,
  },
];

const guidewireAiDlcColumns = [
  {
    title: "Requirement Analysis",
    color: "#075BCD",
    items: [
      "User story",
      "Requirement Optimization",
      "Impact Analysis",
      "User story creation",
      "Requirement validation agent",
      "Acceptance criteria",
      "Traceability agent",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Architecture & Design",
    color: "#056BFC",
    items: [
      "UI/UX Guide Creation",
      "Solution Design",
      "Integration Design Agent",
      "Architecture Reverse Engineering",
      "API Design & Impl Agent",
      "Technical Debt",
      "Security & Compliance Agent",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Development",
    color: "#22B922",
    items: [
      "AI Agents",
      "Code Generation",
      "UI Dev (PCF) Agent",
      "Code Refactoring",
      "Rule Configuration Agent",
      "Defect Resolution Agent",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Testing",
    color: "#22B922",
    items: [
      "Test case Generation",
      "Test Automation Agent",
      "Automated Test Scripts",
      "Test Data Generation Agent",
      "Defect Analysis",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Deployment",
    color: "#8B2CA6",
    items: [
      "AI Agents",
      "Release notes",
      "Release Planning Agent",
      "Deploy validation",
      "Monitoring Agent",
      "Change control",
      "CI/CD Pipeline Agent",
    ],
    contentAccessRole: guidewireAiRole,
  },
];

const guidewireMultiAgentCapabilities = [
  "Requirement Traceability Agent",
  "Architecture Governance Agents",
  "Defect Tracking & Resolution Agent",
  "End to End Integration Testing Agent",
  "Production Deployment Readiness Agent",
].map((label) => ({ label, contentAccessRole: guidewireAiRole }));

const guidewireAdoptionRoadmap = [
  {
    title: "Assess & Prioritize",
    timeline: "0-10 Days",
    color: "#056BFC",
    items: [
      "Assess AI readiness by practice, create AI use case inventory, confirm AI agent flow for Guidewire, deploy on TSC sandbox, and identify AI-missing use cases within SDLC",
      "Update AI use case inventory including SBT and VM offerings list",
      "Identify design artifacts to implementation projects, with 2-3 projects for every solution architect",
      "Identify 3-5 major Core TSC app AI use cases per project and project team, then add, modify, or delete by applicability",
      "Project PMs and Tech Leads consume AI across the TSC inventory",
      "Establish governance and adoption scorecard with Core TSC help",
      "Baseline productivity metrics and track them diligently",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Pilot & Adopt",
    timeline: "10-30 Days",
    color: "#22B922",
    items: [
      "Deploy AI use cases across AI-DLC phases for TSC and rollout to country/project teams to validate project-specific prompt libraries for common use",
      "Enable IntelliJ Copilot, Amazon Q, ChatGPT, Claude, and AI pilot for TSC and delivery projects, and engage with customer showcase POC",
      "Establish weekly PM-Architect review, discuss impediments and how TSC can help resolve them, and ramp recurring cadence",
      "Capture productivity gains and lessons learned, then establish feedback loop and continuous improvement mechanism",
      "Publish initial adoption scores for delivery projects",
    ],
    contentAccessRole: guidewireAiRole,
  },
  {
    title: "Scale & Institutionalize",
    timeline: "30-45 Days & Beyond",
    color: "#056BFC",
    items: [
      "Expand successful AI use cases across practice delivery projects and engage with customers through demos using business case and ROI",
      "Create reusable prompt libraries and share across projects and practice",
      "Identify and establish Agentic AI pilots rollout within Core TSC and then delivery programs based on customer adoption and appetite",
      "Roll out AI-DLC best practices and learnings",
      "Publish adoption dashboards and success stories",
    ],
    contentAccessRole: guidewireAiRole,
  },
];

const guidewireAiStats = [
  { label: "AI-DLC phases", value: guidewireAiDlcColumns.length, suffix: "", icon: Workflow },
  {
    label: "AI-DLC use cases",
    value: guidewireAiDlcColumns.reduce((sum, column) => sum + column.items.length, 0),
    suffix: "",
    icon: Layers,
  },
  { label: "Multi-agent capabilities", value: guidewireMultiAgentCapabilities.length, suffix: "", icon: BotMessageSquare },
  { label: "Adoption runway", value: 45, suffix: " days", icon: Gauge },
];

const guidewireAiSearchItems = [
  "AI-DLC Use Cases Progression for Guidewire Platform",
  "AI Use Cases across AI-DLC",
  "AI Adoption Roadmap (Pilot with COUNTRY/Pekin) - June 2026",
  ...guidewireAiDlcColumns.flatMap((column) => column.items),
  ...guidewireMultiAgentCapabilities.map((item) => item.label),
  ...guidewireAdoptionRoadmap.flatMap((phase) => phase.items),
];

const statusIcon = (s) => {
  if (s === "completed")   return <CheckCircle2 className="w-4 h-4 text-[#3FD534]" />;
  if (s === "in-progress") return <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><Clock className="w-4 h-4 text-[#FABD00]" /></motion.div>;
  return <Rocket className="w-4 h-4 text-[#056BFC]" />;
};

function BulletList({ items = [], color = "#056BFC", compact = false }) {
  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GuidewireProgressionCard({ stage }) {
  return (
    <Card className="h-full overflow-hidden rounded-lg border-border/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="px-4 py-2 text-center text-sm font-bold text-white" style={{ backgroundColor: stage.color }}>
        {stage.status}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg" style={{ color: stage.color }}>{stage.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stage.groups?.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-sm font-semibold text-foreground">{group.title}</p>
            <BulletList items={group.items} color={stage.color} compact />
          </div>
        ))}
        {stage.flow && (
          <div className="space-y-2">
            {stage.flow.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border bg-muted/20 px-3 py-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: stage.color }}>
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{step}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GuidewireDlcColumn({ column }) {
  return (
    <Card className="h-full overflow-hidden rounded-lg border-border/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="px-3 py-2 text-center text-xs font-bold text-white" style={{ backgroundColor: column.color }}>
        {column.title}
      </div>
      <CardContent className="grid gap-2 p-3">
        {column.items.map((item) => (
          <div key={item} className="rounded-md border border-[#056BFC]/20 bg-[#F8FBFF] px-3 py-2 text-center text-xs font-semibold leading-5 text-[#07306F] transition hover:border-[#056BFC]/45 hover:bg-white dark:bg-card dark:text-white">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function GuidewireRoadmapPhase({ phase }) {
  return (
    <Card className="h-full overflow-hidden rounded-lg border-border/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="px-4 py-3 text-center text-white" style={{ backgroundColor: phase.color }}>
        <p className="text-xs font-bold uppercase tracking-[0.12em]">{phase.timeline}</p>
        <p className="mt-1 text-sm font-semibold">{phase.title}</p>
      </div>
      <CardContent className="space-y-3 p-4">
        {phase.items.map((item, index) => (
          <div key={item} className="rounded-lg border bg-muted/20 p-3 transition hover:border-[#056BFC]/35 hover:bg-[#056BFC]/5">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: phase.color }}>
                {index + 1}
              </span>
              <p className="text-xs font-medium leading-5 text-muted-foreground">{item}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function GuidewireAiDetail() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("progression");

  if (!userCanViewContent(user, CONTENT_ACCESS_ROLE.GUIDEWIRE)) {
    return <ContentAccessDenied contentAccessRole={CONTENT_ACCESS_ROLE.GUIDEWIRE} />;
  }

  const sectionTabs = [
    { id: "progression", label: "Progression", icon: GitBranch },
    { id: "use-cases", label: "AI-DLC Use Cases", icon: Boxes },
    { id: "roadmap", label: "Adoption Roadmap", icon: Target },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/ai-platforms" className="hover:text-[#056BFC]">AI For Core Platforms</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Guidewire</span>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#056BFC] via-[#0751BD] to-[#07306F] p-7 text-white shadow-[0_28px_70px_rgba(5,107,252,0.24)]"
      >
        <div className="grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <Badge className="border border-white/20 bg-white/15 text-white">
              Guidewire
            </Badge>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              AI-DLC for Guidewire Platform
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
              A consolidated Guidewire AI experience covering the current AI-assisted state, AI agents,
              aspirational agentic AI flow, AI-DLC use cases, multi-agent capabilities, and the June 2026
              pilot adoption roadmap for COUNTRY/Pekin.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-white text-[#07306F] hover:bg-white/90">
                <Link href="/ai-platforms">
                  <ArrowLeft className="h-4 w-4" />
                  Back to AI Overview
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {guidewireAiStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md">
                  <CardContent className="p-4">
                    <Icon className="mb-4 h-6 w-6 text-[#FABD00]" />
                    <p className="text-3xl font-bold">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section className="rounded-lg border bg-card p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                type="button"
                variant={activeSection === tab.id ? "default" : "outline"}
                className="gap-2"
                onClick={() => setActiveSection(tab.id)}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </section>

      {activeSection === "progression" && (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI-DLC Use Cases Progression for Guidewire Platform</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Progression from AI-assisted and generative AI use cases into AI agents and aspirational agentic AI.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {guidewireProgression.map((stage) => (
              <GuidewireProgressionCard key={stage.status} stage={stage} />
            ))}
          </div>
          <Card className="border-[#056BFC]/20 bg-[#056BFC]/5">
            <CardContent className="flex flex-col gap-3 p-4 text-sm font-semibold text-[#055FE0] sm:flex-row sm:items-center">
              <Sparkles className="h-5 w-5" />
              Progression from AI Assisted & Generative AI use cases into AI Agents and Agentic AI use cases related to GW AI-DLC.
            </CardContent>
          </Card>
        </section>
      )}

      {activeSection === "use-cases" && (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Use Cases across AI-DLC</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Guidewire use cases organized by AI-DLC phase, including the Multi Agent Framework capabilities.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {guidewireAiDlcColumns.map((column) => (
              <GuidewireDlcColumn key={column.title} column={column} />
            ))}
          </div>
          <Card className="border-[#303030]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Network className="h-5 w-5 text-[#056BFC]" />
                Multi Agent Framework
              </CardTitle>
              <CardDescription>Artificial and human contribution calibrated at 50%.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {guidewireMultiAgentCapabilities.map((capability) => (
                <div key={capability.label} className="rounded-lg border border-[#8B2CA6]/25 bg-[#8B2CA6]/5 p-4 text-center text-sm font-semibold text-[#303030] transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:text-white">
                  {capability.label}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {activeSection === "roadmap" && (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Adoption Roadmap (Pilot with COUNTRY/Pekin) - June 2026</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Adoption plan from readiness assessment through pilot execution and institutional scaling.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {guidewireAdoptionRoadmap.map((phase) => (
              <GuidewireRoadmapPhase key={phase.title} phase={phase} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function AiPlatforms({ platformSlug }) {
  const { user } = useAuth();
  const visibleRoadmap = filterContentForUser(aiRoadmap, user);
  const visibleAiOfferings = filterContentForUser(aiOfferings, user);
  const visibleApproach = filterContentForUser(aiApproach, user);
  const demoReadyCount = visibleAiOfferings.filter((offering) => offering.status === "Demo Ready").length;
  const platformsCovered = new Set(
    visibleAiOfferings.map((offering) => offering.contentAccessRole)
  ).size;
  const canViewGuidewireAi = userCanViewContent(user, CONTENT_ACCESS_ROLE.GUIDEWIRE);
  const visibleGuidewireAiUseCaseCount = canViewGuidewireAi
    ? guidewireAiStats.find((stat) => stat.label === "AI-DLC use cases")?.value || 0
    : 0;
  const visibleMultiAgentCount = canViewGuidewireAi ? guidewireMultiAgentCapabilities.length : 0;

  if (platformSlug === "guidewire") {
    return <GuidewireAiDetail />;
  }

  return (
    <div className="space-y-8">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8
          shadow-[0_30px_90px_rgba(5,107,252,0.18)]
          bg-gradient-to-br from-[#0a0a1a] via-[#0d1f4a] to-[#033B8C]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#056BFC]/30 blur-3xl"
            animate={{ y: [0, -28, 0], x: [0, 16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute right-12 bottom-0 h-80 w-80 rounded-full bg-[#3FD534]/12 blur-3xl"
            animate={{ y: [0, 22, 0], x: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
          <motion.div className="absolute right-0 top-12 h-48 w-48 rounded-full bg-[#FABD00]/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <motion.div className="space-y-5"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}>
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <motion.span animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="inline-block mr-2">
                <Sparkles className="w-4 h-4" />
              </motion.span>
              AI for Core Platforms
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Intelligence at the Core of Insurance
            </h1>
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl">
              Embedding AI across Guidewire, Duck Creek, OneShield, SmartCOMM, OpenText, GhostDraft, Earnix, and HyperExponential to accelerate delivery, reduce risk, and unlock new client value.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
                  <FlaskConical className="w-4 h-4 mr-2" /> View Demos
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  Contact AI Lead
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* stat tiles */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={container} initial="hidden" animate="show"
          >
            {[
              { label: "AI Use Cases",      value: String(visibleAiOfferings.length + visibleGuidewireAiUseCaseCount) },
              { label: "Demo Ready",        value: String(demoReadyCount) },
              { label: "Platforms Covered", value: String(platformsCovered) },
              { label: "Agent Capabilities", value: String(visibleMultiAgentCount) },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── ROADMAP ───────────────────────────────────────────── */}
      {canViewGuidewireAi && (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="overflow-hidden rounded-lg border-[#056BFC]/20 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
                  <img src="/assets/guidewire.svg" alt="Guidewire logo" className="h-9 w-9 object-contain" />
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]">
                      Guidewire
                    </Badge>
                    <Badge variant="outline" className="border-[#3FD534]/25 bg-[#3FD534]/10 text-[#18772A]">
                      {visibleGuidewireAiUseCaseCount} AI-DLC use cases
                    </Badge>
                    <Badge variant="outline" className="border-[#FABD00]/35 bg-[#FABD00]/10 text-[#9A6500]">
                      June 2026 roadmap
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Guidewire AI-DLC Use Cases & Adoption Roadmap</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    Explore the complete Guidewire-specific progression from AI-assisted delivery into AI agents,
                    agentic AI, Multi Agent Framework capabilities, and the COUNTRY/Pekin pilot roadmap.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full lg:w-auto">
                <Link href="/ai-platforms/guidewire">
                  Open Guidewire
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      )}

      <div>
        <motion.h2
          className="text-xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          3-Phase AI Roadmap
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {visibleRoadmap.map((phase) => (
            <motion.div
              key={phase.phase}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${phase.color}30` }}
            >
              <Card className="h-full border-t-4 shadow-sm" style={{ borderTopColor: phase.color }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs" style={{ color: phase.color, borderColor: `${phase.color}40`, backgroundColor: `${phase.color}10` }}>
                      {phase.phase}
                    </Badge>
                    {statusIcon(phase.status)}
                  </div>
                  <CardTitle className="text-base">{phase.label}</CardTitle>
                  <CardDescription className="text-xs">{phase.timeline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── APPROACH + OFFERINGS ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* approach */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="lg:col-span-1 shadow-sm bg-[#F8F8FB] dark:bg-muted/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <BotMessageSquare className="w-5 h-5 text-[#056BFC]" />
                </motion.div>
                GenAI Approach
              </CardTitle>
              <CardDescription>How we embed AI into delivery workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleApproach.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                >
                  <div className="p-1.5 bg-[#056BFC]/10 rounded-md text-[#056BFC] mt-0.5 flex-shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* offerings */}
        <div className="lg:col-span-2">
          <motion.h2
            className="text-xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            AI Offerings & Use Cases
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={container} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            {visibleAiOfferings.map((offering) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: `0 16px 36px ${offering.statusColor}25` }}
                >
                  <Card className="h-full shadow-sm border-border/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <motion.div
                          className="p-2 rounded-lg bg-[#056BFC]/10"
                          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                        >
                          <Icon className="w-5 h-5 text-[#056BFC]" />
                        </motion.div>
                        <Badge variant="outline" className="text-xs shrink-0 flex items-center"
                          style={{ color: offering.statusColor, borderColor: `${offering.statusColor}40`, backgroundColor: `${offering.statusColor}10` }}>
                          {offering.status === "Demo Ready" && <PulseDot color={offering.statusColor} />}
                          {offering.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm mt-2">{offering.title}</CardTitle>
                      <CardDescription className="text-xs text-[#056BFC] font-medium">{offering.platform}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground leading-relaxed">{offering.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            {visibleAiOfferings.length === 0 && (
              <Card className="sm:col-span-2 border-border/50">
                <CardContent className="p-8 text-center text-sm text-muted-foreground">
                  No AI offerings are available for your account.
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="shadow-sm border-[#056BFC]/20 bg-gradient-to-r from-[#056BFC]/5 to-transparent overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#056BFC]/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="font-semibold text-base">Want to explore AI for your engagement?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Reach out to the Core TSC AI lead for a tailored demo, accelerator walkthrough, or co-development discussion.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white shrink-0">
                <MessageSquare className="w-4 h-4 mr-2" /> Contact AI Lead
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
