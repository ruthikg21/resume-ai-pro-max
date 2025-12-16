import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Download,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/Header";

// Type definitions for API response
interface AnalysisResults {
  resume_score: number;
  skills_found: string[];
  experience_years: number;
  education: string[];
  suggestions: string[];
}

interface Section {
  name: string;
  score: number;
  status: "good" | "warning" | "error";
}

interface Suggestion {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-accent";
  if (score >= 60) return "text-amber-500";
  return "text-destructive";
};

const getStatusIcon = (status: "good" | "warning" | "error") => {
  switch (status) {
    case "good":
      return <CheckCircle2 className="h-5 w-5 text-accent" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "error":
      return <XCircle className="h-5 w-5 text-destructive" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "low":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getScoreStatus = (score: number): "good" | "warning" | "error" => {
  if (score >= 80) return "good";
  if (score >= 60) return "warning";
  return "error";
};

const Results = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "suggestions">("overview");
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("resumeResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect to upload if no results
      navigate("/upload");
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  // Transform backend data to UI format
  const sections: Section[] = [
    { name: "Resume Score", score: results.resume_score, status: getScoreStatus(results.resume_score) },
    { name: "Skills Found", score: Math.min(results.skills_found.length * 10, 100), status: results.skills_found.length >= 8 ? "good" : results.skills_found.length >= 4 ? "warning" : "error" },
    { name: "Experience", score: Math.min(results.experience_years * 20, 100), status: results.experience_years >= 4 ? "good" : results.experience_years >= 2 ? "warning" : "error" },
  ];

  const formattedSuggestions: Suggestion[] = results.suggestions.map((suggestion, index) => ({
    priority: index === 0 ? "high" : index < 3 ? "medium" : "low",
    title: suggestion,
    description: "",
  }));

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "keywords" as const, label: "Keywords", icon: Target },
    { id: "suggestions" as const, label: "Suggestions", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
            >
              <CheckCircle2 className="h-4 w-4" />
              Analysis Complete
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Your Resume Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's how your resume performs against ATS standards
            </p>
          </div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl gradient-hero text-primary-foreground mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-primary-foreground/70 text-sm mb-2">Overall Score</p>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-6xl md:text-7xl font-display font-bold"
                  >
                    {results.resume_score}
                  </motion.span>
                  <span className="text-2xl text-primary-foreground/70">/100</span>
                </div>
                <p className="text-primary-foreground/80 mt-2">
                  Good start! A few improvements can boost your score.
                </p>
              </div>

              <div className="flex-shrink-0">
                <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary-foreground/20"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-accent"
                    strokeDasharray={339.3}
                    initial={{ strokeDashoffset: 339.3 }}
                    animate={{ strokeDashoffset: 339.3 * (1 - results.resume_score / 100) }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 p-1.5 rounded-xl bg-secondary mb-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid gap-4">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(section.status)}
                        <span className="font-medium text-foreground">{section.name}</span>
                      </div>
                      <span className={`text-2xl font-display font-bold ${getScoreColor(section.score)}`}>
                        {section.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${section.score}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                        className={`h-full rounded-full ${section.score >= 80
                          ? "gradient-accent"
                          : section.score >= 60
                            ? "bg-amber-500"
                            : "bg-destructive"
                          }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "keywords" && (
              <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <h3 className="font-display font-semibold text-foreground">
                    Skills Found ({results.skills_found.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.skills_found.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="space-y-4">
                {formattedSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium uppercase border ${getPriorityColor(
                          suggestion.priority
                        )}`}
                      >
                        {suggestion.priority}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/upload" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Upload New Resume
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
