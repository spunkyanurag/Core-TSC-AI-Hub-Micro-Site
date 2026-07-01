import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, PERMISSIONS, ProtectedRoute } from "@/auth";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout";
import Login from "@/pages/login";
import Unauthorized from "@/pages/unauthorized";
import Dashboard from "@/pages/dashboard";
import Competencies from "@/pages/competencies";
import Assets from "@/pages/assets";
import Innovation from "@/pages/innovation";
import PocShowcase from "@/pages/poc-showcase";
import DemoCenter from "@/pages/demo-center";
import SuccessStories from "@/pages/success-stories";
import Settings from "@/pages/settings";
import EarnixResources from "@/pages/earnix-resources";
import EarnixDemos from "@/pages/earnix-demos";
import AiPlatforms from "@/pages/ai-platforms";
import Partnerships from "@/pages/partnerships";
import Collaboration from "@/pages/collaboration";
import Team from "@/pages/team";
import UserManagement from "@/pages/user-management";

const queryClient = new QueryClient();

function ProtectedPage({ children, requiredPermissions, requiredRoles }) {
  return (
    <ProtectedRoute
      requiredPermissions={requiredPermissions}
      requiredRoles={requiredRoles}
    >
      {children}
    </ProtectedRoute>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/competencies" component={Competencies} />
      <Route path="/assets" component={Assets} />
      <Route path="/innovation" component={Innovation} />
      <Route path="/poc-showcase" component={PocShowcase} />
      <Route path="/demo-center" component={DemoCenter} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/settings">
        <ProtectedPage requiredPermissions={[PERMISSIONS.MANAGE_SETTINGS]}>
          <Settings />
        </ProtectedPage>
      </Route>
      <Route path="/earnix-resources" component={EarnixResources} />
      <Route path="/earnix-demos" component={EarnixDemos} />
      <Route path="/ai-platforms" component={AiPlatforms} />
      <Route path="/partnerships" component={Partnerships} />
      <Route path="/collaboration" component={Collaboration} />
      <Route path="/team" component={Team} />
      <Route path="/user-management">
        <ProtectedPage requiredPermissions={[PERMISSIONS.MANAGE_USERS]}>
          <UserManagement />
        </ProtectedPage>
      </Route>
      <Route path="/unauthorized" component={Unauthorized} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  return (
    <ProtectedRoute>
      <Layout>
        <Router />
      </Layout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route>
        <AuthenticatedApp />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tsc-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <WouterRouter>
              <AppRoutes />
            </WouterRouter>
          </AuthProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
