import { guidewireInnovationSolutions } from "@/mock-data/guidewire-innovation";
import { CONTENT_ACCESS_ROLE } from "@/lib/content-access";

const STORAGE_KEY = "tsc-hub.guidewire-innovation.solutions";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sortSolutions(solutions) {
  return [...solutions].sort(
    (first, second) =>
      (first.displayOrder || 0) - (second.displayOrder || 0) ||
      first.title.localeCompare(second.title)
  );
}

function normalizeSolution(solution, index) {
  const status = solution.status || (solution.isPublished ? "Published" : "Archived");

  return {
    ...solution,
    id: solution.id || `gw-${solution.slug || index + 1}`,
    category: "Guidewire",
    competency: "Guidewire",
    status,
    isPublished: status === "Published",
    contentAccessRole: CONTENT_ACCESS_ROLE.GUIDEWIRE,
    displayOrder: solution.displayOrder || index + 1,
    tags: Array.isArray(solution.tags) ? solution.tags : [],
    technologies: Array.isArray(solution.technologies) ? solution.technologies : [],
    views: Array.isArray(solution.views) ? solution.views : [],
  };
}

function seedSolutions() {
  return sortSolutions(guidewireInnovationSolutions.map(normalizeSolution)).map(clone);
}

export function readGuidewireInnovationSolutions() {
  if (!canUseStorage()) {
    return seedSolutions();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    const seeded = seedSolutions();
    writeGuidewireInnovationSolutions(seeded);
    return seeded;
  }

  try {
    return sortSolutions(JSON.parse(stored).map(normalizeSolution)).map(clone);
  } catch {
    const seeded = seedSolutions();
    writeGuidewireInnovationSolutions(seeded);
    return seeded;
  }
}

export function writeGuidewireInnovationSolutions(solutions) {
  const normalized = sortSolutions(solutions.map(normalizeSolution)).map(clone);

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export function getGuidewireInnovationSolutionBySlug(slug) {
  return readGuidewireInnovationSolutions().find((solution) => solution.slug === slug);
}

export function createGuidewireSolutionSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
