import React from "react";

/*
Simple, reusable button component
You can set the button text, add extra styles, and pass other button props
*/

const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`w-full bg-black text-white font-bold uppercase py-3 px-4 rounded-xl shadow-md transition-all duration-150 hover:bg-gray-900 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
