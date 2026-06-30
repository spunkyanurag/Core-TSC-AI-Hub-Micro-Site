import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Users, ArrowRight, Layers, BrainCircuit, Workflow, MessageSquare, ChevronRight, TrendingUp, Link2 } from "lucide-react";

const crossTeamInitiatives = [
  {
    title: "Advanced Analytics + Claims Center AI",
    partners: ["Advanced Analytics TSC", "Guidewire Core"],
    description: "Joint initiative combining predictive analytics models with ClaimCenter to automatically score claim severity and recommend resolution paths.",
    status: "Active",
    statusColor: "#3FD534",
    outcomes: ["30% faster claim triage", "ML model in production", "Shared training dataset"],
    icon: BrainCircuit,
    accent: "#056BFC",
  },
  {
    title: "Earnix + Guidewire Integration Accelerator",
    partners: ["Guidewire Competency", "Earnix Competency"],
    description: "Pre-built connector enabling real-time pricing calls from PolicyCenter to Earnix Price-It, eliminating custom integration effort for every engagement.",
    status: "Active",
    statusColor: "#3FD534",
    outcomes: ["Reusable connector framework", "4 client engagements leveraged", "50% integration time saved"],
    icon: Link2,
    accent: "#3FD534",
  },
  {
    title: "AI Initiatives Across Competencies",
    partners: ["All Core TSC Competencies", "Data & AI TSC"],
    description: "Cross-competency effort to embed AI tools — code generation, test automation, and GenAI assistants — uniformly across all platform practices.",
    status: "In Progress",
    statusColor: "#FABD00",
    outcomes: ["Shared AI sandbox", "6 use cases identified", "Phase 2 roadmap defined"],
    icon: Workflow,
    accent: "#FABD00",
  },
  {
    title: "Omnichannel CX Modernisation",
    partners: ["Digital TSC", "CCM Competency"],
    description: "Combining CCM platforms with digital experience frameworks to deliver personalised, compliant customer journeys across web, mobile, and print.",
    status: "In Progress",
    statusColor: "#FABD00",
    outcomes: ["CCM + portal reference architecture", "Compliance review complete", "Pilot client identified"],
    icon: MessageSquare,
    accent: "#056BFC",
  },
];

const verticalCollabs = [
  {
    vertical: "Commercial Lines",
    initiatives: 3,
    platforms: ["Guidewire", "Duck Creek"],
    highlight: "Shared underwriting automation accelerator in active development",
  },
  {
    vertical: "Personal Lines",
    initiatives: 2,
    platforms: ["Earnix", "Guidewire"],
    highlight: "Dynamic pricing integration deployed across 2 client projects",
  },
  {
    vertical: "Specialty / MGA",
    initiatives: 2,
    platforms: ["OneShield", "Duck Creek"],
    highlight: "MGA onboarding accelerator — reducing setup time by 40%",
  },
  {
    vertical: "Claims & Operations",
    initiatives: 4,
    platforms: ["Guidewire", "CCM"],
    highlight: "GenAI claims triage POC running in sandbox environment",
  },
];

const otherTSCs = [
  { name: "Advanced Analytics TSC", collab: "Predictive claims, risk scoring models", status: "Active" },
  { name: "Digital Experience TSC", collab: "Omnichannel CX, portal modernisation", status: "Active" },
  { name: "Data & AI TSC", collab: "Shared AI sandbox, LLM tooling", status: "Active" },
  { name: "Cloud & Infrastructure TSC", collab: "GW Cloud migration architecture", status: "Active" },
  { name: "Testing CoE", collab: "Shared regression framework, shift-left testing", status: "In Discussion" },
];

export default function Collaboration() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8 shadow-[0_30px_90px_rgba(63,213,52,0.10)] bg-gradient-to-br from-[#032b1a] via-[#044a2d] to-[#033B8C]"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#3FD534]/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#056BFC]/20 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <div className="space-y-5">
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <Globe className="w-4 h-4 mr-2" /> Collaboration Hub
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Stronger Together Across TSCs
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              Cross-team initiatives, vertical collaborations, and joint solutions that multiply the impact of Core TSC across ValueMomentum.
            </p>
            <Button className="bg-[#3FD534] hover:bg-[#3FD534]/90 text-[#032b1a] font-semibold">
              <Users className="w-4 h-4 mr-2" /> Propose Collaboration
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Active Initiatives", value: "4" },
              { label: "TSC Partners", value: "5" },
              { label: "Vertical Collabs", value: "4" },
              { label: "Joint Outcomes", value: "12+" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cross-Team Initiatives */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">Cross-Team Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {crossTeamInitiatives.map((init, i) => {
            const Icon = init.icon;
            return (
              <motion.div
                key={init.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: init.accent }} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${init.accent}15` }}>
                        <Icon className="w-5 h-5" style={{ color: init.accent }} />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0"
                        style={{ color: init.statusColor, borderColor: `${init.statusColor}40`, backgroundColor: `${init.statusColor}10` }}
                      >
                        {init.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm mt-2">{init.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {init.partners.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">{init.description}</p>
                    <div className="space-y-1.5 pt-2 border-t border-border/40">
                      <p className="text-xs font-medium text-foreground">Key outcomes</p>
                      {init.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ChevronRight className="w-3 h-3 shrink-0" style={{ color: init.accent }} />
                          {o}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collaboration with Verticals */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Collaboration with Verticals</h2>
          <div className="space-y-3">
            {verticalCollabs.map((v, i) => (
              <motion.div
                key={v.vertical}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold">{v.vertical}</h3>
                          <Badge variant="outline" className="text-xs text-[#056BFC] border-[#056BFC]/30">
                            {v.initiatives} initiatives
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{v.highlight}</p>
                        <div className="flex gap-1.5 mt-2">
                          {v.platforms.map((p) => (
                            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                          ))}
                        </div>
                      </div>
                      <Layers className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other TSC Collaborations */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Joint Work with Other TSCs</h2>
          <Card className="shadow-sm h-fit">
            <CardContent className="p-0">
              {otherTSCs.map((t, i) => (
                <div key={t.name} className={`p-4 flex items-start gap-3 ${i !== otherTSCs.length - 1 ? "border-b border-border/40" : ""}`}>
                  <div className="p-1.5 bg-[#056BFC]/10 rounded-md text-[#056BFC] mt-0.5 shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{t.name}</p>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0"
                        style={{
                          color: t.status === "Active" ? "#3FD534" : "#FABD00",
                          borderColor: t.status === "Active" ? "#3FD53440" : "#FABD0040",
                          backgroundColor: t.status === "Active" ? "#3FD53410" : "#FABD0010",
                        }}
                      >
                        {t.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.collab}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Propose CTA */}
      <Card className="shadow-sm border-[#3FD534]/20 bg-gradient-to-r from-[#3FD534]/6 to-transparent">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-[#3FD534] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Have a joint initiative in mind?</h3>
              <p className="text-sm text-muted-foreground mt-1">Reach out to the Core TSC collaboration lead to start a conversation about cross-team opportunities.</p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 border-[#3FD534] text-[#3FD534] hover:bg-[#3FD534]/10">
            <MessageSquare className="w-4 h-4 mr-2" /> Start a Conversation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
