import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/auth/AuthContext";

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredRoles = [],
}) {
  const [location, navigate] = useLocation();
  const { hasPermissions, hasRole, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(location)}`, { replace: true });
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      (!hasRole(requiredRoles) || !hasPermissions(requiredPermissions))
    ) {
      navigate("/unauthorized", { replace: true });
    }
  }, [
    hasPermissions,
    hasRole,
    isAuthenticated,
    isLoading,
    navigate,
    requiredPermissions,
    requiredRoles,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!hasRole(requiredRoles) || !hasPermissions(requiredPermissions)) {
    return null;
  }

  return children;
}
