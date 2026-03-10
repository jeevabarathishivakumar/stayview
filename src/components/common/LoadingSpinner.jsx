import React, { useEffect, useState } from "react";

/*
Animated loading spinner with cycling messages for user feedback.
Shows a spinning ring, animated icon, and changing loading text.
*/

const loadingMessages = [
  
  "Fetching data...",
  "Connecting to server...",
  "Loading details...",
  "Almost there...",
  "Hang tight, preparing your view...",
  
];

const LoadingSpinner = ({ className = "" }) => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((idx) => {
        const next = (idx + 1) % loadingMessages.length; 
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinning ring */}
      <div className="relative mb-4">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6v6l4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Cycling animated gradient text */}
      <div className="text-lg font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700 bg-clip-text text-transparent animate-pulse tracking-wide min-h-[2.5rem] text-center">
        {loadingMessages[msgIdx]}
      </div>
    </div>
  );
};

export default LoadingSpinner;

export const LoginButtonLoader = ({ className = "" }) => (
  <span className={`inline-block align-middle ${className}`}>
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </span>
);
