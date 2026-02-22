import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useThemeToggle } from "@/lib/theme";
import { Vote, Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeToggle();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/polls", label: "Active Polls" },
    { to: "/results", label: "Results" },
    { to: "/history", label: "Poll History" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Vote className="h-6 w-6" />
          PulseVote
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button variant="ghost" size="sm">{l.label}</Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
              <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
                <LogOut className="mr-1 h-3 w-3" /> Logout
              </Button>
            </div>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{l.label}</Button>
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t pt-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Signed in as {user.name}</span>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}><Button className="w-full">Sign Up</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
