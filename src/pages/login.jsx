import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Eye, LogIn, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MockAuthService, ROLES, useAuth } from "@/auth";

const LogoLight = "/assets/logo-light.png";
const COMPETENCY_ADMIN_LOGIN_ROLE = MockAuthService.COMPETENCY_ADMIN_LOGIN_ROLE;

const ROLE_OPTIONS = [
  {
    value: ROLES.SUPER_ADMIN,
    label: "Super Admin",
    description: "Full portal access, user management, and settings.",
    icon: ShieldCheck,
  },
  {
    value: COMPETENCY_ADMIN_LOGIN_ROLE,
    label: "Competency Admin",
    description: "Manage assigned competency content and resources.",
    icon: UserCog,
  },
  {
    value: ROLES.VIEWER,
    label: "Viewer",
    description: "Read-only access. Any email can sign in as Viewer.",
    icon: Eye,
  },
];

function getRedirectPath() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  return redirect && redirect.startsWith("/") ? redirect : "/";
}

export default function Login() {
  const [, navigate] = useLocation();
  const { isAuthenticated, login } = useAuth();
  const mockUsers = useMemo(() => MockAuthService.getMockUsers(), []);
  const [selectedRole, setSelectedRole] = useState(ROLES.SUPER_ADMIN);
  const roleUsers = useMemo(
    () =>
      mockUsers.filter(
        (user) =>
          user.isActive &&
          MockAuthService.userMatchesLoginRole(user, selectedRole)
      ),
    [mockUsers, selectedRole]
  );
  const [email, setEmail] = useState(
    mockUsers.find((user) => user.roles.includes(ROLES.SUPER_ADMIN))?.email ||
      mockUsers[0]?.email ||
      ""
  );
  const [password, setPassword] = useState(MockAuthService.DEFAULT_PASSWORD);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getRedirectPath(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleRoleChange(role) {
    setError("");
    setSelectedRole(role);
    setEmail(
      mockUsers.find(
        (user) =>
          user.isActive &&
          MockAuthService.userMatchesLoginRole(user, role)
      )?.email || ""
    );
    setPassword(MockAuthService.DEFAULT_PASSWORD);
  }

  async function handleLogin(
    event,
    emailOverride = email,
    passwordOverride = password
  ) {
    event?.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email: emailOverride,
        password: passwordOverride,
        role: selectedRole,
      });
      navigate(getRedirectPath(), { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDefaultLogin() {
    const demoUser = roleUsers[0];

    if (!demoUser) {
      setError(`No demo account is configured for ${selectedRole}.`);
      return;
    }

    setEmail(demoUser.email);
    setPassword(MockAuthService.DEFAULT_PASSWORD);
    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email: demoUser.email,
        password: MockAuthService.DEFAULT_PASSWORD,
        role: selectedRole,
      });
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
                Choose your user type and ValueMomentum identity to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleLogin}>
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-foreground">
                    Which type of user are you?
                  </legend>
                  <div className="grid gap-2">
                    {ROLE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedRole === option.value;

                      return (
                        <Label
                          key={option.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
                            isSelected
                              ? "border-[#056BFC] bg-[#056BFC]/10 text-foreground shadow-sm"
                              : "border-border bg-background hover:border-[#056BFC]/45"
                          }`}
                        >
                          <input
                            type="radio"
                            name="userType"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => handleRoleChange(option.value)}
                            className="sr-only"
                          />
                          <span
                            className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${
                              isSelected
                                ? "bg-[#056BFC] text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 space-y-1">
                            <span className="block text-sm font-semibold">
                              {option.label}
                            </span>
                            <span className="block text-xs leading-5 text-muted-foreground">
                              {option.description}
                            </span>
                          </span>
                        </Label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="email">{selectedRole} account</Label>
                  <Input
                    id="email"
                    list="mock-users"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="Enter your email address"
                  />
                  <datalist id="mock-users">
                    {roleUsers.map((user) => (
                      <option key={user.id} value={user.email}>
                        {user.name}
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
                    {selectedRole === ROLES.VIEWER
                      ? "Continue as Viewer"
                      : "Use selected role account"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo users use password: password
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
