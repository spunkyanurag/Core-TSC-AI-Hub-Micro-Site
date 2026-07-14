import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentAccessDenied } from "@/components/content-access-denied";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, userCanViewContent } from "@/lib/content-access";
import { getGuidewireInnovationSolutionBySlug } from "@/lib/guidewire-innovation-storage";
import { userCanManageGuidewireInnovation } from "@/lib/guidewire-innovation-access";
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Car,
  CheckCircle2,
  Database,
  Droplets,
  FileText,
  Gauge,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const solutionIcons = {
  "autonomous-vehicles": Car,
  "flood-in-a-box": Droplets,
  "parametric-insurance": Gauge,
};

const groupIcons = {
  Experience: Blocks,
  Core: ShieldCheck,
  Integration: Network,
  Configuration: FileText,
  Intelligence: Sparkles,
  Platform: Layers,
  Automation: Sparkles,
  Analytics: Gauge,
  External: Database,
  Claims: ShieldCheck,
};

function MissingSolution() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="w-full max-w-lg rounded-lg shadow-sm">
        <CardContent className="space-y-5 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#056BFC]/10 text-[#056BFC]">
            <Layers className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#303030] dark:text-white">
              Guidewire solution not found
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              The requested solution route does not match an available Guidewire Innovation Lab item.
            </p>
          </div>
          <Button asChild>
            <Link href="/innovation/guidewire">Back to Guidewire Innovation</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function BulletedCard({ title, items = [], tone = "blue" }) {
  const toneClass =
    tone === "green"
      ? "border-[#3FD534]/30 bg-[#3FD534]/8"
      : tone === "yellow"
      ? "border-[#FABD00]/35 bg-[#FABD00]/10"
      : "border-[#056BFC]/20 bg-[#056BFC]/5";

  return (
    <Card className={`h-full ${toneClass}`}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#18772A]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ArchitectureDiagram({ nodes = [] }) {
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-card sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#303030] dark:text-white">
            Architecture flow
          </h3>
          <p className="text-sm text-muted-foreground">
            Execution order and platform grouping.
          </p>
        </div>
        <Badge variant="outline" className="border-[#056BFC]/25 bg-[#056BFC]/5 text-[#055FE0]">
          Guidewire flow
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node, index) => {
          const Icon = groupIcons[node.group] || Layers;

          return (
            <div key={`${node.id}-${index}`} className="rounded-lg border bg-muted/20 p-4 transition-colors hover:border-[#056BFC]/35 hover:bg-[#056BFC]/5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#056BFC]/10 text-[#056BFC]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{node.group}</Badge>
                  {index < nodes.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-[#056BFC] sm:block" />
                  )}
                </div>
              </div>
              <h4 className="font-semibold text-[#303030] dark:text-white">{node.label}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{node.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProcessFlow({ steps = [] }) {
  if (!steps.length) {
    return null;
  }

  return (
    <Card className="border-[#056BFC]/20">
      <CardHeader>
        <CardTitle>Business Sequence</CardTitle>
        <CardDescription>Guidewire workflow steps.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 rounded-lg border bg-muted/20 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#056BFC] text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="text-sm leading-6 text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function OverviewView({ view }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.4fr]">
        <Card className="border-[#056BFC]/20 bg-[#056BFC]/5">
          <CardHeader>
            <CardTitle>Market Context</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {(view.marketContext || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#056BFC]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-xl border border-[#3FD534]/30 bg-white p-5 shadow-sm dark:bg-card">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18772A]">
            Primary Message
          </p>
          <p className="mt-3 text-lg font-semibold leading-8 text-[#303030] dark:text-white">
            {view.keyStatement}
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <BulletedCard title="Challenges" items={view.challenges} />
        <BulletedCard title="Solution" items={view.solutionPoints} tone="green" />
        <BulletedCard title="Benefits" items={view.benefits} tone="yellow" />
      </div>
    </div>
  );
}

function ArchitectureView({ view }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#3FD534]/30 bg-white p-5 shadow-sm dark:bg-card">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18772A]">
          Architecture Intent
        </p>
        <p className="mt-3 text-lg font-semibold leading-8 text-[#303030] dark:text-white">
          {view.keyStatement}
        </p>
      </div>

      <ArchitectureDiagram nodes={view.architectureNodes} />
      <ProcessFlow steps={view.processSteps} />

      {!!view.outcomes?.length && (
        <Card className="border-[#3FD534]/25">
          <CardHeader>
            <CardTitle>Key Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {view.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-lg border bg-[#3FD534]/8 p-4 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#18772A]" />
                  {outcome}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function GuidewireSolution({ slug }) {
  const { user } = useAuth();
  const [, params] = useRoute("/innovation/guidewire/:slug");
  const solutionSlug = slug || params?.slug;
  const solution = useMemo(
    () => getGuidewireInnovationSolutionBySlug(solutionSlug),
    [solutionSlug]
  );
  const [activeViewId, setActiveViewId] = useState(solution?.views?.[0]?.id);
  const canManage = userCanManageGuidewireInnovation(user);

  useEffect(() => {
    setActiveViewId(solution?.views?.[0]?.id);
  }, [solution?.id, solution?.views]);

  if (!solution) {
    return <MissingSolution />;
  }

  if (!userCanViewContent(user, solution) || (!solution.isPublished && !canManage)) {
    return <ContentAccessDenied contentAccessRole={CONTENT_ACCESS_ROLE.GUIDEWIRE} />;
  }

  const activeView =
    solution.views.find((view) => view.id === activeViewId) || solution.views[0];
  const SolutionIcon = solutionIcons[solution.slug] || Layers;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/innovation" className="hover:text-[#056BFC]">Innovation Lab</Link>
        <span>/</span>
        <Link href="/innovation/guidewire" className="hover:text-[#056BFC]">Guidewire</Link>
        <span>/</span>
        <span className="font-medium text-foreground">{solution.title}</span>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#056BFC]/20 bg-gradient-to-br from-[#056BFC]/12 via-white to-[#3FD534]/10 p-5 shadow-sm dark:via-card sm:p-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/innovation/guidewire">
            <ArrowLeft className="h-4 w-4" />
            Back to Guidewire
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-end">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#056BFC]/10 text-[#056BFC]">
            <SolutionIcon className="h-8 w-8" />
          </div>
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-[#056BFC]/25 bg-white text-[#055FE0] dark:bg-card">
                Guidewire
              </Badge>
              <Badge
                variant="outline"
                className={
                  solution.isPublished
                    ? "border-[#18772A]/25 bg-[#18772A]/10 text-[#18772A]"
                    : "border-[#FABD00]/35 bg-[#FABD00]/10 text-[#9A6B00]"
                }
              >
                {solution.status}
              </Badge>
              {canManage && (
                <Badge variant="outline" className="border-[#18772A]/25 bg-[#18772A]/10 text-[#18772A]">
                  Management access
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#303030] dark:text-white sm:text-4xl">
              {solution.title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
              {solution.summary}
            </p>
          </div>

          {canManage && (
            <Button asChild variant="outline">
              <Link href="/innovation/guidewire">
                Manage Content
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {solution.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-2 shadow-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          {solution.views.map((view) => {
            const isActive = view.id === activeView.id;

            return (
              <button
                key={view.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveViewId(view.id)}
                className={`rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#056BFC] ${
                  isActive
                    ? "bg-[#056BFC] text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {view.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#056BFC]">
            Selected View
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#303030] dark:text-white">
            {activeView.title}
          </h2>
        </div>

        {activeView.architectureNodes?.length ? (
          <ArchitectureView view={activeView} />
        ) : (
          <OverviewView view={activeView} />
        )}
      </section>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Related Guidewire Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {solution.technologies.map((technology) => (
              <Badge key={technology} variant="outline" className="bg-muted/40">
                {technology}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
