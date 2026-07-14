import authData from "@/mock-data/auth.json";
import {
  COMPETENCY_ADMIN_ROLES,
  getPermissionsForRoles,
  ROLES,
} from "@/auth/permissions";

const SESSION_STORAGE_KEY = "tsc-hub.mock-auth.session";
const COMPETENCY_ADMIN_LOGIN_ROLE = "Competency Admin";

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

function getDisplayNameFromEmail(email) {
  const localPart = email.split("@")[0] || "Viewer";

  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createViewerUser(email) {
  return {
    id: `viewer-${email.toLowerCase()}`,
    name: getDisplayNameFromEmail(email),
    email,
    title: "Viewer",
    department: "ValueMomentum",
    avatarUrl: "",
    joinedOn: "2026-07-14",
    isActive: true,
    roles: [ROLES.VIEWER],
    competencies: [],
  };
}

function readSession() {
  const sessionValue = window.localStorage.getItem(SESSION_STORAGE_KEY);

  if (!sessionValue) {
    return null;
  }

  try {
    return JSON.parse(sessionValue);
  } catch {
    return { email: sessionValue };
  }
}

function writeSession(user) {
  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({ email: user.email, role: user.roles[0] })
  );
}

function userMatchesLoginRole(user, role) {
  if (!role) {
    return true;
  }

  if (role === COMPETENCY_ADMIN_LOGIN_ROLE) {
    return user.roles.some((userRole) =>
      COMPETENCY_ADMIN_ROLES.includes(userRole)
    );
  }

  return user.roles.includes(role);
}

export const MockAuthService = {
  async getCurrentUser() {
    const session = readSession();

    if (!session?.email) {
      return null;
    }

    if (session.role === ROLES.VIEWER) {
      return withPermissions(createViewerUser(session.email));
    }

    const user = findUserByEmail(session.email);

    if (user) {
      return withPermissions(user);
    }

    return null;
  },

  async login({ email, role }) {
    const normalizedEmail = email?.trim();

    if (!normalizedEmail) {
      throw new Error("Enter an email address to continue.");
    }

    const user =
      role === ROLES.VIEWER
        ? createViewerUser(normalizedEmail)
        : findUserByEmail(normalizedEmail);

    if (!user) {
      throw new Error("No mock user exists for this email address.");
    }

    if (!userMatchesLoginRole(user, role)) {
      throw new Error(`This account is not configured as ${role}. Choose a matching user type or account.`);
    }

    writeSession(user);
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
