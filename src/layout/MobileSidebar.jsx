import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { navigateToRoute, isExternalLink, openExternalLink } from '../../utils/navigation';
import {
  Home,
  Lock,
  Award,
  Headphones,
  FileText,
  X,
  Youtube,
  Send,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Button from "../components/Button";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const setThemeMode = (mode) => setDarkMode(mode);

  return { darkMode, toggleDarkMode, setThemeMode };
};


export default function MobileSidebar({ isOpen, onClose, onSelect, onConnectWallet, connectedWallet }){
    const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedContent, setSelectedContent] = useState("home");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { darkMode, setThemeMode } = useTheme();
  const themeDropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Determine active route based on location
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    setSelectedContent(path);
    
    // Handle nested routes
    if (path.includes('create-lock') || path.includes('token-lock') || path.includes('liquidity-lock')) {
      setOpenSubmenu('roilock');
    }
  }, [location]);

  // Check if any RoiLock submenu item is selected
  const roiLockSubmenuIds = ["create-lock", "token-lock", "liquidity-lock"];
  const isRoiLockActive = selectedContent === "roilock" || roiLockSubmenuIds.includes(selectedContent);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose?.();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Handle theme dropdown close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target)
      ) {
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleItemClick = (item) => {
    setSelectedContent(item);
    
    if (isExternalLink(item)) {
      openExternalLink(item);
    } else {
      navigateToRoute(item, navigate);
    }
    
    if (onSelect) {
      onSelect(item);
    }
    
    // Close mobile sidebar after navigation
    onClose?.();
  };

  const selectTheme = (theme) => {
    setThemeMode(theme);
    setThemeDropdownOpen(false);
  };

  const DexscreenerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M9 9l-2 6 6-2 2-6-6 2z" />
    </svg>
  );

  const menuItems = [
    { id: "home", icon: <Home size={20} />, label: "Home" },
    {
      id: "roilock",
      icon: <Lock size={20} />,
      label: "RoiLock",
      hasSubmenu: true,
      submenu: [
        { id: "create-lock", label: "Create Lock" },
        { id: "token-lock", label: "Token Lock" },
        { id: "liquidity-lock", label: "Liquidity Lock" },
      ],
    },
    { id: "dexscreener", icon: <DexscreenerIcon />, label: "Dexscreener.com", isExternal: true },
    { id: "rewards", icon: <Award size={20} />, label: "Rewards" },
    { id: "support", icon: <Headphones size={20} />, label: "Support" },
    { id: "doc", icon: <FileText size={20} />, label: "Doc", isExternal: true },
    { id: "x", icon: <FaXTwitter size={20} />, label: "X", isExternal: true },
    { id: "youtube", icon: <Youtube size={20} />, label: "Youtube", isExternal: true },
    { id: "telegram", icon: <Send size={20} />, label: "Telegram", isExternal: true },
    {
      id: "theme",
      icon: darkMode ? <Moon size={20} /> : <Sun size={20} />,
      label: "Theme",
      hasSubmenu: true,
      isCustomDropdown: true,
    },
  ];

  const getThemeIcon = () => (darkMode ? <Moon size={20} /> : <Sun size={20} />);

  if (!isOpen && window.innerWidth < 768) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-40 block block md:hidden"
    >
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 right-0 text-xs h-screen w-64 z-50 surface border-l border-[var(--color-border)]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
        <Button 
            variant="connect" 
            onClick={onConnectWallet}
            className="w-full justify-center"
          >
            {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
          </Button>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col h-full overflow-y-auto scrollbar-hide ">
          <ul className="pt-2">
            {menuItems.map((item) => (
              <li 
                key={item.id} 
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`flex items-center px-4 py-3 hover:bg-[var(--color-primary)]/10 cursor-pointer transition-colors
                    ${
                      selectedContent === item.id ||
                      (item.id === "roilock" && isRoiLockActive) ||
                      hoveredItem === item.id
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : ""
                    }`}
                  onClick={() => {
                    if (item.isCustomDropdown && item.id === "theme") {
                      setThemeDropdownOpen(!themeDropdownOpen);
                    } else if (item.hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      handleItemClick(item.id);
                    }
                  }}
                >
                  <span
                    className={`
                      ${
                        selectedContent === item.id ||
                        (item.id === "roilock" && isRoiLockActive) ||
                        hoveredItem === item.id
                          ? "text-[var(--color-primary)]"
                          : ""
                      }
                    `}
                  >
                    {item.id === "theme" ? getThemeIcon() : item.icon}
                  </span>
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.isExternal && (
                    <span className="text-xs ml-1">↗</span>
                  )}
                  {item.hasSubmenu && !item.isCustomDropdown && (
                    <span
                      className={`transform transition-transform ${
                        openSubmenu === item.id ? "rotate-90" : ""
                      }`}
                    >
                      <ChevronRight size={16} />
                    </span>
                  )}
                  {item.id === "theme" && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Regular submenu */}
                {item.hasSubmenu && !item.isCustomDropdown && openSubmenu === item.id && (
                  <ul className="bg-[var(--color-primary)]/5 pl-8">
                    {item.submenu.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] cursor-pointer transition-colors ${
                          selectedContent === subItem.id ? "text-[var(--color-primary)] font-medium" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(subItem.id);
                        }}
                        onMouseEnter={() => setHoveredItem(subItem.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {subItem.label}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Theme submenu */}
                {item.id === "theme" && themeDropdownOpen && (
                  <div
                    ref={themeDropdownRef}
                    className="absolute right-0 left-0 bg-[var(--color-primary)]/5 shadow-md rounded-md mt-1 z-50"
                  >
                    <ul>
                      <li
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] cursor-pointer transition-colors flex items-center gap-2 ${
                          darkMode ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTheme(true);
                        }}
                        onMouseEnter={() => setHoveredItem('theme-dark')}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Moon size={16} /> Dark
                      </li>
                      <li
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] cursor-pointer transition-colors flex items-center gap-2 ${
                          !darkMode ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTheme(false);
                        }}
                        onMouseEnter={() => setHoveredItem('theme-light')}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Sun size={16} /> Light
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}