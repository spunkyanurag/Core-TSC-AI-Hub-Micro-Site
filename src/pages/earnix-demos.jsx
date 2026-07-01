import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ExternalLink,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GENERAL_LIABILITY_DEMO_URL =
  "https://vmivsp.sharepoint.com/sites/CoreLeverage/_layouts/15/stream.aspx?id=%2Fsites%2FCoreLeverage%2FShared%20Documents%2FGeneral%2FTraining%2FEarnix%2FDemo%2FDemo%20General%20Liability%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E8f8ef3a8%2D9e47%2D4901%2Dbf7a%2D220ec3fbe2d8";

const earnixDemos = [
  {
    title: "GL Demo",
    description: "General liability pricing and rating walkthrough.",
    icon: ShieldCheck,
    thumbnail: "from-[#056BFC] via-[#0EA5E9] to-[#0F172A]",
    videoUrl: GENERAL_LIABILITY_DEMO_URL,
  },
  {
    title: "UW Demo",
    description: "Underwriting workflow and decision support showcase.",
    icon: FileSpreadsheet,
    thumbnail: "from-[#2563EB] via-[#3FD534] to-[#0F172A]",
    videoUrl: GENERAL_LIABILITY_DEMO_URL,
  },
  {
    title: "Pricing Demo",
    description: "Earnix pricing strategy, segmentation, and simulation demo.",
    icon: Calculator,
    thumbnail: "from-[#0F766E] via-[#14B8A6] to-[#0F172A]",
    videoUrl: GENERAL_LIABILITY_DEMO_URL,
  },
  {
    title: "BOP Demo",
    description: "Business owners policy rating and package scenario demo.",
    icon: BriefcaseBusiness,
    thumbnail: "from-[#FABD00] via-[#F97316] to-[#303030]",
    videoUrl: GENERAL_LIABILITY_DEMO_URL,
  },
  {
    title: "Portfolio Demo",
    description: "Portfolio performance, lift, and optimization review.",
    icon: BarChart3,
    thumbnail: "from-[#7C3AED] via-[#2563EB] to-[#0F172A]",
    videoUrl: GENERAL_LIABILITY_DEMO_URL,
  },
];

export default function EarnixDemos() {
  const openDemo = (demo) => {
    window.open(demo.videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/earnix-resources">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Earnix Resources
          </Button>
        </Link>
      </div>

      <div>
        <div className="inline-flex items-center rounded-full bg-[#056BFC]/10 px-3 py-1 text-sm font-medium text-[#056BFC]">
          Earnix Demos
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Earnix Demo Library</h1>
        <p className="mt-2 text-muted-foreground">
          Select a demo card to open the SharePoint video.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {earnixDemos.map((demo, index) => {
          const Icon = demo.icon;

          return (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card
                onClick={() => openDemo(demo)}
                className="h-full cursor-pointer overflow-hidden border-border/50 transition-all hover:-translate-y-1 hover:border-[#056BFC]/40 hover:shadow-lg"
              >
                <div className={`relative h-36 bg-gradient-to-br ${demo.thumbnail}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.16),transparent_30%)]" />
                  <div className="relative flex h-full flex-col justify-between p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/15 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className="border-white/20 bg-white/15 text-white">
                        SharePoint
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">{demo.title}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                        Earnix
                      </p>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                  <CardDescription>{demo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm font-medium text-[#056BFC]">
                    <span>Open demo</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
