import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [, setTime] = useState('');
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));

      const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setIstTime(istNow.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-gray-400">
      <span className='text-green-400 px-2'>●</span> IST: {istTime}
      <span className="ml-2 relative group">
        {(() => {
          const now = new Date();
          const hours = now.getHours();

          if (hours >= 6 && hours < 7) return '🌅'; // Sunrise
          if (hours >= 7 && hours < 10) return '🍳'; // Breakfast
          if (hours >= 10 && hours < 13) return '💻'; // Coding
          if (hours >= 13 && hours < 15) return '🍽️'; // Lunch
          if (hours >= 15 && hours < 16) return '📅'; // Meetings
          if (hours >= 16 && hours < 18) return '💼'; // Work
          if (hours >= 18 && hours < 19) return '🚗'; // Commuting
          if (hours >= 19 && hours < 20) return '🍽️'; // Dinner
          if (hours >= 20 && hours < 22) return '🎬'; // Movie or YouTube
          if (hours >= 22 || hours < 6) return '💤'; // Sleep

          return '';
        })()}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {(() => {
        const now = new Date();
        const hours = now.getHours();

        if (hours >= 6 && hours < 7) return 'Sunrise, good morning!!';
        if (hours >= 7 && hours < 10) return 'Breakfast';
        if (hours >= 10 && hours < 13) return 'Coding hours';
        if (hours >= 13 && hours < 15) return 'Lunch';
        if (hours >= 15 && hours < 16) return 'Attending Meetings';
        if (hours >= 16 && hours < 18) return 'Work hours';
        if (hours >= 18 && hours < 19) return 'Commuting';
        if (hours >= 19 && hours < 20) return 'Having dinner';
        if (hours >= 20 && hours < 22) return 'Likely watching a movie or youTube';
        if (hours >= 22 || hours < 6) return 'Probably sleeping...';

        return '';
          })()}
        </span>
      </span>
    </span>
  );
};

export default TimeDisplay;