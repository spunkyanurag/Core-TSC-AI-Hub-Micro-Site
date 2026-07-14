import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PlaySquare, Calendar as CalendarIcon, Video, Users, Clock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/auth";
import { CONTENT_ACCESS_ROLE, filterContentForUser, getContentAccessRoleForPlatform } from "@/lib/content-access";

const featuredDemos = [
  { title: "Guidewire Cloud Transition", duration: "45 mins", type: "Technical Deep Dive", contentAccessRole: getContentAccessRoleForPlatform("Guidewire") },
  { title: "Earnix Pricing Engine Integration", duration: "30 mins", type: "Architecture Review", contentAccessRole: getContentAccessRoleForPlatform("Earnix") },
  { title: "Automated Testing Framework", duration: "60 mins", type: "Hands-on Workshop", contentAccessRole: CONTENT_ACCESS_ROLE.GENERAL },
];

export default function DemoCenter() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const visibleDemos = filterContentForUser(featuredDemos, user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demo Center</h1>
        <p className="text-muted-foreground mt-2">Schedule live walkthroughs with our solution architects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Featured Demos</CardTitle>
              <CardDescription>Ready-to-present technical deep dives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleDemos.map((demo, i) => (
                <motion.div 
                  key={demo.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-[#F8F8FB] dark:hover:bg-muted/30 transition-colors"
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-semibold text-lg">{demo.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {demo.duration}</span>
                      <span className="flex items-center"><Video className="w-3 h-3 mr-1" /> {demo.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 text-[#056BFC] border-[#056BFC]/20 hover:bg-[#056BFC]/10">
                    <PlaySquare className="w-4 h-4 mr-2" /> Request
                  </Button>
                </motion.div>
              ))}
              {visibleDemos.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No demos are available for your account.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Schedule a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
              />
              <div className="mt-6 space-y-4">
                <Button className="w-full bg-[#056BFC] hover:bg-[#056BFC]/90 text-white"><CalendarIcon className="w-4 h-4 mr-2"/> Confirm Date</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-[#056BFC]/5 border-[#056BFC]/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#056BFC]/10 rounded-full flex items-center justify-center mx-auto text-[#056BFC]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">Need a custom demo?</h3>
              <p className="text-sm text-muted-foreground">Our architects can prepare a tailored presentation for your specific use case.</p>
              <Button variant="outline" className="w-full border-[#056BFC]/50 text-[#056BFC] hover:bg-[#056BFC]/10">Contact Team</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
