import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BotMessageSquare, Sparkles, Brain, Cpu, Zap, ArrowRight,
  FlaskConical, Layers, Shield, MessageSquare, ChevronRight,
  CheckCircle2, Clock, Rocket
} from "lucide-react";

const aiRoadmap = [
  {
    phase: "Phase 1",
    label: "Foundation & Exploration",
    timeline: "Q1–Q2 2025",
    status: "completed",
    color: "#056BFC",
    items: [
      "Identify high-impact AI use cases across platforms",
      "Pilot GenAI code generation for Guidewire config",
      "Establish AI governance and data privacy guidelines",
      "Deploy internal AI sandbox environment",
    ],
  },
  {
    phase: "Phase 2",
    label: "Build & Accelerate",
    timeline: "Q3–Q4 2025",
    status: "in-progress",
    color: "#FABD00",
    items: [
      "Launch AI-powered testing & regression suite",
      "Integrate LLMs into underwriting and claims workflows",
      "Release AI-assisted migration accelerator (GW Cloud)",
      "Train teams on prompt engineering and AI tooling",
    ],
  },
  {
    phase: "Phase 3",
    label: "Scale & Industrialize",
    timeline: "2026",
    status: "planned",
    color: "#3FD534",
    items: [
      "Embed AI natively across all 5 platform competencies",
      "Build reusable AI components for client engagements",
      "Launch marketplace AI accelerator catalog",
      "Establish AI centre of excellence within Core TSC",
    ],
  },
];

const aiOfferings = [
  {
    icon: Brain,
    title: "GenAI Underwriting Assistant",
    platform: "Guidewire",
    description: "LLM-powered assistant that drafts underwriting rules, risk summaries, and policy recommendations from plain-language prompts.",
    status: "Demo Ready",
    statusColor: "#3FD534",
  },
  {
    icon: Zap,
    title: "Automated Test Generation",
    platform: "Multi-Platform",
    description: "AI generates regression test scripts from user stories and change logs, reducing manual QA effort by up to 60%.",
    status: "Demo Ready",
    statusColor: "#3FD534",
  },
  {
    icon: Cpu,
    title: "Dynamic Pricing with Earnix AI",
    platform: "Earnix",
    description: "ML models integrated with Earnix Price-It to deliver real-time personalised pricing recommendations.",
    status: "In Progress",
    statusColor: "#FABD00",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Claims Triage",
    platform: "Guidewire ClaimCenter",
    description: "NLP-driven claims intake that auto-classifies severity, routes to adjusters, and flags fraud indicators.",
    status: "In Progress",
    statusColor: "#FABD00",
  },
  {
    icon: Layers,
    title: "Migration Intelligence Tool",
    platform: "Duck Creek / OneShield",
    description: "Analyses legacy codebase and generates migration runbooks, data mapping, and risk scores automatically.",
    status: "Planned",
    statusColor: "#056BFC",
  },
  {
    icon: Shield,
    title: "Compliance & Audit Copilot",
    platform: "CCM",
    description: "Scans customer communications against regulatory requirements and suggests compliant alternatives in real time.",
    status: "Planned",
    statusColor: "#056BFC",
  },
];

const aiApproach = [
  { label: "Prompt-Driven Configuration", desc: "Use natural language to generate platform-specific configs, reducing manual effort." },
  { label: "AI-Augmented Code Review", desc: "Automated PR analysis flags anti-patterns and suggests best practices before human review." },
  { label: "Intelligent Data Mapping", desc: "ML models map legacy data schemas to target models, cutting migration discovery time." },
  { label: "Conversational Knowledge Base", desc: "RAG-based chatbot over internal accelerator and asset library for instant lookup." },
];

const statusIcon = (status) => {
  if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-[#3FD534]" />;
  if (status === "in-progress") return <Clock className="w-4 h-4 text-[#FABD00]" />;
  return <Rocket className="w-4 h-4 text-[#056BFC]" />;
};

export default function AiPlatforms() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8 shadow-[0_30px_90px_rgba(5,107,252,0.18)] bg-gradient-to-br from-[#0a0a1a] via-[#0d1f4a] to-[#033B8C]"
      >
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#056BFC]/30 blur-3xl" />
          <div className="absolute right-12 bottom-0 h-80 w-80 rounded-full bg-[#3FD534]/15 blur-3xl" />
          <div className="absolute right-0 top-12 h-48 w-48 rounded-full bg-[#FABD00]/10 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <div className="space-y-5">
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <Sparkles className="w-4 h-4 mr-2" /> AI for Core Platforms
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Intelligence at the Core of Insurance
            </h1>
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl">
              Embedding AI across Guidewire, Earnix, Duck Creek, OneShield, and CCM to accelerate delivery, reduce risk, and unlock new client value.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
                <FlaskConical className="w-4 h-4 mr-2" /> View Demos
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                Contact AI Lead
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "AI Use Cases", value: "6" },
              { label: "Demo Ready", value: "2" },
              { label: "Platforms Covered", value: "5" },
              { label: "Effort Saved", value: "~60%" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* AI Strategy — 3-Phase Roadmap */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">3-Phase AI Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiRoadmap.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
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
        </div>
      </div>

      {/* GenAI Assisted Approach + Offerings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approach */}
        <Card className="lg:col-span-1 shadow-sm bg-[#F8F8FB] dark:bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotMessageSquare className="w-5 h-5 text-[#056BFC]" /> GenAI Approach
            </CardTitle>
            <CardDescription>How we embed AI into delivery workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiApproach.map((item) => (
              <div key={item.label} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className="p-1.5 bg-[#056BFC]/10 rounded-md text-[#056BFC] mt-0.5 flex-shrink-0">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{item.label}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Offerings Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight mb-4">AI Offerings & Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiOfferings.map((offering, i) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-border/60">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-2 rounded-lg bg-[#056BFC]/10">
                          <Icon className="w-5 h-5 text-[#056BFC]" />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0"
                          style={{ color: offering.statusColor, borderColor: `${offering.statusColor}40`, backgroundColor: `${offering.statusColor}10` }}
                        >
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
          </div>
        </div>
      </div>

      {/* Contact */}
      <Card className="shadow-sm border-[#056BFC]/20 bg-gradient-to-r from-[#056BFC]/5 to-transparent">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-base">Want to explore AI for your engagement?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Reach out to the Core TSC AI lead for a tailored demo, accelerator walkthrough, or co-development discussion.
            </p>
          </div>
          <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white shrink-0">
            <MessageSquare className="w-4 h-4 mr-2" /> Contact AI Lead
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
