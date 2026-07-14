import authData from "@/mock-data/auth.json";
import {
  COMPETENCY_ADMIN_ROLES,
  getPermissionsForRoles,
  ROLES,
} from "@/auth/permissions";

const SESSION_STORAGE_KEY = "tsc-hub.mock-auth.session";
const USER_STORAGE_KEY = "tsc-hub.mock-auth.users";
const COMPETENCY_ADMIN_LOGIN_ROLE = "Competency Admin";
const DEFAULT_VIEWER_EMAIL = "viewer@valuemomentum.com";
const ALL_COMPETENCIES = "All";

const LEGACY_COMPETENCY_ROLE_MAP = {
  "Guidewire Competency Admin": ROLES.COMPETENCY_ADMIN,
  "Earnix Competency Admin": ROLES.COMPETENCY_ADMIN,
  "Duck Creek Competency Admin": ROLES.COMPETENCY_ADMIN,
  "OneShield Competency Admin": ROLES.COMPETENCY_ADMIN,
  "CCM Competency Admin": ROLES.COMPETENCY_ADMIN,
  "Guidewire Admin": ROLES.COMPETENCY_ADMIN,
  "Earnix Admin": ROLES.COMPETENCY_ADMIN,
  "Duck Creek Admin": ROLES.COMPETENCY_ADMIN,
  "OneShield Admin": ROLES.COMPETENCY_ADMIN,
  "CCM Admin": ROLES.COMPETENCY_ADMIN,
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function normalizeRole(role) {
  return LEGACY_COMPETENCY_ROLE_MAP[role] || role;
}

function normalizeRoles(roles = []) {
  const normalizedRoles = roles.map(normalizeRole).filter(Boolean);
  return normalizedRoles.length ? Array.from(new Set(normalizedRoles)) : [ROLES.VIEWER];
}

function normalizeCompetencies(user) {
  const competencies = Array.isArray(user.competencies) ? user.competencies : [];

  if (user.roles?.includes(ROLES.SUPER_ADMIN)) {
    return [ALL_COMPETENCIES];
  }

  if (user.roles?.includes(ROLES.VIEWER) && competencies.length === 0) {
    return [ALL_COMPETENCIES];
  }

  return Array.from(new Set(competencies));
}

function normalizeUser(user) {
  const roles = normalizeRoles(user.roles);

  return {
    id: user.id || `usr-${globalThis.crypto?.randomUUID?.() || Date.now()}`,
    name: user.name?.trim() || "Unnamed User",
    email: user.email?.trim() || "",
    title: user.title?.trim() || roles[0],
    department: user.department?.trim() || "ValueMomentum",
    avatarUrl: user.avatarUrl || "",
    joinedOn: user.joinedOn || new Date().toISOString().slice(0, 10),
    isActive: user.isActive !== false,
    roles,
    competencies: normalizeCompetencies({ ...user, roles }),
  };
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return normalizeUser(user);
}

function withPermissions(user) {
  const safeUser = sanitizeUser(user);

  if (!safeUser) {
    return null;
  }

  return {
    ...safeUser,
    permissions: getPermissionsForRoles(safeUser.roles),
  };
}

function getSeedUsers() {
  return authData.mockUsers.map(normalizeUser);
}

function readUsers() {
  if (!canUseStorage()) {
    return getSeedUsers();
  }

  const storedUsers = window.localStorage.getItem(USER_STORAGE_KEY);

  if (!storedUsers) {
    const seedUsers = getSeedUsers();
    writeUsers(seedUsers);
    return seedUsers;
  }

  try {
    return JSON.parse(storedUsers).map(normalizeUser);
  } catch {
    const seedUsers = getSeedUsers();
    writeUsers(seedUsers);
    return seedUsers;
  }
}

function writeUsers(users) {
  if (canUseStorage()) {
    window.localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(users.map(normalizeUser))
    );
  }
}

function findUserByEmail(email) {
  return readUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

function findUserById(id) {
  return readUsers().find((user) => user.id === id);
}

function ensureDefaultViewerUser() {
  const users = readUsers();
  const existingViewer = users.find(
    (user) => user.isActive && user.roles.includes(ROLES.VIEWER)
  );

  if (existingViewer) {
    return existingViewer;
  }

  const viewer = normalizeUser({
    id: "usr-tsc-viewer-anyone",
    name: "Anyone",
    email: DEFAULT_VIEWER_EMAIL,
    title: ROLES.VIEWER,
    department: "ValueMomentum",
    joinedOn: new Date().toISOString().slice(0, 10),
    isActive: true,
    roles: [ROLES.VIEWER],
    competencies: [ALL_COMPETENCIES],
  });

  writeUsers([...users, viewer]);
  return viewer;
}

function readSession() {
  if (!canUseStorage()) {
    return null;
  }

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
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({ email: user.email, role: user.roles[0] })
  );
}

function clearSession() {
  if (canUseStorage()) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
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

function validateUniqueEmail(email, currentUserId) {
  const existingUser = readUsers().find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.id !== currentUserId
  );

  if (existingUser) {
    throw new Error("A user with this email address already exists.");
  }
}

function validateManagedUser(user) {
  if (!user.name?.trim()) {
    throw new Error("Name is required.");
  }

  if (!user.email?.trim()) {
    throw new Error("Email address is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) {
    throw new Error("Enter a valid email address.");
  }

  if (!user.roles?.length) {
    throw new Error("Assigned role is required.");
  }

  if (!user.department?.trim()) {
    throw new Error("Department is required.");
  }

  if (!user.joinedOn || Number.isNaN(new Date(user.joinedOn).getTime())) {
    throw new Error("Joined date is required.");
  }

  if (
    user.roles.includes(ROLES.COMPETENCY_ADMIN) &&
    !user.competencies?.length
  ) {
    throw new Error("Assign at least one competency to a Competency Admin.");
  }
}

function getActiveSuperAdminCount(users) {
  return users.filter(
    (user) => user.isActive && user.roles.includes(ROLES.SUPER_ADMIN)
  ).length;
}

function protectLastSuperAdmin(nextUsers) {
  if (getActiveSuperAdminCount(nextUsers) < 1) {
    throw new Error("At least one active Super Admin is required.");
  }
}

function toManagedUser(input, existingUser) {
  const role = normalizeRole(input.role || input.roles?.[0] || existingUser?.roles?.[0]);
  const roles = [role];
  const roleChanged = role !== existingUser?.roles?.[0];
  const competencies =
    role === ROLES.SUPER_ADMIN
      ? [ALL_COMPETENCIES]
      : Array.from(new Set(input.competencies || existingUser?.competencies || []));

  return normalizeUser({
    ...existingUser,
    ...input,
    title: input.title || (roleChanged ? role : existingUser?.title) || role,
    roles,
    competencies,
  });
}

export const MockAuthService = {
  COMPETENCY_ADMIN_LOGIN_ROLE,

  userMatchesLoginRole,

  async getCurrentUser() {
    const session = readSession();

    if (!session?.email) {
      return null;
    }

    const user = findUserByEmail(session.email);

    if (!user || !user.isActive) {
      clearSession();
      return null;
    }

    return withPermissions(user);
  },

  async login({ email, role }) {
    const normalizedEmail = email?.trim();

    if (!normalizedEmail && role !== ROLES.VIEWER) {
      throw new Error("Enter an email address to continue.");
    }

    const user =
      role === ROLES.VIEWER && !normalizedEmail
        ? ensureDefaultViewerUser()
        : findUserByEmail(normalizedEmail);

    if (!user) {
      throw new Error("No user exists for this email address.");
    }

    if (!user.isActive) {
      throw new Error("This user account is inactive.");
    }

    if (!userMatchesLoginRole(user, role)) {
      throw new Error(`This account is not configured as ${role}. Choose a matching user type or account.`);
    }

    writeSession(user);
    return withPermissions(user);
  },

  async loginAsDefaultUser() {
    return this.login({
      email: authData.defaultUserEmail,
      role: ROLES.SUPER_ADMIN,
    });
  },

  async logout() {
    clearSession();
  },

  getMockUsers() {
    return readUsers().map(withPermissions);
  },

  getUser(id) {
    return withPermissions(findUserById(id));
  },

  createUser(input) {
    const nextUser = toManagedUser(input);
    validateManagedUser(nextUser);
    validateUniqueEmail(nextUser.email);

    const users = [...readUsers(), nextUser];
    protectLastSuperAdmin(users);
    writeUsers(users);
    return withPermissions(nextUser);
  },

  updateUser(id, input) {
    const users = readUsers();
    const existingUser = users.find((user) => user.id === id);

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const nextUser = toManagedUser(input, existingUser);
    validateManagedUser(nextUser);
    validateUniqueEmail(nextUser.email, id);

    const nextUsers = users.map((user) => (user.id === id ? nextUser : user));
    protectLastSuperAdmin(nextUsers);
    writeUsers(nextUsers);
    return withPermissions(nextUser);
  },

  deleteUser(id) {
    const users = readUsers();
    const nextUsers = users.filter((user) => user.id !== id);

    if (nextUsers.length === users.length) {
      throw new Error("User not found.");
    }

    protectLastSuperAdmin(nextUsers);
    writeUsers(nextUsers);
  },

  setUserActive(id, isActive) {
    return this.updateUser(id, { isActive });
  },

  resetUsers() {
    const seedUsers = getSeedUsers();
    writeUsers(seedUsers);
    return seedUsers.map(withPermissions);
  },
};
