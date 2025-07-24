import React, { useEffect, useState } from 'react';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('light-theme');

  useEffect(() => {
    // On component mount, apply the saved theme from local storage
    const savedTheme = localStorage.getItem('selectedTheme') || 'light-theme';
    setSelectedTheme(savedTheme);
    applyTheme(savedTheme);
    disableSelectedOption(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme', 'pink-theme', 'green-theme');

    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
    updateDropdownStyles(theme);
  };

  const saveTheme = (theme) => {
    localStorage.setItem('selectedTheme', theme);
  };

  const disableSelectedOption = (theme) => {
    const options = document.getElementById('themes').options;
    for (let i = 1; i < options.length; i++) {
      if (options[i].value === theme) {
        options[i].disabled = true;
      } else {
        options[i].disabled = false;
      }
    }
  };

  const updateDropdownStyles = (theme) => {
    let dropdownBg;
    let dropdownColor;
    
    switch (theme) {
      case 'dark-theme':
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--black');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--light-grey');
        break;
      case 'light-theme':
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--white');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-grey');
        break;
      case 'blue-theme':
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--light-blue');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--medium-blue');
        break;
      case 'pink-theme':
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--light-pink');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-pink');
        break;
      case 'green-theme':
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--light-green');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-green');
        break;
      default:
        dropdownBg = getComputedStyle(document.documentElement).getPropertyValue('--light-grey');
        dropdownColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-grey');
    }
    
    const themeDropdown = document.getElementById('themes');
    themeDropdown.style.backgroundColor = dropdownBg;
    themeDropdown.style.color = dropdownColor;
  };

  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setSelectedTheme(theme);
    applyTheme(theme);
    saveTheme(theme);
    disableSelectedOption(theme);
  };

  return (
     <div className="theme-selector-container">
      <label className="themes-dropdown-label" htmlFor="themes">Themes: </label>
      <select id="themes" value={selectedTheme} onChange={handleThemeChange} className="themes-dropdown">
        <option value="light-theme">Light</option>
        <option value="dark-theme">Dark</option>
        <option value="blue-theme">Blue</option>
        <option value="pink-theme">Pink</option>
        <option value="green-theme">Green</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
