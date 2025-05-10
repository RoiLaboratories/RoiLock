import { Search } from 'lucide-react';
import Button from '../components/Button';

// Search Input Component
const SearchInput = ({ placeholder = 'Search...' }) => {
  return (
    <div className="relative flex-1 max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
        placeholder={placeholder}
      />
    </div>
  );
};

export default function Header() {
  return (
    <header className="surface w-full border-b border-[var(--color-border)] shadow-sm sticky top-0 z-50 px-8 md:px-8">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center flex-1">
          <SearchInput placeholder="Type token symbol to find your launchpad" />
        </div>
        <div className="flex items-center gap-8 md:gap-8">
          <Button
            variant="outlined"
            className="sm:flex"
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

          <Button variant="connect">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}