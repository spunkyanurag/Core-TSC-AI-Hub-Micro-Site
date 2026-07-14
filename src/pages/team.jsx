import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform } from "@/lib/content-access";
import { Users, ShieldCheck, Star, Award, Mail, ArrowRight, TrendingUp, Layers } from "lucide-react";

/* ── variants ────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ── animated maturity dots ──────────────────────────────────── */
const MaturityDots = ({ score }) => {
  const full = Math.floor(score);
  const half = score % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= full;
        const isHalf = i === full + 1 && half;
        return (
          <motion.div
            key={i}
            className="h-2.5 w-2.5 rounded-full border"
            style={{
              backgroundColor: filled ? "#056BFC" : isHalf ? "#056BFC80" : "transparent",
              borderColor: filled || isHalf ? "#056BFC" : "#e2e8f0",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            whileHover={{ scale: 1.4 }}
          />
        );
      })}
      <span className="ml-1 text-xs text-muted-foreground">{score}/5</span>
    </div>
  );
};

const teamStats = [
  { label: "Team Strength",       value: "120+", icon: Users,      color: "#056BFC", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Certifications",      value: "35+",  icon: ShieldCheck,color: "#3FD534", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Competencies",        value: "5",    icon: Layers,     color: "#FABD00", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Years of Experience", value: "10+",  icon: Award,      color: "#ffffff", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const competencyTeams = [
  { platform: "Guidewire",  lead: "Practice Lead - Guidewire",  teamSize: "40+", certifications: 12, maturity: 4,   capabilities: ["PolicyCenter", "ClaimCenter", "BillingCenter", "Cloud Migration", "Upgrades", "Testing"], accent: "#056BFC", highlight: "Largest practice - 10+ years, 25+ client engagements", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { platform: "Earnix",     lead: "Practice Lead - Earnix",     teamSize: "15+", certifications: 6,  maturity: 3,   capabilities: ["Price-It", "Personalize-It", "AI Pricing", "Guidewire Integration"],                    accent: "#3FD534", highlight: "Fastest-growing practice with AI pricing expertise", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { platform: "Duck Creek", lead: "Practice Lead - Duck Creek", teamSize: "25+", certifications: 8,  maturity: 3,   capabilities: ["Policy", "Billing", "Claims", "SaaS OnDemand", "Data Migration"],                      accent: "#FABD00", highlight: "Strong SaaS and MGA delivery track record", contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
  { platform: "OneShield",  lead: "Practice Lead - OneShield",  teamSize: "20+", certifications: 5,  maturity: 3.5, capabilities: ["Enterprise", "Market Solutions", "MGA", "Specialty Lines"],                            accent: "#8b5cf6", highlight: "Deep specialty P&C and MGA market expertise", contentAccessRole: getContentAccessRoleForPlatform("OneShield") },
  { platform: "CCM",        lead: "Practice Lead - CCM",        teamSize: "20+", certifications: 4,  maturity: 3.5, capabilities: ["Quadient", "Smart Communications", "Digital Delivery", "Compliance"],                  accent: "#f97316", highlight: "Customer communications across print, digital, and omnichannel", contentAccessRole: getContentAccessRoleForPlatform("CCM") },
];

const capabilityAreas = [
  { area: "Implementation & Upgrades",    strength: "Expert",   count: "50+ engagements", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { area: "Cloud Migration",              strength: "Advanced", count: "15+ migrations", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { area: "AI & Automation",              strength: "Growing",  count: "6 active POCs", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { area: "Testing & QA",                 strength: "Expert",   count: "Dedicated CoE", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { area: "Data Migration & Integration", strength: "Advanced", count: "30+ projects", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { area: "Training & Enablement",        strength: "Advanced", count: "Certified trainers", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const strengthColors = {
  Expert:   { color: "#3FD534", bg: "#3FD53410", border: "#3FD53440" },
  Advanced: { color: "#056BFC", bg: "#056BFC10", border: "#056BFC40" },
  Growing:  { color: "#FABD00", bg: "#FABD0010", border: "#FABD0040" },
};

const growthCards = [
  { icon: TrendingUp, color: "#056BFC", title: "Actively Hiring", desc: "We are growing our Earnix and AI practices. If you're a certified platform specialist or an AI enthusiast in insurance tech, we'd love to connect.", btn: "View Open Roles", btnStyle: { className: "bg-[#056BFC] hover:bg-[#056BFC]/90 text-white text-xs" }, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { icon: Star,       color: "#3FD534", title: "Certification Programme", desc: "Core TSC sponsors platform certifications for team members across all five competencies. Reach out to your competency lead for the current certification calendar.", btn: "Certification Calendar", btnStyle: { variant: "outline", className: "border-[#3FD534] text-[#3FD534] hover:bg-[#3FD534]/10 text-xs" }, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { icon: Users,      color: "#FABD00", title: "Onboarding Resources", desc: "New to Core TSC? Access onboarding decks, platform guides, accelerator walkthroughs, and team intros - all in one place.", btn: "Access Resources", btnStyle: { variant: "outline", className: "text-xs" }, contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export default function Team() {
  const { user } = useAuth();
  const visibleTeamStats = filterContentForUser(teamStats, user);
  const visibleCompetencyTeams = filterContentForUser(competencyTeams, user);
  const visibleCapabilityAreas = filterContentForUser(capabilityAreas, user);
  const visibleGrowthCards = filterContentForUser(growthCards, user);

  return (
    <div className="space-y-8">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8
          shadow-[0_30px_90px_rgba(5,107,252,0.14)]
          bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#033B8C]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#056BFC]/25 blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, 18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#3FD534]/12 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, -20, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
          <motion.div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-[#FABD00]/8 blur-2xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <motion.div className="space-y-5"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}>
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="inline-block mr-2">
                <Users className="w-4 h-4" />
              </motion.span>
              Team & Capability
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              The Experts Behind Core TSC
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              A team of 120+ certified specialists across Guidewire, Earnix, Duck Creek, OneShield, and CCM — driving insurance transformation for clients globally.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
                <Mail className="w-4 h-4 mr-2" /> Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-3"
            variants={container} initial="hidden" animate="show">
            {visibleTeamStats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} variants={fadeUp}
                  whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                  <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}>
                    <Icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                  </motion.div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ── COMPETENCY TEAMS ─────────────────────────────────── */}
      <div>
        <motion.h2 className="text-xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}>
          Competency Teams
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {visibleCompetencyTeams.map((team) => (
            <motion.div key={team.platform} variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${team.accent}30` }}>
              <Card className="h-full shadow-sm border-t-4" style={{ borderTopColor: team.accent }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{team.platform}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{team.lead}</CardDescription>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Badge variant="secondary" className="text-xs font-semibold">{team.teamSize}</Badge>
                    </motion.div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{team.highlight}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Maturity Score</p>
                    <MaturityDots score={team.maturity} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Key Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {team.capabilities.map((c) => (
                        <motion.div key={c} whileHover={{ scale: 1.05 }}>
                          <Badge variant="secondary" className="text-xs">{c}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3FD534]" />{team.certifications} certifications
                    </div>
                    <motion.div whileHover={{ x: 2 }}>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-xs" style={{ color: team.accent }}>
                        <Mail className="w-3 h-3 mr-1" /> Contact
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {visibleCompetencyTeams.length === 0 && (
            <Card className="md:col-span-2 xl:col-span-3 border-border/50">
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                No competency team cards are available for your account.
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* ── CAPABILITY AREAS + GROWTH ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <motion.h2 className="text-xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Capability Areas
          </motion.h2>
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {visibleCapabilityAreas.map((cap, i) => {
                const style = strengthColors[cap.strength];
                return (
                  <motion.div key={cap.area}
                    className={`p-4 flex items-center justify-between gap-3 ${i !== visibleCapabilityAreas.length - 1 ? "border-b border-border/40" : ""}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: i * 0.08 }}
                    whileHover={{ backgroundColor: `${style.color}06`, x: 2 }}>
                    <div className="flex items-center gap-3">
                      <motion.div className="p-1.5 bg-[#056BFC]/10 rounded-md shrink-0"
                        whileHover={{ rotate: 90, transition: { duration: 0.25 } }}>
                        <ArrowRight className="w-3 h-3 text-[#056BFC]" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium">{cap.area}</p>
                        <p className="text-xs text-muted-foreground">{cap.count}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0"
                      style={{ color: style.color, borderColor: style.border, backgroundColor: style.bg }}>
                      {cap.strength}
                    </Badge>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div>
          <motion.h2 className="text-xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Growth & Hiring
          </motion.h2>
          <div className="space-y-4">
            {visibleGrowthCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 30px ${card.color}20` }}>
                  <Card className="shadow-sm" style={{ borderColor: `${card.color}30` }}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}>
                          <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: card.color }} />
                        </motion.div>
                        <div>
                          <h3 className="text-sm font-semibold">{card.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button size="sm" className={`mt-3 ${card.btnStyle.className}`} variant={card.btnStyle.variant}>
                              {card.btn}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
