
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { contactInfo } from "@/lib/constants";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-slate-900/80 border border-slate-800 mb-8 backdrop-blur-sm"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            AJ
          </div>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Scale?
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
          Available for immediate relocation. Let's architect the future of your backend infrastructure.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-lg bg-slate-900/50 group-hover:bg-slate-800 transition-colors">
                {info.icon}
              </div>
              <span>{info.text}</span>
            </motion.a>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="rounded-full px-8 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4 mr-2" /> Download Full Resume
          </Button>
        </motion.div>
        
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="text-xs text-slate-600 font-mono">
            © {currentYear} ALAKERE JENUS. SYSTEM OPTIMIZED FOR PERFORMANCE.
          </div>
          <div className="text-xs text-slate-700 mt-2">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;