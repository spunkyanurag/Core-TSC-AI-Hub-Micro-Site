import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { innovations } from "@/mock-data";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser } from "@/lib/content-access";
import { Lightbulb, ArrowRight, Beaker, Rocket, ArrowUpRight } from "lucide-react";

const focusAreas = [
  { title: "Generative AI", desc: "LLMs for underwriting and claims", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "Predictive Analytics", desc: "ML models for risk assessment", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "IoT & Telematics", desc: "Real-time data streaming", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { title: "Cloud Native Architecture", desc: "Serverless and microservices", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export default function Innovation() {
  const { user } = useAuth();
  const visibleInnovations = filterContentForUser(innovations, user);
  const visibleFocusAreas = filterContentForUser(focusAreas, user);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Innovation Lab</h1>
          <p className="text-muted-foreground mt-2">Next-generation R&D initiatives and emerging technology experiments.</p>
        </div>
        <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
          <Lightbulb className="w-4 h-4 mr-2" /> Submit Idea
        </Button>
      </div>

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
