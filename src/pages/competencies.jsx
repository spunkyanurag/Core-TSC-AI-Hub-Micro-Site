import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { competencies, platformCoverage } from "@/mock-data";
import { useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import { ChevronRight, Settings, Layers, Workflow, ShieldCheck, Box, Sparkles, Target } from "lucide-react";

export default function Competencies() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const visibleCompetencies = filterContentForUser(competencies, user);
  const visiblePlatformCoverage = filterContentForUser(platformCoverage, user);

  const handleCompetencyClick = (comp) => {
    if (comp.id === "earnix") {
      setLocation("/earnix-resources");
    }
  };

  const cardGraphics = {
    guidewire: { bg: "from-[#2563eb] via-[#1d4ed8] to-[#0f172a]", logo: "/assets/guidewire.svg", label: "Guidewire" },
    earnix: { bg: "from-[#0ea5e9] via-[#2563eb] to-[#0f172a]", logo: "/assets/earnix.svg", label: "Earnix" },
    "duck-creek": { bg: "from-[#a855f7] via-[#7c3aed] to-[#0f172a]", logo: "/assets/duck-creek.svg", label: "Duck Creek" },
    oneshield: { bg: "from-[#f59e0b] via-[#ea580c] to-[#0f172a]", logo: "/assets/oneshield.svg", label: "OneShield" },
    ccm: { bg: "from-[#14b8a6] via-[#0d9488] to-[#0f172a]", logo: "/assets/ccm.svg", label: "CCM" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competency Center</h1>
        <p className="text-muted-foreground mt-2">Deep expertise across core insurance platforms and technologies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCompetencies.map((comp, i) => {
          const coverage = visiblePlatformCoverage.find(p => p.platform === comp.name)?.coverage || 0;
          const compGraphic = cardGraphics[comp.id] || { bg: "from-slate-500 via-slate-600 to-slate-900", icon: Layers, label: comp.name };
          const Icon = compGraphic.icon;
          
          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08, type: "spring", stiffness: 140 }}
              whileHover={comp.id === "earnix" ? { y: -8, scale: 1.02 } : { y: -4, scale: 1.01 }}
              whileTap={comp.id === "earnix" ? { scale: 0.98 } : { scale: 0.985 }}
            >
              <Card
                className={`h-full overflow-hidden hover-elevate border-border/50 transition-all ${comp.id === "earnix" ? "cursor-pointer border-[#056BFC]/20 shadow-sm hover:border-[#056BFC]/40 hover:bg-[#eff6ff] hover:shadow-lg" : "bg-background hover:bg-[#f8fafc]"}`}
                onClick={() => handleCompetencyClick(comp)}
              >
                <div className={`h-24 ${compGraphic.bg} bg-gradient-to-br`} />
                <CardHeader className="-mt-8 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl shadow-sm border border-white/10">
                      {compGraphic.logo ? (
                        <img src={compGraphic.logo} alt={`${compGraphic.label} logo`} className="h-8 w-8 object-contain" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <Badge variant="outline" className="bg-background">Active</Badge>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white bg-white/10 border border-white/15 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-inner" />
                    {compGraphic.label}
                  </div>
                  <CardTitle className="text-xl">{comp.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{comp.overview}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Maturity Score</span>
                        <span className="font-medium text-[#056BFC]">{coverage}%</span>
                      </div>
                      <Progress value={coverage} className="h-1.5 bg-gray-200" indicatorClassName="bg-[#056BFC]" />
                    </div>
                    <div className="pt-2 border-t border-border">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {comp.expertise.split(', ').map(skill => (
                          <Badge key={skill} variant="secondary" className="font-normal text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {visibleCompetencies.length === 0 && (
          <Card className="col-span-full border-border/50">
            <CardContent className="p-8 text-center text-muted-foreground">
              No competency-specific content is available for your account.
            </CardContent>
          </Card>
        )}
      </div>

      {visibleCompetencies.length > 0 && (
        <Card className="mt-8 border-border/50">
          <CardHeader>
            <CardTitle>Capability Matrix</CardTitle>
            <CardDescription>Detailed breakdown of service offerings by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={visibleCompetencies[0].id} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden border-b rounded-none bg-transparent p-0 h-auto">
                {visibleCompetencies.map(comp => (
                  <TabsTrigger
                    key={comp.id}
                    value={comp.id}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#056BFC] data-[state=active]:text-[#056BFC] data-[state=active]:bg-transparent px-4 py-3"
                  >
                    {comp.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {visibleCompetencies.map(comp => (
                <TabsContent key={comp.id} value={comp.id} className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4 p-4 rounded-lg bg-[#F8F8FB] dark:bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-[#056BFC] font-medium">
                        <Settings className="w-4 h-4" /> Implementation
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Core Systems Rollout</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Upgrades & Migrations</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Cloud Transitions</li>
                      </ul>
                    </div>
                    <div className="space-y-4 p-4 rounded-lg bg-[#F8F8FB] dark:bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-[#056BFC] font-medium">
                        <Workflow className="w-4 h-4" /> Integration
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Third-party APIs</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Enterprise Service Bus</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Legacy System Bridging</li>
                      </ul>
                    </div>
                    <div className="space-y-4 p-4 rounded-lg bg-[#F8F8FB] dark:bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-[#056BFC] font-medium">
                        <ShieldCheck className="w-4 h-4" /> Managed Services
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> L2/L3 Support</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Performance Tuning</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Release Management</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
