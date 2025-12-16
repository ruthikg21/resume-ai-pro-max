import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileSearch, FileText, Sparkles, Target, Zap, Shield, BarChart3 } from "lucide-react";
import Header from "@/components/Header";

const features = [
  {
    icon: FileSearch,
    title: "ATS Compatibility Check",
    description: "Ensure your resume passes through Applicant Tracking Systems with our deep scan analysis.",
  },
  {
    icon: Target,
    title: "Keyword Optimization",
    description: "Identify missing keywords and optimize your resume for specific job descriptions.",
  },
  {
    icon: BarChart3,
    title: "Detailed Scoring",
    description: "Get comprehensive scores across formatting, content, and impact metrics.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Receive actionable suggestions in seconds to improve your resume's effectiveness.",
  },
];

const benefits = [
  "Increase interview callbacks by up to 3x",
  "Beat 95% of ATS filters automatically",
  "Get personalized improvement suggestions",
  "Optimize for any job description",
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] gradient-hero opacity-5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-3xl rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Analysis
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Land Your Dream Job with an{" "}
              <span className="text-gradient">ATS-Optimized</span> Resume
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload your resume and get instant feedback on ATS compatibility, keyword optimization, 
              and actionable improvements—all powered by advanced AI.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/upload" className="gap-2">
                  Analyze Your Resume
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/results">View Sample Report</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span>Results in 30 Seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Trusted by 50k+ Users</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI analyzes your resume against industry standards and real job requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-lg transition-all duration-300 border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Why Top Candidates Choose ResumeAI
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of job seekers who have improved their interview rates 
                using our AI-powered resume analysis.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <Button variant="accent" size="lg" className="mt-8" asChild>
                <Link to="/upload" className="gap-2">
                  Start Free Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl gradient-hero p-8 flex items-center justify-center">
                <div className="w-full max-w-sm bg-card rounded-2xl shadow-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">ATS Score</span>
                    <span className="text-2xl font-display font-bold text-accent">92/100</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full gradient-accent rounded-full"
                    />
                  </div>
                  <div className="pt-4 space-y-3">
                    {["Keywords Matched", "Format Score", "Impact Score"].map((item, i) => (
                      <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item}</span>
                        <span className="font-medium text-foreground">{85 + i * 5}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Optimize Your Resume?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join over 50,000 job seekers who have improved their interview rates with ResumeAI.
            </p>
            <Button
              variant="accent"
              size="xl"
              asChild
              className="shadow-xl"
            >
              <Link to="/upload" className="gap-2">
                Analyze Your Resume Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
                <FileText className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">ResumeAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ResumeAI. Helping job seekers land their dream jobs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
