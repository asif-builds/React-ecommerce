import { useState } from "react";

export const Sort = ({ onChange }) => {
  const options = [
    "Default",
    "Highest rated",
    "Price high to low",
    "Price low to high",
  ];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Sort");

  const handleSort = (option) => {
    onChange(option);
    setOpen(false);
    setName(option === "Default" ? "Sort" : option);
  };

  return (
    <div className="relative inline-block">
      {/* Small label sitting on the border */}
      <span className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#6c757d] z-10">
        Order
      </span>

      {/* Main Toggle Button */}
      <button
        className="flex items-center justify-between min-w-[180px] bg-white border-2 border-[#212529] text-[#212529] px-4 py-2.5 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        {name}
        <span
          className={`ml-3 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* The Dropdown List with Backdrop Shadow */}
      {open && (
        <ul className="absolute top-full right-0 mt-2 w-full bg-white border-2 border-[#212529] shadow-[6px_6px_0px_0px_#212529] z-50 overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSort(option)}
              className={`px-4 py-3 text-[10px] font-black uppercase tracking-tight cursor-pointer border-b border-gray-100 last:border-none transition-colors duration-200
                ${
                  name === option || (name === "Sort" && option === "Default")
                    ? "bg-[#212529] text-white"
                    : "text-[#212529] hover:bg-gray-100"
                }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
