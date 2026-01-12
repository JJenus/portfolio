import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mail,
  ChevronRight,
  Terminal,
  Sparkles,
  Activity,
} from "lucide-react";

import { Typewriter, SkillCard, TerminalCard } from "./components/portfolio";
import { Navbar, Footer } from "./components/layout";
import {
  skillsData,
  experienceData,
  projectsData,
} from "./lib/constants";
import { cn } from "./lib/utils";

function App() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6 min-h-[90vh] flex items-center justify-center relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6">
              <Activity className="w-3 h-3" /> SYSTEM ONLINE: BACKEND ARCHITECT
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Alakere
              </span>
              <br />
              <span className="text-white">Jenus</span>
            </h1>
            <div className="h-8 mb-8">
              <p className="text-xl md:text-2xl text-slate-400">
                <Typewriter text="Initializing robust backend solutions..." />
              </p>
            </div>
            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
              Results-driven Backend Engineer with 4+ years experience building
              scalable, high-availability systems. Specialized in Java/Spring Boot
              and Node.js microservices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                View Projects <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-slate-700 hover:bg-slate-900">
                <Mail className="w-4 h-4" /> Contact
              </Button>
            </div>
          </motion.div>

          {/* Right: AI Core / Generative Visual */}
          <motion.div
            style={{ y }}
            className="relative flex justify-center items-center"
          >
            {/* Generative Rings */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-800/50 animate-spin" />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-slate-700/30 animate-spin-reverse" />
            
            {/* Gradient Glow Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, #06b6d4, transparent, #a855f7, transparent)",
                filter: "blur(40px)",
                opacity: 0.4,
              }}
            />

            {/* Inner Core */}
            <div className="relative z-10 w-[250px] h-[250px] bg-slate-900/80 border border-slate-700/50 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="text-center p-6">
                    <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xs font-mono text-slate-500 mb-1">UPTIME</div>
                    <div className="text-2xl font-bold text-white mb-2">99.9%</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[95%]"></div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal / Summary Section */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <TerminalCard />
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Core modules of the engineering stack with proven expertise in building robust backend systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <SkillCard
                  category={skill.category}
                  icon={skill.icon}
                  items={skill.items}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6 bg-gradient-to-b from-slate-950/50 to-[#0B0F19]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <Terminal className="text-purple-500" /> 
              <span>Execution Log</span>
            </h2>
            <p className="text-slate-400">
              Professional journey through scalable backend engineering.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />
            
            <div className="space-y-12">
              {experienceData.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative",
                    idx % 2 === 0 ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10" />
                  
                  <Card className="border-slate-800 bg-slate-950/50 hover:bg-slate-900/30 transition-all duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{job.role}</h3>
                          <div className="text-cyan-400 font-medium">{job.company}</div>
                          <div className="text-slate-500 text-sm mt-1">{job.location}</div>
                        </div>
                        <div className="text-slate-500 text-sm font-mono mt-2 md:mt-0 bg-slate-900/50 px-3 py-1 rounded">
                          {job.period}
                        </div>
                      </div>
                      <ul className="space-y-3 text-slate-400 text-sm">
                        {job.points.map((point, i) => (
                          <li key={i} className="flex gap-3">
                            <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Deployed Systems</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Production-ready backend systems delivering high performance and reliability.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projectsData.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-purple-300 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/20 group-hover:border-purple-400/50 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;