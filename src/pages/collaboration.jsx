import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform } from "@/lib/content-access";
import { Globe, Users, ArrowRight, Layers, BrainCircuit, Workflow, MessageSquare, ChevronRight, TrendingUp, Link2 } from "lucide-react";

/* variants */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* pulsing dot */
const PulseDot = ({ color }) => (
  <span className="relative inline-flex h-2 w-2 mr-1.5">
    <motion.span className="absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
      transition={{ duration: 2, repeat: Infinity }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
  </span>
);

const crossTeamInitiatives = [
  { title: "Advanced Analytics + Claims Center AI",    partners: ["Advanced Analytics TSC", "Guidewire Core"],         status: "Active",      statusColor: "#3FD534", outcomes: ["30% faster claim triage", "ML model in production", "Shared training dataset"], icon: BrainCircuit, accent: "#056BFC", description: "Joint initiative combining predictive analytics models with ClaimCenter to automatically score claim severity and recommend resolution paths.", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { title: "Earnix + Guidewire Integration Accelerator",partners: ["Guidewire Competency", "Earnix Competency"],        status: "Active",      statusColor: "#3FD534", outcomes: ["Reusable connector framework", "4 client engagements leveraged", "50% integration time saved"], icon: Link2, accent: "#3FD534", description: "Pre-built connector enabling real-time pricing calls from PolicyCenter to Earnix Price-It, eliminating custom integration effort for every engagement.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "AI Initiatives Across Competencies",       partners: ["All Core TSC Competencies", "Data & AI TSC"],        status: "In Progress", statusColor: "#FABD00", outcomes: ["Shared AI sandbox", "6 use cases identified", "Phase 2 roadmap defined"], icon: Workflow, accent: "#FABD00", description: "Cross-competency effort to embed AI tools - code generation, test automation, and GenAI assistants - uniformly across all platform practices.", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "Omnichannel CX Modernisation",             partners: ["Digital TSC", "CCM Competency"],                     status: "In Progress", statusColor: "#FABD00", outcomes: ["CCM + portal reference architecture", "Compliance review complete", "Pilot client identified"], icon: MessageSquare, accent: "#056BFC", description: "Combining CCM platforms with digital experience frameworks to deliver personalised, compliant customer journeys across web, mobile, and print.", contentAccessRole: getContentAccessRoleForPlatform("CCM") },
];

const verticalCollabs = [
  { vertical: "Commercial Lines",   initiatives: 3, platforms: ["Guidewire", "Duck Creek"], highlight: "Shared underwriting automation accelerator in active development", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { vertical: "Personal Lines",     initiatives: 2, platforms: ["Earnix", "Guidewire"],     highlight: "Dynamic pricing integration deployed across 2 client projects", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { vertical: "Specialty / MGA",    initiatives: 2, platforms: ["OneShield", "Duck Creek"], highlight: "MGA onboarding accelerator - reducing setup time by 40%", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { vertical: "Claims & Operations",initiatives: 4, platforms: ["Guidewire", "CCM"],        highlight: "GenAI claims triage POC running in sandbox environment", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const otherTSCs = [
  { name: "Advanced Analytics TSC",      collab: "Predictive claims, risk scoring models",          status: "Active", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { name: "Digital Experience TSC",      collab: "Omnichannel CX, portal modernisation",            status: "Active", contentAccessRole: getContentAccessRoleForPlatform("CCM") },
  { name: "Data & AI TSC",               collab: "Shared AI sandbox, LLM tooling",                  status: "Active", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { name: "Cloud & Infrastructure TSC",  collab: "GW Cloud migration architecture",                 status: "Active", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { name: "Testing CoE",                 collab: "Shared regression framework, shift-left testing", status: "In Discussion", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export default function Collaboration() {
  const { user } = useAuth();
  const visibleCrossTeamInitiatives = filterContentForUser(crossTeamInitiatives, user);
  const visibleVerticalCollabs = filterContentForUser(verticalCollabs, user);
  const visibleOtherTSCs = filterContentForUser(otherTSCs, user);
  const collaborationStats = [
    {
      label: "Active Initiatives",
      value: String(visibleCrossTeamInitiatives.filter((item) => item.status === "Active").length),
    },
    { label: "TSC Partners", value: String(visibleOtherTSCs.length) },
    { label: "Vertical Collabs", value: String(visibleVerticalCollabs.length) },
    {
      label: "Joint Outcomes",
      value: `${visibleCrossTeamInitiatives.reduce((sum, item) => sum + item.outcomes.length, 0)}+`,
    },
  ];

  return (
    <div className="space-y-8">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8
          shadow-[0_30px_90px_rgba(63,213,52,0.12)]
          bg-gradient-to-br from-[#032b1a] via-[#044a2d] to-[#033B8C]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#3FD534]/20 blur-3xl"
            animate={{ y: [0, -28, 0], x: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#056BFC]/20 blur-3xl"
            animate={{ y: [0, 22, 0], x: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.3 }} />
          <motion.div className="absolute left-1/2 top-1/3 h-36 w-36 rounded-full bg-[#FABD00]/8 blur-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <motion.div className="space-y-5"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}>
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="inline-block mr-2">
                <Globe className="w-4 h-4" />
              </motion.span>
              Collaboration Hub
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Stronger Together Across TSCs
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              Cross-team initiatives, vertical collaborations, and joint solutions that multiply the impact of Core TSC across ValueMomentum.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-[#3FD534] hover:bg-[#3FD534]/90 text-[#032b1a] font-semibold">
                <Users className="w-4 h-4 mr-2" /> Propose Collaboration
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={container} initial="hidden" animate="show"
          >
            {collaborationStats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CROSS-TEAM INITIATIVES */}
      <div>
        <motion.h2 className="text-xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}>
          Cross-Team Initiatives
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {visibleCrossTeamInitiatives.map((init) => {
            const Icon = init.icon;
            return (
              <motion.div
                key={init.title}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: `0 20px 40px ${init.accent}25` }}
              >
                <Card className="h-full shadow-sm relative overflow-hidden">
                  <motion.div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: init.accent }}
                    initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <motion.div className="p-2 rounded-lg" style={{ backgroundColor: `${init.accent}15` }}
                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}>
                        <Icon className="w-5 h-5" style={{ color: init.accent }} />
                      </motion.div>
                      <Badge variant="outline" className="text-xs shrink-0 flex items-center"
                        style={{ color: init.statusColor, borderColor: `${init.statusColor}40`, backgroundColor: `${init.statusColor}10` }}>
                        {init.status === "Active" && <PulseDot color={init.statusColor} />}
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
                      {init.outcomes.map((o, i) => (
                        <motion.div key={o} className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                          <ChevronRight className="w-3 h-3 shrink-0" style={{ color: init.accent }} />
                          {o}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          {visibleCrossTeamInitiatives.length === 0 && (
            <Card className="md:col-span-2 border-border/50">
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                No cross-team initiatives are available for your account.
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* VERTICALS + TSC LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <motion.h2 className="text-xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Collaboration with Verticals
          </motion.h2>
          <div className="space-y-3">
            {visibleVerticalCollabs.map((v, i) => (
              <motion.div key={v.vertical}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                whileHover={{ x: 4, boxShadow: "0 8px 24px rgba(5,107,252,0.12)" }}>
                <Card className="shadow-sm">
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
            {visibleVerticalCollabs.length === 0 && (
              <Card className="border-border/50">
                <CardContent className="p-8 text-center text-sm text-muted-foreground">
                  No vertical collaborations are available for your account.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div>
          <motion.h2 className="text-xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Joint Work with Other TSCs
          </motion.h2>
          <Card className="shadow-sm h-fit">
            <CardContent className="p-0">
              {visibleOtherTSCs.map((t, i) => (
                <motion.div key={t.name}
                  className={`p-4 flex items-start gap-3 ${i !== visibleOtherTSCs.length - 1 ? "border-b border-border/40" : ""}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.09 }}
                  whileHover={{ backgroundColor: "rgba(5,107,252,0.03)", x: -2 }}>
                  <div className="p-1.5 bg-[#056BFC]/10 rounded-md text-[#056BFC] mt-0.5 shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{t.name}</p>
                      <Badge variant="outline" className="text-xs shrink-0 flex items-center"
                        style={{
                          color: t.status === "Active" ? "#3FD534" : "#FABD00",
                          borderColor: t.status === "Active" ? "#3FD53440" : "#FABD0040",
                          backgroundColor: t.status === "Active" ? "#3FD53410" : "#FABD0010",
                        }}>
                        {t.status === "Active" && <PulseDot color="#3FD534" />}
                        {t.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.collab}</p>
                  </div>
                </motion.div>
              ))}
              {visibleOtherTSCs.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No TSC collaborations are available for your account.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.45 }}
        whileHover={{ scale: 1.01 }}>
        <Card className="shadow-sm border-[#3FD534]/20 bg-gradient-to-r from-[#3FD534]/6 to-transparent overflow-hidden relative">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3FD534]/8 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-[#3FD534] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Have a joint initiative in mind?</h3>
                <p className="text-sm text-muted-foreground mt-1">Reach out to the Core TSC collaboration lead to start a conversation about cross-team opportunities.</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" className="shrink-0 border-[#3FD534] text-[#3FD534] hover:bg-[#3FD534]/10">
                <MessageSquare className="w-4 h-4 mr-2" /> Start a Conversation
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
