import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Shield, MoreHorizontal } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/create", label: "Create Proposal" },
  { path: "/profile", label: "Profile" },
  { path: "/delegate", label: "Delegation" },
  { path: "/analytics", label: "Analytics" },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 rounded-lg bg-neon-gradient flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.45)]">
            <Shield className="w-5 h-5 text-space-darker" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-foreground">
            Nexus <span className="text-primary">Governance</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
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

        {/* Mobile menu button */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 bg-background/60 text-muted-foreground hover:border-neon-cyan/70 hover:text-neon-cyan transition-colors"
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMobileOpen && (
        <div className="sm:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 rounded-lg transition-all duration-200 border border-transparent",
                    "hover:border-neon-cyan/60 hover:bg-neon-cyan/5 hover:text-neon-cyan",
                    isActive ? "text-neon-cyan" : "text-muted-foreground",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
