import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Use environment variable, or fallback to Render backend URL
      const API_URL = import.meta.env.VITE_API_URL || "https://resume-ai-backend-76li.onrender.com";
      console.log("Using API URL:", API_URL);

      const response = await fetch(`${API_URL}/analyze-resume`, {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to analyze resume: ${response.status}`);
      }

      const results = await response.json();
      console.log("Analysis results:", results);

      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });

      // Store results in sessionStorage to pass to Results page
      sessionStorage.setItem("resumeResults", JSON.stringify(results));
      navigate("/results");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [file, navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Upload Your Resume
            </h1>
            <p className="text-muted-foreground text-lg">
              Drop your resume below and let our AI analyze it for ATS compatibility
            </p>
          </div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${isDragging
              ? "border-accent bg-accent/5 scale-[1.02]"
              : file
                ? "border-accent/50 bg-accent/5"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isAnalyzing}
            />

            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  key="upload-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-accent flex items-center justify-center shadow-glow">
                    <UploadIcon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Drag and drop your resume
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse your files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF and DOCX (max 10MB)
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="file-preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8"
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card border border-border">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      disabled={isAnalyzing}
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Analyze Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="min-w-[200px]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border"
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              Tips for Best Results
            </h3>
            <ul className="space-y-3">
              {[
                "Use a clean, single-column format for better ATS parsing",
                "Include relevant keywords from the job description",
                "Avoid headers, footers, and complex formatting",
                "Use standard section headings like 'Experience' and 'Education'",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Upload;
