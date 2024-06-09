import React, { useState, forwardRef, ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  name: string;
  className?: string;
  unit?: string;
  textFloatingPlaceholder?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  className = "",
  textFloatingPlaceholder = "",
  unit,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [onFocusPlaceholder, setOnFocusPlaceholder] = useState('No Data');

  return (
    <label className="relative block">
      <input
        ref={ref}
        className={`${className}`}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setOnFocusPlaceholder('No Data');
        }}
        placeholder={onFocusPlaceholder}
        {...props}
      />
      {unit && <span className="absolute right-2 top-2 text-white/25 text-base z-10">{unit}</span>}
      {textFloatingPlaceholder &&
        <span
          className={`absolute left-3 transition-all duration-300 transform 
            ${isFocused ? '-top-2 text-xs bg-[#1B231C]/75 px-2 text-[#2C4CBE] rounded-lg z-20' : 'top-2 text-white text-base invisible hidden z-0'}`}
        >
          {textFloatingPlaceholder}
        </span>
      }
    </label>
  );
});

export default TextField;
