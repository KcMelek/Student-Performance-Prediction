import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
            <div>
              <p className="text-sm text-muted-foreground">Academic Performance Analytics</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/" 
                  ? "bg-university text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              Grade Prediction
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/dashboard" 
                  ? "bg-university text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              Analytics Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;