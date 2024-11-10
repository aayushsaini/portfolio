import React from 'react';
import TimeDisplay from './TimeDisplay';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0f0d]/80 backdrop-blur-sm z-50">
      <div className="max-w-[1400px] mx-auto px-3 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-semibold text-white pr-5">aayush</h1>
          <TimeDisplay />
        </div>
        <ul className="flex space-x-20">
          <li>
          <a href="#" className="text-green-500 hover:text-green-400 transition-colors">/home</a>
          </li>
          <li>
          <a href="#" className="hover:text-green-400 transition-colors">/posts</a>
          </li>
          <li>
          <a href="#" className="hover:text-green-400 transition-colors">/know-me</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;