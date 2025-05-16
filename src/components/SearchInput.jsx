import { Search } from "lucide-react"; // or your icon library
import { useState } from "react";

const SearchInput = ({ placeholder = "Search..." }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Mobile: Icon Button */}
      <button
        className="md:hidden text-sm flex p-2 rounded-md  bg-btnhoverL "
        onClick={() => setShowMobileSearch(!showMobileSearch)}
      >
        <Search size={18} className="text-gray-600 dark:text-gray-200" />
      </button>

      {/* Mobile: Input appears when icon clicked */}
      {showMobileSearch && (
        <div className=" text-sm md:hidden flex w-full ml-2">
          <input
            type="text"
            className="w-full pl-4 pr-4 py-2 text-sm rounded-md bg-btnhoverL focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder={placeholder}
          />
        </div>
      )}

      {/* Desktop: Full input always visible */}
      <div className="relative text-sm flex-1 max-w-xl hidden md:flex">
        <div className="text-sm absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="text-sm w-full pl-10 pr-4 py-2 rounded-md bg-btnhoverL focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchInput;
