import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Layers,
  Lightbulb,
  Trophy,
  BotMessageSquare,
  Handshake,
  Globe,
  Users,
  Search,
  Bell,
  Menu,
  Moon,
  Sun,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { PERMISSIONS, useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import { userCanManageGuidewireInnovation } from "@/lib/guidewire-innovation-access";
import { readGuidewireInnovationSolutions } from "@/lib/guidewire-innovation-storage";
const LogoDark = "/assets/logo-dark.png";
const LogoLight = "/assets/logo-light.png";
const IconMark = "/assets/favicon-mark.png";

const NAV_ITEMS = [
  { path: "/",                label: "Home",                     icon: LayoutDashboard, aliases: ["/home", "/executive-dashboard"] },
  { path: "/competency-center", label: "Competency Center",      icon: Layers, aliases: ["/competencies"] },
  { path: "/ai-platforms",    label: "AI for Core Platforms",    icon: BotMessageSquare },
  { path: "/innovation",      label: "Innovation Lab",           icon: Lightbulb },
  { path: "/success-stories", label: "Success Stories",          icon: Trophy },
  { path: "/partnerships",    label: "Partnerships & Marketplace", icon: Handshake },
  { path: "/collaboration",  label: "Collaboration Hub",        icon: Globe },
  { path: "/team",           label: "Team & Capability",        icon: Users },
  {
    path: "/user-management",
    label: "User Management",
    icon: UserCog,
    requiredPermissions: [PERMISSIONS.MANAGE_USERS],
  },
];

const ROUTE_LABELS = {
  "/home": "Home",
  "/executive-dashboard": "Home",
  "/competencies": "Competency Center",
  "/earnix-resources": "Earnix Resources",
  "/earnix-demos": "Earnix Demo Library",
  "/innovation/guidewire": "Guidewire Innovation",
  "/user-management": "User Management",
  "/unauthorized": "Unauthorized",
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

export function Layout({ children }) {
  const [location, navigate] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [portalSearch, setPortalSearch] = useState("");
  const { theme, setTheme } = useTheme();
  const { hasPermissions, logout, user } = useAuth();
  
  const visibleNavItems = NAV_ITEMS.filter((item) =>
    hasPermissions(item.requiredPermissions || [])
  );
  function routeMatches(path) {
    if (path === "/") {
      return location === "/" || location === "/home" || location === "/executive-dashboard";
    }

    const item = NAV_ITEMS.find((navItem) => navItem.path === path);
    const candidatePaths = [path, ...(item?.aliases || [])];

    return candidatePaths.some(
      (candidatePath) =>
        location === candidatePath || location.startsWith(`${candidatePath}/`)
    );
  }

  const matchedNavItem = NAV_ITEMS.find((item) => routeMatches(item.path));
  const currentNav = {
    label:
      ROUTE_LABELS[location] ||
      (location.startsWith("/competency-center")
        ? "Competency Center"
        : undefined) ||
      (location.startsWith("/innovation/guidewire")
        ? "Guidewire Innovation"
        : matchedNavItem?.label || NAV_ITEMS[0].label),
  };

  const portalSearchResults = useMemo(() => {
    const normalizedQuery = portalSearch.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      return [];
    }

    const canManageGuidewire = userCanManageGuidewireInnovation(user);
    const visibleSolutions = filterContentForUser(
      readGuidewireInnovationSolutions().filter(
        (solution) => solution.isPublished || canManageGuidewire
      ),
      user
    );

    return visibleSolutions
      .filter((solution) =>
        [
          solution.title,
          solution.subtitle,
          solution.summary,
          solution.tags.join(" "),
          solution.technologies.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      )
      .slice(0, 5)
      .map((solution) => ({
        href: `/innovation/guidewire/${solution.slug}`,
        label: solution.title,
        description: solution.subtitle || solution.summary,
      }));
  }, [portalSearch, user]);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  function handlePortalSearchKeyDown(event) {
    if (event.key === "Enter" && portalSearchResults[0]) {
      navigate(portalSearchResults[0].href);
      setPortalSearch("");
    }
  }

  useEffect(() => {
    setIsMobileNavOpen(false);
    setPortalSearch("");
  }, [location]);

  function renderNavItems({ isMobile = false } = {}) {
    return visibleNavItems.map((item) => {
      const isActive = routeMatches(item.path);
      const isDisabled = item.path === null;
      const Icon = item.icon;
      const showLabel = isMobile || !isCollapsed;

      const inner = (
        <div
          className={`flex items-center ${
            !isMobile && isCollapsed ? "justify-center px-0" : "px-3"
          } py-2.5 rounded-md transition-colors group ${
            isDisabled
              ? "opacity-40 cursor-not-allowed"
              : isActive
              ? "bg-[#056BFC] text-white cursor-pointer"
              : "text-gray-300 hover:bg-[#383838] hover:text-white cursor-pointer"
          }`}
        >
          <Icon
            className={`h-5 w-5 flex-shrink-0 ${
              isActive ? "text-white" : "text-gray-300 group-hover:text-white"
            }`}
          />
          {showLabel && (
            <span className="ml-3 min-w-0 truncate text-sm font-medium">
              {item.label}
            </span>
          )}
        </div>
      );

      return isDisabled ? (
        <div key={item.label}>{inner}</div>
      ) : (
        <Link key={item.path} href={item.path} className="block">
          {inner}
        </Link>
      );
    });
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F8F8FB] dark:bg-background md:h-screen md:overflow-hidden">
      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/45 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#222222] bg-[#303030] transition-transform duration-300 md:hidden ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#222222] bg-[#252525] px-4">
          <img src={LogoDark} alt="ValueMomentum" className="h-8 object-contain" />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close navigation"
            className="text-gray-300 hover:bg-[#383838] hover:text-white"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {renderNavItems({ isMobile: true })}
        </nav>
      </aside>

      <aside 
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } z-20 hidden flex-shrink-0 flex-col border-r border-[#222222] bg-[#303030] transition-all duration-300 md:flex`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#222222] bg-[#252525]">
          {!isCollapsed && (
            <img src={LogoDark} alt="ValueMomentum" className="h-8 object-contain" />
          )}
          {isCollapsed && (
             <img src={IconMark} alt="ValueMomentum" className="h-8 w-8 object-contain mx-auto" />
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          {renderNavItems()}
        </nav>
        
        <div className="p-4 border-t border-[#222222]">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-gray-300 hover:bg-[#383838] hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden md:min-h-0">
        {/* Header */}
        <header className="min-h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between gap-3 px-4 py-3 z-10 shadow-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation"
              className="md:hidden"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="truncate text-lg font-semibold text-[#303030] dark:text-white sm:text-xl">
              {currentNav?.label}
            </h1>
          </div>
          
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search resources..." 
                value={portalSearch}
                onChange={(event) => setPortalSearch(event.target.value)}
                onKeyDown={handlePortalSearchKeyDown}
                className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
              />
              {portalSearch.trim().length >= 2 && (
                <div className="absolute right-0 top-11 z-40 w-80 overflow-hidden rounded-lg border bg-popover shadow-lg">
                  {portalSearchResults.length ? (
                    portalSearchResults.map((result) => (
                      <Link
                        key={result.href}
                        href={result.href}
                        className="block border-b px-4 py-3 last:border-0 hover:bg-muted"
                        onClick={() => setPortalSearch("")}
                      >
                        <p className="text-sm font-semibold text-foreground">{result.label}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {result.description}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No matching Guidewire solutions.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FABD00]"></span>
            </Button>
            
            <div className="hidden h-8 w-px bg-border sm:block"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-3 px-2">
                  <Avatar className="h-8 w-8 ring-2 ring-[#056BFC]/20 ring-offset-2 ring-offset-background">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-36 truncate text-sm font-medium text-[#303030] dark:text-white lg:inline">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="truncate text-sm font-semibold">{user?.name}</p>
                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  <div className="mb-1 flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#056BFC]" />
                    Role
                  </div>
                  <p>{user?.roles?.join(", ")}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
