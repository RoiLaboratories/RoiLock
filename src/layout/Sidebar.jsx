import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
const useTheme = () => {
  const [systemIsDark, setSystemIsDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [darkMode, setDarkMode] = useState(systemIsDark);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setSystemIsDark(e.matches);
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
  const [expanded, setExpanded] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedContent, setSelectedContent] = useState("home");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { darkMode, setThemeMode } = useTheme();
  const themeDropdownRef = useRef(null);

  const isRoiLockActive = selectedContent.startsWith("lock-");

  const handleMouseEnter = () => {
    if (!expanded) {
      const timeout = setTimeout(() => {
        setExpanded(true);
      }, 300);
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
      }, 300);
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

  const selectContent = (item) => {
    setSelectedContent(item);
    if (onSelect) onSelect(item);
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
        { id: "lock-basic", label: "Basic Lock" },
        { id: "lock-premium", label: "Premium Lock" },
        { id: "lock-custom", label: "Custom Lock" },
      ],
    },
    {
      id: "dexscreener",
      icon: <DexscreenerIcon />,
      label: "Dexscreener.com",
      divider: false,
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
    { id: "doc", icon: <FileText size={20} />, label: "Doc", divider: false },
    { id: "x", icon: <X size={20} />, label: "X", divider: false },
    {
      id: "youtube",
      icon: <Youtube size={20} />,
      label: "Youtube",
      divider: false,
    },
    {
      id: "telegram",
      icon: <Send size={20} />,
      label: "Telegram",
      divider: false,
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
      className={`h-full transition-all duration-300 z-40 ${
        expanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full shadow-md flex flex-col surface border-r border-[var(--color-border)]">
        {/* Logo */}
        <div className="flex items-center px-4 py-5 mb-2">
          <div className="flex items-center">
            <div className="flex">
              <img src="/public/roi.png" alt="" className="w-9" />
            </div>
            {expanded && (
              <span className="ml-3 font-bold text-xl">RoiLock</span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <div
                  className={`
                    flex items-center ${
                      expanded ? "px-4 py-2" : "justify-center py-3"
                    } py-3 
                    hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer
                    ${
                      selectedContent === item.id ||
                      (item.id === "roilock" && isRoiLockActive)
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : ""
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
                      selectContent(item.id);
                    }
                  }}
                >
                  <span
                    className={`
                    ${
                      selectedContent === item.id ||
                      (item.id === "roilock" && isRoiLockActive)
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
                      {item.hasSubmenu && !item.isCustomDropdown && (
                        <span
                          className={`transform transition-transform ${
                            openSubmenu === item.id ? "rotate-90" : ""
                          }`}
                        >
                          &gt;
                        </span>
                      )}
                      {item.id === "theme" && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            themeDropdownOpen ? "rotate-180" : ""
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
                          className={`py-2 hover:bg-[var(--color-primary)]/10 cursor-pointer ${
                            selectedContent === subItem.id
                              ? "text-[var(--color-primary)] font-medium"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectContent(subItem.id);
                          }}
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
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 cursor-pointer flex items-center gap-2 ${
                          darkMode === true
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTheme(true);
                        }}
                      >
                        <Moon size={16} /> Dark
                      </li>
                      <li
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 cursor-pointer flex items-center gap-2 ${
                          darkMode === false
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTheme(false);
                        }}
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
