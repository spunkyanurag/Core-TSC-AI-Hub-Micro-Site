import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContentAccessDenied } from "@/components/content-access-denied";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, userCanViewContent } from "@/lib/content-access";
import {
  createGuidewireSolutionSlug,
  readGuidewireInnovationSolutions,
  writeGuidewireInnovationSolutions,
} from "@/lib/guidewire-innovation-storage";
import { userCanManageGuidewireInnovation } from "@/lib/guidewire-innovation-access";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Car,
  CheckCircle2,
  Droplets,
  Gauge,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";

const solutionIcons = {
  "autonomous-vehicles": Car,
  "flood-in-a-box": Droplets,
  "parametric-insurance": Gauge,
};

const defaultForm = {
  title: "",
  subtitle: "",
  summary: "",
  tags: "Guidewire",
  technologies: "Guidewire Cloud Platform",
  status: "Published",
  overviewTitle: "Solution Overview",
  marketContext: "",
  keyStatement: "",
  challenges: "",
  solutionPoints: "",
  benefits: "",
  architectureTitle: "Solution Architecture",
  architectureStatement: "",
  architectureNodes: "",
  processSteps: "",
  outcomes: "",
};

function toLines(items = []) {
  return items.join("\n");
}

function fromLines(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function fromCsv(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function nodesToText(nodes = []) {
  return nodes
    .map((node) => [node.label, node.detail, node.group].filter(Boolean).join(" | "))
    .join("\n");
}

function textToNodes(value) {
  return fromLines(value).map((line, index) => {
    const [label, detail, group] = line.split("|").map((part) => part.trim());

    return {
      id: createGuidewireSolutionSlug(label || `node-${index + 1}`),
      label: label || `Node ${index + 1}`,
      detail: detail || "Guidewire capability",
      group: group || "Guidewire",
    };
  });
}

function formFromSolution(solution) {
  const overview = solution?.views?.[0] || {};
  const architecture = solution?.views?.[1] || {};

  return {
    ...defaultForm,
    title: solution?.title || "",
    subtitle: solution?.subtitle || "",
    summary: solution?.summary || "",
    tags: (solution?.tags || []).join(", "),
    technologies: (solution?.technologies || []).join(", "),
    status: solution?.status || "Published",
    overviewTitle: overview.title || defaultForm.overviewTitle,
    marketContext: toLines(overview.marketContext),
    keyStatement: overview.keyStatement || "",
    challenges: toLines(overview.challenges),
    solutionPoints: toLines(overview.solutionPoints),
    benefits: toLines(overview.benefits),
    architectureTitle: architecture.title || defaultForm.architectureTitle,
    architectureStatement: architecture.keyStatement || "",
    architectureNodes: nodesToText(architecture.architectureNodes),
    processSteps: toLines(architecture.processSteps),
    outcomes: toLines(architecture.outcomes),
  };
}

function uniqueSlug(title, existingSolution, solutions) {
  const baseSlug = createGuidewireSolutionSlug(title) || "guidewire-solution";
  let candidate = existingSolution?.slug || baseSlug;
  let suffix = 2;

  while (
    solutions.some(
      (solution) => solution.slug === candidate && solution.id !== existingSolution?.id
    )
  ) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function buildSolutionFromForm(form, existingSolution, solutions) {
  const slug = uniqueSlug(form.title, existingSolution, solutions);
  const status = form.status === "Archived" ? "Archived" : "Published";
  const displayOrder =
    existingSolution?.displayOrder ||
    Math.max(0, ...solutions.map((solution) => solution.displayOrder || 0)) + 1;

  return {
    ...existingSolution,
    id: existingSolution?.id || `gw-${slug}`,
    slug,
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    category: "Guidewire",
    competency: "Guidewire",
    status,
    displayOrder,
    isPublished: status === "Published",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    tags: fromCsv(form.tags),
    summary: form.summary.trim(),
    technologies: fromCsv(form.technologies),
    views: [
      {
        id: existingSolution?.views?.[0]?.id || "solution-overview",
        label: existingSolution?.views?.[0]?.label || "Solution Overview",
        title: form.overviewTitle.trim(),
        marketContext: fromLines(form.marketContext),
        keyStatement: form.keyStatement.trim(),
        challenges: fromLines(form.challenges),
        solutionPoints: fromLines(form.solutionPoints),
        benefits: fromLines(form.benefits),
      },
      {
        id: existingSolution?.views?.[1]?.id || "solution-architecture",
        label: "Solution Architecture",
        title: form.architectureTitle.trim(),
        keyStatement: form.architectureStatement.trim(),
        architectureNodes: textToNodes(form.architectureNodes),
        processSteps: fromLines(form.processSteps),
        outcomes: fromLines(form.outcomes),
      },
    ],
  };
}

function SolutionEditor({ form, isOpen, isEditing, onChange, onClose, onSubmit }) {
  function update(field, value) {
    onChange({ ...form, [field]: value });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Guidewire Solution" : "Add Guidewire Solution"}</DialogTitle>
          <DialogDescription>
            Guidewire Innovation Lab content record.
          </DialogDescription>
        </DialogHeader>

        <form id="guidewire-solution-form" className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="solution-title">Solution title</Label>
              <Input
                id="solution-title"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution-status">Status</Label>
              <select
                id="solution-status"
                value={form.status}
                onChange={(event) => update("status", event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution-subtitle">Subtitle</Label>
              <Input
                id="solution-subtitle"
                value={form.subtitle}
                onChange={(event) => update("subtitle", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution-tags">Tags, comma separated</Label>
              <Input
                id="solution-tags"
                value={form.tags}
                onChange={(event) => update("tags", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution-summary">Short summary</Label>
            <Textarea
              id="solution-summary"
              value={form.summary}
              onChange={(event) => update("summary", event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution-technologies">Related Guidewire technologies, comma separated</Label>
            <Input
              id="solution-technologies"
              value={form.technologies}
              onChange={(event) => update("technologies", event.target.value)}
            />
          </div>

          <div className="rounded-lg border bg-muted/25 p-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#056BFC]">
              View 1
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="overview-title">View title</Label>
                <Input
                  id="overview-title"
                  value={form.overviewTitle}
                  onChange={(event) => update("overviewTitle", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="market-context">Market context, one per line</Label>
                <Textarea
                  id="market-context"
                  value={form.marketContext}
                  onChange={(event) => update("marketContext", event.target.value)}
                  className="min-h-28"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="key-statement">Primary message</Label>
              <Textarea
                id="key-statement"
                value={form.keyStatement}
                onChange={(event) => update("keyStatement", event.target.value)}
                required
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges, one per line</Label>
                <Textarea
                  id="challenges"
                  value={form.challenges}
                  onChange={(event) => update("challenges", event.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution-points">Solution, one per line</Label>
                <Textarea
                  id="solution-points"
                  value={form.solutionPoints}
                  onChange={(event) => update("solutionPoints", event.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits, one per line</Label>
                <Textarea
                  id="benefits"
                  value={form.benefits}
                  onChange={(event) => update("benefits", event.target.value)}
                  className="min-h-32"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/25 p-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#056BFC]">
              View 2
            </h3>
            <div className="space-y-2">
              <Label htmlFor="architecture-title">Architecture title</Label>
              <Input
                id="architecture-title"
                value={form.architectureTitle}
                onChange={(event) => update("architectureTitle", event.target.value)}
                required
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="architecture-statement">Architecture statement</Label>
              <Textarea
                id="architecture-statement"
                value={form.architectureStatement}
                onChange={(event) => update("architectureStatement", event.target.value)}
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="architecture-nodes">Architecture nodes: label | detail | group</Label>
                <Textarea
                  id="architecture-nodes"
                  value={form.architectureNodes}
                  onChange={(event) => update("architectureNodes", event.target.value)}
                  className="min-h-36"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-steps">Process steps, one per line</Label>
                <Textarea
                  id="process-steps"
                  value={form.processSteps}
                  onChange={(event) => update("processSteps", event.target.value)}
                  className="min-h-36"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcomes">Key outcomes, one per line</Label>
                <Textarea
                  id="outcomes"
                  value={form.outcomes}
                  onChange={(event) => update("outcomes", event.target.value)}
                  className="min-h-36"
                />
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button form="guidewire-solution-form" type="submit" className="bg-[#056BFC] text-white hover:bg-[#056BFC]/90">
            {isEditing ? "Save Changes" : "Add Solution"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SolutionCard({ solution, canManage, onArchiveToggle, onDelete, onEdit }) {
  const Icon = solutionIcons[solution.slug] || Layers;

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-[#056BFC]/20 shadow-sm transition-all hover:-translate-y-1 hover:border-[#056BFC]/45 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#056BFC]/10 text-[#056BFC]">
            <Icon className="h-7 w-7" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="border-[#056BFC]/20 bg-[#056BFC]/5 text-[#055FE0]">
              {solution.views.length} detailed views
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
          </div>
        </div>
        <CardTitle className="text-xl leading-tight">{solution.title}</CardTitle>
        <CardDescription className="text-sm leading-6">
          {solution.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-5">
        <div className="flex flex-wrap gap-2">
          {solution.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 rounded-lg border bg-muted/25 p-3">
          {solution.views.map((view) => (
            <div key={view.id} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#18772A]" />
              {view.label}
            </div>
          ))}
        </div>

        <Button asChild className="w-full bg-[#056BFC] text-white hover:bg-[#056BFC]/90">
          <Link href={`/innovation/guidewire/${solution.slug}`}>
            View Solution
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        {canManage && (
          <div className="grid gap-2 sm:grid-cols-3">
            <Button type="button" variant="outline" onClick={() => onEdit(solution)}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button type="button" variant="outline" onClick={() => onArchiveToggle(solution)}>
              {solution.isPublished ? <Archive className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
              {solution.isPublished ? "Archive" : "Publish"}
            </Button>
            <Button type="button" variant="outline" className="text-destructive hover:text-destructive" onClick={() => onDelete(solution)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function GuidewireInnovation() {
  const { user } = useAuth();
  const [solutions, setSolutions] = useState(() => readGuidewireInnovationSolutions());
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const canManage = userCanManageGuidewireInnovation(user);

  const canViewGuidewire = userCanViewContent(user, CONTENT_ACCESS_ROLE.GUIDEWIRE);

  const visibleSolutions = useMemo(
    () =>
      filterContentForUser(
        solutions.filter((solution) => solution.isPublished || canManage),
        user
      ),
    [canManage, solutions, user]
  );

  const availableTags = useMemo(
    () => Array.from(new Set(visibleSolutions.flatMap((solution) => solution.tags))).sort(),
    [visibleSolutions]
  );

  const filteredSolutions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return visibleSolutions.filter((solution) => {
      const matchesSearch =
        !normalizedQuery ||
        [
          solution.title,
          solution.subtitle,
          solution.summary,
          solution.tags.join(" "),
          solution.technologies.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesTag = tagFilter === "all" || solution.tags.includes(tagFilter);

      return matchesSearch && matchesTag;
    });
  }, [query, tagFilter, visibleSolutions]);

  function persist(nextSolutions) {
    setSolutions(writeGuidewireInnovationSolutions(nextSolutions));
  }

  function openCreate() {
    setEditingSolution(null);
    setForm(defaultForm);
    setEditorOpen(true);
  }

  function openEdit(solution) {
    setEditingSolution(solution);
    setForm(formFromSolution(solution));
    setEditorOpen(true);
  }

  function closeEditor() {
    setEditorOpen(false);
    setEditingSolution(null);
    setForm(defaultForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!canManage) {
      return;
    }

    const nextSolution = buildSolutionFromForm(form, editingSolution, solutions);
    const nextSolutions = editingSolution
      ? solutions.map((solution) =>
          solution.id === editingSolution.id ? nextSolution : solution
        )
      : [...solutions, nextSolution];

    persist(nextSolutions);
    closeEditor();
  }

  function handleArchiveToggle(solution) {
    if (!canManage) {
      return;
    }

    const status = solution.isPublished ? "Archived" : "Published";
    persist(
      solutions.map((item) =>
        item.id === solution.id
          ? { ...item, status, isPublished: status === "Published" }
          : item
      )
    );
  }

  function handleDelete(solution) {
    if (!canManage) {
      return;
    }

    if (window.confirm(`Delete ${solution.title}?`)) {
      persist(solutions.filter((item) => item.id !== solution.id));
    }
  }

  if (!canViewGuidewire) {
    return <ContentAccessDenied contentAccessRole={CONTENT_ACCESS_ROLE.GUIDEWIRE} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/innovation" className="hover:text-[#056BFC]">Innovation Lab</Link>
        <span>/</span>
        <span className="font-medium text-foreground">Guidewire</span>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#056BFC]/20 bg-gradient-to-br from-[#056BFC]/12 via-white to-[#3FD534]/10 p-5 shadow-sm dark:via-card sm:p-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/innovation">
            <ArrowLeft className="h-4 w-4" />
            Back to Innovation Lab
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <Badge variant="outline" className="mb-3 border-[#056BFC]/25 bg-white text-[#055FE0] dark:bg-card">
              Category: Guidewire
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-[#303030] dark:text-white sm:text-4xl">
              Guidewire Innovation Solutions
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              Insurance-focused innovation solutions built around Guidewire
              capabilities, combining Guidewire Cloud, Jutro, PolicyCenter,
              ClaimCenter, Integration Gateway, APD, Autopilot, external data,
              analytics, and AI-assisted workflows.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-card">
            <p className="text-3xl font-bold text-[#056BFC]">
              {visibleSolutions.filter((solution) => solution.isPublished).length}
            </p>
            <p className="text-sm text-muted-foreground">published Guidewire solutions</p>
            {canManage && (
              <Button type="button" className="mt-4 w-full bg-[#056BFC] text-white hover:bg-[#056BFC]/90" onClick={openCreate}>
                <Plus className="h-4 w-4" />
                Add Solution
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_260px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Guidewire solutions, technologies, or tags..."
              className="h-11 pl-10"
            />
          </div>
          <select
            value={tagFilter}
            onChange={(event) => setTagFilter(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {filteredSolutions.map((solution) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            canManage={canManage}
            onArchiveToggle={handleArchiveToggle}
            onDelete={handleDelete}
            onEdit={openEdit}
          />
        ))}
      </section>

      {!filteredSolutions.length && (
        <Card className="border-border/50">
          <CardContent className="p-8 text-center text-muted-foreground">
            No Guidewire solutions match the current search or filter.
          </CardContent>
        </Card>
      )}

      <SolutionEditor
        form={form}
        isOpen={editorOpen}
        isEditing={Boolean(editingSolution)}
        onChange={setForm}
        onClose={closeEditor}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
