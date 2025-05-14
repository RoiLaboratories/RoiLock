import { useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import MobileSidebar from "./MobileSidebar";
import { Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleMenuItemSelect = (selectedItem) => {
    console.log(`Selected: ${selectedItem}`);
    setMenuOpen(false);
  };

  return (
    <header className="surface w-full border-b border-[var(--color-border)] shadow-sm sticky top-0 z-30 px-0 mx-0 md:px-8 md:pl-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-start justify-start px-4 py-3 mb-2">
          <div className="flex items-center justify-start">
            <img src="/roi.png" alt="RoiLock Logo" className="w-[40px]" />
            <h1 className="ml-3 font-bold text-xl !hidden sm:!flex">RoiLock</h1>
          </div>
        </div>

        <div className="flex items-center flex-1">
          <SearchInput placeholder="Type token symbol or address to find your Lock" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <Button
            variant="outlined"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                <path d="M9 9l-2 6 6-2 2-6-6 2z" />
              </svg>
            }
          >
            dexscreener.com
          </Button>

          <Button variant="connect">Connect Wallet</Button>
        </div>

        {/* Mobile: Burger menu button */}
        <div className="md:hidden flex px-4">
          <button onClick={toggleMenu}>
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onSelect={handleMenuItemSelect} 
      />
    </header>
  );
}