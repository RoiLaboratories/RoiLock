import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Icons
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z" fill="currentColor"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.52.32-1.79z" fill="currentColor"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm9 4h-2.5c-.55 0-1 .45-1 1s.45 1 1 1H21c.55 0 1-.45 1-1s-.45-1-1-1zM12 4c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zM12 20c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM4.5 12H2c-.55 0-1 .45-1 1s.45 1 1 1h2.5c.55 0 1-.45 1-1s-.45-1-1-1zM17 8.4l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L15.6 7c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0zM7 8.4c.4.4 1 .4 1.4 0s.4-1 0-1.4L7 5.6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L7 8.4zm10 7.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0s.4-1 0-1.4L17 15.6zM7 15.6l-1.4 1.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0L8.4 17c.4-.4.4-1 0-1.4s-1-.4-1.4 0z" fill="currentColor"/>
  </svg>
);

// RoiLock Logo component
const RoiLockLogo = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex items-start justify-start px-4 py-3 mb-2">
      <div className="flex items-center justify-start">
        <img src="/roi.png" alt="RoiLock Logo" className="w-10" />
        <h1 className="ml-3 font-bold text-xl text-text">RoiLock</h1>
      </div>
    </div>
  );
};

// Footer component
export default function Footer() {
  const { darkMode, setThemeMode } = useTheme();
  
  return (
    <footer className={`py-6 mt-12 w-full surface`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <RoiLockLogo />
            <p className="mt-4 text-sm text-text">
              RoiLock helps everyone create liquidity locks 
              and earn passive income in USDC
            </p>
          </div>
          
          {/* Useful links */}
          <div>
            <h3 className="font-medium mb-4 uppercase text-sm text-text">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text hover:text-primary">RoiLock</a></li>
              <li><a href="#" className="text-text hover:text-primary">Dexscreener</a></li>
              <li><a href="#" className="text-text hover:text-primary">Docs</a></li>
              <li><a href="#" className="text-text hover:text-primary">Rewards</a></li>
            </ul>
          </div>
          
          {/* Socials */}
          <div>
            <h3 className="font-medium mb-4 uppercase text-sm text-text">Socials</h3>
            <div className="flex space-x-4">
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`}>
                <XIcon />
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
                <TelegramIcon />
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}>
                <YouTubeIcon />
              </a>
            </div>
          </div>
          
          {/* Interface theme toggle */}
          <div>
            <h3 className="font-medium mb-4 uppercase text-sm text-text">Interface</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setThemeMode(true)} 
                className={`flex items-center space-x-2 py-1 px-2 rounded transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-800 text-primary' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <MoonIcon />
                <span>Dark mode</span>
              </button>
              
              <button 
                onClick={() => setThemeMode(false)} 
                className={`flex items-center space-x-2 py-1 px-2 rounded transition-colors duration-200 ${
                  !darkMode 
                    ? 'bg-gray-100 text-primary' 
                    : 'hover:bg-gray-800'
                }`}
              >
                <SunIcon />
                <span>Light mode</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} text-center text-sm`}>
          Copyright © 2025, RoiLock
        </div>
      </div>
    </footer>
  );
}