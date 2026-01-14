import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants";

const RadialNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Fixed at left center */}
      <button
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#0B0F19] to-[#1a1f2e] border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 active:scale-95"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close radial menu" : "Open radial menu"}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Semi-Circular Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/20"
            />

            {/* Radial Menu Container - This is the center point */}
            <div className="fixed right-24 top-1/2 -translate-y-1/2 z-50 w-0 h-0">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const totalItems = navItems.length;
                
                // Calculate angle for semi-circle (180 degrees)
                // -90° to +90° creates a left-facing semi-circle
                const startAngle = -90; // Start from top
                const endAngle = 90;    // End at bottom
                const angleRange = endAngle - startAngle;
                const angle = startAngle + (angleRange * index) / (totalItems - 1);
                const radius = 100; // Distance from center
                
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ 
                      scale: 0, 
                      opacity: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: radius * Math.cos(angle * Math.PI / 180),
                      y: radius * Math.sin(angle * Math.PI / 180)
                    }}
                    exit={{ 
                      scale: 0, 
                      opacity: 0,
                      x: 0,
                      y: 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.03
                    }}
                    className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-[#0B0F19] to-[#1a1f2e] border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 shadow-md"
                    style={{
                      right: "-20px", // Center the item (half of width: 40px/2 = 20px)
                      top: "-20px",  // Center the item (half of height: 40px/2 = 20px)
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    title={item.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RadialNav;