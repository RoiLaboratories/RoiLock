import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigateToRoute, isExternalLink, openExternalLink } from '../../utils/navigation';
import {
  Home,
  Lock,
  Award,
  Headphones,
  FileText,
  Youtube,
  Send,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import "./Sidebar.css"

// Custom hook for theme management
const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const setThemeMode = (mode) => setDarkMode(mode);

  return { darkMode, toggleDarkMode, setThemeMode };
};

export default function Sidebar({ onSelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedContent, setSelectedContent] = useState("home");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { darkMode, setThemeMode } = useTheme();
  const themeDropdownRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (!expanded) {
      const timeout = setTimeout(() => {
        setExpanded(true);
      }, 500);
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    if (expanded) {
      const timeout = setTimeout(() => {
        setExpanded(false);
        if (openSubmenu) setOpenSubmenu(null);
      }, 500);
      setHoverTimeout(timeout);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const toggleSubmenu = (menu) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(menu);
    }
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
    
    if (window.innerWidth < 768) {
      setExpanded(false);
    }
  };

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeDropdownRef]);

  const selectTheme = (theme) => {
    setThemeMode(theme);
    setThemeDropdownOpen(false);
  };

  const DexscreenerIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M9 9l-2 6 6-2 2-6-6 2z" />
    </svg>
  );

  const menuItems = [
    { id: "home", icon: <Home size={20} />, label: "Home", divider: false },
    {
      id: "roilock",
      icon: <Lock size={20} />,
      label: "RoiLock",
      divider: false,
      hasSubmenu: true,
      submenu: [
        { id: "create-lock", label: "Create Lock" },
        { id: "token-lock", label: "Token Lock" },
        { id: "liquidity-lock", label: "Liquidity Lock" },
      ],
    },
    {
      id: "dexscreener",
      icon: <DexscreenerIcon />,
      label: "Dexscreener.com",
      divider: false,
      isExternal: true,
    },
    {
      id: "rewards",
      icon: <Award size={20} />,
      label: "Rewards",
      divider: false,
    },
    {
      id: "support",
      icon: <Headphones size={20} />,
      label: "Support",
      divider: true,
    },
    { id: "doc", icon: <FileText size={20} />, label: "Doc", divider: false, isExternal: true },
    { id: "x", icon: <FaXTwitter size={20} />, label: "X", divider: false, isExternal: true },
    {
      id: "youtube",
      icon: <Youtube size={20} />,
      label: "Youtube",
      divider: false,
      isExternal: true,
    },
    {
      id: "telegram",
      icon: <Send size={20} />,
      label: "Telegram",
      divider: true,
      isExternal: true,
    },
    {
      id: "theme",
      icon: darkMode ? <Moon size={20} /> : <Sun size={20} />,
      label: "Theme",
      divider: false,
      hasSubmenu: true,
      isCustomDropdown: true,
    },
  ];

  const getThemeIcon = () => {
    if (darkMode === true) return <Moon size={20} />;
    return <Sun size={20} />;
  };

  return (
    <div
      className={`fixed top-10 text-sm h-screen z-[30] left-0 hidden md:flex surface pt-6 transition-width ease-in-out duration-400 border-r border-[var(--color-border)] 
        ${expanded ? "w-60 pt-2" : "w-16 pt-1"}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-screen overflow-hidden flex flex-col w-full">
        {/* Menu Items */}
        <nav className="flex-1 overflow-hidden h-screen">
          <ul className="pt-4">
            {menuItems.map((item) => (
              <li 
                key={item.id} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`
                    flex items-center ${
                      expanded ? "px-4 py-1" : "justify-start px-4 py-3.5"
                    } py-3 pl-6
                    hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer
                    ${
                      selectedContent === item.id ||
                      (item.id === "roilock" && isRoiLockActive) ||
                      hoveredItem === item.id
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "hover:text-[var(--color-primary)]"
                    }
                    ${item.id === "theme" ? "theme-menu-item" : ""}
                  `}
                  onClick={() => {
                    if (item.isCustomDropdown && item.id === "theme") {
                      if (expanded) {
                        setThemeDropdownOpen(!themeDropdownOpen);
                      } else {
                        setThemeMode(!darkMode);
                      }
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
                  {expanded && (
                    <div className="flex justify-between items-center flex-1">
                      <span className="ml-3">{item.label}</span>
                      {item.isExternal && expanded && (
                        <span className="text-xs ml-1">↗</span>
                      )}
                      {item.hasSubmenu && !item.isCustomDropdown && (
                        <span
                          className={`transform transition-transform ${
                            openSubmenu === item.id ? "rotate-90" : ""
                          }`}
                        >
                          <ChevronRight size={16}/>
                        </span>
                      )}
                      {item.id === "theme" && (
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            themeDropdownOpen ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Regular Submenu */}
                {expanded &&
                  item.hasSubmenu &&
                  !item.isCustomDropdown &&
                  openSubmenu === item.id && (
                    <ul className="bg-[var(--color-primary)]/5 pl-8">
                      {item.submenu.map((subItem) => (
                        <li
                          key={subItem.id}
                          className={`py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] cursor-pointer transition-colors ${
                            selectedContent === subItem.id
                              ? "text-[var(--color-primary)] font-medium"
                              : ""
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

                {/* Theme dropdown */}
                {expanded && item.id === "theme" && themeDropdownOpen && (
                  <div
                    ref={themeDropdownRef}
                    className="absolute right-0 left-0 bg-[var(--color-primary)]/5 shadow-md rounded-md overflow-hidden z-50 mt-1"
                  >
                    <ul>
                      <li
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center gap-2 ${
                          darkMode === true
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : ""
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
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center gap-2 ${
                          darkMode === false
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : ""
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

                {item.divider && <hr className="border-border mx-3" />}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}


