import { NavLink } from "react-router-dom";
import { Shield } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/create", label: "Create Proposal" },
  { path: "/profile", label: "Profile" },
  { path: "/delegate", label: "Delegation" },
  { path: "/analytics", label: "Analytics" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 rounded-lg bg-neon-gradient flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.45)]">
            <Shield className="w-5 h-5 text-space-darker" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-foreground">
            NEXUS<span className="text-primary">VOTE</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "px-3 py-1.5 rounded-full transition-all duration-200 border border-transparent",
                  "hover:border-neon-cyan/60 hover:bg-neon-cyan/5 hover:text-neon-cyan",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[0_0_18px_rgba(0,240,255,0.5)]"
                    : "text-muted-foreground",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
