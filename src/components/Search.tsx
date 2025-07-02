import React from "react";
import { CancelIcon, SearchIcon } from "./icons/Icons";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  disabled = false,
  className = "",
}) => {
  const [searchValue, setSearchValue] = React.useState(value);

  React.useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
    }
  };
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-secondary" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "border-custom hover:border-primary/50"
          }`}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              onChange?.("");
            }}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-primary transition-colors duration-200"
          >
            <CancelIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
