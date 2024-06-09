import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Option {
  id: string;
  name: string;
}

interface ISelectionsProps {
  className?: string;
  value?: string;
  placeholder?: string;
  editMode?: boolean;
  options: Option[];
  onChange: (val: string) => void;
  resetValue?: boolean;
}

export default function Selection({
  placeholder,
  className,
  editMode = true,
  options,
  onChange,
  value,
  ...props
}: ISelectionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (editMode) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredOptions(options);
    setSelectedOption(value || "");
  }, [options, value]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative flex items-center z-10" onClick={toggleDropdown} tabIndex={0}>
        <input 
          type="text"
          className={`w-full 
          ${isDropdownOpen ? 'border-2 border-[#2C4CBE] rounded-t-lg' : `rounded-lg border border-white ${className}` } ${className} ${editMode ? "text-white" : "text-white/25"}`} 
          readOnly
          {...props}
          value={selectedOption || placeholder}
        />
        <FaChevronDown
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 ${editMode ? "text-white cursor-pointer" : "text-white/25"}`}
          onClick={editMode ? toggleDropdown : undefined}
        />
      </div>
      {isDropdownOpen && (
        <div className="p-1 absolute bg-[#1D2A22] ring-1 ring-white rounded-b-lg mt-1 w-full max-h-60 overflow-y-auto z-20">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer border border-b-[#81AC91] border-l-[#1D2A22] border-r-[#1D2A22] border-t-[#1D2A22] text-white hover:bg-secondary hover:rounded-md"
                onClick={() => {
                  onChange(option.name);
                  setSelectedOption(option.name);
                  setIsDropdownOpen(false);
                }}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-white">No Data</div>
          )}
        </div>
      )}
    </div>
  );
}
