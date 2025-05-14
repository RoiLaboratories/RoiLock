import { Search } from "lucide-react"; // or your icon library
import { useState } from "react";

const SearchInput = ({ placeholder = "Search..." }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Mobile: Icon Button */}
      <button
        className="md:hidden flex p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        onClick={() => setShowMobileSearch(!showMobileSearch)}
      >
        <Search size={18} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile: Input appears when icon clicked */}
      {showMobileSearch && (
        <div className="md:hidden flex w-full ml-2">
          <input
            type="text"
            className="w-full pl-4 pr-4 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
            placeholder={placeholder}
          />
        </div>
      )}

      {/* Desktop: Full input always visible */}
      <div className="relative flex-1 max-w-xl hidden md:flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchInput;
