import { NavLink } from "./NavLink";
import { BookOpen, Calculator, TrendingUp, FileText, Sparkles, Info, School, Route, Gamepad2, Briefcase, Rocket } from "lucide-react";
import logo from "@/assets/logo.png";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: BookOpen },
    { to: "/basics", label: "Basics", icon: BookOpen },
    { to: "/tools", label: "Tools", icon: Calculator },
    { to: "/simulator", label: "Simulator", icon: TrendingUp },
    { to: "/learning-path", label: "My Path", icon: Route },
    { to: "/simulations", label: "Scenarios", icon: Gamepad2 },
    { to: "/career-quiz", label: "Career", icon: Briefcase },
    { to: "/life-game", label: "Life Game", icon: Rocket },
    { to: "/premium", label: "Premium", icon: Sparkles },
    { to: "/for-schools", label: "For Schools", icon: School },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logo} alt="FinRoad Logo" className="h-12 w-auto" />
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all flex items-center gap-2"
                activeClassName="!text-primary !bg-secondary"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center gap-1 overflow-x-auto">
              {navItems.slice(0, 5).map(item => (
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
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;