import contentAccessRoles from "@/mock-data/content-access-roles.json";

export const CONTENT_ACCESS_ROLES = contentAccessRoles;

export const CONTENT_ACCESS_ROLE = Object.freeze(
  Object.fromEntries(
    contentAccessRoles.map((role) => [
      role.id.toUpperCase().replace(/-/g, "_"),
      role.name,
    ])
  )
);

export const CONTENT_ACCESS_ROLE_GENERAL =
  contentAccessRoles.find((role) => role.id === "general")?.name || "General";

const supportedRoleNames = new Set(contentAccessRoles.map((role) => role.name));
const platformRoleMatchers = [
  { token: "guidewire", role: CONTENT_ACCESS_ROLE.GUIDEWIRE },
  { token: "oneshield", role: CONTENT_ACCESS_ROLE.ONESHIELD },
  { token: "duckcreek", role: CONTENT_ACCESS_ROLE.DUCK_CREEK },
  { token: "earnix", role: CONTENT_ACCESS_ROLE.EARNIX },
  { token: "hyperexponential", role: CONTENT_ACCESS_ROLE.HYPEREXPONENTIAL },
  { token: "smartcomm", role: CONTENT_ACCESS_ROLE.SMARTCOMM },
  { token: "smartcommunications", role: CONTENT_ACCESS_ROLE.SMARTCOMM },
  { token: "quadient", role: CONTENT_ACCESS_ROLE.SMARTCOMM },
  { token: "opentext", role: CONTENT_ACCESS_ROLE.OPENTEXT },
  { token: "ghostdraft", role: CONTENT_ACCESS_ROLE.GHOSTDRAFT },
  { token: "ccm", role: CONTENT_ACCESS_ROLE.SMARTCOMM },
];

const legacyContentAccessRoleMigration = {
  CCM: [
    CONTENT_ACCESS_ROLE.SMARTCOMM,
    CONTENT_ACCESS_ROLE.OPENTEXT,
    CONTENT_ACCESS_ROLE.GHOSTDRAFT,
  ],
};

export class ContentAccessForbiddenError extends Error {
  constructor(contentAccessRole) {
    super("Forbidden: content is outside the authenticated user's access scope.");
    this.name = "ContentAccessForbiddenError";
    this.status = 403;
    this.contentAccessRole = contentAccessRole;
  }
}

export function isSupportedContentAccessRole(role) {
  return supportedRoleNames.has(role);
}

export function getContentAccessRoleForPlatform(platform = "") {
  const normalizedPlatform = platform.toLowerCase().replace(/\s+/g, "");
  const matchedRoles = platformRoleMatchers
    .filter(({ token }) => normalizedPlatform.includes(token))
    .map(({ role }) => role);
  const uniqueRoles = Array.from(new Set(matchedRoles));

  if (uniqueRoles.length === 1) {
    return uniqueRoles[0];
  }

  return CONTENT_ACCESS_ROLE_GENERAL;
}

export function expandContentAccessRoles(roles = []) {
  return Array.from(
    new Set(
      roles.flatMap((role) => legacyContentAccessRoleMigration[role] || role)
    )
  );
}

function isSuperAdmin(user) {
  return user?.roles?.includes("Super Admin");
}

export function getUserContentAccessRoles(user) {
  if (!user) {
    return [];
  }

  if (isSuperAdmin(user) || user.competencies?.includes("All")) {
    return contentAccessRoles.map((role) => role.name);
  }

  const expandedCompetencies = expandContentAccessRoles(user.competencies || []);

  return Array.from(
    new Set([
      CONTENT_ACCESS_ROLE_GENERAL,
      ...expandedCompetencies.filter(isSupportedContentAccessRole),
    ])
  );
}

export function userCanViewContent(user, contentOrRole) {
  const contentAccessRole =
    typeof contentOrRole === "string"
      ? contentOrRole
      : contentOrRole?.contentAccessRole;
  const candidateRoles = expandContentAccessRoles([contentAccessRole]);

  if (!candidateRoles.some(isSupportedContentAccessRole)) {
    return false;
  }

  if (candidateRoles.includes(CONTENT_ACCESS_ROLE_GENERAL)) {
    return Boolean(user);
  }

  const userAccessRoles = getUserContentAccessRoles(user);

  return candidateRoles.some((role) => userAccessRoles.includes(role));
}

export function userCanManageContentRole(user, contentOrRole) {
  const contentAccessRole =
    typeof contentOrRole === "string"
      ? contentOrRole
      : contentOrRole?.contentAccessRole;

  if (!user?.permissions?.includes("competencies:manage")) {
    return false;
  }

  if (isSuperAdmin(user)) {
    return true;
  }

  return userCanViewContent(user, contentAccessRole);
}

export function filterContentForUser(items = [], user) {
  return items.filter((item) => {
    validateContentItem(item);
    return userCanViewContent(user, item);
  });
}

export function validateContentAccessRole(role) {
  if (!isSupportedContentAccessRole(role)) {
    throw new Error(
      `A content access role is required and must be one of: ${contentAccessRoles
        .map((contentRole) => contentRole.name)
        .join(", ")}.`
    );
  }

  return role;
}

export function validateContentItem(content) {
  validateContentAccessRole(content?.contentAccessRole);
  return content;
}

export function assertUserCanViewContent(user, contentOrRole) {
  if (!userCanViewContent(user, contentOrRole)) {
    const contentAccessRole =
      typeof contentOrRole === "string"
        ? contentOrRole
        : contentOrRole?.contentAccessRole;

    throw new ContentAccessForbiddenError(contentAccessRole);
  }

  return true;
}
