import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MockAuthService } from "@/auth/mock-auth-service";
import { userHasAnyRole, userHasPermissions } from "@/auth/permissions";

const AuthContext = createContext(null);

export function AuthProvider({ children, authService = MockAuthService }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const currentUser = await authService.getCurrentUser();

        if (isMounted) {
          setUser(currentUser);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [authService]);

  const login = useCallback(
    async (credentials) => {
      const authenticatedUser = await authService.login(credentials);
      setUser(authenticatedUser);
      return authenticatedUser;
    },
    [authService]
  );

  const loginAsDefaultUser = useCallback(async () => {
    const authenticatedUser = await authService.loginAsDefaultUser();
    setUser(authenticatedUser);
    return authenticatedUser;
  }, [authService]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, [authService]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      loginAsDefaultUser,
      logout,
      hasRole: (roles = []) =>
        userHasAnyRole(user, Array.isArray(roles) ? roles : [roles]),
      hasPermissions: (permissions = []) =>
        userHasPermissions(
          user,
          Array.isArray(permissions) ? permissions : [permissions]
        ),
    }),
    [isLoading, login, loginAsDefaultUser, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
