import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  assets,
  competencyCategories,
  competencyPlatforms,
  innovations,
  platformCoverage,
  pocs,
  successStories,
} from "@/mock-data";
import { useAuth } from "@/auth";
import { filterContentForUser, userCanManageContentRole } from "@/lib/content-access";
import {
  ArrowRight,
  Box,
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  CloudCog,
  Eye,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  LineChart,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";

const iconMap = {
  ShieldCheck,
  Workflow,
  Layers,
  MessagesSquare: MessageSquare,
  MessageSquare,
  FileText,
  FileSignature: FileText,
  LineChart,
  Gauge,
};

const platformGraphics = {
  guidewire: { logo: "/assets/guidewire.svg", gradient: "from-[#2563eb] via-[#1d4ed8] to-[#0f172a]" },
  "duck-creek": { logo: "/assets/duck-creek.svg", gradient: "from-[#a855f7] via-[#7c3aed] to-[#0f172a]" },
  oneshield: { logo: "/assets/oneshield.svg", gradient: "from-[#f59e0b] via-[#ea580c] to-[#0f172a]" },
  earnix: { logo: "/assets/earnix.svg", gradient: "from-[#0ea5e9] via-[#2563eb] to-[#0f172a]" },
  smartcomm: { gradient: "from-[#14b8a6] via-[#0f766e] to-[#0f172a]" },
  opentext: { gradient: "from-[#ef4444] via-[#b91c1c] to-[#0f172a]" },
  ghostdraft: { gradient: "from-[#64748b] via-[#475569] to-[#0f172a]" },
  hyperexponential: { gradient: "from-[#22c55e] via-[#15803d] to-[#0f172a]" },
};

const contentCollections = [
  { label: "Assets", items: assets },
  { label: "POCs", items: pocs },
  { label: "Stories", items: successStories },
  { label: "Innovations", items: innovations },
];

const guidewireDetail = {
  metrics: [
    { label: "Guidewire CoP", value: "650+", color: "#056BFC", icon: Users },
    { label: "Pursuits in Pipeline", value: "10+", color: "#3FD534", icon: Target },
    { label: "GW Certifications", value: "340+", color: "#FABD00", icon: Trophy },
    { label: "New GW Enrollments", value: "150+", color: "#056BFC", icon: GraduationCap },
    { label: "Renewals", value: "300+", color: "#3FD534", icon: BookOpenCheck },
  ],
  teamHighlights: [
    "2 Guidewire offerings in progress",
    "5+ AI PoVs/demos delivered to clients",
    "AI-DLC, use cases, and adoption in accounts",
    "Devs and analysts enablement program ongoing",
    "GW drives: 4+ completed so far, with more to come",
    "Supporting UK and Canada leaders for GTM",
  ],
  events: [
    {
      title: "DevSummit",
      detail: "Successfully completed in May 2026",
      tone: "green",
    },
    {
      title: "GW Connections",
      detail: "October 2026 conference preparation",
      tone: "blue",
    },
  ],
  roadmap: [
    {
      title: "GW AI Agents",
      detail: "Subsequent skill releases will bring more Guidewire AI agents.",
    },
    {
      title: "Two new competency enablements",
      detail: "Pricing Center and Underwriting Center enablement tracks.",
    },
    {
      title: "P&C focus certifications",
      detail: "Professional Cloud Integration, APD and Auto Pilot Workflow, and domain certifications.",
    },
  ],
  offerings: [
    {
      id: "sbt-upgrade",
      label: "Offering 1",
      title: "Guidewire SBT Upgrade",
      icon: Rocket,
      summary:
        "VM offering augments Guidewire's US Bureau content with carrier-specific models, regulatory overlays, and guided triage to deliver ready-to-deploy product solutions. VM intends to further accelerate SBT implementations with proven migration assets, regression suites, DevOps pipelines, and reference architectures for predictable, scalable delivery.",
      columns: [
        {
          title: "Key Drivers",
          color: "#056BFC",
          items: [
            "Growing customer demand for predictable, compliant bureau content updates",
            "Clear scope left by Guidewire for carrier-specific productization, regional variants, and ecosystem changes",
            "Need for industrialized, repeatable implementation approaches around SBTs",
          ],
        },
        {
          title: "Value Proposition",
          color: "#FABD00",
          items: [
            "ValueMomentum extends Guidewire's SBT foundation with specialization and execution rigor Guidewire relies on partners to provide",
            "Structured triage, tailored productization, deviation support, and implementation accelerators help carriers adopt SBTs faster, consistently, and with reduced upgrade risk",
          ],
        },
        {
          title: "Collaterals (Plug-n-Play)",
          color: "#22B922",
          items: [
            "Bureau Deviation Decision Framework",
            "Standard Based Templates - An Overview",
            "Proposal Template (Packaged)",
            "3P Estimates Draft",
            "Guidewire Documentation refreshed time-to-time",
          ],
        },
      ],
    },
    {
      id: "cloud-upgrade",
      label: "Offering 2",
      title: "Guidewire Cloud Upgrade",
      icon: CloudCog,
      summary:
        "A comprehensive AI-powered Guidewire Cloud Upgrade offering covering readiness, pre-cloud remediation, technical upgrade, development, stabilization, cutover, and post-go-live support. Delivered through AI-enabled accelerators, structured test frameworks, and GW-aligned methodologies to ensure seamless transition with minimal business disruption.",
      columns: [
        {
          title: "Key Drivers",
          color: "#056BFC",
          items: [
            "Accelerate modernization and reduce technical debt",
            "Improve operational agility and speed-to-market, enabling faster product launches, frequent skill-release adoption, and streamlined business workflows",
            "Enhance reliability, performance, and integration flexibility",
          ],
        },
        {
          title: "Value Proposition",
          color: "#FABD00",
          items: [
            "End-to-end Guidewire Cloud upgrade leadership",
            "Reduced upgrade risk and higher efficiency",
            "Future-ready foundation",
          ],
        },
        {
          title: "Collaterals (Plug-n-Play)",
          color: "#22B922",
          items: [
            "Remediation reports with deprecated packages, APIs, structured logging, DBCC, and more",
            "E2E QA strategy, reusable test scenarios, and test cases",
            "CDA Accelerator, Forms Testing Accelerator, Branching and DevOps Playbook",
            "AI Powered GWCP Proposal Template (Packaged)",
          ],
        },
      ],
    },
  ],
};

function platformRoute(platform) {
  return `/competency-center/${platform.categorySlug}/${platform.platformSlug}`;
}

function getIcon(iconName) {
  return iconMap[iconName] || Layers;
}

function getPlatformCounts(platform) {
  return contentCollections.map((collection) => ({
    label: collection.label,
    value: collection.items.filter(
      (item) => item.contentAccessRole === platform.contentAccessRole
    ).length,
  }));
}

function getCoverage(platform) {
  return (
    platformCoverage.find((item) => item.platform === platform.platformName)
      ?.coverage || 0
  );
}

function filterPlatforms(platforms, search) {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return platforms;
  }

  return platforms.filter((platform) =>
    [
      platform.platformName,
      platform.categoryName,
      platform.description,
      platform.expertise,
      platform.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch)
  );
}

function GuidewireMetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <Card className="group h-full overflow-hidden rounded-lg border-border/70 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#056BFC]/35 hover:shadow-lg dark:bg-card">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition group-hover:scale-105"
          style={{ backgroundColor: metric.color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-none text-[#07306F] dark:text-white">{metric.value}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{metric.label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function GuidewireBulletList({ items = [], marker = "blue" }) {
  const markerColor = marker === "green" ? "#3FD534" : marker === "yellow" ? "#FABD00" : "#056BFC";

  return (
    <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: markerColor }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GuidewireOverviewSection() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {guidewireDetail.metrics.map((metric) => (
          <GuidewireMetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Card className="rounded-lg border-[#056BFC]/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <CardTitle>GW Team @ Core TSC</CardTitle>
                <CardDescription>Current competency activity and enablement focus.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GuidewireBulletList items={guidewireDetail.teamHighlights} />
          </CardContent>
        </Card>

        <Card className="rounded-lg border-[#3FD534]/25 bg-[#3FD534]/5 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3FD534]/15 text-[#18772A]">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <CardTitle>Palisades Readiness</CardTitle>
                <CardDescription>Practice certification strength.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-[#3FD534]/25 bg-white p-5 text-center shadow-sm dark:bg-card">
              <p className="text-4xl font-bold text-[#18772A]">&gt;90%</p>
              <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                of the Guidewire practice is Palisades certified.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-lg border-[#056BFC]/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <CardTitle>Guidewire Events</CardTitle>
                <CardDescription>FY 26-27 milestones.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {guidewireDetail.events.map((event) => (
              <div key={event.title} className="rounded-lg border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 ${event.tone === "green" ? "text-[#18772A]" : "text-[#056BFC]"}`} />
                  <div>
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{event.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg border-[#FABD00]/35 bg-[#FABD00]/5 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FABD00]/20 text-[#9A6500]">
                <Rocket className="h-5 w-5" />
              </span>
              <div>
                <CardTitle>2026 & Beyond</CardTitle>
                <CardDescription>In-store Guidewire enablement pipeline.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {guidewireDetail.roadmap.map((item) => (
              <div key={item.title} className="rounded-lg border bg-white p-4 shadow-sm dark:bg-card">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GuidewireOfferingCard({ column }) {
  return (
    <Card className="h-full rounded-lg border-border/70 shadow-sm transition hover:-translate-y-1 hover:border-[#056BFC]/30 hover:shadow-lg">
      <div className="rounded-t-lg px-4 py-2 text-center text-sm font-bold text-white" style={{ backgroundColor: column.color }}>
        {column.title}
      </div>
      <CardContent className="p-5">
        <GuidewireBulletList
          items={column.items}
          marker={column.color === "#22B922" ? "green" : column.color === "#FABD00" ? "yellow" : "blue"}
        />
      </CardContent>
    </Card>
  );
}

function GuidewireOfferingsSection() {
  const [activeOfferingId, setActiveOfferingId] = useState(guidewireDetail.offerings[0].id);
  const activeOffering =
    guidewireDetail.offerings.find((offering) => offering.id === activeOfferingId) ||
    guidewireDetail.offerings[0];
  const OfferingIcon = activeOffering.icon;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {guidewireDetail.offerings.map((offering) => {
          const TabIcon = offering.icon;

          return (
            <Button
              key={offering.id}
              type="button"
              variant={activeOfferingId === offering.id ? "default" : "outline"}
              className="gap-2"
              onClick={() => setActiveOfferingId(offering.id)}
            >
              <TabIcon className="h-4 w-4" />
              {offering.label}: {offering.title.replace("Guidewire ", "")}
            </Button>
          );
        })}
      </div>

      <Card className="overflow-hidden rounded-lg border-[#056BFC]/20 shadow-sm">
        <CardHeader className="border-b bg-gradient-to-r from-[#056BFC]/8 via-white to-[#3FD534]/8 dark:from-[#056BFC]/15 dark:via-card dark:to-[#3FD534]/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#056BFC] text-white shadow-sm">
                <OfferingIcon className="h-6 w-6" />
              </span>
              <div>
                <Badge variant="outline" className="border-[#056BFC]/25 bg-white text-[#055FE0] dark:bg-card">
                  {activeOffering.label}
                </Badge>
                <CardTitle className="mt-3 text-2xl">{activeOffering.title}</CardTitle>
              </div>
            </div>
            <Badge variant="outline" className="w-fit border-[#3FD534]/25 bg-[#3FD534]/10 text-[#18772A]">
              Guidewire role content
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-5">
          <div className="rounded-[1.25rem] border border-[#3FD534]/40 bg-gradient-to-r from-white via-[#F8FFFA] to-[#F6FAFF] p-5 shadow-sm dark:from-card dark:via-card dark:to-card">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#18772A]">Offering Summary</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeOffering.summary}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {activeOffering.columns.map((column) => (
              <GuidewireOfferingCard key={column.title} column={column} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GuidewirePlatformDetail({ platform }) {
  return (
    <section className="space-y-6" aria-labelledby="guidewire-detail-title">
      <div className="rounded-lg border border-[#056BFC]/20 bg-gradient-to-br from-[#056BFC] via-[#0751BD] to-[#07306F] p-6 text-white shadow-[0_24px_60px_rgba(5,107,252,0.22)]">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/15 text-white hover:bg-white/20">Competency Center</Badge>
              <Badge className="bg-[#3FD534]/90 text-[#07306F] hover:bg-[#3FD534]">{platform.categoryName}</Badge>
              <Badge className="bg-[#FABD00] text-[#07306F] hover:bg-[#FABD00]">{platform.platformName}</Badge>
            </div>
            <h2 id="guidewire-detail-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Guidewire Competency Overview
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/78 sm:text-base">
              A consolidated view of Guidewire CoP scale, pursuits, learning and development, FY 26-27 events,
              2026 enablement pipeline, and the two packaged offerings represented in the source material.
            </p>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/12 p-5 shadow-lg backdrop-blur-md">
            <img src="/assets/guidewire.svg" alt="Guidewire logo" className="h-12 w-12 rounded-md bg-white p-2" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#FABD00]">Access</p>
            <p className="mt-2 text-sm leading-6 text-white/78">
              All content in this section follows the existing Guidewire role visibility rules.
            </p>
          </div>
        </div>
      </div>

      <GuidewireOverviewSection />
      <GuidewireOfferingsSection />
    </section>
  );
}

function PlatformCard({ platform }) {
  const { user } = useAuth();
  const Icon = getIcon(platform.icon);
  const graphic = platformGraphics[platform.platformId] || platformGraphics.smartcomm;
  const coverage = getCoverage(platform);
  const canManage = userCanManageContentRole(user, platform.contentAccessRole);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden rounded-lg border-border/60 shadow-sm transition hover:-translate-y-1 hover:border-[#056BFC]/35 hover:shadow-lg">
        <div className={`h-24 bg-gradient-to-br ${graphic.gradient}`} />
        <CardHeader className="-mt-8 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/15 bg-white/10 shadow-sm backdrop-blur-xl">
              {graphic.logo ? (
                <img src={graphic.logo} alt={`${platform.platformName} logo`} className="h-9 w-9 object-contain" />
              ) : (
                <Icon className="h-7 w-7 text-white" />
              )}
            </div>
            <Badge variant="outline" className="bg-background">
              {platform.status}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {platform.categoryName}
            </Badge>
            {canManage && (
              <Badge variant="outline" className="border-[#3FD534]/25 bg-[#3FD534]/10 text-[#18772A]">
                Editable
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl">{platform.platformName}</CardTitle>
          <CardDescription className="line-clamp-3 leading-6">
            {platform.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Competency maturity</span>
              <span className="font-medium text-[#056BFC]">{coverage}%</span>
            </div>
            <Progress value={coverage} className="h-1.5 bg-gray-200" indicatorClassName="bg-[#056BFC]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {getPlatformCounts(platform).map((count) => (
              <div key={count.label} className="rounded-lg border border-border/70 bg-muted/25 px-3 py-2">
                <p className="text-lg font-semibold text-foreground">{count.value}</p>
                <p className="text-xs text-muted-foreground">{count.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="sm" className="flex-1">
              <Link href={platformRoute(platform)}>
                View Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {canManage && (
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`${platformRoute(platform)}?mode=manage`}>
                  <Settings className="h-4 w-4" />
                  Manage
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

function PlatformDetail({ platform }) {
  const { user } = useAuth();
  const Icon = getIcon(platform.icon);
  const counts = getPlatformCounts(platform);
  const coverage = getCoverage(platform);
  const canManage = userCanManageContentRole(user, platform.contentAccessRole);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-lg border-[#056BFC]/20 shadow-sm">
        <div className={`h-2 bg-gradient-to-r ${platformGraphics[platform.platformId]?.gradient || platformGraphics.smartcomm.gradient}`} />
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link href="/competency-center" className="hover:text-[#056BFC]">Competency Center</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/competency-center/${platform.categorySlug}`} className="hover:text-[#056BFC]">
                  {platform.categoryName}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">{platform.platformName}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#055FE0]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant="secondary" className="font-normal">{platform.categoryName}</Badge>
                  <CardTitle className="mt-2 text-2xl">{platform.platformName}</CardTitle>
                </div>
              </div>
              <CardDescription className="max-w-3xl text-base leading-7">
                {platform.description}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-background">{platform.status}</Badge>
              {canManage ? (
                <Badge variant="outline" className="border-[#3FD534]/25 bg-[#3FD534]/10 text-[#18772A]">
                  Admin access enabled
                </Badge>
              ) : (
                <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                  Read only
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 rounded-lg border border-border/70 bg-muted/20 p-5">
            <div>
              <p className="text-sm font-semibold text-foreground">Expertise</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {platform.expertise.split(", ").map((item) => (
                  <Badge key={item} variant="secondary" className="font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-muted-foreground">Competency maturity</span>
                <span className="font-medium text-[#056BFC]">{coverage}%</span>
              </div>
              <Progress value={coverage} className="h-1.5 bg-gray-200" indicatorClassName="bg-[#056BFC]" />
            </div>
            {canManage && (
              <div className="rounded-lg border border-[#3FD534]/25 bg-[#3FD534]/10 p-4 text-sm text-[#145A22]">
                Platform management controls are visible only to Super Admins and assigned Competency Admins.
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {counts.map((count) => (
              <div key={count.label} className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <Box className="h-4 w-4 text-[#056BFC]" />
                  <span className="text-sm font-medium">{count.label}</span>
                </div>
                <span className="text-lg font-semibold">{count.value}</span>
              </div>
            ))}
            {platform.resourceHref && (
              <Button asChild variant="outline">
                <Link href={platform.resourceHref}>
                  Open Resource Library
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {platform.platformId === "guidewire" && <GuidewirePlatformDetail platform={platform} />}
    </div>
  );
}

export default function Competencies({ categorySlug, platformSlug }) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(categorySlug || "all");

  const visiblePlatforms = useMemo(
    () => filterContentForUser(competencyPlatforms, user),
    [user]
  );

  const selectedCategoryFilter = categoryFilter;
  const searchedPlatforms = useMemo(
    () => filterPlatforms(visiblePlatforms, search),
    [search, visiblePlatforms]
  );

  const visiblePlatformGroups = competencyCategories
    .filter(
      (category) =>
        selectedCategoryFilter === "all" ||
        category.categorySlug === selectedCategoryFilter
    )
    .map((category) => ({
      category,
      platforms: searchedPlatforms.filter(
        (platform) => platform.categoryId === category.categoryId
      ),
    }));

  const selectedPlatform = visiblePlatforms.find(
    (platform) =>
      platform.categorySlug === categorySlug &&
      platform.platformSlug === platformSlug
  );

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-[#056BFC]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Competency Center</span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Competency Center</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Explore Core TSC expertise across P&C Insurance Platforms, CCM Platforms, and Rating & Pricing.
            </p>
          </div>
          <Badge variant="outline" className="w-fit border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]">
            {competencyCategories.length} categories / {competencyPlatforms.length} platforms
          </Badge>
        </div>
      </section>

      {platformSlug && selectedPlatform && <PlatformDetail platform={selectedPlatform} />}

      {platformSlug && !selectedPlatform && (
        <Card className="rounded-lg border-border/60">
          <CardContent className="flex items-start gap-4 p-6">
            <Eye className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">Platform not available</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This platform does not exist or is outside your assigned competency access.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1fr)_auto] lg:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search platforms, categories, or expertise..."
              className="h-11 pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={selectedCategoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
            >
              All Categories
            </Button>
            {competencyCategories.map((category) => (
              <Button
                key={category.categoryId}
                type="button"
                variant={selectedCategoryFilter === category.categorySlug ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category.categorySlug)}
              >
                {category.categoryName}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {visiblePlatformGroups.map(({ category, platforms }) => (
          <div key={category.categoryId} className="space-y-4">
            <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{category.categoryName}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Badge variant="secondary" className="w-fit">
                {platforms.length} available
              </Badge>
            </div>

            {platforms.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {platforms.map((platform) => (
                  <PlatformCard key={platform.platformId} platform={platform} />
                ))}
              </div>
            ) : (
              <Card className="rounded-lg border-dashed border-border/70">
                <CardContent className="p-6 text-sm text-muted-foreground">
                  No matching platform content is available for this category.
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
