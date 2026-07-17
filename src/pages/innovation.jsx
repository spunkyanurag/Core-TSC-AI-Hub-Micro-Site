import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PERMISSIONS, useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform, userCanViewContent } from "@/lib/content-access";
import { readGuidewireInnovationSolutions } from "@/lib/guidewire-innovation-storage";
import {
  ArrowRight,
  Car,
  Clock,
  Droplets,
  Gauge,
  Layers,
  Lightbulb,
  PlaySquare,
  Users,
  Video,
} from "lucide-react";

const featuredDemos = [
  { title: "Guidewire Cloud Transition", duration: "45 mins", type: "Technical Deep Dive", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { title: "Earnix Pricing Engine Integration", duration: "30 mins", type: "Architecture Review", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { title: "Automated Testing Framework", duration: "60 mins", type: "Hands-on Workshop", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

const solutionIcons = {
  "autonomous-vehicles": Car,
  "flood-in-a-box": Droplets,
  "parametric-insurance": Gauge,
};

function GuidewirePreviewCard({ solution }) {
  const Icon = solutionIcons[solution.slug] || Layers;

  return (
    <Card className="group h-full overflow-hidden border-[#056BFC]/20 shadow-sm transition-all hover:-translate-y-1 hover:border-[#056BFC]/45 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="border-[#056BFC]/20 bg-[#056BFC]/5 text-[#055FE0]">
            2 detailed views
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight">{solution.title}</CardTitle>
        <CardDescription className="text-sm leading-6">
          {solution.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {solution.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-auto justify-between">
          <Link href={`/innovation/guidewire/${solution.slug}`}>
            View Solution
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Innovation() {
  const { hasPermissions, user } = useAuth();
  const guidewireSolutions = readGuidewireInnovationSolutions();
  const visibleDemos = filterContentForUser(featuredDemos, user);
  const canViewGuidewire = userCanViewContent(user, CONTENT_ACCESS_ROLE.GUIDEWIRE);
  const visibleGuidewireSolutions = filterContentForUser(
    guidewireSolutions.filter((solution) => solution.isPublished),
    user
  );
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

      {canViewGuidewire && (
      <section className="overflow-hidden rounded-2xl border border-[#056BFC]/20 bg-gradient-to-br from-[#056BFC]/10 via-white to-[#3FD534]/10 p-5 shadow-sm dark:via-card sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_2fr] lg:items-end">
          <div>
            <Badge variant="outline" className="mb-3 border-[#056BFC]/25 bg-white text-[#055FE0] dark:bg-card">
              Innovation Lab / Guidewire
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#303030] dark:text-white sm:text-3xl">
              Guidewire Innovation Solutions
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Explore insurance-focused innovation solutions built around Guidewire
              capabilities for autonomous vehicle insurance, private flood insurance,
              and parametric crop insurance.
            </p>
            <Button asChild className="mt-5 bg-[#056BFC] text-white hover:bg-[#056BFC]/90">
              <Link href="/innovation/guidewire">
                Open Guidewire Section
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {visibleGuidewireSolutions.map((solution) => (
              <GuidewirePreviewCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Featured Demos</CardTitle>
              <CardDescription>Ready-to-present technical deep dives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleDemos.map((demo, i) => (
                <motion.div
                  key={demo.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-[#F8F8FB] dark:hover:bg-muted/30 sm:flex-row sm:items-center"
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold">{demo.title}</h3>
                    <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {demo.duration}</span>
                      <span className="flex items-center"><Video className="mr-1 h-3 w-3" /> {demo.type}</span>
                    </div>
                  </div>
                  {canManageContent && (
                    <Button variant="outline" className="shrink-0 border-[#056BFC]/20 text-[#056BFC] hover:bg-[#056BFC]/10">
                      <PlaySquare className="mr-2 h-4 w-4" /> Request
                    </Button>
                  )}
                </motion.div>
              ))}
              {visibleDemos.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No demos are available for your account.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-[#056BFC]/20 bg-[#056BFC]/5">
            <CardContent className="space-y-4 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#056BFC]/10 text-[#056BFC]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Need a custom demo?</h3>
              <p className="text-sm text-muted-foreground">
                Our architects can prepare a tailored presentation for your specific use case.
              </p>
              {canManageContent && (
                <Button variant="outline" className="w-full border-[#056BFC]/50 text-[#056BFC] hover:bg-[#056BFC]/10">
                  Contact Team
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
