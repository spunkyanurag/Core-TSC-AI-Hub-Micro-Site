import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { kpis, platformCoverage, chartData, activities } from "@/mock-data";
import { ROLES, useAuth } from "@/auth";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { ArrowUpRight, Target, Box, FlaskConical, Cpu, Cable, Sparkles, Layers } from "lucide-react";

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

export default function Dashboard() {
  const COLORS = ["#056BFC", "#3FD534", "#FABD00", "#60a5fa", "#16a34a"];
  const { hasRole } = useAuth();
  const canViewManagementModules = hasRole([
    ROLES.ADMINISTRATOR,
    ROLES.COMPETENCY_OWNER,
  ]);

  return (
    <div className="space-y-6">

      {/* ── HERO ─────────────────────────────────────────────── */}
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
              {platformCoverage.map((platform, i) => (
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
                    <Area type="monotone" dataKey="Guidewire" stroke="#056BFC" strokeWidth={2} fillOpacity={1} fill="url(#colorGw)" />
                    <Area type="monotone" dataKey="Earnix" stroke="#3FD534" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="DuckCreek" stroke="#FABD00" strokeWidth={2} fill="transparent" />
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
                      data={chartData.assetCategories}
                      cx="50%" cy="50%"
                      innerRadius={60} outerRadius={80}
                      paddingAngle={5} dataKey="value"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={900}
                    >
                      {chartData.assetCategories.map((_, index) => (
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
                <CardDescription>Latest updates across the hub</CardDescription>
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
                {activities.slice(0, 4).map((activity, i) => (
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
                      {i !== 3 && (
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
