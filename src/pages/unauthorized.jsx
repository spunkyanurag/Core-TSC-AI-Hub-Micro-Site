import { Link } from "wouter";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="w-full max-w-lg rounded-lg shadow-sm">
        <CardContent className="space-y-5 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#303030] dark:text-white">
              Access restricted
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {user?.name || "Your account"} does not have the permissions required
              to view this page.
            </p>
          </div>
          <Button asChild>
            <Link href="/">Return to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
