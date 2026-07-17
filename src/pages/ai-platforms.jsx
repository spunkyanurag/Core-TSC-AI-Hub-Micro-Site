import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform } from "@/lib/content-access";
import {
  BotMessageSquare, Sparkles, Brain, Cpu, Zap, ArrowRight,
  FlaskConical, Layers, Shield, MessageSquare, ChevronRight,
  CheckCircle2, Clock, Rocket,
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

const statusIcon = (s) => {
  if (s === "completed")   return <CheckCircle2 className="w-4 h-4 text-[#3FD534]" />;
  if (s === "in-progress") return <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><Clock className="w-4 h-4 text-[#FABD00]" /></motion.div>;
  return <Rocket className="w-4 h-4 text-[#056BFC]" />;
};

export default function AiPlatforms() {
  const { user } = useAuth();
  const visibleRoadmap = filterContentForUser(aiRoadmap, user);
  const visibleAiOfferings = filterContentForUser(aiOfferings, user);
  const visibleApproach = filterContentForUser(aiApproach, user);
  const demoReadyCount = visibleAiOfferings.filter((offering) => offering.status === "Demo Ready").length;
  const platformsCovered = new Set(
    visibleAiOfferings.map((offering) => offering.contentAccessRole)
  ).size;

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
              { label: "AI Use Cases",      value: String(visibleAiOfferings.length) },
              { label: "Demo Ready",        value: String(demoReadyCount) },
              { label: "Platforms Covered", value: String(platformsCovered) },
              { label: "Effort Saved",      value: "~60%" },
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
