import { NavLink } from "./NavLink";
import { BookOpen, Calculator, TrendingUp, FileText, Sparkles, Info } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: BookOpen },
    { to: "/basics", label: "Basics", icon: BookOpen },
    { to: "/tools", label: "Tools", icon: Calculator },
    { to: "/simulator", label: "Simulator", icon: TrendingUp },
    { to: "/plan", label: "Plan", icon: FileText },
    { to: "/premium", label: "Premium", icon: Sparkles },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">FinRoad Student</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all flex items-center gap-2"
                activeClassName="!text-primary !bg-secondary"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                activeClassName="!text-primary !bg-secondary"
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
