import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, FileText, NotebookText, PlaySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const earnixResources = [
  {
    title: "Demo",
    description: "Launch the Earnix product demo and walkthrough.",
    route: "/earnix-demos",
    icon: PlaySquare,
  },
  {
    title: "Playbook",
    description: "Open the implementation playbook and delivery guidance.",
    href: "https://vmivsp.sharepoint.com/:w:/r/sites/CoreLeverage/_layouts/15/Doc.aspx?sourcedoc=%7BF6D1FFEC-E7D8-47D0-B7E1-7A538C1093AC%7D&file=Earnix%20Development%20Playbook%20V1.docx&action=default&mobileredirect=true",
    icon: NotebookText,
  },
  {
    title: "Materials",
    description: "Browse supporting assets, decks, and technical notes.",
    href: "https://vmivsp.sharepoint.com/sites/CoreLeverage/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FCoreLeverage%2FShared%20Documents%2FGeneral%2FTraining%2FEarnix%2FEarnix%20Materials%2FEarnix%20Training%20PPT%27s&viewid=e2080b0c%2Df3a8%2D437b%2Da657%2D7ee3ad648a5d&CID=c3a2c27b%2Dfc0a%2Dfd86%2D6a23%2D1db143cfa62a&sharingv2=true&fromShare=true&at=9&FolderCTID=0x012000590E2BA52A0EB742A691C13C41D38C2E&ovuser=13085c86%2D4bcb%2D460a%2Da6f0%2Db373421c6323%2CSampath%2EPolisetty%40valuemomentum%2Ecom&OR=Teams%2DHL&CT=1771821426188&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNjAxMTUxMTExOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
    icon: FileText,
  },
];

export default function EarnixResources() {
  const [, setLocation] = useLocation();

  const openResource = (href) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleResourceClick = (resource) => {
    if (resource.route) {
      setLocation(resource.route);
      return;
    }

    openResource(resource.href);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/competencies">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Competencies
          </Button>
        </Link>
      </div>

      <div>
        <div className="inline-flex items-center rounded-full bg-[#056BFC]/10 px-3 py-1 text-sm font-medium text-[#056BFC]">
          Earnix
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Earnix Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Access the key demo, playbook, and materials content for the Earnix capability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {earnixResources.map((resource, index) => {
          const Icon = resource.icon;

          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleResourceClick(resource)}
                className="h-full cursor-pointer border-border/50 transition-all hover:-translate-y-1 hover:border-[#056BFC]/40 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-[#056BFC]/10">
                      <Icon className="w-6 h-6 text-[#056BFC]" />
                    </div>
                    <Badge variant="outline" className="bg-background">
                      SharePoint
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm font-medium text-[#056BFC]">
                    <span>Open resource</span>
                    <span>→</span>
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
