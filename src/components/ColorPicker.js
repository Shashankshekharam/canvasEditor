import React, { useState } from "react";

const ColorPicker = ({ onSelectColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#0369A1");
  const [colorHistory, setColorHistory] = useState([]);

  const toggleColorPicker = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    onSelectColor(color); // Pass the selected color to the parent component
    setIsOpen(false); // Close the color picker popover
    setColorHistory((prevColors) => {
      // Add the selected color to color history
      const updatedColors = [color, ...prevColors.filter((c) => c !== color)];
      return updatedColors.slice(0, 5); // Limit color history to last 5 colors
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        {/* Display last 5 selected colors */}
        {colorHistory.map((color, index) => (
          <div
            key={index}
            className="w-6 h-6 border-2 border-gray-300 cursor-pointer mr-1"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelection(color)}
          ></div>
        ))}
        {/* Button to open color picker popover */}
        <button
          onClick={toggleColorPicker}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          +
        </button>
      </div>
      {/* Color picker popover */}
      {isOpen && (
        <div className="absolute top-10 right-0 z-10 p-2 bg-white border border-gray-300 shadow-md">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorSelection(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;