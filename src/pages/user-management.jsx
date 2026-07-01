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
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MockAuthService, ROLES } from "@/auth";

const roleStyles = {
  [ROLES.ADMINISTRATOR]: "border-[#056BFC]/25 bg-[#056BFC]/10 text-[#055FE0]",
  [ROLES.COMPETENCY_OWNER]: "border-[#FABD00]/35 bg-[#FABD00]/12 text-[#9A6500]",
  [ROLES.GENERAL_USER]: "border-border bg-muted text-muted-foreground",
};

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
  const users = useMemo(() => MockAuthService.getMockUsers(), []);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        [user.name, user.email, user.department, user.title]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [roleFilter, search, statusFilter, users]);

  const administrators = users.filter((user) =>
    user.roles.includes(ROLES.ADMINISTRATOR)
  ).length;
  const competencyOwners = users.filter((user) =>
    user.roles.includes(ROLES.COMPETENCY_OWNER)
  ).length;
  const activeUsers = users.filter((user) => user.isActive).length;

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="text-3xl font-semibold text-[#303030] dark:text-white">
          User Management
        </h2>
        <p className="text-base text-muted-foreground">
          Manage portal access, roles, and permissions.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={users.length}
          tone="bg-[#056BFC]/10 text-[#056BFC]"
        />
        <StatCard
          icon={UserCheck}
          label="Active"
          value={activeUsers}
          tone="bg-[#23C842]/10 text-[#23C842]"
        />
        <StatCard
          icon={ShieldCheck}
          label="Administrators"
          value={administrators}
          tone="bg-[#056BFC]/10 text-[#056BFC]"
        />
        <StatCard
          icon={UserCog}
          label="Competency Owners"
          value={competencyOwners}
          tone="bg-[#FABD00]/14 text-[#D99A00]"
        />
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1fr)_220px_220px_auto]">
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
              <option value={ROLES.ADMINISTRATOR}>Administrators</option>
              <option value={ROLES.COMPETENCY_OWNER}>Competency Owners</option>
              <option value={ROLES.GENERAL_USER}>General Users</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Button type="button" className="h-11 px-5">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b bg-muted/35 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Active</th>
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
                          <p className="truncate font-semibold text-[#303030] dark:text-white">
                            {user.name}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-[#303030] dark:text-white">
                        {user.department}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.title}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex max-w-48 items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                          roleStyles[primaryRole]
                        }`}
                      >
                        {primaryRole}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {formatDate(user.joinedOn)}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex h-5 w-5 rounded-full border-2 ${
                          user.isActive
                            ? "border-[#23C842] bg-[#23C842]/10"
                            : "border-muted-foreground/40 bg-muted"
                        }`}
                        aria-label={user.isActive ? "Active" : "Inactive"}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" aria-label={`Edit ${user.name}`}>
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${user.name}`}>
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
    </div>
  );
}
