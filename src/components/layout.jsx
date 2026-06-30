import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Layers, 
  Lightbulb, 
  PlaySquare, 
  Trophy, 
  BotMessageSquare,
  Handshake,
  Globe,
  Users,
  Search, 
  Bell, 
  Moon, 
  Sun,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
const LogoDark = "/assets/logo-dark.png";
const LogoLight = "/assets/logo-light.png";
const IconMark = "/assets/favicon-mark.png";

const NAV_ITEMS = [
  { path: "/",                label: "Executive Dashboard",      icon: LayoutDashboard },
  { path: "/ai-platforms",    label: "AI for Core Platforms",    icon: BotMessageSquare },
  { path: "/competencies",    label: "Competency Center",        icon: Layers },
  { path: "/innovation",      label: "Innovation Lab",           icon: Lightbulb },
  { path: "/demo-center",     label: "Demo Center",              icon: PlaySquare },
  { path: "/success-stories", label: "Success Stories",          icon: Trophy },
  { path: "/partnerships",    label: "Partnerships & Marketplace", icon: Handshake },
  { path: "/collaboration",  label: "Collaboration Hub",        icon: Globe },
  { path: "/team",           label: "Team & Capability",        icon: Users },
];

export function Layout({ children }) {
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const currentNav = NAV_ITEMS.find((item) => item.path === location) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen w-full bg-[#F8F8FB] dark:bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } flex-shrink-0 bg-[#303030] border-r border-[#222222] transition-all duration-300 flex flex-col z-20`}
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
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            const isDisabled = item.path === null;
            const Icon = item.icon;

            const inner = (
              <div
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-0" : "px-3"
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
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium whitespace-nowrap">
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
          })}
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-[#303030] dark:text-white">
              {currentNav?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search resources..." 
                className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
              />
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
            
            <div className="h-8 w-px bg-border mx-2"></div>
            
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-[#056BFC]/20 ring-offset-2 ring-offset-background">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CX</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}