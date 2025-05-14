// MobileSidebar.jsx
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

export default function MobileSidebar({ isOpen, onClose, onSelect }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedContent, setSelectedContent] = useState("home");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { darkMode, setThemeMode } = useTheme();
  const themeDropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const isRoiLockActive = selectedContent.startsWith("lock-");

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

  const selectContent = (item) => {
    setSelectedContent(item);
    if (onSelect) onSelect(item);
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
        { id: "lock-basic", label: "Basic Lock" },
        { id: "lock-premium", label: "Premium Lock" },
        { id: "lock-custom", label: "Custom Lock" },
      ],
    },
    { id: "dexscreener", icon: <DexscreenerIcon />, label: "Dexscreener.com" },
    { id: "rewards", icon: <Award size={20} />, label: "Rewards" },
    { id: "support", icon: <Headphones size={20} />, label: "Support" },
    { id: "doc", icon: <FileText size={20} />, label: "Doc" },
    { id: "x", icon: <X size={20} />, label: "X" },
    { id: "youtube", icon: <Youtube size={20} />, label: "Youtube" },
    { id: "telegram", icon: <Send size={20} />, label: "Telegram" },
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
      // className={`fixed inset-0 z-40 ${isOpen ? "block" : "hidden md:block"}`}
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
          fixed top-0 right-0 h-screen w-64 z-50 surface border-l border-[var(--color-border)]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          {/* <h2 className="font-bold">Menu</h2> */}
          <Button
          variant="connect">
            Connect Wallet
            </Button>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col h-full overflow-y-auto">
          <ul className="pt-2">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <div
                  className={`flex items-center px-4 py-3 hover:bg-[var(--color-primary)]/10 cursor-pointer
                    ${
                      selectedContent === item.id ||
                      (item.id === "roilock" && isRoiLockActive)
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : ""
                    }`}
                  onClick={() => {
                    if (item.isCustomDropdown && item.id === "theme") {
                      setThemeDropdownOpen(!themeDropdownOpen);
                    } else if (item.hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      selectContent(item.id);
                    }
                  }}
                >
                  <span>{item.id === "theme" ? getThemeIcon() : item.icon}</span>
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.hasSubmenu && !item.isCustomDropdown && (
                    <span className={`transition-transform ${openSubmenu === item.id ? "rotate-90" : ""}`}>
                      &gt;
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
                        className={`py-2 hover:bg-[var(--color-primary)]/10 cursor-pointer ${
                          selectedContent === subItem.id ? "text-[var(--color-primary)] font-medium" : ""
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

                {/* Theme submenu */}
                {item.id === "theme" && themeDropdownOpen && (
                  <div
                    ref={themeDropdownRef}
                    className="absolute right-0 left-0 bg-[var(--color-primary)]/5 shadow-md rounded-md mt-1 z-50"
                  >
                    <ul>
                      <li
                        className={`px-4 py-2 hover:bg-[var(--color-primary)]/10 cursor-pointer flex items-center gap-2 ${
                          darkMode ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""
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
                          !darkMode ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : ""
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
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}