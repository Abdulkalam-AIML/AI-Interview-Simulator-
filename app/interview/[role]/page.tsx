"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2, RefreshCcw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
    id: string;
    question: string;
    keywords: string[];
    idealAnswer: string;
}

export default function InterviewPage() {
    const params = useParams();
    const router = useRouter();
    const role = params.role as string;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{ score: number; feedback: string[] } | null>(null);
    const [sessionFinished, setSessionFinished] = useState(false);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(`/api/questions?role=${role}`);
                const data = await res.json();
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions");
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [role]);

    const handleAnalyze = async () => {
        if (!userAnswer.trim()) return;

        setAnalyzing(true);
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                body: JSON.stringify({
                    userAnswer,
                    idealAnswer: questions[currentIndex].idealAnswer,
                    keywords: questions[currentIndex].keywords,
                }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("Analysis failed");
        } finally {
            setAnalyzing(false);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer("");
            setResult(null);
        } else {
            setSessionFinished(true);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-12 h-12 text-primary" />
            </div>
        );
    }

    if (sessionFinished) {
        return (
            <div className="min-h-screen p-8 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-morphism p-12 rounded-3xl max-w-2xl w-full"
                >
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-4xl font-bold mb-4">Interview Complete!</h1>
                    <p className="text-muted-foreground mb-10">You've finished your practice session for {role}.</p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => window.location.reload()} variant="outline">
                            <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
                        </Button>
                        <Button onClick={() => router.push("/dashboard")}>
                            <LayoutDashboard className="mr-2 w-4 h-4" /> Back to Dashboard
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="min-h-screen p-8 bg-background flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Question {currentIndex + 1} of {questions.length}</span>
                        <h1 className="text-2xl font-bold capitalize">{role} Interview</h1>
                    </div>
                    <Button variant="ghost" onClick={() => router.push("/dashboard")}>Exit Session</Button>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="glass-morphism p-10 rounded-3xl mb-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-secondary/30">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-tight">{currentQuestion?.question}</h2>

                        <textarea
                            className="w-full h-64 bg-secondary/20 rounded-2xl p-6 text-lg text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 border border-white/5"
                            placeholder="Structure your answer clearly..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={analyzing || !!result}
                        />

                        <div className="mt-8 flex justify-end gap-4">
                            {result && (
                                <Button variant="ghost" onClick={() => setUserAnswer("")} className="rounded-xl">
                                    Clear Answer
                                </Button>
                            )}
                            {!result ? (
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={!userAnswer.trim() || analyzing}
                                    size="lg"
                                    className="px-12 py-7 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold"
                                >
                                    {analyzing ? (
                                        <>
                                            <Loader2 className="animate-spin mr-3 h-5 w-5" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        "Submit Answer"
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={nextQuestion}
                                    size="lg"
                                    className="px-12 py-7 text-lg rounded-2xl shadow-xl transition-all font-bold"
                                >
                                    {currentIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}
                                    <ChevronRight className="ml-2 w-6 h-6" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="glass-morphism p-10 rounded-3xl border-t-4 border-t-primary relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -mr-32 -mt-32" />

                            <div className="flex justify-between items-center mb-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold">AI Performance Report</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Numerical analysis based on NLP score</p>
                                </div>
                                <motion.div
                                    initial={{ rotate: -20, scale: 0.5 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    className="text-5xl font-black text-primary drop-shadow-lg"
                                >
                                    {result.score}<span className="text-xl opacity-50">/100</span>
                                </motion.div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-secondary/30 rounded-2xl border border-white/5">
                                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center">
                                            <span className="mr-2">💡</span> Improvement Points
                                        </h4>
                                        <div className="space-y-3">
                                            {result.feedback.map((f, i) => (
                                                <motion.p
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                                    key={i}
                                                    className="text-muted-foreground text-sm flex items-start"
                                                >
                                                    <span className="mr-2 text-primary">•</span> {f}
                                                </motion.p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center">
                                            <span className="mr-2">🎯</span> Ideal Answer Focus
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                                            "{currentQuestion.idealAnswer}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="mt-10 pt-6 border-t border-white/5 flex items-center gap-3 text-sm text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                NLP Analysis Engine: Active and verified
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
