import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
          JENUS<span className="text-slate-500">.AI</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-cyan-400 transition-colors relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="text-xs h-8 hidden md:inline-flex border-slate-700 hover:bg-slate-900"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="w-3 h-3 mr-2" /> CV
            </a>
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0B0F19]/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button 
                  variant="outline" 
                  className="text-xs h-8 mt-2 border-slate-700 hover:bg-slate-900"
                  asChild
                >
                  <a href="/resume.pdf" download onClick={() => setIsMenuOpen(false)}>
                    <Download className="w-3 h-3 mr-2" /> Download CV
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
