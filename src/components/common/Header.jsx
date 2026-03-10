import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import PrimaryButton from "./Button"; // Add this import at the top with other imports

// Simple logout icon SVG
const LogoutIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M16 17l5-5m0 0l-5-5m5 5H9m4 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v1" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Header component with navigation, logo, and user info
 */
const Header = ({ title  }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Use user's avatar or fallback
  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=2563eb&color=fff`;

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 3000); // Match this duration with the CSS transition duration
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex sm:flex-row justify-between items-center h-16 gap-y-2">
          {/* Logo/Title */}
          <div className="flex items-center min-w-0 space-x-3">
            {/* Logo */}
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
            </Link>
            <Link to="/"> <h1 className="text-sm  sm:text-lg md:text-2xl font-bold text-gray-900 truncate" style={{ fontFamily: 'OmnesArabic, sans-serif' }}>
              {title}
            </h1>
            </Link>
          </div>
          {/* Avatar Dropdown */}
          <div className="relative flex flex-row items-center gap-1" ref={menuRef}>
            {/* Avatar */}
            <img
              src={avatarUrl}
              alt={user?.name || "User"}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500 shadow-sm transition-all duration-2000
                ${isLoggingOut ? "translate-x-32 opacity-0" : "translate-x-0 opacity-100"}
              `}
              style={{ willChange: "transform, opacity" }}
            />
            {/* Name as dropdown button */}
            <PrimaryButton
              className="flex items-center gap-1 bg-transparent shadow-none !p-1 w-auto hover:bg-white text-black-700 font-semibold text-sm rounded focus:outline-none min-h-[40px]"
              onClick={() => !isLoggingOut && setOpen((v) => !v)}
              aria-label="User menu"
              type="button"
              disabled={isLoggingOut}
              style={{ minWidth: 120, transition: "color 0.1s" }}
            >
              {isLoggingOut ? (
                <span className="typewriter text-black font-bold transition-opacity duration-700 opacity-100">
                  Shutting Down
                </span>
              ) : (
                <>
                  <span className="truncate max-w-[100px] text-black">{user?.name}</span>
                  {/* Dropdown arrow icon */}
                  <svg className={`w-4 h-4 transition-transform text-black ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </PrimaryButton>
            {/* Dropdown */}
            {open && !isLoggingOut && (
              <div className="absolute right-0 mt-12 sm:mt-18 w-24 sm:w-28 bg-white rounded shadow-lg border border-gray-100 z-50 animate-fade-in">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-0 py-2 text-red-600 hover:bg-gray-50 transition-colors"
                >
                  <LogoutIcon />Logout
                  <span className="sr-only">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


