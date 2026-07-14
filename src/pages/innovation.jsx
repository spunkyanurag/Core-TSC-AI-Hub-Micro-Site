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

const roboRidersChallenges = [
  "Shift in Liability and Risk Attribution",
  "Rising Severity & Specialized Costs",
  "Data Complexity & Trust / Auditability",
  "Business Model Disruption",
];

const roboRidersSolutions = [
  "Connected Car and Vehicle Sensor Coverage and Ingestion",
  "Causation & Liability Attribution Module",
  "Immutable Evidence Storage",
  "Claims Handling & Automated Adjudication",
];

const roboRidersBenefits = [
  "Survival & Relevance in AV Era",
  "Claim Cost Savings & Efficiency",
  "Reduced Fraud / Dispute Costs",
  "Better Risk Pricing & Differentiation",
];

const roboRidersWorkflow = [
  {
    step: "1.0",
    text: "Customer/Agent creates new Submission using Jutro portal",
  },
  {
    step: "2.0",
    text: "PolicyCenter fetches Connected Car Details using Integration Gateway",
  },
  {
    step: "3.0",
    text: "Connected Car details fetched via IA App to PolicyCenter during underwriting process",
  },
  {
    step: "4.0",
    text: "Agent/Customer initiates FNOL from Jutro Portal",
  },
  {
    step: "5.0",
    text: "Autopilot workflow is triggered via Jutro Portal with minimal details",
  },
  {
    step: "6.0",
    text: "ClaimCenter uses AI and Integration Gateway sensor logs during adjudication and vehicle inspection",
  },
];

const workflowStages = [
  { label: "End Users", detail: "Agent / Customer", icon: FileText },
  { label: "Jutro", detail: "New Submission & FNOL", icon: Workflow },
  { label: "Autopilot Workflow", detail: "Minimal details trigger", icon: Gauge },
  { label: "PolicyCenter / ClaimCenter", detail: "Underwriting and adjudication", icon: ShieldAlert },
  { label: "Integration Gateway", detail: "Connected car details", icon: Database },
  { label: "AI", detail: "Incident narrative and causal factors", icon: BrainCircuit },
];

export default function Innovation() {
  const { hasPermissions, user } = useAuth();
  const visibleInnovations = filterContentForUser(innovations, user);
  const visibleFocusAreas = filterContentForUser(focusAreas, user);
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

      <section className="space-y-6">
        <Card className="overflow-hidden border-[#056BFC]/20 shadow-sm">
          <CardHeader className="border-b bg-white dark:bg-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="outline" className="mb-3 border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]">
                  Robo Riders
                </Badge>
                <CardTitle className="text-2xl font-bold leading-tight text-[#055FE0] sm:text-3xl">
                  Autonomous Vehicles (Robo Riders) - Industry Challenges
                </CardTitle>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
                <Car className="h-8 w-8" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 p-5 lg:grid-cols-[260px_1fr] lg:p-7">
            <aside className="rounded-lg bg-muted/45 p-5">
              <Quote className="mb-3 h-12 w-12 text-[#3FD534]" />
              <div className="space-y-5 text-lg font-medium leading-snug text-[#303030] dark:text-white">
                <p>AV market reaching ~$400 billion by 2034</p>
                <p>
                  Swiss Re / Waymo studies estimate an 88% reduction in property
                  damage claims and 92% reduction in bodily injury claims.
                </p>
              </div>
            </aside>

            <div className="space-y-5">
              <div className="rounded-lg border-2 border-[#056BFC] bg-white p-4 text-base font-semibold leading-relaxed shadow-sm dark:bg-card sm:text-lg">
                Traditional auto insurance is built around human driver error,
                negligence, and behavioral risk scoring (e.g. age, driving history).
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { title: "Challenge", items: roboRidersChallenges, tone: "text-[#056BFC]" },
                  { title: "Solution", items: roboRidersSolutions, tone: "text-[#303030] dark:text-white" },
                  { title: "Benefits", items: roboRidersBenefits, tone: "text-[#18772A]" },
                ].map((column) => (
                  <div key={column.title} className="rounded-lg bg-muted/45 p-4">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#056BFC]">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6">
                          <CheckCircle2 className={`mt-1 h-4 w-4 shrink-0 ${column.tone}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-[#3FD534]/20 shadow-sm">
          <CardHeader className="border-b bg-white dark:bg-card">
            <CardTitle className="text-2xl font-bold leading-tight text-[#055FE0] sm:text-3xl">
              Autonomous Vehicles (Robo Riders) - Solution
            </CardTitle>
            <CardDescription>
              Connected vehicle underwriting and claims flow using Jutro, PolicyCenter,
              ClaimCenter, Integration Gateway, APD, and AI.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-5 lg:p-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
              {workflowStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <div key={stage.label} className="relative rounded-lg border bg-background p-4 shadow-sm">
                    {index < workflowStages.length - 1 && (
                      <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#056BFC] xl:block" />
                    )}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold">{stage.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{stage.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-[#056BFC]/20 bg-[#056BFC]/5 p-4">
              <div className="flex items-start gap-3">
                <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-[#056BFC]" />
                <div>
                  <h3 className="font-semibold text-[#303030] dark:text-white">
                    AI-generated incident narrative and causal factor support
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Analyzes sensor data and logs to restructure timelines and correlate
                    inputs to identify root causes such as sensor malfunctions, software
                    errors, external hazards, or driver intervention.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {roboRidersWorkflow.map((step) => (
                <div key={step.step} className="flex gap-3 rounded-lg border bg-background p-4">
                  <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-full bg-[#57B947] text-sm font-bold text-white">
                    {step.step}
                  </div>
                  <p className="text-sm leading-6 text-[#303030] dark:text-white">{step.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
