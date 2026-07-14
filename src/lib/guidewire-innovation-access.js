import { ROLES } from "@/auth";

export const GUIDEWIRE_COMPETENCY = "Guidewire";

export function userHasGuidewireCompetency(user) {
  return user?.competencies?.some((competency) =>
    [GUIDEWIRE_COMPETENCY, "All"].includes(competency)
  );
}

export function userCanManageGuidewireInnovation(user) {
  return (
    user?.roles?.includes(ROLES.SUPER_ADMIN) ||
    (user?.roles?.includes(ROLES.COMPETENCY_ADMIN) &&
      userHasGuidewireCompetency(user))
  );
}
