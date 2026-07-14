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
  { token: "ccm", role: CONTENT_ACCESS_ROLE.CCM },
];

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

function isSuperAdmin(user) {
  return user?.roles?.includes("Super Admin");
}

export function getUserContentAccessRoles(user) {
  if (!user) {
    return [];
  }

  if (isSuperAdmin(user)) {
    return contentAccessRoles.map((role) => role.name);
  }

  return Array.from(
    new Set([
      CONTENT_ACCESS_ROLE_GENERAL,
      ...(user.competencies || []).filter(isSupportedContentAccessRole),
    ])
  );
}

export function userCanViewContent(user, contentOrRole) {
  const contentAccessRole =
    typeof contentOrRole === "string"
      ? contentOrRole
      : contentOrRole?.contentAccessRole;

  if (!isSupportedContentAccessRole(contentAccessRole)) {
    return false;
  }

  if (contentAccessRole === CONTENT_ACCESS_ROLE_GENERAL) {
    return Boolean(user);
  }

  return getUserContentAccessRoles(user).includes(contentAccessRole);
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
