import { useMemo, useState } from "react";
import {
  Edit,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserCog,
  UserX,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { COMPETENCY_ADMIN_ROLES, MockAuthService, ROLES } from "@/auth";
import { CONTENT_ACCESS_ROLES, CONTENT_ACCESS_ROLE_GENERAL } from "@/lib/content-access";

const roleOptions = [
  ROLES.SUPER_ADMIN,
  ROLES.COMPETENCY_ADMIN,
  ROLES.VIEWER,
];

const roleStyles = {
  [ROLES.SUPER_ADMIN]: "border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]",
  [ROLES.COMPETENCY_ADMIN]: "border-[#FABD00]/35 bg-[#FABD00]/12 text-[#9A6500]",
  [ROLES.VIEWER]: "border-border bg-muted text-muted-foreground",
};

const competencyOptions = CONTENT_ACCESS_ROLES.filter(
  (role) => role.name !== CONTENT_ACCESS_ROLE_GENERAL
);

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getEmptyForm() {
  return {
    name: "",
    email: "",
    role: ROLES.VIEWER,
    competencies: ["All"],
    department: "ValueMomentum",
    joinedOn: getToday(),
    isActive: true,
  };
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function getCompetencyLabel(user) {
  if (user.competencies?.includes("All")) {
    return user.roles.includes(ROLES.VIEWER)
      ? "All published competencies"
      : "All competencies";
  }

  if (user.competencies?.length) {
    return user.roles.includes(ROLES.COMPETENCY_ADMIN)
      ? user.competencies.map((competency) => `${competency} Admin`).join(", ")
      : user.competencies.join(", ");
  }

  return "Not assigned";
}

function getCompetenciesForRole(role, currentCompetencies = []) {
  if (role === ROLES.SUPER_ADMIN || role === ROLES.VIEWER) {
    return ["All"];
  }

  return currentCompetencies.filter((competency) => competency !== "All");
}

function getTitleForRole(role, competencies = []) {
  if (role === ROLES.COMPETENCY_ADMIN && competencies.length) {
    return `${competencies.join(", ")} Admin`;
  }

  return role;
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="flex items-center gap-5 p-6">
        <div className={`flex h-14 w-14 items-center justify-center rounded-lg ${tone}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-[#303030] dark:text-white">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState(() => MockAuthService.getMockUsers());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [competencyFilter, setCompetencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(getEmptyForm);
  const [formError, setFormError] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        [user.name, user.email, user.department, user.title, getCompetencyLabel(user)]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
      const matchesCompetency =
        competencyFilter === "all" ||
        user.competencies?.includes("All") ||
        user.competencies?.includes(competencyFilter);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesCompetency && matchesStatus;
    });
  }, [competencyFilter, roleFilter, search, statusFilter, users]);

  const superAdmins = users.filter((user) =>
    user.roles.includes(ROLES.SUPER_ADMIN)
  ).length;
  const competencyAdmins = users.filter((user) =>
    user.roles.some((role) => COMPETENCY_ADMIN_ROLES.includes(role))
  ).length;
  const activeUsers = users.filter((user) => user.isActive).length;

  function refreshUsers() {
    setUsers(MockAuthService.getMockUsers());
  }

  function openCreateDialog() {
    setEditingUser(null);
    setForm(getEmptyForm());
    setFormError("");
    setIsDialogOpen(true);
  }

  function openEditDialog(user) {
    const role = user.roles[0] || ROLES.VIEWER;

    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role,
      competencies: getCompetenciesForRole(role, user.competencies),
      department: user.department,
      joinedOn: user.joinedOn,
      isActive: user.isActive,
    });
    setFormError("");
    setIsDialogOpen(true);
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateRole(role) {
    setForm((current) => ({
      ...current,
      role,
      competencies: getCompetenciesForRole(role, current.competencies),
    }));
  }

  function toggleCompetency(competency, isChecked) {
    setForm((current) => {
      const nextCompetencies = isChecked
        ? Array.from(new Set([...current.competencies, competency]))
        : current.competencies.filter((item) => item !== competency);

      return { ...current, competencies: nextCompetencies };
    });
  }

  function buildPayload() {
    const competencies = getCompetenciesForRole(form.role, form.competencies);
    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      competencies,
      department: form.department,
      title: getTitleForRole(form.role, competencies),
      joinedOn: form.joinedOn,
      isActive: form.isActive,
    };

    return payload;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    try {
      if (editingUser) {
        MockAuthService.updateUser(editingUser.id, buildPayload());
      } else {
        MockAuthService.createUser(buildPayload());
      }

      refreshUsers();
      setIsDialogOpen(false);
    } catch (error) {
      setFormError(error.message);
    }
  }

  function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
      return;
    }

    try {
      MockAuthService.deleteUser(user.id);
      refreshUsers();
    } catch (error) {
      setFormError(error.message);
      setEditingUser(user);
      setIsDialogOpen(true);
    }
  }

  function handleToggleActive(user) {
    try {
      MockAuthService.setUserActive(user.id, !user.isActive);
      refreshUsers();
    } catch (error) {
      setFormError(error.message);
      setEditingUser(user);
      setIsDialogOpen(true);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="text-3xl font-semibold text-[#303030] dark:text-white">
          User Management
        </h2>
        <p className="text-base text-muted-foreground">
          Manage users, login roles, competency assignments, and active status.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={users.length} tone="bg-[#056BFC]/10 text-[#056BFC]" />
        <StatCard icon={UserCheck} label="Active" value={activeUsers} tone="bg-[#23C842]/10 text-[#23C842]" />
        <StatCard icon={ShieldCheck} label="Super Admins" value={superAdmins} tone="bg-[#056BFC]/10 text-[#056BFC]" />
        <StatCard icon={UserCog} label="Competency Admins" value={competencyAdmins} tone="bg-[#FABD00]/14 text-[#D99A00]" />
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1fr)_220px_220px_220px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, or department..."
              className="h-11 pl-10"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All roles</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <select
            value={competencyFilter}
            onChange={(event) => setCompetencyFilter(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All competencies</option>
            {competencyOptions.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Button type="button" className="h-11 px-5" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left">
            <thead className="border-b bg-muted/35 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Competencies</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => {
                const primaryRole = user.roles[0];

                return (
                  <tr key={user.id} className="bg-card">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#056BFC] text-sm font-semibold text-white">
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#303030] dark:text-white">{user.name}</p>
                          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-[#303030] dark:text-white">{user.department}</p>
                      <p className="text-sm text-muted-foreground">{user.title}</p>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant="outline" className={roleStyles[primaryRole]}>
                        {primaryRole}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex max-w-64 items-center rounded-full border border-[#056BFC]/20 bg-[#056BFC]/5 px-3 py-1 text-xs font-medium text-[#055FE0]">
                        {getCompetencyLabel(user)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {formatDate(user.joinedOn)}
                    </td>
                    <td className="px-6 py-5">
                      <Badge
                        variant="outline"
                        className={user.isActive ? "border-[#23C842]/25 bg-[#23C842]/10 text-[#18772A]" : "border-muted bg-muted text-muted-foreground"}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" aria-label={`Edit ${user.name}`} onClick={() => openEditDialog(user)}>
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`} onClick={() => handleToggleActive(user)}>
                          {user.isActive ? (
                            <UserX className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-[#18772A]" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${user.name}`} onClick={() => handleDelete(user)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!filteredUsers.length && (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No users match the selected filters.
          </div>
        )}
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Update User" : "Create User"}</DialogTitle>
            <DialogDescription>
              Role and competency assignments drive login, navigation, and content authorization.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>Name</span>
                <Input value={form.name} onChange={(event) => updateForm("name", event.target.value)} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Email Address</span>
                <Input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Department</span>
                <Input value={form.department} onChange={(event) => updateForm("department", event.target.value)} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Joined</span>
                <Input type="date" value={form.joinedOn} onChange={(event) => updateForm("joinedOn", event.target.value)} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Assigned Role</span>
                <select
                  value={form.role}
                  onChange={(event) => updateRole(event.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-md border border-border/70 px-3 py-3 text-sm font-medium">
                <Checkbox
                  checked={form.isActive}
                  onCheckedChange={(checked) => updateForm("isActive", checked === true)}
                />
                Active user
              </label>
            </div>

            <div className="space-y-3 rounded-lg border border-border/70 p-4">
              <div>
                <p className="text-sm font-semibold">Assigned Competency</p>
                <p className="text-xs text-muted-foreground">
                  Competency Admins may have one or multiple competency admin roles.
                </p>
              </div>

              {form.role === ROLES.SUPER_ADMIN || form.role === ROLES.VIEWER ? (
                <div className="rounded-md bg-muted/45 px-3 py-2 text-sm text-muted-foreground">
                  {form.role === ROLES.SUPER_ADMIN
                    ? "Super Admin receives unrestricted access to all competencies."
                    : "Viewer receives read-only access to all published competency information."}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {competencyOptions.map((role) => (
                    <label key={role.id} className="flex items-center gap-3 rounded-md border border-border/70 px-3 py-2 text-sm">
                      <Checkbox
                        checked={form.competencies.includes(role.name)}
                        onCheckedChange={(checked) => toggleCompetency(role.name, checked === true)}
                      />
                      {role.name} Admin
                    </label>
                  ))}
                </div>
              )}
            </div>

            {formError && (
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
