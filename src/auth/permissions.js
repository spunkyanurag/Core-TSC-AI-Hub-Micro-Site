export const ROLES = Object.freeze({
  ADMINISTRATOR: "Administrator",
  COMPETENCY_OWNER: "Competency Owner",
  GENERAL_USER: "General ValueMomentum User",
});

export const PERMISSIONS = Object.freeze({
  VIEW_DASHBOARD: "dashboard:view",
  VIEW_CORE_PLATFORMS: "core-platforms:view",
  VIEW_COMPETENCIES: "competencies:view",
  MANAGE_COMPETENCIES: "competencies:manage",
  VIEW_INNOVATION: "innovation:view",
  VIEW_DEMOS: "demos:view",
  VIEW_SUCCESS_STORIES: "success-stories:view",
  VIEW_PARTNERSHIPS: "partnerships:view",
  VIEW_COLLABORATION: "collaboration:view",
  VIEW_TEAM: "team:view",
  VIEW_ASSETS: "assets:view",
  VIEW_EARNIX_RESOURCES: "earnix-resources:view",
  MANAGE_SETTINGS: "settings:manage",
  MANAGE_USERS: "users:manage",
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.ADMINISTRATOR]: Object.values(PERMISSIONS),
  [ROLES.COMPETENCY_OWNER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_CORE_PLATFORMS,
    PERMISSIONS.VIEW_COMPETENCIES,
    PERMISSIONS.MANAGE_COMPETENCIES,
    PERMISSIONS.VIEW_INNOVATION,
    PERMISSIONS.VIEW_DEMOS,
    PERMISSIONS.VIEW_SUCCESS_STORIES,
    PERMISSIONS.VIEW_PARTNERSHIPS,
    PERMISSIONS.VIEW_COLLABORATION,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.VIEW_ASSETS,
    PERMISSIONS.VIEW_EARNIX_RESOURCES,
  ],
  [ROLES.GENERAL_USER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_CORE_PLATFORMS,
    PERMISSIONS.VIEW_COMPETENCIES,
    PERMISSIONS.VIEW_INNOVATION,
    PERMISSIONS.VIEW_DEMOS,
    PERMISSIONS.VIEW_SUCCESS_STORIES,
    PERMISSIONS.VIEW_PARTNERSHIPS,
    PERMISSIONS.VIEW_COLLABORATION,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.VIEW_ASSETS,
    PERMISSIONS.VIEW_EARNIX_RESOURCES,
  ],
});

export function getPermissionsForRoles(roles = []) {
  return Array.from(
    new Set(roles.flatMap((role) => ROLE_PERMISSIONS[role] || []))
  );
}

export function userHasAnyRole(user, requiredRoles = []) {
  if (!requiredRoles.length) {
    return true;
  }

  return requiredRoles.some((role) => user?.roles?.includes(role));
}

export function userHasPermissions(user, requiredPermissions = []) {
  if (!requiredPermissions.length) {
    return true;
  }

  return requiredPermissions.every((permission) =>
    user?.permissions?.includes(permission)
  );
}
