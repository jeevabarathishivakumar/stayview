import React from "react";

/*
Basic input box you can reuse
Lets you set a label, id, and other options
*/

const Input = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 bg-white placeholder-gray-400"
    />
  </div>
);

export default Input;