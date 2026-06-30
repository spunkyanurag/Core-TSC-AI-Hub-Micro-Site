import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, ExternalLink, Star, Building2, Globe, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

const partnerTiers = [
  {
    tier: "Premier Partner",
    color: "#FABD00",
    partners: [
      {
        name: "Guidewire Software",
        type: "Core Platform",
        description: "Premier implementation and consulting partner for InsuranceSuite — PolicyCenter, ClaimCenter, BillingCenter.",
        badges: ["PolicyCenter", "ClaimCenter", "BillingCenter", "Cloud"],
        certifications: 12,
        listings: 3,
      },
      {
        name: "Earnix",
        type: "Rating & Pricing",
        description: "Strategic partner for dynamic pricing, rating modernisation, and AI-powered product personalisation.",
        badges: ["Price-It", "Personalize-It", "AI Pricing"],
        certifications: 6,
        listings: 2,
      },
    ],
  },
  {
    tier: "Select Partner",
    color: "#056BFC",
    partners: [
      {
        name: "Duck Creek Technologies",
        type: "Core Platform",
        description: "SaaS-based policy, billing, and claims systems for P&C insurers and MGAs.",
        badges: ["Policy", "Billing", "Claims", "SaaS"],
        certifications: 8,
        listings: 2,
      },
      {
        name: "OneShield",
        type: "Core Platform",
        description: "Core administration systems for specialty P&C and MGA markets.",
        badges: ["Enterprise", "Market", "MGA"],
        certifications: 5,
        listings: 1,
      },
    ],
  },
  {
    tier: "Technology Alliance",
    color: "#3FD534",
    partners: [
      {
        name: "Quadient / Smart Communications",
        type: "CCM Platform",
        description: "Customer communications management for personalised, compliant multi-channel delivery.",
        badges: ["CCM", "Digital", "Compliance"],
        certifications: 4,
        listings: 1,
      },
    ],
  },
];

const marketplaceListings = [
  {
    name: "GW Cloud Migration Accelerator",
    platform: "Guidewire Marketplace",
    category: "Accelerator",
    description: "End-to-end toolkit for migrating on-premises Guidewire deployments to cloud.",
    status: "Listed",
    icon: "🚀",
  },
  {
    name: "Automated Testing Framework",
    platform: "Guidewire Marketplace",
    category: "Framework",
    description: "E2E regression and smoke-test suite for InsuranceSuite with CI/CD integration.",
    status: "Listed",
    icon: "🧪",
  },
  {
    name: "Earnix Integration Connector",
    platform: "Earnix Marketplace",
    category: "Integration",
    description: "Pre-built connector between Earnix Price-It and Guidewire PolicyCenter.",
    status: "Listed",
    icon: "🔗",
  },
  {
    name: "Digital Claims Portal",
    platform: "Guidewire Marketplace",
    category: "Accelerator",
    description: "Self-service claims portal with AI-assisted intake and status tracking.",
    status: "In Review",
    icon: "📋",
  },
];

const stats = [
  { label: "Active Partnerships", value: "5", icon: Handshake, color: "#056BFC" },
  { label: "Marketplace Listings", value: "4", icon: Globe, color: "#3FD534" },
  { label: "Total Certifications", value: "35+", icon: ShieldCheck, color: "#FABD00" },
  { label: "Partner Tiers", value: "3", icon: Star, color: "#303030" },
];

export default function Partnerships() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] text-slate-50 p-8 shadow-[0_30px_90px_rgba(5,107,252,0.12)] bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#033B8C]"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#FABD00]/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#056BFC]/25 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-center">
          <div className="space-y-5">
            <Badge className="bg-white/15 text-white border border-white/20 px-3 py-1">
              <Handshake className="w-4 h-4 mr-2" /> Partnerships & Marketplace
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Partnering for Insurance Excellence
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              Certified partnerships across premier insurance platforms — with accelerators listed in platform marketplaces to extend our reach globally.
            </p>
            <Button className="bg-[#FABD00] hover:bg-[#FABD00]/90 text-[#303030] font-semibold">
              <ExternalLink className="w-4 h-4 mr-2" /> Explore Marketplace
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                  <Icon className="w-5 h-5 mb-2" style={{ color: s.color === "#303030" ? "#fff" : s.color }} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Partner Tiers */}
      <div className="space-y-6">
        {partnerTiers.map((tier, ti) => (
          <div key={tier.tier}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tier.color }} />
              <h2 className="text-base font-semibold">{tier.tier}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tier.partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (ti * 2 + i) * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: tier.color }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{partner.name}</CardTitle>
                          <CardDescription className="text-xs mt-0.5">{partner.type}</CardDescription>
                        </div>
                        <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
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
                          <ShieldCheck className="w-3.5 h-3.5 text-[#3FD534]" />
                          {partner.certifications} certifications
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#056BFC]" />
                          {partner.listings} marketplace listing{partner.listings !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Marketplace Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Marketplace Listings</h2>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaceListings.map((listing, i) => (
            <motion.div
              key={listing.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="text-3xl mb-2">{listing.icon}</div>
                  <div className="flex items-start justify-between gap-1">
                    <CardTitle className="text-sm leading-tight">{listing.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0"
                      style={{
                        color: listing.status === "Listed" ? "#3FD534" : "#FABD00",
                        borderColor: listing.status === "Listed" ? "#3FD53440" : "#FABD0040",
                        backgroundColor: listing.status === "Listed" ? "#3FD53410" : "#FABD0010",
                      }}
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-[#056BFC] font-medium">{listing.platform}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{listing.description}</p>
                  <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-xs text-[#056BFC] hover:text-[#056BFC]/80">
                    View listing <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth CTA */}
      <Card className="shadow-sm border-[#FABD00]/30 bg-gradient-to-r from-[#FABD00]/8 to-transparent">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-[#FABD00] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Grow our marketplace presence</h3>
              <p className="text-sm text-muted-foreground mt-1">Have an accelerator ready to list? Work with the partnerships team to submit it for platform review.</p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 border-[#FABD00] text-[#FABD00] hover:bg-[#FABD00]/10">
            Submit Accelerator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
