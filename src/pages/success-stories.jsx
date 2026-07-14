import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { successStories } from "@/mock-data";
import { useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import { Trophy, TrendingUp, Building2, Layers } from "lucide-react";

export default function SuccessStories() {
  const { user } = useAuth();
  const visibleStories = filterContentForUser(successStories, user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Success Stories</h1>
        <p className="text-muted-foreground mt-2">Real-world impact and business outcomes delivered for our clients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleStories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full hover-elevate border-border/50 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#056BFC]/5 rounded-bl-[100px] -z-10" />
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#F8F8FB] dark:bg-muted/50 rounded-lg border border-border/50">
                    <Building2 className="w-6 h-6 text-[#303030] dark:text-foreground/70" />
                  </div>
                  <Badge className="bg-[#3FD534]/10 text-[#3FD534] hover:bg-[#3FD534]/20 border-[#3FD534]/20">
                    Verified Result
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{story.customer}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="font-normal">{story.industry}</Badge>
                  <span className="text-muted-foreground text-xs flex items-center"><Layers className="w-3 h-3 mr-1"/> {story.platform}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 p-4 bg-[#056BFC]/5 border border-[#056BFC]/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-[#056BFC] mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#056BFC] mb-1">Key Outcome</h4>
                      <p className="text-lg font-medium flex items-center text-[#303030] dark:text-foreground">
                        <TrendingUp className="w-4 h-4 mr-2 text-[#3FD534]" />
                        {story.metrics}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {visibleStories.length === 0 && (
          <Card className="md:col-span-2 border-border/50">
            <CardContent className="p-8 text-center text-muted-foreground">
              No success stories are available for your account.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
