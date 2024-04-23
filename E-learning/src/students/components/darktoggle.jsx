import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className={`rounded-full p-1 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default DarkModeToggle;
