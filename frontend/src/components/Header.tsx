import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent shadow-glow">
            <FileText className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
            ResumeAI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              location.pathname === "/upload" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Analyze Resume
          </Link>
          <Link
            to="/results"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              location.pathname === "/results" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Results
          </Link>
        </nav>

        <Button variant="accent" size="sm" asChild>
          <Link to="/upload" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Get Started
          </Link>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
