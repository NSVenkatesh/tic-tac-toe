import React, { useState } from "react";

const Square = ({ value, onClick }) => {
  const [color, setColor] = useState(false);

  const handleClick = () => {
    if (value === "X") {
      setColor(true);
    }
    onClick();
  };

  return (
    <button
      className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center ${
        value === "X"
          ? "text-red-500"
          : value === "O"
          ? "text-blue-500"
          : "text-gray-500"
      } text-6xl bg-gray-700 hover:bg-gray-600 border border-white-500 `}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
