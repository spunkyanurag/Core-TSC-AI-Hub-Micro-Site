import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MockAuthService, useAuth } from "@/auth";

const LogoLight = "/assets/logo-light.png";

function getRedirectPath() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  return redirect && redirect.startsWith("/") ? redirect : "/";
}

export default function Login() {
  const [, navigate] = useLocation();
  const { isAuthenticated, login, loginAsDefaultUser } = useAuth();
  const mockUsers = useMemo(() => MockAuthService.getMockUsers(), []);
  const [email, setEmail] = useState(mockUsers[0]?.email || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getRedirectPath(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email });
      navigate(getRedirectPath(), { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDefaultLogin() {
    setError("");
    setIsSubmitting(true);

    try {
      await loginAsDefaultUser();
      navigate(getRedirectPath(), { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F8FB] dark:bg-background">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_460px]">
        <section className="relative hidden overflow-hidden bg-[#303030] lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(5,107,252,0.35),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(250,189,0,0.24),transparent_24%),linear-gradient(135deg,#303030_0%,#1f1f1f_100%)]" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <img src={LogoLight} alt="ValueMomentum" className="h-10 w-fit object-contain" />
            <div className="max-w-xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-[#FABD00]" />
                TSC Hub Access
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white">
                Core platforms intelligence for ValueMomentum teams.
              </h1>
              <p className="text-base leading-7 text-white/72">
                Access platform insights, competency assets, demos, and collaboration
                spaces from one secure internal hub.
              </p>
            </div>
            <p className="text-sm text-white/50">
              ValueMomentum Core Platforms TSC
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <Card className="w-full max-w-md rounded-lg shadow-sm">
            <CardHeader className="space-y-3">
              <img src={LogoLight} alt="ValueMomentum" className="h-9 w-fit object-contain dark:hidden" />
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Use your ValueMomentum identity to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    list="mock-users"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                  />
                  <datalist id="mock-users">
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.email}>
                        {user.name} - {user.roles.join(", ")}
                      </option>
                    ))}
                  </datalist>
                </div>

                {error && (
                  <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <div className="grid gap-3">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={handleDefaultLogin}
                    className="w-full"
                  >
                    Use default account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
