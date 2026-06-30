import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, Star, Award, Mail, ArrowRight, TrendingUp, Layers } from "lucide-react";

const teamStats = [
  { label: "Team Strength", value: "120+", icon: Users, color: "#056BFC" },
  { label: "Certifications", value: "35+", icon: ShieldCheck, color: "#3FD534" },
  { label: "Competencies", value: "5", icon: Layers, color: "#FABD00" },
  { label: "Years of Experience", value: "10+", icon: Award, color: "#303030" },
];

const competencyTeams = [
  {
    platform: "Guidewire",
    lead: "Practice Lead — Guidewire",
    email: "guidewire@valuemomentum.com",
    teamSize: "40+",
    certifications: 12,
    maturity: 4,
    capabilities: ["PolicyCenter", "ClaimCenter", "BillingCenter", "Cloud Migration", "Upgrades", "Testing"],
    accent: "#056BFC",
    highlight: "Largest practice — 10+ years, 25+ client engagements",
  },
  {
    platform: "Earnix",
    lead: "Practice Lead — Earnix",
    email: "earnix@valuemomentum.com",
    teamSize: "15+",
    certifications: 6,
    maturity: 3,
    capabilities: ["Price-It", "Personalize-It", "AI Pricing", "Guidewire Integration"],
    accent: "#3FD534",
    highlight: "Fastest-growing practice with AI pricing expertise",
  },
  {
    platform: "Duck Creek",
    lead: "Practice Lead — Duck Creek",
    email: "duckcreek@valuemomentum.com",
    teamSize: "25+",
    certifications: 8,
    maturity: 3,
    capabilities: ["Policy", "Billing", "Claims", "SaaS OnDemand", "Data Migration"],
    accent: "#FABD00",
    highlight: "Strong SaaS and MGA delivery track record",
  },
  {
    platform: "OneShield",
    lead: "Practice Lead — OneShield",
    email: "oneshield@valuemomentum.com",
    teamSize: "20+",
    certifications: 5,
    maturity: 3.5,
    capabilities: ["Enterprise", "Market Solutions", "MGA", "Specialty Lines"],
    accent: "#8b5cf6",
    highlight: "Deep specialty P&C and MGA market expertise",
  },
  {
    platform: "CCM",
    lead: "Practice Lead — CCM",
    email: "ccm@valuemomentum.com",
    teamSize: "20+",
    certifications: 4,
    maturity: 3.5,
    capabilities: ["Quadient", "Smart Communications", "Digital Delivery", "Compliance"],
    accent: "#f97316",
    highlight: "Customer communications across print, digital, and omnichannel",
  },
];

const capabilityAreas = [
  { area: "Implementation & Upgrades", strength: "Expert", count: "50+ engagements" },
  { area: "Cloud Migration", strength: "Advanced", count: "15+ migrations" },
  { area: "AI & Automation", strength: "Growing", count: "6 active POCs" },
  { area: "Testing & QA", strength: "Expert", count: "Dedicated CoE" },
  { area: "Data Migration & Integration", strength: "Advanced", count: "30+ projects" },
  { area: "Training & Enablement", strength: "Advanced", count: "Certified trainers" },
];

const strengthColors = {
  Expert: { color: "#3FD534", bg: "#3FD53410", border: "#3FD53440" },
  Advanced: { color: "#056BFC", bg: "#056BFC10", border: "#056BFC40" },
  Growing: { color: "#FABD00", bg: "#FABD0010", border: "#FABD0040" },
};

const MaturityDots = ({ score }) => {
  const full = Math.floor(score);
  const half = score % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-2.5 w-2.5 rounded-full border"
          style={{
            backgroundColor: i <= full ? "#056BFC" : i === full + 1 && half ? "#056BFC80" : "transparent",
            borderColor: i <= full || (i === full + 1 && half) ? "#056BFC" : "#e2e8f0",
          }}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{score}/5</span>
    </div>
  );
};

export default function Team() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8 shadow-[0_30px_90px_rgba(5,107,252,0.12)] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#033B8C]"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#056BFC]/25 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#3FD534]/15 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <div className="space-y-5">
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <Users className="w-4 h-4 mr-2" /> Team & Capability
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              The Experts Behind Core TSC
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              A team of 120+ certified specialists across Guidewire, Earnix, Duck Creek, OneShield, and CCM — driving insurance transformation for clients globally.
            </p>
            <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
              <Mail className="w-4 h-4 mr-2" /> Get in Touch
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {teamStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                  <Icon className="w-5 h-5 mb-2" style={{ color: s.color === "#303030" ? "#fff" : s.color }} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Competency Teams */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">Competency Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {competencyTeams.map((team, i) => (
            <motion.div
              key={team.platform}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: i * 0.09 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-t-4" style={{ borderTopColor: team.accent }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{team.platform}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{team.lead}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">{team.teamSize}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{team.highlight}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Maturity */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Maturity Score</p>
                    <MaturityDots score={team.maturity} />
                  </div>
                  {/* Capabilities */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Key Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {team.capabilities.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3FD534]" />
                      {team.certifications} certifications
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-xs" style={{ color: team.accent }}>
                      <Mail className="w-3 h-3 mr-1" /> Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capability Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Capability Areas</h2>
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {capabilityAreas.map((cap, i) => {
                const style = strengthColors[cap.strength];
                return (
                  <div key={cap.area} className={`p-4 flex items-center justify-between gap-3 ${i !== capabilityAreas.length - 1 ? "border-b border-border/40" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-[#056BFC]/10 rounded-md shrink-0">
                        <ArrowRight className="w-3 h-3 text-[#056BFC]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{cap.area}</p>
                        <p className="text-xs text-muted-foreground">{cap.count}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0"
                      style={{ color: style.color, borderColor: style.border, backgroundColor: style.bg }}
                    >
                      {cap.strength}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Growth & Hiring */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Growth & Hiring</h2>
          <div className="space-y-4">
            <Card className="shadow-sm border-[#056BFC]/20 bg-gradient-to-br from-[#056BFC]/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#056BFC] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold">Actively Hiring</h3>
                    <p className="text-xs text-muted-foreground mt-1">We are growing our Earnix and AI practices. If you're a certified platform specialist or an AI enthusiast in insurance tech, we'd love to connect.</p>
                    <Button size="sm" className="mt-3 bg-[#056BFC] hover:bg-[#056BFC]/90 text-white text-xs">
                      View Open Roles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-[#3FD534]/20 bg-gradient-to-br from-[#3FD534]/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#3FD534] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold">Certification Programme</h3>
                    <p className="text-xs text-muted-foreground mt-1">Core TSC sponsors platform certifications for team members across all five competencies. Reach out to your competency lead for the current certification calendar.</p>
                    <Button size="sm" variant="outline" className="mt-3 border-[#3FD534] text-[#3FD534] hover:bg-[#3FD534]/10 text-xs">
                      Certification Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#FABD00] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold">Onboarding Resources</h3>
                    <p className="text-xs text-muted-foreground mt-1">New to Core TSC? Access onboarding decks, platform guides, accelerator walkthroughs, and team intros — all in one place.</p>
                    <Button size="sm" variant="outline" className="mt-3 text-xs">
                      Access Resources
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
