import { useState, useEffect } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  kpis,
  platformCoverage,
  chartData,
  activities,
  latestUpdates,
  tscAllStarAwards,
  tscAllStarAwardsMeta,
} from "@/mock-data";
import { COMPETENCY_ADMIN_ROLES, ROLES, useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  ArrowRight, ArrowUpRight, Award, ChevronLeft, ChevronRight, Pause, Play,
  Target, Box, FlaskConical, Cpu, Cable, Sparkles, Layers,
} from "lucide-react";

/* ── animated counter ───────────────────────────────────────── */
function Counter({ to, duration = 1400, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const n = parseFloat(to);
    if (isNaN(n)) return;
    let start = 0;
    const step = n / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= n) { setVal(n); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── animated progress bar ──────────────────────────────────── */
function AnimatedBar({ value, color = "#056BFC", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </div>
  );
}

/* ── stagger variants ───────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function AnalystRecognitionPanel({ update }) {
  const recognitions = update.recognitions || [];
  const recognitionBadges = ["Leader", "Star Performer", "Product Challenger", "Delivery Scale"];

  return (
    <div className="flex min-h-0 flex-col rounded-lg border border-[#B7D4FF] bg-white p-4 text-[#07306F] shadow-2xl sm:p-5">
      <motion.div
        className="flex min-h-0 flex-1 flex-col"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex justify-end border-l-2 border-[#056BFC] pl-4">
          <img src="/assets/logo-dark.png" alt="ValueMomentum" className="h-7 w-auto object-contain opacity-80" />
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#056BFC]">Industry Analysts</p>
            <p className="mt-1 text-lg font-bold leading-tight text-[#07306F]">P&C insurance leadership</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#3FD534]/15 text-[#168B17]">
            <Award className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 grid flex-1 content-start gap-2.5">
          {recognitions.slice(0, 3).map((recognition, index) => (
            <div key={recognition} className="flex min-h-[54px] items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: index === 1 ? "#3FD534" : index === 2 ? "#FABD00" : "#056BFC" }}
              />
              <p className="text-[11px] font-semibold leading-5 text-slate-700">{recognition}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
          {recognitionBadges.map((badge, index) => (
            <span
              key={badge}
              className="min-h-8 rounded-full px-3 py-2 text-center text-[9px] font-bold uppercase tracking-[0.08em] shadow-sm"
              style={{ backgroundColor: index === 1 ? "#3FD534" : index === 2 ? "#FABD00" : "#056BFC", color: index === 2 ? "#07306F" : "#fff" }}
            >
              {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function UpdateArtwork({ update }) {
  if (update.variant === "analyst-recognition") {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[43%] overflow-hidden md:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[#101f5a]/35 [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)]" />
      <motion.div
        className="absolute -right-12 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-white/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-14 rounded-full border border-white/10" />
      </motion.div>
      <motion.div
        className="absolute left-[35%] top-1/2 grid h-40 w-40 -translate-y-1/2 place-items-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
        animate={{ y: [-4, 5, -4], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid h-[118px] w-[118px] place-items-center rounded-[2rem] border border-white/10">
          <Sparkles className="h-14 w-14 text-white" strokeWidth={1.7} />
        </div>
      </motion.div>
      <motion.span
        className="absolute left-[31%] top-[24%] h-8 w-8 rounded-xl"
        style={{ backgroundColor: update.accent }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-[22%] right-[18%] h-12 w-12 rounded-full"
        style={{ backgroundColor: update.secondaryAccent }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function TscUpdates() {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const reduceMotion = useReducedMotion();
  const visibleUpdates = filterContentForUser(latestUpdates, user);
  const total = visibleUpdates.length;
  const safeActiveIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;
  const update = visibleUpdates[safeActiveIndex];
  const isAnalystSlide = update?.variant === "analyst-recognition";

  const showSlide = (nextIndex, nextDirection) => {
    if (!total) return;

    setDirection(nextDirection);
    setActiveIndex((nextIndex + total) % total);
  };

  useEffect(() => {
    if (total > 0 && activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  useEffect(() => {
    if (isPaused || isInteracting || reduceMotion || total < 2) return undefined;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, isInteracting, reduceMotion, total]);

  const slideVariants = {
    enter: (slideDirection) => ({ opacity: 0, x: slideDirection * 72 }),
    center: { opacity: 1, x: 0 },
    exit: (slideDirection) => ({ opacity: 0, x: slideDirection * -72 }),
  };

  if (!update) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      aria-labelledby="tsc-updates-title"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showSlide(activeIndex - 1, -1);
        if (event.key === "ArrowRight") showSlide(activeIndex + 1, 1);
      }}
      className="space-y-4"
    >
      <div className="flex items-end justify-between gap-4 px-1">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#056BFC]">
            <span className="h-px w-8 bg-[#056BFC]" />
            What&apos;s new
          </div>
          <h2 id="tsc-updates-title" className="text-2xl font-bold tracking-tight text-foreground">
            TSC Updates
          </h2>
        </div>
        <Link
          href="/innovation"
          className="group mb-1 inline-flex items-center gap-2 text-sm font-semibold text-[#056BFC] hover:underline"
        >
          See all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className="relative h-[760px] overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-[#6345cf] via-[#353f9c] to-[#101e56] shadow-[0_28px_70px_rgba(20,36,92,0.22)] sm:h-[650px] md:h-[560px] lg:h-[540px]"
        style={update.background ? { background: update.background } : undefined}
        role="region"
        aria-roledescription="carousel"
        aria-label="TSC updates carousel"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.11),transparent_36%)]" />
        <UpdateArtwork update={update} />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={update.id}
            custom={direction}
            variants={slideVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-10 h-full w-full px-7 py-7 text-white sm:px-12 md:px-14 ${
              isAnalystSlide
                ? "grid min-h-0 content-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(350px,0.46fr)] md:items-center"
                : "flex flex-col justify-center md:w-[64%]"
            }`}
            aria-roledescription="slide"
            aria-label={`${safeActiveIndex + 1} of ${total}`}
          >
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
                  {update.eyebrow}
                </span>
                <time className="text-sm font-medium text-white/70">{update.date}</time>
              </div>
              <h3 className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-[0] sm:text-4xl lg:text-[2.45rem]">
                {update.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                {update.description}
              </p>
              {update.metrics && (
                <div className="mt-5 grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {update.metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className="min-h-[78px] rounded-lg border border-white/20 bg-white/12 px-3 py-2.5 shadow-lg backdrop-blur-md"
                    >
                      <div
                        className="mb-2 h-1 w-8 rounded-full"
                        style={{ backgroundColor: index % 3 === 0 ? "#3FD534" : index % 3 === 1 ? "#FABD00" : "#056BFC" }}
                      />
                      <p className="text-xl font-bold leading-none text-white sm:text-2xl">{metric.value}</p>
                      <p className="mt-1 text-[11px] font-semibold leading-4 text-white/72">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <Link
                  href={update.href}
                  className="group inline-flex min-h-11 items-center gap-4 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#111936] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#353f9c]"
                >
                  {update.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            {isAnalystSlide && <AnalystRecognitionPanel update={update} />}
          </motion.article>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-3" aria-label="TSC updates carousel controls">
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#056BFC]"
            aria-label={isPaused ? "Play updates" : "Pause updates"}
          >
            {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
          </button>
          <button
            type="button"
            onClick={() => showSlide(activeIndex - 1, -1)}
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#056BFC]"
            aria-label="Previous update"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {visibleUpdates.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => showSlide(index, index >= safeActiveIndex ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#056BFC] focus-visible:ring-offset-2 ${
                  index === safeActiveIndex ? "w-8 bg-[#056BFC]" : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600"
                }`}
                aria-label={`Show update ${index + 1}: ${item.title}`}
                aria-current={index === safeActiveIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => showSlide(activeIndex + 1, 1)}
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#056BFC]"
            aria-label="Next update"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </motion.section>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function AwardCard({ award }) {
  const awardeeName = award.awardeeName || "Awardee details pending";
  const photoUrl = award.employeePhotoUrl || award.photographUrl || award.avatarUrl;

  return (
    <article
      tabIndex={0}
      className="group h-full rounded-lg border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#056BFC]/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#056BFC] focus-visible:ring-offset-2"
      aria-label={`${award.awardCategory || "TSC All-Star Award"} for ${awardeeName}`}
    >
      <div className="flex items-start gap-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={awardeeName}
            className="h-14 w-14 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#056BFC]/20 bg-[#056BFC]/10 text-sm font-bold text-[#055FE0]">
            {getInitials(awardeeName) || <Award className="h-6 w-6" />}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-[#FABD00]/35 bg-[#FABD00]/12 text-[#9A6500]">
              {award.awardCategory || "Award category pending"}
            </Badge>
            {award.badge && (
              <Badge variant="secondary" className="font-normal">
                {award.badge}
              </Badge>
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[#303030] dark:text-white">
            {awardeeName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {award.competency || "Competency pending"}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Project or Account</p>
            <p className="mt-1 font-medium text-foreground">{award.projectOrAccount || "To be published"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Quarter</p>
            <p className="mt-1 font-medium text-foreground">{award.quarter || tscAllStarAwardsMeta.quarter}</p>
          </div>
        </div>
        <p className="leading-6 text-muted-foreground">
          {award.achievementSummary || "Achievement summary will be added with the final award details."}
        </p>
      </div>
    </article>
  );
}

function TscAllStarAwards() {
  const publishedAwards = tscAllStarAwards
    .filter((award) => award.isPublished !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      aria-labelledby="tsc-awards-title"
      className="space-y-4"
    >
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9A6500]">
            <span className="h-px w-8 bg-[#FABD00]" />
            Recognition
          </div>
          <h2 id="tsc-awards-title" className="text-2xl font-bold tracking-tight text-foreground">
            {tscAllStarAwardsMeta.title}
          </h2>
        </div>
        <Badge variant="outline" className="w-fit border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]">
          {publishedAwards.length} published
        </Badge>
      </div>

      {publishedAwards.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publishedAwards.map((award) => (
            <AwardCard key={award.id || `${award.awardeeName}-${award.displayOrder}`} award={award} />
          ))}
        </div>
      ) : (
        <Card className="rounded-lg border-dashed border-[#056BFC]/25 bg-white shadow-sm dark:bg-card">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FABD00]/14 text-[#9A6500]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-[#303030] dark:text-white">
                  Award details pending
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tscAllStarAwardsMeta.emptyState}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit">
              {tscAllStarAwardsMeta.quarter}
            </Badge>
          </CardContent>
        </Card>
      )}
    </motion.section>
  );
}

export default function Dashboard() {
  const COLORS = ["#056BFC", "#3FD534", "#FABD00", "#60a5fa", "#16a34a"];
  const { hasRole, user } = useAuth();
  const visiblePlatformCoverage = filterContentForUser(platformCoverage, user);
  const visibleActivities = filterContentForUser(activities, user);
  const visibleActivityFeed = visibleActivities.slice(0, 4);
  const visibleAssetCategories = filterContentForUser(chartData.assetCategories, user);
  const visiblePlatformKeys = new Set(
    visiblePlatformCoverage.map((platform) => platform.platform.replace(/\s+/g, ""))
  );
  const visibleCoverageSeries = [
    { key: "Guidewire", color: "#056BFC", fill: "url(#colorGw)", fillOpacity: 1 },
    { key: "DuckCreek", color: "#FABD00", fill: "transparent" },
    { key: "OneShield", color: "#60A5FA", fill: "transparent" },
    { key: "SmartCOMM", color: "#16A34A", fill: "transparent" },
    { key: "OpenText", color: "#F97316", fill: "transparent" },
    { key: "GhostDraft", color: "#8B5CF6", fill: "transparent" },
    { key: "Earnix", color: "#3FD534", fill: "transparent" },
    { key: "HyperExponential", color: "#0F766E", fill: "transparent" },
  ].filter((series) => visiblePlatformKeys.has(series.key));
  const canViewManagementModules = hasRole([
    ROLES.SUPER_ADMIN,
    ...COMPETENCY_ADMIN_ROLES,
  ]);

  return (
    <div className="space-y-6">

      <TscUpdates />

      <TscAllStarAwards />

      {/* ── HERO ─────────────────────────────────────────────── */}
      {false && (
      <motion.section
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8
          shadow-[0_30px_90px_rgba(5,107,252,0.22)]
          bg-gradient-to-br from-[#056BFC] via-[#0C64D6] to-[#033B8C]"
      >
        {/* animated orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute left-4 top-10 h-56 w-56 rounded-full bg-[#3FD534]/20 blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, 18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-8 top-16 h-72 w-72 rounded-full bg-[#FABD00]/15 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, -22, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-black/12 blur-2xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute left-1/2 top-0 h-40 w-40 rounded-full bg-white/5 blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.75fr_1.1fr] items-center">
          {/* left */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1 shadow-sm">
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  className="inline-block mr-2"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Core TSC Hub
              </Badge>
            </motion.div>

            <motion.div
              className="space-y-4 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Accelerating Insurance Transformation
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Drive faster decisions with platform intelligence, reusable assets, and operational excellence.
              </p>
            </motion.div>

            {/* hero stat chips */}
            <motion.div
              className="grid gap-3 sm:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[
                { label: "Ready assets", to: 0 },
                { label: "Live POCs", to: 0 },
                { label: "Platform partners", to: 0 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-semibold text-white">
                    <Counter to={item.to} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* right — insight panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl"
            style={{ boxShadow: "0 0 40px rgba(255,255,255,0.06), 0 20px 60px rgba(3,59,140,0.4)" }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white">Hub insight</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-sm font-medium text-white/70"
                >
                  Updated 2 mins ago
                </motion.span>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-white/70">Live conversion</div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-bold text-white">
                      <Counter to={0} suffix="%" />
                    </p>
                    <p className="text-sm text-white/70">vs. last month</p>
                  </div>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#3FD534]/20 px-3 py-1 text-sm text-white border border-[#3FD534]/30"
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#3FD534]" /> 0% growth
                  </motion.div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Earnix readiness</p>
                  <p className="mt-2 text-2xl font-semibold text-white"><Counter to={0} suffix="%" /></p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Strategic assets</p>
                  <p className="mt-2 text-2xl font-semibold text-white"><Counter to={0} /></p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      )}

      {canViewManagementModules && (
        <>
      {/* ── KPI CARDS ─────────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {[
          { label: "Competencies", value: kpis.totalCompetencies, icon: Target, accent: "#056BFC" },
          { label: "Accelerators", value: kpis.accelerators, icon: Box, accent: "#3FD534" },
          { label: "Assets", value: kpis.reusableAssets, icon: Layers, accent: "#FABD00" },
          { label: "POCs", value: kpis.pocs, icon: FlaskConical, accent: "#303030" },
          { label: "Automation", value: kpis.automationSolutions, icon: Cpu, accent: "#056BFC" },
          { label: "Integration", value: kpis.integrationFrameworks, icon: Cable, accent: "#3FD534" },
        ].map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={fadeUp}
            whileHover={{
              y: -8,
              scale: 1.04,
              boxShadow: `0 20px 40px ${kpi.accent}35`,
              transition: { duration: 0.2 },
            }}
          >
            <Card className="bg-white dark:bg-card shadow-sm border-border/60 h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <motion.div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${kpi.accent}20` }}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  <kpi.icon className="w-6 h-6" style={{ color: kpi.accent }} />
                </motion.div>
                <div className="text-3xl font-bold tracking-tight" style={{ color: kpi.accent }}>
                  <Counter to={kpi.value} />
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── PLATFORM COVERAGE + CHART ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <Card className="lg:col-span-1 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Platform Coverage</CardTitle>
              <CardDescription>Maturity and expertise across core systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {visiblePlatformCoverage.map((platform, i) => (
                <motion.div
                  key={platform.platform}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>{platform.platform}</span>
                    <motion.span
                      className="text-[#056BFC] font-semibold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.4 }}
                    >
                      {platform.coverage}%
                    </motion.span>
                  </div>
                  <AnimatedBar value={platform.coverage} color="#056BFC" delay={i * 0.12} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle>Capability Coverage Trend</CardTitle>
              <CardDescription>12-month trailing growth by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.coverageTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGw" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#056BFC" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#056BFC" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} itemStyle={{ color: "hsl(var(--foreground))" }} />
                    {visibleCoverageSeries.map((series) => (
                      <Area
                        key={series.key}
                        type="monotone"
                        dataKey={series.key}
                        stroke={series.color}
                        strokeWidth={2}
                        fillOpacity={series.fillOpacity}
                        fill={series.fill}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── ASSET DISTRIBUTION + ACTIVITY ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 8px 30px rgba(5,107,252,0.10)" }}
        >
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle>Asset Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visibleAssetCategories}
                      cx="50%" cy="50%"
                      innerRadius={60} outerRadius={80}
                      paddingAngle={5} dataKey="value"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={900}
                    >
                      {visibleAssetCategories.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>TSC updates across the hub</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {visibleActivityFeed.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    variants={fadeLeft}
                    className="flex items-start gap-4"
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <div className="relative mt-1">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-[#056BFC] relative z-10"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                      {i !== visibleActivityFeed.length - 1 && (
                        <motion.div
                          className="absolute top-2.5 left-[4px] w-px bg-border -translate-x-1/2"
                          initial={{ height: 0 }}
                          whileInView={{ height: 48 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{activity.action}</span>: {activity.target}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
                {visibleActivityFeed.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No activity is available for your account.
                  </p>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
        </>
      )}
    </div>
  );
}
