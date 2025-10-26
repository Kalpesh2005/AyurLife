import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Leaf, LogOut, User } from "lucide-react";
import { getStoredAuth, clearStoredAuth } from "@/lib/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = getStoredAuth();

  const handleLogout = () => {
    clearStoredAuth();
    navigate("/");
  };

  return (
    <nav className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            AyurLife
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
