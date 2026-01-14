import React, { useState } from "react";
import { Menu, MenuItem } from "@spaceymonk/react-radial-menu"; // Import the library
import { Menu as MenuIcon, X, Home, User, Settings, Mail, HelpCircle } from "lucide-react";

// Define your menu items
const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Contact", icon: Mail, href: "/contact" },
  { label: "Help", icon: HelpCircle, href: "/help" },
];

const RadialNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Set position relative to your fixed toggle button
  const handleToggleClick = (e: React.MouseEvent) => {
    const button = e.currentTarget.getBoundingClientRect();
    // Position the menu's center to the left of the button
    setMenuPosition({
      x: button.left - 100, // Adjust offset as needed
      y: button.top + button.height / 2,
    });
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (event: any, index: number, data: string) => {
    console.log(`Navigating to: ${data}`);
    // You can use window.location.href or your router here
    setIsMenuOpen(false); // Close menu after click
  };

  return (
    <>
      {/* Your existing toggle button */}
      <button
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#0B0F19] to-[#1a1f2e] border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 active:scale-95"
        onClick={handleToggleClick}
        aria-label={isMenuOpen ? "Close radial menu" : "Open radial menu"}
      >
        {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* The radial menu from the library */}
      <Menu
        centerX={menuPosition.x}
        centerY={menuPosition.y}
        innerRadius={60}  // Creates the "doughnut" hole
        outerRadius={150} // Outer edge of the menu
        show={isMenuOpen}
        animation={["fade", "scale"]}
        animationTimeout={150}
        drawBackground={true} // Draws the filled semi-circle segment
        className="radial-menu-custom" // For custom CSS
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <MenuItem
              key={item.label}
              onItemClick={handleItemClick}
              data={item.href}
              className="flex flex-col items-center justify-center text-white hover:text-cyan-300"
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default RadialNav;