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
  ChevronRight,
  Eye,
  FileText,
  Gauge,
  Layers,
  LineChart,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
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

const categoryAccents = {
  "pc-insurance-platforms": {
    ring: "border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]",
    gradient: "from-[#056BFC] via-[#1557B7] to-[#0F172A]",
  },
  "ccm-platforms": {
    ring: "border-[#3FD534]/25 bg-[#3FD534]/10 text-[#18772A]",
    gradient: "from-[#14B8A6] via-[#0F766E] to-[#0F172A]",
  },
  "rating-and-pricing": {
    ring: "border-[#FABD00]/35 bg-[#FABD00]/12 text-[#9A6500]",
    gradient: "from-[#FABD00] via-[#D97706] to-[#0F172A]",
  },
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

function CategoryCard({ category, totalPlatforms, visiblePlatforms }) {
  const Icon = getIcon(category.icon);
  const accent = categoryAccents[category.categorySlug] || categoryAccents["pc-insurance-platforms"];

  return (
    <Card className="h-full rounded-lg border-border/60 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${accent.ring}`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="outline" className={accent.ring}>
            {totalPlatforms} platforms
          </Badge>
        </div>
        <CardTitle className="text-xl">{category.categoryName}</CardTitle>
        <CardDescription className="leading-6">{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {visiblePlatforms.length ? (
            visiblePlatforms.map((platform) => (
              <Badge key={platform.platformId} variant="secondary" className="font-normal">
                {platform.platformName}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No platform content available for your account.
            </span>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="w-full justify-between">
          <Link href={`/competency-center/${category.categorySlug}`}>
            Explore Platforms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
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
                Explore Platform
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

  const visibleCategoryCards = competencyCategories.map((category) => {
    const categoryPlatforms = competencyPlatforms.filter(
      (platform) => platform.categoryId === category.categoryId
    );
    const accessiblePlatforms = visiblePlatforms.filter(
      (platform) => platform.categoryId === category.categoryId
    );

    return {
      category,
      totalPlatforms: categoryPlatforms.length,
      visiblePlatforms: accessiblePlatforms,
    };
  });

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

      {!platformSlug && (
        <section className="grid gap-5 md:grid-cols-3">
          {visibleCategoryCards.map((item) => (
            <CategoryCard key={item.category.categoryId} {...item} />
          ))}
        </section>
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
