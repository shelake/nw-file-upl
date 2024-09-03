import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from react-icons
import './Mode.css'
 
function Mode() {
  // State to track the current mode
  const [darkMode, setDarkMode] = useState(false);
 
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
 
  // Effect to set CSS variables based on the mode
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);
 
  return (
    <div className="mode-container">
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {/* Dynamically render icon based on mode */}
        {darkMode ? <FaSun className="icon-white" /> : <FaMoon className="icon-black" />}
      </button>
    </div>
  );
}
 
export default Mode;
