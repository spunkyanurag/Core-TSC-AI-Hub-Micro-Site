import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PERMISSIONS, useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform } from "@/lib/content-access";
import { Handshake, ExternalLink, Star, Building2, Globe, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

/* ── variants ────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ── pulsing dot ─────────────────────────────────────────────── */
const PulseDot = ({ color }) => (
  <span className="relative inline-flex h-2.5 w-2.5 mr-2">
    <motion.span className="absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
      transition={{ duration: 2.2, repeat: Infinity }} />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
  </span>
);

const partnerTiers = [
  {
    tier: "Premier Partner", color: "#FABD00",
    partners: [
      { name: "Guidewire Software", type: "Core Platform", description: "Premier implementation and consulting partner for InsuranceSuite — PolicyCenter, ClaimCenter, BillingCenter.", badges: ["PolicyCenter", "ClaimCenter", "BillingCenter", "Cloud"], certifications: 12, listings: 3, contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
      { name: "Earnix", type: "Rating & Pricing", description: "Strategic partner for dynamic pricing, rating modernisation, and AI-powered product personalisation.", badges: ["Price-It", "Personalize-It", "AI Pricing"], certifications: 6, listings: 2, contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
    ],
  },
  {
    tier: "Select Partner", color: "#056BFC",
    partners: [
      { name: "Duck Creek Technologies", type: "Core Platform", description: "SaaS-based policy, billing, and claims systems for P&C insurers and MGAs.", badges: ["Policy", "Billing", "Claims", "SaaS"], certifications: 8, listings: 2, contentAccessRole: getContentAccessRoleForPlatform("Duck Creek") },
      { name: "OneShield", type: "Core Platform", description: "Core administration systems for specialty P&C and MGA markets.", badges: ["Enterprise", "Market", "MGA"], certifications: 5, listings: 1, contentAccessRole: getContentAccessRoleForPlatform("OneShield") },
    ],
  },
  {
    tier: "Technology Alliance", color: "#3FD534",
    partners: [
      { name: "Quadient / Smart Communications", type: "CCM Platform", description: "Customer communications management for personalised, compliant multi-channel delivery.", badges: ["CCM", "Digital", "Compliance"], certifications: 4, listings: 1, contentAccessRole: getContentAccessRoleForPlatform("CCM") },
    ],
  },
];

const marketplaceListings = [
  { name: "GW Cloud Migration Accelerator", platform: "Guidewire Marketplace", description: "End-to-end toolkit for migrating on-premises Guidewire deployments to cloud.", status: "Listed", icon: "🚀", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { name: "Automated Testing Framework",    platform: "Guidewire Marketplace", description: "E2E regression and smoke-test suite for InsuranceSuite with CI/CD integration.",            status: "Listed",    icon: "🧪", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { name: "Earnix Integration Connector",   platform: "Earnix Marketplace",    description: "Pre-built connector between Earnix Price-It and Guidewire PolicyCenter.",                   status: "Listed",    icon: "🔗", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { name: "Digital Claims Portal",          platform: "Guidewire Marketplace", description: "Self-service claims portal with AI-assisted intake and status tracking.",                    status: "In Review", icon: "📋", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
];

const stats = [
  { label: "Active Partnerships",   value: "5",   icon: Handshake,  color: "#056BFC", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Marketplace Listings",  value: "4",   icon: Globe,      color: "#3FD534", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Total Certifications",  value: "35+", icon: ShieldCheck,color: "#FABD00", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
  { label: "Partner Tiers",         value: "3",   icon: Star,       color: "#ffffff", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export default function Partnerships() {
  const { hasPermissions, user } = useAuth();
  const visiblePartnerTiers = partnerTiers
    .map((tier) => ({
      ...tier,
      partners: filterContentForUser(tier.partners, user),
    }))
    .filter((tier) => tier.partners.length > 0);
  const visibleMarketplaceListings = filterContentForUser(marketplaceListings, user);
  const visibleStats = filterContentForUser(stats, user);
  const canManageContent = hasPermissions([PERMISSIONS.MANAGE_CONTENT]);

  return (
    <div className="space-y-8">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8
          shadow-[0_30px_90px_rgba(250,189,0,0.12)]
          bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#033B8C]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#FABD00]/20 blur-3xl"
            animate={{ y: [0, -26, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#056BFC]/25 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, -18, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
          <motion.div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-[#3FD534]/10 blur-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <motion.div className="space-y-5"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}>
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} className="inline-block mr-2">
                <Handshake className="w-4 h-4" />
              </motion.span>
              Partnerships & Marketplace
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Partnering for Insurance Excellence
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              Certified partnerships across premier insurance platforms — with accelerators listed in platform marketplaces to extend our reach globally.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-[#FABD00] hover:bg-[#FABD00]/90 text-[#303030] font-semibold">
                <ExternalLink className="w-4 h-4 mr-2" /> Explore Marketplace
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={container} initial="hidden" animate="show"
          >
            {visibleStats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
                >
                  <Icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ── PARTNER TIERS ─────────────────────────────────────── */}
      <div className="space-y-6">
        {visiblePartnerTiers.map((tier, ti) => (
          <div key={tier.tier}>
            <motion.div
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <PulseDot color={tier.color} />
              <h2 className="text-base font-semibold">{tier.tier}</h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={container} initial="hidden"
              whileInView="show" viewport={{ once: true, amount: 0.1 }}
            >
              {tier.partners.map((partner) => (
                <motion.div
                  key={partner.name}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: `0 20px 40px ${tier.color}25` }}
                >
                  <Card className="h-full shadow-sm border-l-4" style={{ borderLeftColor: tier.color }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{partner.name}</CardTitle>
                          <CardDescription className="text-xs mt-0.5">{partner.type}</CardDescription>
                        </div>
                        <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
                        </motion.div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {partner.badges.map((b) => (
                          <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/40">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#3FD534]" />{partner.certifications} certifications
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#056BFC]" />{partner.listings} listing{partner.listings !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
        {visiblePartnerTiers.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              No partner content is available for your account.
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── MARKETPLACE LISTINGS ──────────────────────────────── */}
      <div>
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold tracking-tight">Marketplace Listings</h2>
          <Button variant="outline" size="sm"><ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View All</Button>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.1 }}
        >
          {visibleMarketplaceListings.map((listing) => (
            <motion.div
              key={listing.name}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: listing.status === "Listed" ? "0 16px 36px rgba(63,213,52,0.20)" : "0 16px 36px rgba(250,189,0,0.20)" }}
            >
              <Card className="h-full shadow-sm">
                <CardHeader className="pb-2">
                  <motion.div
                    className="text-3xl mb-2"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {listing.icon}
                  </motion.div>
                  <div className="flex items-start justify-between gap-1">
                    <CardTitle className="text-sm leading-tight">{listing.name}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0"
                      style={{
                        color: listing.status === "Listed" ? "#3FD534" : "#FABD00",
                        borderColor: listing.status === "Listed" ? "#3FD53440" : "#FABD0040",
                        backgroundColor: listing.status === "Listed" ? "#3FD53410" : "#FABD0010",
                      }}>
                      {listing.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-[#056BFC] font-medium">{listing.platform}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{listing.description}</p>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                    <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-xs text-[#056BFC] hover:text-[#056BFC]/80">
                      View listing <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {visibleMarketplaceListings.length === 0 && (
            <Card className="sm:col-span-2 lg:col-span-4 border-border/50">
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                No marketplace listings are available for your account.
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      {canManageContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }}
          whileHover={{ scale: 1.01 }}
        >
          <Card className="shadow-sm border-[#FABD00]/30 bg-gradient-to-r from-[#FABD00]/8 to-transparent overflow-hidden relative">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FABD00]/8 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-[#FABD00] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Grow our marketplace presence</h3>
                  <p className="text-sm text-muted-foreground mt-1">Have an accelerator ready to list? Work with the partnerships team to submit it for platform review.</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="shrink-0 border-[#FABD00] text-[#FABD00] hover:bg-[#FABD00]/10">
                  Submit Accelerator
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
