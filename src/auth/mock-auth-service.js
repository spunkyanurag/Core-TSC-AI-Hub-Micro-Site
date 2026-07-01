import authData from "@/mock-data/auth.json";
import { getPermissionsForRoles } from "@/auth/permissions";

const SESSION_STORAGE_KEY = "tsc-hub.mock-auth.session";

function withPermissions(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    permissions: getPermissionsForRoles(user.roles),
  };
}

function findUserByEmail(email) {
  return authData.mockUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

export const MockAuthService = {
  async getCurrentUser() {
    const sessionEmail = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (!sessionEmail) {
      return null;
    }

    return withPermissions(findUserByEmail(sessionEmail));
  },

  async login({ email }) {
    const user = findUserByEmail(email);

    if (!user) {
      throw new Error("No mock user exists for this email address.");
    }

    window.localStorage.setItem(SESSION_STORAGE_KEY, user.email);
    return withPermissions(user);
  },

  async loginAsDefaultUser() {
    return this.login({ email: authData.defaultUserEmail });
  },

  async logout() {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  },

  getMockUsers() {
    return authData.mockUsers.map(withPermissions);
  },
};
