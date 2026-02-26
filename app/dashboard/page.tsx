"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const roles = [
    { id: "frontend", name: "Frontend Engineer", icon: "🌐", color: "from-blue-500 to-cyan-400" },
    { id: "backend", name: "Backend Developer", icon: "⚙️", color: "from-green-500 to-emerald-400" },
    { id: "ai", name: "AI/ML Engineer", icon: "🧠", color: "from-purple-500 to-pink-400" },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-background p-8">
            <header className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground text-sm">Select a role to begin your mock interview.</p>
                </div>
                <ThemeToggle />
            </header>

            <main className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {roles.map((role) => (
                        <Link key={role.id} href={`/interview/${role.id}`}>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="group cursor-pointer relative overflow-hidden rounded-3xl glass-morphism p-8 h-64 flex flex-col justify-end transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${role.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />

                                <motion.span
                                    className="text-6xl mb-4 block"
                                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                                >
                                    {role.icon}
                                </motion.span>
                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{role.name}</h3>
                                <p className="text-sm text-muted-foreground mt-2">5 Practice Questions</p>

                                <div className="mt-6 w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${role.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                    />
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-primary text-white p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 glass-morphism rounded-3xl p-10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h2 className="text-2xl font-bold mb-6">Recent Sessions</h2>
                    <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-secondary/50 rounded-2xl bg-secondary/5">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            No sessions tracked yet. Start an interview to see results!
                        </motion.div>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
