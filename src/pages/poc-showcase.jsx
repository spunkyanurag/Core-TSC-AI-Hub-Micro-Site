import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pocs } from "@/mock-data";
import { PERMISSIONS, useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import { FlaskConical, Play, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function PocShowcase() {
  const { hasPermissions, user } = useAuth();
  const visiblePocs = filterContentForUser(pocs, user);
  const canManageContent = hasPermissions([PERMISSIONS.MANAGE_CONTENT]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-[#056BFC] border-[#056BFC]/20 bg-[#056BFC]/10";
      case "Completed": return "text-[#3FD534] border-[#3FD534]/20 bg-[#3FD534]/10";
      case "In Progress": return "text-[#FABD00] border-[#FABD00]/20 bg-[#FABD00]/10";
      default: return "text-muted-foreground border-border bg-muted/50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "Active": return <Play className="w-3 h-3 mr-1" />;
      case "In Progress": return <Clock className="w-3 h-3 mr-1" />;
      default: return <AlertCircle className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POC Showcase</h1>
          <p className="text-muted-foreground mt-2">Interactive demonstrations of our capabilities and solutions.</p>
        </div>
        {canManageContent && (
          <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
            <FlaskConical className="w-4 h-4 mr-2" /> Request Custom POC
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePocs.map((poc, i) => (
          <motion.div
            key={poc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col hover-elevate border-border/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={`${getStatusColor(poc.status)}`}>
                    {getStatusIcon(poc.status)} {poc.status}
                  </Badge>
                  <Badge variant="secondary" className="font-normal">{poc.platform}</Badge>
                </div>
                <CardTitle className="text-xl">{poc.name}</CardTitle>
                <CardDescription>Impact: <span className="font-medium text-foreground">{poc.impact}</span></CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="w-full h-32 bg-[#F8F8FB] dark:bg-muted/30 rounded-md border border-border flex items-center justify-center">
                  <Play className="w-8 h-8 text-muted-foreground/50" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-[#056BFC] hover:bg-[#056BFC]/90 text-white" disabled={poc.status !== "Completed" && poc.status !== "Active"}>
                  <Play className="w-4 h-4 mr-2" /> Launch Demo
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {visiblePocs.length === 0 && (
          <Card className="col-span-full border-border/50">
            <CardContent className="p-8 text-center text-muted-foreground">
              No POCs are available for your account.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
