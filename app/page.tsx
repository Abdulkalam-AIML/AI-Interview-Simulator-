"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

            <div className="absolute top-6 right-6 z-10">
                <ThemeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full glass-morphism p-12 rounded-3xl relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h1
                        className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient"
                    >
                        Ace Your Next Interview
                    </motion.h1>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Practice with our AI-powered simulator and get real-time feedback on your answers
                        using advanced NLP algorithms. No credit card required.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/dashboard">
                        <Button size="lg" className="px-10 py-7 text-xl rounded-2xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 active:scale-95">
                            Start Practice Free
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="secondary" size="lg" className="px-10 py-7 text-xl rounded-2xl font-bold border border-white/10 hover:bg-secondary/80 transition-all">
                            See How It Works
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        { title: "Real Questions", desc: "Curated from top companies", icon: "💎" },
                        { title: "AI Feedback", desc: "NLP-powered scoring", icon: "⚡" },
                        { title: "Progress Tracking", desc: "Monitor your growth", icon: "📊" }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="p-8 rounded-3xl bg-secondary/30 border border-white/5 backdrop-blur-sm flex flex-col items-center"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-12 text-muted-foreground text-sm z-10"
            >
                &copy; 2026 AI Interview Simulator. Powered by Local NLP.
            </motion.footer>
        </div>
    );
}
