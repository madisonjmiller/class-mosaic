import React from 'react';
import InfoModal from './InfoModal';
import ThemeSelector from './ThemeSelector';
import '../css/banner.css'; // Adjust path if needed

const Banner = ({ children }) => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>ClassMosaic</h1>
        <p id="msg">Piece Together Your Best Class Schedule</p>
        <InfoModal />
        <ThemeSelector />
        <div className="tooltip">
          ℹ️
          <span className="tooltiptext">
            Schedules may not be exact credit amounts depending on inputted classes and max credits.
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Banner;
