'use client'
import React, { useEffect, useState } from "react";

interface RadioButtonGroupProps {
  options: { type: string; description: string }[];
  name: string;
  onChange?: (value: string) => void;
  defaultSelected?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, name, onChange ,defaultSelected, }) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    // Set the default selected option when the component mounts
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [defaultSelected]);


  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="space-y-4 ">
      {options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center space-x-4 p-3 rounded-lg shadow-md cursor-pointer transition 
          ${
            selected === option.type
              ? "bg-white border border-black text-black"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="relative">
            <input
              type="radio"
              name={name}
              value={option.type}
              checked={selected === option.type}
              onChange={() => handleChange(option.type)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selected === option.type ? "border-black bg-black" : "border-gray-400 bg-white"
              }`}
            />
          </div>

          <div>
            <span className="font-medium">{option.type}</span>
            <p className="text-gray-400 text-sm">{option.description}</p>
          </div>
          
          
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;